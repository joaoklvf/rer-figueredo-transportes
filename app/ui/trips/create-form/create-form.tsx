'use client';

import { DriverField } from '@/app/lib/drivers/drivers.definitions';
import { createTrip } from '@/app/lib/trips/trips.actions';
import { TripForm, TripState } from '@/app/lib/trips/trips.definitions';
import { TruckField } from '@/app/lib/trucks/trucks.definitions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { ChangeEvent, useActionState, useState } from 'react';
import { removeNonNumericCaracteres } from '../../components/input-mask/utils';
import { EmptyTripForm } from './emtpy-trip-form';
import { LoadedTripForm } from './loaded-trip-form';

export default function Form({ drivers, trucks }: Readonly<{ drivers: DriverField[], trucks: TruckField[] }>) {
  const initialState: TripState = { message: null, errors: {} };

  const [state, formAction] = useActionState(createTrip, initialState);
  const [form, setForm] = useState<TripForm>({  driver_id: '', truck_id: '', origin: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: Number(removeNonNumericCaracteres(value)) / 100,
    }));
  };

  return (
    <form action={formAction}>
      <div>
        <EmptyTripForm
          drivers={drivers}
          form={form}
          handleChange={handleChange}
          state={state}
          trucks={trucks}
        />
        <LoadedTripForm
          form={form}
          handleChange={handleChange}
          state={state}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/viagens"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}
