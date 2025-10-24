import postgres from 'postgres';
import { Truck, TruckField, TrucksTable } from './trucks.definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ITEMS_PER_PAGE = 6;

export async function fetchTrucks() {
  try {
    const customers = await sql<TruckField[]>`
      SELECT
        id,
        license_plate
      FROM trucks
      ORDER BY license_plate ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all trucks.');
  }
}

export async function fetchFilteredTrucks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const trucks = await sql<TrucksTable[]>`
      SELECT
        id,
        truck_brand,
        license_plate,
        color,
        year
      FROM trucks
      WHERE
        license_plate ILIKE ${`%${query}%`} OR
        renavam ILIKE ${`%${query}%`} OR
        chassi ILIKE ${`%${query}%`} OR
        truck_brand ILIKE ${`%${query}%`} OR
        year ILIKE ${`%${query}%`} OR
        mileage ILIKE ${`%${query}%`} OR
        color ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return trucks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch trucks.');
  }
}

export async function fetchTrucksPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM trucks
    WHERE
      license_plate ILIKE ${`%${query}%`} OR
      renavam ILIKE ${`%${query}%`} OR
      chassi ILIKE ${`%${query}%`} OR
      truck_brand ILIKE ${`%${query}%`} OR
      year ILIKE ${`%${query}%`} OR
      mileage ILIKE ${`%${query}%`} OR
      color ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of trucks.');
  }
}

export async function fetchTruckById(id: string) {
  try {
    const data = await sql<Truck[]>`
      SELECT
        *
      FROM trucks
      WHERE trucks.id = ${id};
    `;

    const truck = data.map((truck) => ({
      ...truck,
    }));

    return truck[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch truck.');
  }
}
