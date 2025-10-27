import { useEffect } from "react";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormInput } from "@/components/form-input";
import { FormInputMask } from "@/components/form-input-mask";
import { FormSelect } from "@/components/form-select";
import { MaskType } from "@/components/interfaces";
import { getEmptyFields, IEmptyTripForm } from "@/lib/trips/forms";
import { useWatch } from "react-hook-form";
import { TripForm } from "@/lib/trips/trips.definitions";
import { removeNonNumericCaracteres } from "@/lib/utils";

export function EmptyTripForm({ drivers, trucks, setValue, control }: Readonly<IEmptyTripForm>) {
  const driversOptions = drivers.map(driver => ({ label: driver.name, value: driver.id }));
  const trucksOptions = trucks.map(truck => ({ label: truck.license_plate, value: truck.id }));

  const [
    fuel_empty_total,
    fuel_empty_amount,
    toll_empty,
    odometer_start,
    odometer_loaded_city,
    empty_distance,
    driver_id
  ] = useWatch<TripForm>({
    control, name: [
      'fuel_empty_total',
      'fuel_empty_amount',
      'toll_empty',
      'odometer_start',
      'odometer_loaded_city',
      'empty_distance',
      'driver_id'
    ]
  });

  useEffect(() => {
    const toll = Number(removeNonNumericCaracteres(toll_empty)) / 100 || 0;
    const fuelTotal = Number(removeNonNumericCaracteres(fuel_empty_total)) / 100 || 0;
    const fuelAmount = Number(fuel_empty_amount || 0);
    const distance = Number(empty_distance || 0);

    const total = toll + fuelTotal;
    const media = fuelAmount > 0 ? distance / fuelAmount : 0;
    const fuelPrice = fuelAmount > 0 ? fuelTotal / fuelAmount : 0;

    setValue('total_empty', total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('fuel_empty_price', fuelPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('fuel_empty_media', media.toFixed(2));
  }, [fuel_empty_total, toll_empty, empty_distance, fuel_empty_amount]);

  useEffect(() => {
    const start = Number(odometer_start || 0);
    const loaded = Number(odometer_loaded_city || 0)
    const distance = (start && loaded) ?
      loaded - start : 0;

    setValue('empty_distance', distance.toString());
  }, [odometer_start, odometer_loaded_city]);

  useEffect(() => {
    const commissionPercentage = drivers.find(x => x.id === driver_id)?.commission_percentage;
    if (commissionPercentage)
      setValue('commission_percentage', commissionPercentage.toString());

  }, [driver_id]);

  const fields = getEmptyFields({
    driversOptions,
    trucksOptions,
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
              return <FormSelect key={key} {...commonProps} options={options as []} />
            default:
              return <FormInput key={key} {...commonProps} />
          }
        })}
      </div>
    </div>
  )
}
