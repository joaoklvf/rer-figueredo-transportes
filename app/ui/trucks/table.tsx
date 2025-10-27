import { fetchFilteredTrucks } from '@/lib/trucks/trucks.data';
import { DataTable } from '@/components/data-table/data-table';
import { deleteTruck } from '@/lib/trucks/trucks.actions';
import { DataTableColumnProp } from '@/components/data-table/interfaces';
import { TrucksTable } from '@/lib/trucks/trucks.definitions';

const COLUMNS: DataTableColumnProp<TrucksTable>[] = [
  { description: 'Marca', fieldName: 'truck_brand' },
  { description: 'Placa', fieldName: 'license_plate' },
  { description: 'Cor', fieldName: 'color' },
  { description: 'Ano', fieldName: 'year' },
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
  const trucks = await fetchFilteredTrucks(query, currentPage);

  return (
    <DataTable
      columns={COLUMNS}
      data={trucks}
      totalPages={totalPages}
      deleteFunction={deleteTruck}
      prefixRoute='caminhoes'
    />
  );
}
