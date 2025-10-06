"use client"

import { getCellValue } from '@/app/utils/data-table-format';
import { DeleteButton, UpdateButton } from './buttons';
import { DataTableProps } from './interfaces';
import Pagination from './pagination';

export function DataTable<T extends { id: string }>({ data, columns, totalPages, deleteFunction, prefixRoute }: Readonly<DataTableProps<T>>) {
  const getEditRoute = (id: string) =>
    `${prefixRoute}/${id}/editar`;

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    {columns[0] && getCellValue(item, columns[0])}
                  </div>
                  <div>
                    {columns[1] && getCellValue(item, columns[1])}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {columns[2] && getCellValue(item, columns[2])}
                    </p>
                    <p>
                      {columns[3] && getCellValue(item, columns[3])}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <UpdateButton route={getEditRoute(item.id)} />
                    <DeleteButton id={item.id} deleteFunction={deleteFunction} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {columns.map(column => (
                  <th scope="col" className="px-3 py-5 font-medium" key={column.fieldName}>
                    {column.description}
                  </th>
                ))}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {columns.map(column => (
                    <td className="whitespace-nowrap px-3 py-3" key={column.fieldName}>
                      {getCellValue(item, column)}
                    </td>
                  ))}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex gap-3">
                      <UpdateButton route={getEditRoute(item.id)} />
                      <DeleteButton id={item.id} deleteFunction={deleteFunction} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
