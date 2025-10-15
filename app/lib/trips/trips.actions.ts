'use server';


import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from "pg";
import { z } from 'zod';
import { QueryBuilder } from '../query-builder';
import { TripState } from './trips.definitions';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, ssl: true
});

const DEFAULT_STRING_REQUIRED = z.string({ required_error: 'Campo obrigatório.' }).trim().min(1, 'Campo obrigatório.');

const DEFAULT_STRING_NULLABLE = z.string().trim().nullable().optional();
const DEFAULT_NUMBER_NULLABLE = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => val === undefined || val === '' || !isNaN(Number(val)),
    'Deve ser um número válido.'
  );

const FormSchema = z.object({
  id: z.string().optional(),
  truck_id: DEFAULT_STRING_REQUIRED,
  driver_id: DEFAULT_STRING_REQUIRED,
  origin: DEFAULT_STRING_REQUIRED,
  load_city: DEFAULT_STRING_NULLABLE,
  destination: DEFAULT_STRING_NULLABLE,
  odometer_start: DEFAULT_NUMBER_NULLABLE,
  odometer_loaded_city: DEFAULT_NUMBER_NULLABLE,
  odometer_end: DEFAULT_NUMBER_NULLABLE,
  empty_distance: DEFAULT_NUMBER_NULLABLE,
  load_distance: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_amount: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_media: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_price: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_total: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_amount: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_media: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_price: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_total: DEFAULT_NUMBER_NULLABLE,
  toll_empty: DEFAULT_NUMBER_NULLABLE,
  toll_loaded: DEFAULT_NUMBER_NULLABLE,
  total_empty: DEFAULT_NUMBER_NULLABLE,
  date_empty: z.string().trim().optional().nullable(),
  date_loaded: z.string().trim().optional().nullable(),
  note_number: DEFAULT_STRING_NULLABLE,
  load_weight: DEFAULT_NUMBER_NULLABLE,
  load_price: DEFAULT_NUMBER_NULLABLE,
  load_total: DEFAULT_NUMBER_NULLABLE,
  discounts: DEFAULT_NUMBER_NULLABLE,
  meal: DEFAULT_NUMBER_NULLABLE,
  driver_payment: DEFAULT_NUMBER_NULLABLE,
  trip_cost: DEFAULT_NUMBER_NULLABLE,
  trip_profit: DEFAULT_NUMBER_NULLABLE,
});

const CreateTrip = FormSchema.omit({ id: true });
const UpdateTrip = FormSchema.omit({ id: true });

export async function createTrip(prevState: TripState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTrip.safeParse({
    id: formData.get('id'),
    truck_id: formData.get('truck_id'),
    driver_id: formData.get('driver_id'),
    origin: formData.get('origin'),
    load_city: formData.get('load_city'),
    destination: formData.get('destination'),
    odometer_start: formData.get('odometer_start'),
    odometer_loaded_city: formData.get('odometer_loaded_city'),
    odometer_end: formData.get('odometer_end'),
    empty_distance: formData.get('empty_distance'),
    load_distance: formData.get('load_distance'),
    fuel_empty_amount: formData.get('fuel_empty_amount'),
    fuel_empty_media: formData.get('fuel_empty_media'),
    fuel_empty_price: formData.get('fuel_empty_price'),
    fuel_empty_total: formData.get('fuel_empty_total'),
    fuel_loaded_amount: formData.get('fuel_loaded_amount'),
    fuel_loaded_media: formData.get('fuel_loaded_media'),
    fuel_loaded_price: formData.get('fuel_loaded_price'),
    fuel_loaded_total: formData.get('fuel_loaded_total'),
    toll_empty: formData.get('toll_empty'),
    toll_loaded: formData.get('toll_loaded'),
    total_empty: formData.get('total_empty'),
    date_empty: formData.get('date_empty'),
    date_loaded: formData.get('date_loaded'),
    note_number: formData.get('note_number'),
    load_weight: formData.get('load_weight'),
    load_price: formData.get('load_price'),
    load_total: formData.get('load_total'),
    discounts: formData.get('discounts'),
    meal: formData.get('meal'),
    driver_payment: formData.get('driver_payment'),
    trip_cost: formData.get('trip_cost'),
    trip_profit: formData.get('trip_profit'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos obrigatórios.',
    };
  }

  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trips")
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

  // Revalidate the cache for the trips page and redirect the user.
  revalidatePath('/dashboard/viagens');
  redirect('/dashboard/viagens');
}
export async function updateTrip(
  id: string,
  prevState: TripState,
  formData: FormData,
) {
  const validatedFields = UpdateTrip.safeParse({
    id: formData.get('id'),
    truck_id: formData.get('truck_id'),
    driver_id: formData.get('driver_id'),
    origin: formData.get('origin'),
    load_city: formData.get('load_city'),
    destination: formData.get('destination'),
    odometer_start: formData.get('odometer_start'),
    odometer_loaded_city: formData.get('odometer_loaded_city'),
    odometer_end: formData.get('odometer_end'),
    empty_distance: formData.get('empty_distance'),
    load_distance: formData.get('load_distance'),
    fuel_empty_amount: formData.get('fuel_empty_amount'),
    fuel_empty_media: formData.get('fuel_empty_media'),
    fuel_empty_price: formData.get('fuel_empty_price'),
    fuel_empty_total: formData.get('fuel_empty_total'),
    fuel_loaded_amount: formData.get('fuel_loaded_amount'),
    fuel_loaded_media: formData.get('fuel_loaded_media'),
    fuel_loaded_price: formData.get('fuel_loaded_price'),
    fuel_loaded_total: formData.get('fuel_loaded_total'),
    toll_empty: formData.get('toll_empty'),
    toll_loaded: formData.get('toll_loaded'),
    total_empty: formData.get('total_empty'),
    date_empty: formData.get('date_empty'),
    date_loaded: formData.get('date_loaded'),
    note_number: formData.get('note_number'),
    load_weight: formData.get('load_weight'),
    load_price: formData.get('load_price'),
    load_total: formData.get('load_total'),
    discounts: formData.get('discounts'),
    meal: formData.get('meal'),
    driver_payment: formData.get('driver_payment'),
    trip_cost: formData.get('trip_cost'),
    trip_profit: formData.get('trip_profit'),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Preencha todos os campos obrigatórios.',
    };
  }

  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trips")
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

  revalidatePath('/dashboard/viagens');
  redirect('/dashboard/viagens');
}

export async function deleteTrip(id: string) {
  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trips");

  const { query, values } = qb.delete({ id });

  const client = await pool.connect();

  // Insert data into the database
  try {
    await client.query(query, values);
  } catch (error) {
    console.error(error)
    console.error('Erro ao deletar caminhão');
  }
  revalidatePath('/dashboard/viagens');
}
