import { fetchTruckById } from '@/app/lib/trucks.data';
import Breadcrumbs from '@/app/ui/trucks/breadcrumbs';
import Form from '@/app/ui/trucks/edit-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Truck',
};

export default async function Page(props: Readonly<{ params: Promise<{ id: string }> }>) {
  const params = await props.params;
  const id = params.id;

  const truck = await fetchTruckById(id);
  if (!truck) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Caminhões', href: '/dashboard/caminhoes' },
          {
            label: 'Editar Caminhão',
            href: `/dashboard/caminhoes/${id}/editar`,
            active: true,
          },
        ]}
      />
      <Form truck={truck} />
    </main>
  );
}
