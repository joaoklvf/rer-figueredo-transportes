import postgres from 'postgres';
import { formatCurrency } from './utils';
import { TrucksTable, TruckForm } from './trucks.definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const truckCountPromise = sql`SELECT COUNT(*) FROM trucks`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const truckStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM trucks`;

    const data = await Promise.all([
      truckCountPromise,
      customerCountPromise,
      truckStatusPromise,
    ]);

    const numberOfTrucks = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidTrucks = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingTrucks = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfTrucks,
      totalPaidTrucks,
      totalPendingTrucks,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTrucks(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const trucks = await sql<TrucksTable[]>`
      SELECT
        *
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
    const data = await sql<TruckForm[]>`
      SELECT
        *
      FROM trucks
      WHERE trucks.id = ${id};
    `;

    const truck = data.map((truck) => ({
      ...truck,
      // Convert amount from cents to dollars
      amount: truck.amount / 100,
    }));

    return truck[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch truck.');
  }
}