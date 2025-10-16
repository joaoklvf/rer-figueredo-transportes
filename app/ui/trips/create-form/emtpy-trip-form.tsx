import { useMemo } from "react";
import { FormDatePicker } from "../../components/form-date-picker";
import { FormInput } from "../../components/form-input";
import { FormInputMask } from "../../components/form-input-mask";
import { FormSelect } from "../../components/form-select";
import { MaskType } from "../../components/interfaces";
import { getEmptyFields, IEmptyTripForm } from "./utils";

export function EmptyTripForm({ handleChange, drivers, trucks, state, form }: Readonly<IEmptyTripForm>) {
  const driversOptions = drivers.map(driver => ({ label: driver.name, value: driver.id }));
  const trucksOptions = trucks.map(truck => ({ label: truck.license_plate, value: truck.id }));

  const totalEmpty = useMemo(() => {
    const toll = Number(form.toll_empty) || 0;
    const fuel = Number(form.fuel_empty_total) || 0;
    const total = toll + fuel;
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }, [form.toll_empty, form.fuel_empty_total]);

  const fields = getEmptyFields(driversOptions, trucksOptions, totalEmpty);

  return (
    <div>
      <h2>Viagem Vazio</h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
        {fields.map(({ fieldType, icon: Icon, label, name, readOnly, mask, options }) => {
          const commonProps = {
            id: name,
            onChange: handleChange,
            label: label,
            name: name,
            placeholder: label,
            errors: state.errors ? state.errors[name] : undefined,
            containerClassName: "mb-4",
            icon: <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
            value: form[name],
            readOnly
          };
          const key = `${label}${name}${fieldType}`;
          switch (fieldType) {
            case 'input':
              return <FormInput key={key} {...commonProps} />
            case 'date-picker':
              return <FormDatePicker key={key} {...commonProps} />
            case 'input-mask':
              return <FormInputMask key={key} {...commonProps} mask={mask as MaskType} />
            case 'select':
              return <FormSelect key={key} {...commonProps} options={options as []} />
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
