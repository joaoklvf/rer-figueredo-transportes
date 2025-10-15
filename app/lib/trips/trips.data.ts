import postgres from 'postgres';
import { TripForm, TripsTable } from './trips.definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTrips(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const trips = await sql<TripsTable[]>`
      SELECT
        trips.id,
        drivers.name as "driver_name",
        trips.origin,
        trips.destination,
        trips.date_empty,
        trips.date_loaded
      FROM trips
      JOIN drivers ON drivers.id = trips.driver_id
      WHERE
        drivers.name ILIKE ${`%${query}%`} OR
        trips.origin ILIKE ${`%${query}%`} OR
        trips.destination ILIKE ${`%${query}%`} OR
        trips.date_empty::text ILIKE ${`%${query}%`} OR
        trips.date_loaded::text ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return trips;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch trips.');
  }
}

export async function fetchTripsPages(query: string) {
  try {

    const data = await sql`SELECT COUNT(*)
    FROM trips
    JOIN drivers ON drivers.id = trips.driver_id
    WHERE
      drivers.name ILIKE ${`%${query}%`} OR
      trips.origin ILIKE ${`%${query}%`} OR
      trips.destination ILIKE ${`%${query}%`} OR
      trips.date_empty::text ILIKE ${`%${query}%`} OR
      trips.date_loaded::text ILIKE ${`%${query}%`}
  `;

    if (!data?.[0].count)
      return 0;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of trips.');
  }
}

export async function fetchTripById(id: string) {
  try {
    const data = await sql<TripForm[]>`
      SELECT
        *
      FROM trips
      WHERE trips.id = ${id};
    `;

    const trip = data.map((trip) => ({
      ...trip,
    }));

    return trip[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch trip.');
  }
}
