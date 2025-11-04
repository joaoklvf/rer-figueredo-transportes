import { fetchDrivers } from '@/lib/drivers/drivers.data';
import { fetchTripById } from '@/lib/trips/trips.data';
import { fetchTrucks } from '@/lib/trucks/trucks.data';
import { convertDatabaseDate, formatDecimal, stringifyObject, formatCurrency } from '@/lib/utils';
import Breadcrumbs from '@/components/breadcrumbs';
import Form from '@/app/ui/trips/trip-form/trip-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Editar Viagem',
};

export default async function Page(props: Readonly<{ params: Promise<{ id: string }> }>) {
  const params = await props.params;
  const id = params.id;

  const [trip, trucks, drivers] = await Promise.all([
    fetchTripById(id),
    fetchTrucks(),
    fetchDrivers()
  ]);

  if (!trip) {
    notFound();
  }

  const formTrip = stringifyObject({
    ...trip,
    date_empty: convertDatabaseDate(trip.date_empty),
    date_loaded: convertDatabaseDate(trip.date_loaded),
    fuel_empty_price: formatCurrency(trip.fuel_empty_price),
    fuel_empty_total: formatCurrency(trip.fuel_empty_total),
    fuel_loaded_price: formatCurrency(trip.fuel_loaded_price),
    fuel_loaded_total: formatCurrency(trip.fuel_loaded_total),
    toll_empty: formatCurrency(trip.toll_empty),
    toll_loaded: formatCurrency(trip.toll_loaded),
    total_empty: formatCurrency(trip.total_empty),
    load_price: formatCurrency(trip.load_price),
    load_total: formatCurrency(trip.load_total),
    discounts: formatCurrency(trip.discounts),
    meal: formatCurrency(trip.meal),
    allowance: formatCurrency(trip.allowance),
    driver_payment: formatCurrency(trip.driver_payment),
    trip_cost: formatCurrency(trip.trip_cost),
    trip_profit: formatCurrency(trip.trip_profit),
    fuel_empty_amount: formatDecimal(trip.fuel_empty_amount ? trip.fuel_empty_amount * 100 : 0),
    fuel_loaded_amount: formatDecimal(trip.fuel_loaded_amount ? trip.fuel_loaded_amount * 100: 0)
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Viagens', href: '/dashboard/viagens' },
          {
            label: 'Editar Viagem',
            href: `/dashboard/viagens/${id}/editar`,
            active: true,
          },
        ]}
      />
      <Form trip={formTrip} trucks={trucks} drivers={drivers} />
    </main>
  );
}
