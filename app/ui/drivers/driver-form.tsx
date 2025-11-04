'use client';

import { Button } from '@/app/ui/button';
import { FormMapper } from '@/components/form-mapper';
import { createDriver, updateDriver } from '@/lib/drivers/drivers.actions';
import { EMPTY_FORM, FormSchema, IDriverForm, } from '@/lib/drivers/drivers.definitions';
import { DRIVER_FIELDS } from '@/lib/drivers/forms';
import { useYupVaLidationResolver } from '@/lib/hooks/useYupValidationResolver';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DriverForm({
  driver,
}: Readonly<{
  driver?: IDriverForm;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!driver?.id;
  const buttonLabel = isEditing ? 'Editar' : 'Cadastrar';

  const resolver = useYupVaLidationResolver<IDriverForm>(FormSchema);

  const {
    control,
    handleSubmit,
  } = useForm<IDriverForm>({
    defaultValues: driver ?? EMPTY_FORM,
    resolver
  });

  const onSubmit = (data: IDriverForm) => {
    setIsLoading(true);

    if (isEditing) {
      updateDriver(driver.id, data);
      return;
    }

    createDriver(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-3 mb-3">
        <FormMapper
          control={control}
          fields={DRIVER_FIELDS}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/motoristas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-phone_numbers hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit" isLoading={isLoading}>{buttonLabel}</Button>
      </div>
    </form>
  );
}
