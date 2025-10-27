'use client';

import { DriverField } from '@/lib/drivers/drivers.definitions';
import { useYupVaLidationResolver } from '@/lib/hooks/useYupValidationResolver';
import { createTrip, updateTrip } from '@/lib/trips/trips.actions';
import { EMPTY_FORM, FormSchema, ITripForm } from '@/lib/trips/trips.definitions';
import { TruckField } from '@/lib/trucks/trucks.definitions';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EmptyTripForm } from './empty-trip-form';
import { LoadedTripForm } from './loaded-trip-form';

export default function TripForm({ trip, drivers, trucks }: Readonly<{ trip?: ITripForm, drivers: DriverField[], trucks: TruckField[] }>) {
  const isEditing = !!trip?.id;
  const buttonLabel = isEditing ? 'Editar' : 'Cadastrar';

  const resolver = useYupVaLidationResolver<ITripForm>(FormSchema);
  const submitAction = isEditing ?
    (data: ITripForm) => updateTrip(trip.id, data) : createTrip;

  const {
    control,
    setValue,
    handleSubmit,
  } = useForm<ITripForm>({
    defaultValues: trip ?? EMPTY_FORM,
    resolver
  });

  return (
    <form onSubmit={handleSubmit(submitAction)}>
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
        <Button type="submit">{buttonLabel}</Button>
      </div>
    </form>
  );
}
