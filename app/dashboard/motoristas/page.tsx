import { fetchDriversPages } from '@/app/lib/drivers/drivers.data';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateDriver } from '@/app/ui/drivers/buttons';
import { DriversTableSkeleton } from '@/app/ui/drivers/skeletons/drivers.skeletons';
import { Table } from '@/app/ui/drivers/table';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Motoristas',
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
  const totalPages = await fetchDriversPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Motoristas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar caminhões..." />
        <CreateDriver />
      </div>
      <Suspense key={query + currentPage} fallback={<DriversTableSkeleton />}>
        <Table query={query} currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
