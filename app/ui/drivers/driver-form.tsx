'use client';

import { createDriver, updateDriver } from '@/app/lib/drivers/drivers.actions';
import { IDriverForm, DriverState } from '@/app/lib/drivers/drivers.definitions';
import { Button } from '@/app/ui/button';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  PhoneIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';
import { FormInput } from '../components/form-input';
import { FormDatePicker } from '../components/form-date-picker';

export default function DriverForm({
  driver,
}: Readonly<{
  driver?: IDriverForm;
}>) {
  const initialState: DriverState = { message: null, errors: {} };
  const saveFunction = driver ?
    updateDriver.bind(null, driver.id) : createDriver;

  const [state, formAction] = useActionState(saveFunction, initialState);
  const parsedDate = driver?.birth_date ?
    new Date(driver.birth_date.setDate(driver.birth_date.getDate() + 1)) : null;

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-3 mb-3">
        <FormInput
          id="name"
          defaultValue={driver?.name}
          label='Nome'
          name="name"
          placeholder="Nome"
          errors={state.errors?.name}
          containerClassName="mb-4"
          maxLength={100}
          icon={
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="rg"
          defaultValue={driver?.rg}
          label='RG'
          name="rg"
          placeholder="RG"
          errors={state.errors?.rg}
          maxLength={12}
          containerClassName="mb-4"
          icon={
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="cpf"
          defaultValue={driver?.cpf}
          label='CPF'
          name="cpf"
          placeholder="CPF"
          errors={state.errors?.cpf}
          containerClassName="mb-4"
          maxLength={14}
          icon={
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormDatePicker
          id="birth_date"
          selected={parsedDate}
          label='Data de nascimento'
          name="birth_date"
          errors={state.errors?.birth_date}
          containerClassName="mb-4"
          icon={
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="phone_number"
          defaultValue={driver?.phone_number}
          label='Número de telefone'
          name="phone_number"
          placeholder="Número de telefone"
          errors={state.errors?.phone_number}
          containerClassName="mb-4"
          maxLength={15}
          icon={
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
        <FormInput
          id="commission_percentage"
          defaultValue={driver?.commission_percentage}
          label='Comissão'
          name="commission_percentage"
          placeholder="Comissão"
          errors={state.errors?.commission_percentage}
          containerClassName="mb-4"
          inputMode="decimal"
          type="number"
          step="0.5"
          icon={
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/motoristas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-phone_numbers hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Confirmar</Button>
      </div>
    </form>
  );
}
