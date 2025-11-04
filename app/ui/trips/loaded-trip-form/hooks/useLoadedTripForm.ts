import { ITripForm } from "@/lib/trips/trips.definitions";
import { getLoadedFields } from "@/lib/trips/trips.forms";
import { convertDecimalStr } from "@/lib/utils";
import { useEffect } from "react";
import { Control, UseFormGetValues, UseFormSetValue, useWatch } from "react-hook-form";

export function useLoadedTripForm({ control, setValue, getValues }: {
  control: Control<ITripForm, string, ITripForm>;
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}) {
  const [
    fuel_loaded_total,
    fuel_loaded_amount,
    toll_loaded,
    odometer_end,
    odometer_loaded_city,
    total_empty,
    meal,
    discounts,
    load_total,
    load_weight,
    commission_percentage,
    toll_empty,
    allowance
  ] = useWatch<ITripForm>({
    control,
    name: [
      'fuel_loaded_total',
      'fuel_loaded_amount',
      'toll_loaded',
      'odometer_end',
      'odometer_loaded_city',
      'total_empty',
      'meal',
      'discounts',
      'load_total',
      'load_weight',
      'commission_percentage',
      'toll_empty',
      'allowance'
    ]
  });

  useEffect(() => {
    const tollLoaded = convertDecimalStr(toll_loaded);
    const tollEmpty = convertDecimalStr(toll_empty);

    const fuelTotal = convertDecimalStr(fuel_loaded_total);
    const nMeal = convertDecimalStr(meal);
    const nDiscounts = convertDecimalStr(discounts);
    const totalEmpty = convertDecimalStr(total_empty);
    const nAllowance = convertDecimalStr(allowance);
    const loadTotal = convertDecimalStr(load_total);

    const commissionPercentage = Number(commission_percentage || 0);
    const loadWeight = convertDecimalStr(load_weight);

    const driverPayment = (loadTotal - tollEmpty - tollLoaded) * ((commissionPercentage || 0) / 100);
    const total = tollLoaded + fuelTotal + nMeal + nDiscounts + totalEmpty + driverPayment + nAllowance;
    const loadPrice = loadWeight ? loadTotal / loadWeight : 0;

    const profit = loadTotal - total;

    setValue('driver_payment', driverPayment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('load_price', loadPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('trip_profit', profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    setValue('trip_cost', total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  }, [fuel_loaded_total, toll_loaded, load_total, load_weight, meal, discounts, total_empty, commission_percentage, toll_empty, allowance]);

  useEffect(() => {
    const start = Number(odometer_loaded_city || 0);
    const end = Number(odometer_end || 0)
    const distance = (start && end) ?
      end - start : 0;

    const fuelAmount = Number(fuel_loaded_amount?.replace(',', '.') || 0);
    const media = fuelAmount > 0 ? distance / fuelAmount : 0;

    setValue('fuel_loaded_media', media.toFixed(2));
    setValue('load_distance', distance.toString());
  }, [odometer_end, odometer_loaded_city, fuel_loaded_amount]);

  const fields = getLoadedFields({
    getValues,
    setValue,
  });

  return {
    fields
  }
}
