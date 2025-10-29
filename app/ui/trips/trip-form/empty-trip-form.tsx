import { useEffect } from "react";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormInput } from "@/components/form-input";
import { FormInputMask } from "@/components/form-input-mask";
import { FormSelect } from "@/components/form-select";
import { MaskType } from "@/components/interfaces";
import { getEmptyFields, IEmptyTripForm } from "@/lib/trips/forms";
import { useWatch } from "react-hook-form";
import { ITripForm } from "@/lib/trips/trips.definitions";
import { removeNonNumericCaracteres } from "@/lib/utils";
import { IOption } from "@/lib/definitions";

export function EmptyTripForm({ drivers, trucks, setValue, control, getValues }: Readonly<IEmptyTripForm>) {
  const driversOptions = drivers.map(driver => ({ label: driver.name, value: driver.id }));
  const trucksOptions = trucks.map(truck => ({ label: truck.license_plate, value: truck.id }));

  const [
    fuel_empty_total,
    fuel_empty_amount,
    toll_empty,
    odometer_start,
    odometer_loaded_city,
    driver_id
  ] = useWatch<ITripForm>({
    control,
    name: [
      'fuel_empty_total',
      'fuel_empty_amount',
      'toll_empty',
      'odometer_start',
      'odometer_loaded_city',
      'driver_id'
    ]
  });

  useEffect(() => {
    const toll = Number(removeNonNumericCaracteres(toll_empty)) / 100 || 0;
    const fuelTotal = Number(removeNonNumericCaracteres(fuel_empty_total)) / 100 || 0;

    const total = toll + fuelTotal;
    setValue('total_empty', total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  }, [fuel_empty_total, toll_empty]);

  useEffect(() => {
    const start = Number(odometer_start || 0);
    const loaded = Number(odometer_loaded_city || 0)
    const distance = (start && loaded) ?
      loaded - start : 0;

    const fuelAmount = Number(fuel_empty_amount?.replace(',', '.') || 0);
    const media = fuelAmount > 0 ? distance / fuelAmount : 0;

    setValue('fuel_empty_media', media.toFixed(2));
    setValue('empty_distance', distance.toString());
  }, [odometer_start, odometer_loaded_city, fuel_empty_amount]);

  useEffect(() => {
    const commissionPercentage = drivers.find(x => x.id === driver_id)?.commission_percentage;
    console.log('commissionPercentage', commissionPercentage)
    if (commissionPercentage)
      setValue('commission_percentage', commissionPercentage.toString());

  }, [driver_id]);

  const fields = getEmptyFields({
    driversOptions,
    trucksOptions,
    getValues,
    setValue
  });

  return (
    <div>
      <h2>Viagem Vazio</h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
        {fields.map(({ fieldType, label, name, mask, options, ...rest }) => {
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
          switch (fieldType) {
            case 'date-picker':
              return <FormDatePicker key={key} {...commonProps} />
            case 'input-mask':
              return <FormInputMask key={key} {...commonProps} mask={mask as MaskType} />
            case 'select':
              return <FormSelect key={key} {...commonProps} options={options as IOption[]} />
            default:
              return <FormInput key={key} {...commonProps} />
          }
        })}
      </div>
    </div>
  )
}
