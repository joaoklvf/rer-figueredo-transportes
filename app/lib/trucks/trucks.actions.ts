'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from "pg";
import { QueryBuilder } from '../query-builder';
import { TruckForm } from './trucks.definitions';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, ssl: true
});

export async function createTruck(data: TruckForm) {
  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trucks")
    .setFromObject(data);

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
  data: TruckForm
) {
  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trucks")
    .setFromObject(data);

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
    console.log('Erro ao deletar caminhão');
  }
  revalidatePath('/dashboard/caminhoes');
}
