'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from "pg";
import { z } from 'zod';
import { QueryBuilder } from '../query-builder';
import { TruckState } from './trucks.definitions';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, ssl: true
});

const DEFAULT_STRING_REQUIRED = z.string({ required_error: 'Campo obrigatório.' }).trim().min(1, 'Campo obrigatório.');

const DEFAULT_STRING_NULLABLE = z.string().trim().nullable().optional();

const FormSchema = z.object({
  id: z.string(),
  license_plate: DEFAULT_STRING_REQUIRED,
  renavam: DEFAULT_STRING_NULLABLE,
  chassi: DEFAULT_STRING_NULLABLE,
  truck_brand: DEFAULT_STRING_REQUIRED,
  color: DEFAULT_STRING_NULLABLE,
  year: DEFAULT_STRING_NULLABLE,
  mileage: DEFAULT_STRING_NULLABLE,
});

const CreateTruck = FormSchema.omit({ id: true });
const UpdateTruck = FormSchema.omit({ id: true });

export async function createTruck(prevState: TruckState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTruck.safeParse({
    license_plate: formData.get('license_plate'),
    renavam: formData.get('renavam'),
    chassi: formData.get('chassi'),
    truck_brand: formData.get('truck_brand'),
    color: formData.get('color'),
    year: formData.get('year'),
    mileage: formData.get('mileage'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos obrigatórios.',
    };
  }

  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trucks")
    .setFromObject(validatedFields.data);

  const { query, values } = qb.insert();

  const client = await pool.connect();

  // Insert data into the database
  try {
    await client.query(query, values);
  }
  catch (error) {
    console.error(error)
    // If a database error occurs, return a more specific error.
    return {
      message: 'Erro ao cadastrar caminhão',
    };
  }
  finally {
    client.release();
  }

  // Revalidate the cache for the trucks page and redirect the user.
  revalidatePath('/dashboard/caminhoes');
  redirect('/dashboard/caminhoes');
}
export async function updateTruck(
  id: string,
  prevState: TruckState,
  formData: FormData,
) {
  const validatedFields = UpdateTruck.safeParse({
    license_plate: formData.get('license_plate'),
    renavam: formData.get('renavam'),
    chassi: formData.get('chassi'),
    truck_brand: formData.get('truck_brand'),
    color: formData.get('color'),
    year: formData.get('year'),
    mileage: formData.get('mileage'),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos obrigatórios.',
    };
  }

  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trucks")
    .setFromObject(validatedFields.data);

  const { query, values } = qb.update({ id });

  const client = await pool.connect();

  // Insert data into the database
  try {
    await client.query(query, values);
  } catch (error) {
    console.error(error)
    return { message: 'Erro ao atualizar caminhão' };
  }

  revalidatePath('/dashboard/caminhoes');
  redirect('/dashboard/caminhoes');
}

export async function deleteTruck(id: string) {
  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trucks");

  const { query, values } = qb.delete({ id });

  const client = await pool.connect();

  // Insert data into the database
  try {
    await client.query(query, values);
  } catch (error) {
    console.error(error)
    return { message: 'Erro ao deletar caminhão' };
  }
  revalidatePath('/dashboard/caminhoes');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin')
        return 'Invalid credentials.';

      return 'Something went wrong.';
    }
    throw error;
  }
}
