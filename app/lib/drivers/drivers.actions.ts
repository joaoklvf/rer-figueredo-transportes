'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from "pg";
import { z } from 'zod';
import { QueryBuilder } from '../query-builder';
import { DriverState } from './drivers.definitions';

interface FormDriverData {
  name: string;
  phone_number: string;
  commission_percentage: number;
  birth_date?: string | null;
  rg?: string | null;
  cpf?: string | null;
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, ssl: true
});

const DEFAULT_STRING_REQUIRED = z.string({ required_error: 'Campo obrigatório.' }).trim().min(1, 'Campo obrigatório.');

const DEFAULT_STRING_NULLABLE = z.string().trim().nullable().optional();

const FormSchema = z.object({
  id: z.string(),
  name: DEFAULT_STRING_REQUIRED,
  rg: DEFAULT_STRING_NULLABLE,
  cpf: DEFAULT_STRING_NULLABLE,
  phone_number: DEFAULT_STRING_REQUIRED,
  birth_date: DEFAULT_STRING_NULLABLE,
  commission_percentage: z.coerce
    .number({ required_error: 'Campo obrigatório.' })
    .gt(0, { message: 'O valor deve ser maior que $0.' }),
});

const CreateDriver = FormSchema.omit({ id: true });
const UpdateDriver = FormSchema.omit({ id: true });

export async function createDriver(prevState: DriverState, formData: FormData) {
  const validatedFields = CreateDriver.safeParse({
    name: formData.get('name'),
    rg: formData.get('rg'),
    cpf: formData.get('cpf'),
    phone_number: formData.get('phone_number'),
    birth_date: formData.get('birth_date'),
    commission_percentage: formData.get('commission_percentage'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos obrigatórios.',
    };
  }

  const request = getRequest(validatedFields.data);
  const qb = new QueryBuilder("drivers")
    .setFromObject(request);

  const { query, values } = qb.insert();

  const client = await pool.connect();

  try {
    await client.query(query, values);
  }
  catch (error) {
    console.error(error)

    return {
      message: 'Erro ao cadastrar caminhão',
    };
  }
  finally {
    client.release();
  }

  revalidatePath('/dashboard/motoristas');
  redirect('/dashboard/motoristas');
}
export async function updateDriver(
  id: string,
  prevState: DriverState,
  formData: FormData,
) {
  const validatedFields = UpdateDriver.safeParse({
    name: formData.get('name'),
    rg: formData.get('rg'),
    cpf: formData.get('cpf'),
    phone_number: formData.get('phone_number'),
    birth_date: formData.get('birth_date'),
    commission_percentage: formData.get('commission_percentage'),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos obrigatórios.',
    };
  }

  const request = getRequest(validatedFields.data);
  const qb = new QueryBuilder("drivers")
    .setFromObject(request);

  const { query, values } = qb.update({ id });

  const client = await pool.connect();

  try {
    await client.query(query, values);
  } catch (error) {
    console.error(error)
    return { message: 'Erro ao atualizar caminhão' };
  }

  revalidatePath('/dashboard/motoristas');
  redirect('/dashboard/motoristas');
}

export async function deleteDriver(id: string) {
  const qb = new QueryBuilder("drivers");

  const { query, values } = qb.delete({ id });

  const client = await pool.connect();

  try {
    await client.query(query, values);
  } catch (error) {
    console.error(error)
    console.log('Erro ao deletar motorista');
  }
  revalidatePath('/dashboard/caminhoes');
}

function getRequest(data: FormDriverData) {
  const dateSplitted = data.birth_date?.split('/');
  const request = {
    ...data,
    birth_date: dateSplitted ? `${dateSplitted[2]}-${dateSplitted[1]}-${dateSplitted[0]}` : null
  };

  return request;
}
