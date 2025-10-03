import { fetchTrucksPages } from '@/app/lib/trucks/trucks.data';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateTruck } from '@/app/ui/trucks/buttons';
import { TrucksTableSkeleton } from '@/app/ui/trucks/skeletons/trucks.skeletons';
import { Table } from '@/app/ui/trucks/table';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Caminhões',
};

export default async function Page(props: Readonly<{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}>) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTrucksPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Caminhões</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar caminhões..." />
        <CreateTruck />
      </div>
      <Suspense key={query + currentPage} fallback={<TrucksTableSkeleton />}>
        <Table query={query} currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
