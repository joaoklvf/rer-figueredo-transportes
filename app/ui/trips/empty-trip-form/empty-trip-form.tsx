import { FormMapper } from "@/components/form-mapper";
import { IEmptyTripForm } from "@/lib/trips/trips.definitions";
import { useEmptyTripForm } from "./hooks/useEmptyTripForm";

export function EmptyTripForm({ drivers, trucks, setValue, control, getValues }: Readonly<IEmptyTripForm>) {
  const driversOptions = drivers.map(driver => ({ label: driver.name, value: driver.id }));
  const trucksOptions = trucks.map(truck => ({ label: truck.license_plate, value: truck.id }));

  const { fields } = useEmptyTripForm({ control, setValue, getValues, driversOptions, trucksOptions });

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
