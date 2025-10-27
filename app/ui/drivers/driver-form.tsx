'use client';

import { createDriver, updateDriver } from '@/lib/drivers/drivers.actions';
import { EMPTY_FORM, FormSchema, IDriverForm, } from '@/lib/drivers/drivers.definitions';
import { DRIVER_FIELDS } from '@/lib/drivers/forms';
import { useYupVaLidationResolver } from '@/lib/hooks/useYupValidationResolver';
import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FormDatePicker } from '@/components/form-date-picker';
import { FormInput } from '@/components/form-input';
import { useState } from 'react';
import { FormInputMask } from '@/components/form-input-mask';
import { MaskType } from '@/components/interfaces';

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
        {DRIVER_FIELDS.map(({ fieldType, label, name, mask, ...rest }) => {
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
          if (fieldType === 'date-picker')
            return <FormDatePicker key={key} {...commonProps} />

          if (fieldType === 'input-mask')
            return <FormInputMask key={key} {...commonProps} mask={mask as MaskType} />

          return <FormInput key={key} {...commonProps} />
        })}
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
