import { fetchTruckById } from '@/app/lib/trucks/trucks.data';
import { convertDataToForm } from '@/app/lib/utils';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
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

  const formTruck = convertDataToForm(truck);

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
      <Form truck={formTruck} />
    </main>
  );
}
