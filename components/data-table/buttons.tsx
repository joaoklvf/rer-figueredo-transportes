import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { LoadingButton } from '../loading-button';
import { FormEvent } from 'react';

export function UpdateButton({ route, isLoading, setIsLoading }: Readonly<{ route: string; isLoading: boolean; setIsLoading: () => void }>) {
  if (isLoading) {
    return <LoadingButton variant='gray' />;
  }

  return (
    <Link
      href={route}
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={setIsLoading}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({ id, deleteFunction, isLoading, setIsLoading }: Readonly<{ id: string, deleteFunction: (id: string) => void; isLoading: boolean; setIsLoading: () => void }>) {
  const deleteActionById = deleteFunction.bind(null, id);

  if (isLoading) {
    return <LoadingButton variant='gray' />;
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading();
    deleteActionById();
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
