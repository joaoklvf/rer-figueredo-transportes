import { fetchDriverById } from '@/lib/drivers/drivers.data';
import { convertDatabaseDate, formatPercent, stringifyObject } from '@/lib/utils';
import Breadcrumbs from '@/components/breadcrumbs';
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

  const formDriver = stringifyObject({
    ...driver,
    birth_date: driver.birth_date ? convertDatabaseDate(driver.birth_date) : '',
    commission_percentage: formatPercent(driver.commission_percentage * 100)
  })

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
