import DatePicker, { registerLocale } from "react-datepicker";
import { FormDatePickerProps } from "./interfaces";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";

registerLocale('pt-BR', ptBR);

export function FormDatePicker<T extends FieldValues>({ id, className, label, icon, containerClassName, selected, control, name }: Readonly<FormDatePickerProps<T>>) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(selected ?? null);
  const errorId = `${id}-error`;

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
              <>
                <DatePicker
                  {...field}
                  id={id}
                  className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${className}`}
                  aria-describedby={errorId}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  locale="pt-BR"
                  showMonthDropdown
                  showYearDropdown
                  selected={selectedDate}
                  onChange={(value) => {
                    field.onChange(value);
                    setSelectedDate(value);
                  }}
                />
                <div id={errorId} aria-live="polite" aria-atomic="true">
                  {error?.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {error.message}
                    </p>
                  )}
                </div>
              </>
            )}
          />
          {icon}
        </div>
      </div>
    </div>
  )
}
