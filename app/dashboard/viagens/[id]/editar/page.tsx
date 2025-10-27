import { fetchDrivers } from '@/lib/drivers/drivers.data';
import { fetchTripById } from '@/lib/trips/trips.data';
import { fetchTrucks } from '@/lib/trucks/trucks.data';
import { convertDatabaseDate, stringifyObject } from '@/lib/utils';
import Breadcrumbs from '@/components/breadcrumbs';
import Form from '@/app/ui/trips/trip-form/trip-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Editar Viagem',
};

export default async function Page(props: Readonly<{ params: Promise<{ id: string }> }>) {
  const params = await props.params;
  const id = params.id;

  const [trip, trucks, drivers] = await Promise.all([
    fetchTripById(id),
    fetchTrucks(),
    fetchDrivers()
  ]);

  if (!trip) {
    notFound();
  }

  const formTrip = stringifyObject({
    ...trip,
    date_empty: convertDatabaseDate(trip.date_empty),
    date_loaded: convertDatabaseDate(trip.date_loaded),
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Viagens', href: '/dashboard/viagens' },
          {
            label: 'Editar Viagem',
            href: `/dashboard/viagens/${id}/editar`,
            active: true,
          },
        ]}
      />
      <Form trip={formTrip} trucks={trucks} drivers={drivers} />
    </main>
  );
}
