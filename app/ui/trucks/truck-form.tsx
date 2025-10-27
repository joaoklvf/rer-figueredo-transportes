'use client';

import { useYupVaLidationResolver } from '@/lib/hooks/useYupValidationResolver';
import { TRUCK_FIELDS } from '@/lib/trucks/forms';
import { createTruck, updateTruck } from '@/lib/trucks/trucks.actions';
import { EMPTY_FORM, FormSchema, ITruckForm } from '@/lib/trucks/trucks.definitions';
import { Button } from '@/app/ui/button';
import { FormInput } from '@/components/form-input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function TruckForm({ truck }: Readonly<{ truck?: ITruckForm }>) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!truck?.id;
  const buttonLabel = isEditing ? 'Editar' : 'Cadastrar';

  const resolver = useYupVaLidationResolver<ITruckForm>(FormSchema);

  const {
    control,
    handleSubmit,
  } = useForm<ITruckForm>({
    defaultValues: truck ?? EMPTY_FORM,
    resolver
  });

  const onSubmit = (data: ITruckForm) => {
    setIsLoading(true);

    if (isEditing) {
      updateTruck(truck.id, data);
      return;
    }

    createTruck(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 mb-3">
        {TRUCK_FIELDS.map(({ fieldType, label, name, ...rest }) => {
          const commonProps = {
            id: name,
            label: label,
            name: name,
            placeholder: label,
            containerClassName: "mb-4",
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
        <Button type="submit" isLoading={isLoading}>{buttonLabel}</Button>
      </div>
    </form>
  );
}
