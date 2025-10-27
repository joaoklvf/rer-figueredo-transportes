import { fetchTripsPages } from '@/lib/trips/trips.data';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateTrip } from '@/app/ui/trips/buttons';
import { TripsTableSkeleton } from '@/app/ui/trips/skeletons/trips.skeletons';
import { Table } from '@/app/ui/trips/table';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Viagens',
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
  const totalPages = await fetchTripsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Viagens</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar viagens..." />
        <CreateTrip />
      </div>
      <Suspense key={query + currentPage} fallback={<TripsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
