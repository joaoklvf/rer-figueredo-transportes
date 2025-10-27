import { fetchFilteredDrivers } from '@/lib/drivers/drivers.data';
import { DataTable } from '@/components/data-table/data-table';
import { deleteDriver } from '@/lib/drivers/drivers.actions';
import { DataTableColumnProp } from '@/components/data-table/interfaces';
import { DriversTable } from '@/lib/drivers/drivers.definitions';

const COLUMNS: DataTableColumnProp<DriversTable>[] = [
  { description: 'Nome', fieldName: 'name' },
  { description: 'Telefone', fieldName: 'phone_number' },
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
  const drivers = await fetchFilteredDrivers(query, currentPage);

  return (
    <DataTable
      columns={COLUMNS}
      data={drivers}
      totalPages={totalPages}
      deleteFunction={deleteDriver}
      prefixRoute='motoristas'
    />
  );
}
