import { FormMapper } from "@/components/form-mapper";
import { LoadedTripFormProps } from "@/lib/trips/trips.definitions";
import { useLoadedTripForm } from "./hooks/useLoadedTripForm";

export function LoadedTripForm({ control, setValue, getValues }: Readonly<LoadedTripFormProps>) {
  const { fields } = useLoadedTripForm({ control, getValues, setValue });

  return (
    <div>
      <h2>Viagem Carregado</h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
        <FormMapper
          control={control}
          fields={fields}
        />
      </div>
    </div>
  )
}