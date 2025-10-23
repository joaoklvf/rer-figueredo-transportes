'use client';

import { DriverField } from '@/app/lib/drivers/drivers.definitions';
import { useYupVaLidationResolver } from '@/app/lib/hooks/useYupValidationResolver';
import { createTrip } from '@/app/lib/trips/trips.actions';
import { EMPTY_FORM, FormSchema, TripForm } from '@/app/lib/trips/trips.definitions';
import { TruckField } from '@/app/lib/trucks/trucks.definitions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EmptyTripForm } from './empty-trip-form';
import { LoadedTripForm } from './loaded-trip-form';

export default function Form({ drivers, trucks }: Readonly<{ drivers: DriverField[], trucks: TruckField[] }>) {
  const resolver = useYupVaLidationResolver<TripForm>(FormSchema);

  const {
    control,
    setValue,
    handleSubmit
  } = useForm<TripForm>({
    defaultValues: EMPTY_FORM,
    resolver
  });

  return (
    <form onSubmit={handleSubmit(createTrip)}>
      <div>
        <EmptyTripForm
          drivers={drivers}
          trucks={trucks}
          setValue={setValue}
          control={control}
        />
        <LoadedTripForm
          control={control}
          setValue={setValue}
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
