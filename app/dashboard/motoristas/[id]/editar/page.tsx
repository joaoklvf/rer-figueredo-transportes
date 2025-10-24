import { fetchDriverById } from '@/app/lib/drivers/drivers.data';
import { convertDataToForm } from '@/app/lib/utils';
import Breadcrumbs from '@/app/ui/components/breadcrumbs';
import DriverForm from '@/app/ui/drivers/driver-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Editar Caminhão',
};

export default async function Page(props: Readonly<{ params: Promise<{ id: string }> }>) {
  const params = await props.params;
  const id = params.id;

  const driver = await fetchDriverById(id);
  if (!driver) {
    notFound();
  }

  const formDriver = convertDataToForm(driver);

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
      <DriverForm driver={formDriver} />
    </main>
  );
}
