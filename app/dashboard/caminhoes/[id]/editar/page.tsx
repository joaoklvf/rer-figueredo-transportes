import Form from '@/app/ui/trucks/edit-form';
import Breadcrumbs from '@/app/ui/trucks/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchTruckById } from '@/app/lib/trucks.data';
 
export const metadata: Metadata = {
  title: 'Edit Truck',
};
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [truck, customers] = await Promise.all([
    fetchTruckById(id),
    fetchCustomers(),
  ]);

  if (!truck) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Trucks', href: '/dashboard/trucks' },
          {
            label: 'Edit Truck',
            href: `/dashboard/trucks/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form truck={truck} customers={customers} />
    </main>
  );
}
