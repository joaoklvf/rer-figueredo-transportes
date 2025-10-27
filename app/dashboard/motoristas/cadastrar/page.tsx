import Breadcrumbs from '@/components/breadcrumbs';
import Form from '@/app/ui/drivers/driver-form'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastrar motorista',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Motoristas', href: '/dashboard/motoristas' },
          {
            label: 'Cadastrar motorista',
            href: '/dashboard/motoristas/cadastrar',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
