import Breadcrumbs from '@/components/breadcrumbs';
import Form from '@/app/ui/trucks/truck-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastrar caminhão',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Caminhões', href: '/dashboard/caminhoes' },
          {
            label: 'Cadastrar caminhão',
            href: '/dashboard/caminhoes/cadastrar',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
