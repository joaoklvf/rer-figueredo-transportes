import { fetchFilteredTrucks } from '@/app/lib/trucks/trucks.data';
import { DataTable } from '../components/data-table/data-table';
import { deleteTruck } from '@/app/lib/trucks/trucks.actions';

export async function TrucksTable({
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
      columns={[
        { description: 'Marca', fieldName: 'truck_brand' },
        { description: 'Placa', fieldName: 'license_plate' },
        { description: 'Cor', fieldName: 'color' },
        { description: 'Ano', fieldName: 'year' },
      ]}
      data={trucks}
      totalPages={totalPages}
      deleteFunction={deleteTruck}
      prefixRoute='caminhoes'
    />
  );
}
