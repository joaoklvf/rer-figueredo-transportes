'use client';

import { createTruck } from '@/app/lib/trucks.actions';
import { TruckState } from '@/app/lib/trucks.definitions';
import { Button } from '@/app/ui/button';
import { FormInput } from '@/app/ui/components/form-input';
import {
  CalendarIcon,
  ChartBarIcon,
  PaintBrushIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';

export default function Form() {
  const initialState: TruckState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createTruck, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 mb-3">
        <FormInput
          id="license_plate"
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
          id="truck_brand"
          label='Marca'
          name="truck_brand"
          placeholder="Marca"
          errors={state.errors?.truck_brand}
          containerClassName="mb-4"
          maxLength={50}
          icon={
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="color"
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
          href="/dashboard/caminhoes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}
