'use client';

import { updateTrip } from '@/app/lib/trips/trips.actions';
import { TripForm, TripState } from '@/app/lib/trips/trips.definitions';
import { Button } from '@/app/ui/button';
import {
  CalendarIcon,
  ChartBarIcon,
  PaintBrushIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';
import { FormInput } from '../components/form-input';

export default function EditTripForm({
  trip,
}: Readonly<{
  trip: TripForm;
}>) {
  const initialState: TripState = { message: null, errors: {} };
  const updateTripWithId = updateTrip.bind(null, trip.id);
  const [state, formAction] = useActionState(updateTripWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 mb-3">
        <FormInput
          id="license_plate"
          defaultValue={trip.license_plate}
          label='Placa'
          name="license_plate"
          placeholder="Placa"
          errors={state.errors?.license_plate}
          containerClassName="mb-4"
          maxLength={8}
          icon={
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="renavam"
          defaultValue={trip.renavam}
          label='Renavam'
          name="renavam"
          placeholder="Renavam"
          errors={state.errors?.renavam}
          maxLength={11}
          containerClassName="mb-4"
          icon={
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="chassi"
          defaultValue={trip.chassi}
          label='Chassi'
          name="chassi"
          placeholder="Chassi"
          errors={state.errors?.chassi}
          containerClassName="mb-4"
          maxLength={17}
          icon={
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="trip_brand"
          defaultValue={trip.trip_brand}
          label='Marca'
          name="trip_brand"
          placeholder="Marca"
          errors={state.errors?.trip_brand}
          containerClassName="mb-4"
          maxLength={50}
          icon={
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="color"
          defaultValue={trip.color}
          label='Cor'
          name="color"
          placeholder="Cor"
          errors={state.errors?.color}
          containerClassName="mb-4"
          maxLength={50}
          icon={
            <PaintBrushIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="year"
          defaultValue={trip.year}
          label='Ano'
          name="year"
          placeholder="Ano"
          errors={state.errors?.year}
          containerClassName="mb-4"
          maxLength={4}
          icon={
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="mileage"
          defaultValue={trip.mileage}
          label='Quilometragem'
          name="mileage"
          placeholder="Quilometragem"
          errors={state.errors?.mileage}
          containerClassName="mb-4"
          maxLength={50}
          icon={
            <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/viagens"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Viagem</Button>
      </div>
    </form>
  );
}
