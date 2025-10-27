import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function UpdateButton({ route }: Readonly<{ route: string }>) {
  return (
    <Link
      href={route}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({ id, deleteFunction }: Readonly<{ id: string, deleteFunction: (id: string) => void }>) {
  const deleteActionById = deleteFunction.bind(null, id);

  return (
    <form action={deleteActionById}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
