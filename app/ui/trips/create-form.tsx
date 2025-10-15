'use client';

import { createTrip } from '@/app/lib/trips/trips.actions';
import { TripState } from '@/app/lib/trips/trips.definitions';
import { Button } from '@/app/ui/button';
import { FormInput } from '@/app/ui/components/form-input';
import {
  CalendarIcon,
  ChartBarIcon,
  PaintBrushIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';
import { FormSelect } from '../components/form-select';
import { DriverField } from '@/app/lib/drivers/drivers.definitions';
import { TruckField } from '@/app/lib/trucks/trucks.definitions';

export default function Form({ drivers, trucks }: Readonly<{ drivers: DriverField[], trucks: TruckField[] }>) {
  const initialState: TripState = { message: null, errors: {} };
  const driversOptions = drivers.map(driver => ({ label: driver.name, value: driver.id }));
  const trucksOptions = trucks.map(truck => ({ label: truck.license_plate, value: truck.id }));
  const [state, formAction] = useActionState(createTrip, initialState);

  return (
    <form action={formAction}>
      <div>
        <h2>Viagem Vazio</h2>
        <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
          <FormSelect
            id="driver_id"
            label='Motorista'
            name="driver_id"
            errors={state.errors?.driver_id}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
            options={driversOptions}
          />
          <FormSelect
            id="truck_id"
            label='Caminhão'
            name="truck_id"
            errors={state.errors?.truck_id}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
            options={trucksOptions}
          />
          <FormInput
            id="date_empty"
            label='Data'
            name="date_empty"
            placeholder="Data"
            errors={state.errors?.date_empty}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="origin"
            label='Origem'
            name="origin"
            placeholder="Origem"
            errors={state.errors?.origin}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="load_city"
            label='Destino'
            name="load_city"
            placeholder="Destino"
            errors={state.errors?.load_city}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="odometer_start"
            label='Km Inicial'
            name="odometer_start"
            placeholder="Km Inicial"
            errors={state.errors?.odometer_start}
            containerClassName="mb-4"
            icon={
              <PaintBrushIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="odometer_loaded_city"
            label='Km Final'
            name="odometer_loaded_city"
            placeholder="Km Final"
            errors={state.errors?.odometer_loaded_city}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="empty_distance"
            label='Km Rodado'
            name="empty_distance"
            placeholder="Km Rodado"
            errors={state.errors?.empty_distance}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_empty_amount"
            label='Diesel (lt)'
            name="fuel_empty_amount"
            placeholder="Diesel (lt)"
            errors={state.errors?.fuel_empty_amount}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_empty_total"
            label='Diesel (R$)'
            name="fuel_empty_total"
            placeholder="Diesel (R$)"
            errors={state.errors?.fuel_empty_total}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_empty_price"
            label='Litro (R$)'
            name="fuel_empty_price"
            placeholder="Litro (R$)"
            errors={state.errors?.fuel_empty_price}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_empty_media"
            label='Média l/km'
            name="fuel_empty_media"
            placeholder="Média l/km"
            errors={state.errors?.fuel_empty_media}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="toll_empty"
            label='Pedágio'
            name="toll_empty"
            placeholder="Pedágio"
            errors={state.errors?.toll_empty}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="total_empty"
            label='Custo Total (R$)'
            name="total_empty"
            placeholder="Custo Total (R$)"
            errors={state.errors?.total_empty}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
        </div>
        <h2>Viagem Carregado</h2>
        <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
          <FormInput
            id="date_loaded"
            label='Data'
            name="date_loaded"
            placeholder="Data"
            errors={state.errors?.date_loaded}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="load_city"
            label='Origem'
            name="load_city"
            placeholder="Origem"
            readOnly={true}
            errors={state.errors?.load_city}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="destination"
            label='Destino'
            name="destination"
            placeholder="Destino"
            errors={state.errors?.destination}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="note_number"
            label='Nota'
            name="note_number"
            placeholder="Nota"
            errors={state.errors?.note_number}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="load_total"
            label='Frete'
            name="load_total"
            placeholder="Frete"
            errors={state.errors?.load_total}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="load_weight"
            label='Peso'
            name="load_weight"
            placeholder="Peso"
            errors={state.errors?.load_weight}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="load_price"
            label='Valor'
            name="load_price"
            placeholder="Valor"
            errors={state.errors?.load_price}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="odometer_loaded_city"
            label='Km Inicial'
            name="odometer_loaded_city"
            placeholder="Km Inicial"
            readOnly={true}
            errors={state.errors?.odometer_loaded_city}
            containerClassName="mb-4"
            icon={
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="odometer_end"
            label='Km Final'
            name="odometer_end"
            placeholder="Km Final"
            errors={state.errors?.odometer_end}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="load_distance"
            label='Km Rodado'
            name="load_distance"
            placeholder="Km Rodado"
            errors={state.errors?.load_distance}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="discounts"
            label='Descontos'
            name="discounts"
            placeholder="Descontos"
            errors={state.errors?.discounts}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="meal"
            label='Refeição'
            name="meal"
            placeholder="Refeição"
            errors={state.errors?.meal}
            containerClassName="mb-4"
            icon={
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_loaded_amount"
            label='Diesel (lt)'
            name="fuel_loaded_amount"
            placeholder="Diesel (lt)"
            errors={state.errors?.fuel_loaded_amount}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_loaded_total"
            label='Diesel (R$)'
            name="fuel_loaded_total"
            placeholder="Diesel (R$)"
            errors={state.errors?.fuel_loaded_total}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_loaded_price"
            label='Litro (R$)'
            name="fuel_loaded_price"
            placeholder="Litro (R$)"
            errors={state.errors?.fuel_loaded_price}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="fuel_loaded_media"
            label='Média l/km'
            name="fuel_loaded_media"
            placeholder="Média l/km"
            errors={state.errors?.fuel_loaded_media}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="toll_loaded"
            label='Pedágio'
            name="toll_loaded"
            placeholder="Pedágio"
            errors={state.errors?.toll_loaded}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="driver_payment"
            label='Comissão'
            name="driver_payment"
            placeholder="Comissão"
            errors={state.errors?.driver_payment}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="trip_cost"
            label='Custo Total (R$)'
            name="trip_cost"
            placeholder="Custo Total (R$)"
            errors={state.errors?.trip_cost}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
          <FormInput
            id="trip_profit"
            label='Livre (R$)'
            name="trip_profit"
            placeholder="Livre (R$)"
            errors={state.errors?.trip_profit}
            containerClassName="mb-4"
            icon={
              <ChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            }
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/viagens"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  );
}
