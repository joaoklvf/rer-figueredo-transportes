import { deleteTruck } from '@/app/lib/trucks/trucks.actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateTruck() {
  return (
    <Link
      href="/dashboard/caminhoes/cadastrar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Cadastrar novo</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTruck({ id }: Readonly<{ id: string }>) {
  return (
    <Link
      href={`/dashboard/caminhoes/${id}/editar`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTruck({ id }: Readonly<{ id: string }>) {
  const deleteTruckWithId = deleteTruck.bind(null, id);

  return (
    <form action={deleteTruckWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
