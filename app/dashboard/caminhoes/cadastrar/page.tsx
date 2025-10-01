import Breadcrumbs from '@/app/ui/trucks/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import Form from '@/app/ui/trucks/create-form';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/caminhoes' },
          {
            label: 'Create Invoice',
            href: '/dashboard/caminhoes/criar',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
