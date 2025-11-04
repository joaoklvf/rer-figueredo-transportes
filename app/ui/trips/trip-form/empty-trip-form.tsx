import { FormMapper } from "@/components/form-mapper";
import { getEmptyFields } from "@/lib/trips/forms";
import { IEmptyTripForm, ITripForm } from "@/lib/trips/trips.definitions";
import { convertDecimalStr } from "@/lib/utils";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

export function EmptyTripForm({ drivers, trucks, setValue, control, getValues }: Readonly<IEmptyTripForm>) {
  const driversOptions = drivers.map(driver => ({ label: driver.name, value: driver.id }));
  const trucksOptions = trucks.map(truck => ({ label: truck.license_plate, value: truck.id }));

  const [
    fuel_empty_total,
    fuel_empty_amount,
    toll_empty,
    odometer_start,
    odometer_loaded_city,
  ] = useWatch<ITripForm>({
    control,
    name: [
      'fuel_empty_total',
      'fuel_empty_amount',
      'toll_empty',
      'odometer_start',
      'odometer_loaded_city',
    ]
  });

  useEffect(() => {
    const toll = convertDecimalStr(toll_empty);
    const fuelTotal = convertDecimalStr(fuel_empty_total);

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
        <FormMapper
          control={control}
          fields={fields}
        />
      </div>
    </div>
  )
}
