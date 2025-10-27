import { fetchDrivers } from '@/lib/drivers/drivers.data';
import { fetchTrucks } from '@/lib/trucks/trucks.data';
import Breadcrumbs from '@/components/breadcrumbs';
import Form from '@/app/ui/trips/create-form/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastrar viagem',
};

export default async function Page() {
  const [trucks, drivers] = await Promise.all([
    fetchTrucks(),
    fetchDrivers()
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Viagens', href: '/dashboard/viagens' },
          {
            label: 'Cadastrar viagem',
            href: '/dashboard/viagens/cadastrar',
            active: true,
          },
        ]}
      />
      <Form drivers={drivers} trucks={trucks} />
    </main>
  );
}
