import { ITripForm } from "@/lib/trips/trips.definitions";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FormDatePicker } from "@/components/form-date-picker";
import { FormInput } from "@/components/form-input";
import { FormInputMask } from "@/components/form-input-mask";
import { MaskType } from "@/components/interfaces";
import { LoadedTripFormProps, LOADED_FIELDS } from "@/lib/trips/forms";
import { removeNonNumericCaracteres } from "@/lib/utils";

export function LoadedTripForm({ control, setValue }: Readonly<LoadedTripFormProps>) {
  const [
    fuel_loaded_total,
    fuel_loaded_amount,
    toll_loaded,
    odometer_end,
    odometer_loaded_city,
    load_distance,
    total_empty,
    meal,
    discounts,
    load_total,
    load_weight,
    trip_cost,
    commission_percentage
  ] = useWatch<ITripForm>({
    control, name: [
      'fuel_loaded_total',
      'fuel_loaded_amount',
      'toll_loaded',
      'odometer_end',
      'odometer_loaded_city',
      'load_distance',
      'total_empty',
      'meal',
      'discounts',
      'load_total',
      'load_weight',
      'trip_cost',
      'commission_percentage'
    ]
  });

  useEffect(() => {
    const toll = Number(removeNonNumericCaracteres(toll_loaded)) / 100 || 0;
    const fuelTotal = Number(removeNonNumericCaracteres(fuel_loaded_total)) / 100 || 0;
    const nMeal = Number(removeNonNumericCaracteres(meal)) / 100 || 0;
    const nDiscounts = Number(removeNonNumericCaracteres(discounts)) / 100 || 0;
    const totalEmpty = Number(removeNonNumericCaracteres(total_empty)) / 100 || 0;
    const loadTotal = Number(removeNonNumericCaracteres(load_total)) / 100 || 0;

    const commissionPercentage = Number(commission_percentage || 0);
    const fuelAmount = Number(fuel_loaded_amount || 0);
    const distance = Number(load_distance || 0);
    const loadWeight = Number(load_weight || 0);

    const driverPayment = loadTotal * (commissionPercentage / 100);
    const total = toll + fuelTotal + nMeal + nDiscounts + totalEmpty + driverPayment;
    const media = fuelAmount > 0 ? distance / fuelAmount : 0;
    const fuelPrice = fuelAmount > 0 ? fuelTotal / fuelAmount : 0;
    const loadPrice = loadWeight ? loadTotal / loadWeight : 0;

    const tripCost = Number(removeNonNumericCaracteres(trip_cost)) / 100 || 0;

    const profit = loadTotal - tripCost;

    setValue('driver_payment', driverPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('load_price', loadPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('trip_profit', profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('trip_cost', total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('fuel_loaded_price', fuelPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('fuel_loaded_media', media.toFixed(2));
  }, [fuel_loaded_total, toll_loaded, load_distance, fuel_loaded_amount, load_total, trip_cost, load_weight, meal, discounts, total_empty, commission_percentage]);

  useEffect(() => {
    const start = Number(odometer_loaded_city || 0);
    const end = Number(odometer_end || 0)
    const distance = (start && end) ?
      end - start : 0;

    setValue('load_distance', distance.toString());
  }, [odometer_end, odometer_loaded_city]);

  return (
    <div>
      <h2>Viagem Carregado</h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
        {LOADED_FIELDS.map(({ fieldType, label, name, mask, ...rest }) => {
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
            default:
              return <FormInput key={key} {...commonProps} />
          }
        })}
      </div>
    </div>
  )
}