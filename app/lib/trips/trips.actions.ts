'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from "pg";
import { QueryBuilder } from '../query-builder';
import { TripForm } from './trips.definitions';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, ssl: true
});

export async function createTrip(data: TripForm) {
  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trips")
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

  // Revalidate the cache for the trips page and redirect the user.
  revalidatePath('/dashboard/viagens');
  redirect('/dashboard/viagens');
}
export async function updateTrip(
  id: string,
  data: TripForm
) {
  // Prepare data for insertion into the database
  const qb = new QueryBuilder("trips")
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
