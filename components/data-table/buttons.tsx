import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { LoadingButton } from '../loading-button';

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

  const onSubmit = () => {
    setIsLoading();
    deleteActionById();
  }

  return (
    <form action={onSubmit}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        {isLoading ? <TrashIcon className="w-5" /> : <LoadingButton variant='gray' />}
      </button>
    </form>
  );
}
