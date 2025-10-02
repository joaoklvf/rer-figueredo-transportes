import Breadcrumbs from '@/app/ui/trucks/breadcrumbs';
import Form from '@/app/ui/trucks/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Caminhões', href: '/dashboard/caminhoes' },
          {
            label: 'Cadastrar caminhão',
            href: '/dashboard/caminhoes/criar',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
