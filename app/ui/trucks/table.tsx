import { fetchFilteredTrucks } from '@/app/lib/trucks/trucks.data';
import { DeleteTruck, UpdateTruck } from '@/app/ui/trucks/buttons';

export default async function TrucksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const trucks = await fetchFilteredTrucks(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {trucks?.map((truck) => (
              <div
                key={truck.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    {truck.truck_brand}
                  </div>
                  <div>
                    {truck.license_plate}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {truck.year}
                    </p>
                    <p>{truck.color}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTruck id={truck.id} />
                    <DeleteTruck id={truck.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Marca
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Cor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Placa
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ano
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {trucks?.map((truck) => (
                <tr
                  key={truck.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {truck.truck_brand}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {truck.color}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {truck.license_plate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {truck.year}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTruck id={truck.id} />
                      <DeleteTruck id={truck.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
