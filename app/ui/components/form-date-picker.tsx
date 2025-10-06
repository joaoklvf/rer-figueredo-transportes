import DatePicker, { registerLocale } from "react-datepicker";
import { FormDatePickerProps } from "./interfaces";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale/pt-BR';
import { useState } from "react";

registerLocale('pt-BR', ptBR);

export function FormDatePicker({ id, className, errors, label, icon, containerClassName, selected }: Readonly<FormDatePickerProps>) {
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
          <DatePicker
            id={id}
            className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${className}`}
            aria-describedby={errorId}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            locale="pt-BR"
            showMonthDropdown
            showYearDropdown
            selected={selectedDate}
            onChange={setSelectedDate}
          />
          {icon}
        </div>
        <div id={errorId} aria-live="polite" aria-atomic="true">
          {errors?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
