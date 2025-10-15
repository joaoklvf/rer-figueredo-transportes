import { fetchTripById } from '@/app/lib/trips/trips.data';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import Form from '@/app/ui/trips/edit-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Trip',
};

export default async function Page(props: Readonly<{ params: Promise<{ id: string }> }>) {
  const params = await props.params;
  const id = params.id;

  const trip = await fetchTripById(id);
  if (!trip) {
    notFound();
  }

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
      <Form trip={trip} />
    </main>
  );
}
