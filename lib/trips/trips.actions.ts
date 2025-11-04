'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from "pg";
import { QueryBuilder } from '../query-builder';
import { Trip, ITripForm } from './trips.definitions';
import { convertDateStr, convertDecimalStr } from '../utils';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, ssl: true
});

export async function createTrip(data: ITripForm) {
  // Prepare data for insertion into the database
  const request = getRequest(data);
  const qb = new QueryBuilder("trips")
    .setFromObject(request);

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
      message: 'Erro ao cadastrar viagem',
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
  data: ITripForm
) {
  // Prepare data for insertion into the database
  const request = getRequest(data);
  const qb = new QueryBuilder("trips")
    .setFromObject(request);

  const { query, values } = qb.update({ id });

  const client = await pool.connect();

  // Insert data into the database
  try {
    await client.query(query, values);
  } catch (error) {
    console.error(error)
    return { message: 'Erro ao atualizar VIAGEM' };
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


function getRequest(data: ITripForm) {
  const request: Partial<Trip> = {
    ...data,
    id: '',
    date_empty: convertDateStr(data.date_empty),
    date_loaded: convertDateStr(data.date_loaded),
    odometer_start: Number(data.odometer_start),
    odometer_end: Number(data.odometer_end),
    odometer_loaded_city: Number(data.odometer_loaded_city),
    empty_distance: Number(data.empty_distance),
    commission_percentage: Number(data.commission_percentage),
    load_distance: Number(data.load_distance),
    fuel_empty_amount: convertDecimalStr(data.fuel_empty_amount),
    fuel_empty_media: Number(data.fuel_empty_media),
    fuel_empty_price: convertDecimalStr(data.fuel_empty_price),
    fuel_empty_total: convertDecimalStr(data.fuel_empty_total),
    fuel_loaded_amount: convertDecimalStr(data.fuel_loaded_amount),
    fuel_loaded_media: Number(data.fuel_loaded_media),
    fuel_loaded_price: convertDecimalStr(data.fuel_loaded_price),
    fuel_loaded_total: convertDecimalStr(data.fuel_loaded_total),
    toll_empty: convertDecimalStr(data.toll_empty),
    toll_loaded: convertDecimalStr(data.toll_loaded),
    total_empty: convertDecimalStr(data.total_empty),
    load_weight: convertDecimalStr(data.load_weight),
    load_price: convertDecimalStr(data.load_price),
    load_total: convertDecimalStr(data.load_total),
    discounts: convertDecimalStr(data.discounts),
    meal: convertDecimalStr(data.discounts),
    allowance: convertDecimalStr(data.allowance),
    driver_payment: convertDecimalStr(data.driver_payment),
    trip_cost: convertDecimalStr(data.trip_cost),
    trip_profit: convertDecimalStr(data.trip_profit)
  };

  return request;
}
