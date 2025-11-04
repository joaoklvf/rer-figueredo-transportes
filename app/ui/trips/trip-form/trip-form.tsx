'use client';

import { DriverField } from '@/lib/drivers/drivers.definitions';
import { useYupVaLidationResolver } from '@/lib/hooks/useYupValidationResolver';
import { createTrip, updateTrip } from '@/lib/trips/trips.actions';
import { EMPTY_FORM, FormSchema, ITripForm } from '@/lib/trips/trips.definitions';
import { TruckField } from '@/lib/trucks/trucks.definitions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EmptyTripForm } from '../empty-trip-form/empty-trip-form';
import { LoadedTripForm } from '../loaded-trip-form/loaded-trip-form';
import { useState } from 'react';

export default function TripForm({ trip, drivers, trucks }: Readonly<{ trip?: ITripForm, drivers: DriverField[], trucks: TruckField[] }>) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!trip?.id;
  const buttonLabel = isEditing ? 'Editar' : 'Cadastrar';

  const resolver = useYupVaLidationResolver<ITripForm>(FormSchema);

  const {
    control,
    setValue,
    handleSubmit,
    getValues
  } = useForm<ITripForm>({
    defaultValues: trip ?? EMPTY_FORM,
    resolver
  });

  const onSubmit = (data: ITripForm) => {
    setIsLoading(true);

    if (isEditing) {
      updateTrip(trip.id, data);
      return;
    }

    createTrip(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <EmptyTripForm
          drivers={drivers}
          trucks={trucks}
          setValue={setValue}
          getValues={getValues}
          control={control}
        />
        <LoadedTripForm
          control={control}
          setValue={setValue}
          getValues={getValues}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/viagens"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit" isLoading={isLoading}>{buttonLabel}</Button>
      </div>
    </form>
  );
}
