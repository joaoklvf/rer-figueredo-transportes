import { Controller, FieldValues } from "react-hook-form";
import { FormSelectProps } from "./interfaces";
import { Icon } from "@/components/icon/icon";

export function FormSelect<T extends FieldValues>({ id, className, label, icon, containerClassName, options, control, name, ...rest }: Readonly<FormSelectProps<T>>) {
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
                <select
                  {...rest}
                  {...field}
                  id={id}
                  className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${className}`}
                  aria-describedby={errorId}
                >
                  <option>Selecione uma opção</option>
                  {options.map(({ label, value, key = value }) => (
                    <option key={key} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
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
          {icon &&
            <div className="pointer-events-none absolute left-0 top-[18px]">
              <Icon name={icon} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}
