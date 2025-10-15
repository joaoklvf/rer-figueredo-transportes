import { FormSelectProps } from "./interfaces";

export function FormSelect({ id, className, errors, label, icon, containerClassName, options, ...rest }: Readonly<FormSelectProps>) {
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
          <select
            {...rest}
            id={id}
            className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${className}`}
            aria-describedby={errorId}
          >
            {options.map(({ label, value, key = value }) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </select>
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
