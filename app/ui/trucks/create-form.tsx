'use client';

import { useYupVaLidationResolver } from '@/app/lib/hooks/useYupValidationResolver';
import { TRUCK_FIELDS } from '@/app/lib/trucks/forms';
import { createTruck, updateTruck } from '@/app/lib/trucks/trucks.actions';
import { EMPTY_FORM, FormSchema, TruckForm } from '@/app/lib/trucks/trucks.definitions';
import { Button } from '@/app/ui/button';
import { FormInput } from '@/app/ui/components/form-input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function Form({ truck }: Readonly<{ truck?: TruckForm }>) {
  const isEditing = !!truck?.id;
  const buttonLabel = isEditing ? 'Editar' : 'Cadastrar';

  const resolver = useYupVaLidationResolver<TruckForm>(FormSchema);
  const submitAction = isEditing ?
    (data: TruckForm) => updateTruck(truck.id, data) : createTruck;

  const {
    control,
    handleSubmit,
  } = useForm<TruckForm>({
    defaultValues: truck ?? EMPTY_FORM,
    resolver
  });

  return (
    <form onSubmit={handleSubmit(submitAction)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 mb-3">
        {TRUCK_FIELDS.map(({ fieldType, icon: Icon, label, name, ...rest }) => {
          const commonProps = {
            id: name,
            label: label,
            name: name,
            placeholder: label,
            containerClassName: "mb-4",
            icon: <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
            control,
            ...rest
          };
          const key = `${label}${name}${fieldType}`;
          return (
            <FormInput key={key} {...commonProps} />
          );
        })}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/caminhoes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">{buttonLabel}</Button>
      </div>
    </form>
  );
}
