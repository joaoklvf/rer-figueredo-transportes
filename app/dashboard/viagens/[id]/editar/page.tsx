import { fetchDrivers } from '@/lib/drivers/drivers.data';
import { fetchTripById } from '@/lib/trips/trips.data';
import { fetchTrucks } from '@/lib/trucks/trucks.data';
import { convertDatabaseDate, formatDecimalCurrency, formatDecimal, stringifyObject } from '@/lib/utils';
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
    fuel_empty_price: formatDecimalCurrency(trip.fuel_empty_price),
    fuel_empty_total: formatDecimalCurrency(trip.fuel_empty_total),
    fuel_loaded_price: formatDecimalCurrency(trip.fuel_loaded_price),
    fuel_loaded_total: formatDecimalCurrency(trip.fuel_loaded_total),
    toll_empty: formatDecimalCurrency(trip.toll_empty),
    toll_loaded: formatDecimalCurrency(trip.toll_loaded),
    total_empty: formatDecimalCurrency(trip.total_empty),
    load_price: formatDecimalCurrency(trip.load_price),
    load_total: formatDecimalCurrency(trip.load_total),
    discounts: formatDecimalCurrency(trip.discounts),
    meal: formatDecimalCurrency(trip.meal),
    allowance: formatDecimalCurrency(trip.allowance),
    driver_payment: formatDecimalCurrency(trip.driver_payment),
    trip_cost: formatDecimalCurrency(trip.trip_cost),
    trip_profit: formatDecimalCurrency(trip.trip_profit),
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
