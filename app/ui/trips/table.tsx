import { fetchFilteredTrips } from '@/app/lib/trips/trips.data';
import { DataTable } from '../components/data-table/data-table';
import { deleteTrip } from '@/app/lib/trips/trips.actions';
import { DataTableColumnProp } from '../components/data-table/interfaces';
import { TripsTable } from '@/app/lib/trips/trips.definitions';

const COLUMNS: DataTableColumnProp<TripsTable>[] = [
  { description: 'Origem', fieldName: 'origin' },
  { description: 'Destino', fieldName: 'destination' },
  { description: 'Motorista', fieldName: 'driver_name' },
  { description: 'Data vazio', fieldName: 'date_empty' },
];

export async function Table({
  query,
  currentPage,
  totalPages,
}: Readonly<{
  query: string;
  currentPage: number;
  totalPages: number;
}>) {
  const trips = await fetchFilteredTrips(query, currentPage);

  return (
    <DataTable
      columns={COLUMNS}
      data={trips}
      totalPages={totalPages}
      deleteFunction={deleteTrip}
      prefixRoute='viagens'
    />
  );
}
