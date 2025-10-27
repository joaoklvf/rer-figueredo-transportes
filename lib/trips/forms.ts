import { DriverField } from "@/lib/drivers/drivers.definitions";
import { TripForm } from "@/lib/trips/trips.definitions";
import { TruckField } from "@/lib/trucks/trucks.definitions";
import { Control, UseFormSetValue } from "react-hook-form";
import { FieldMapper, IOption } from "../definitions";

export interface LoadedTripFormProps {
  setValue: UseFormSetValue<TripForm>;
  control: Control<TripForm, string, TripForm>;
}

export const LOADED_FIELDS: FieldMapper<TripForm> = [
  { label: 'Data', name: 'date_loaded', icon: 'CalendarIcon', fieldType: 'date-picker' },
  { label: 'Origem', name: 'load_city', icon: 'EnvelopeIcon', readOnly: true },
  { label: 'Destino', name: 'destination', icon: 'EnvelopeOpenIcon' },
  { label: 'Nota', name: 'note_number', icon: 'DocumentIcon' },
  { label: 'Frete', name: 'load_total', icon: 'CurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
  { label: 'Peso', name: 'load_weight', icon: 'ScaleIcon' },
  { label: 'Valor', name: 'load_price', icon: 'CurrencyDollarIcon', readOnly: true },
  { label: 'Km Inicial', name: 'odometer_loaded_city', icon: 'TruckIcon' },
  { label: 'Km Final', name: 'odometer_end', icon: 'TruckIcon' },
  { label: 'Km Rodado', name: 'load_distance', icon: 'TruckIcon', readOnly: true },
  { label: 'Descontos', name: 'discounts', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
  { label: 'Refeição', name: 'meal', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
  { label: 'Diesel (lt)', name: 'fuel_loaded_amount', icon: 'FunnelIcon' },
  { label: 'Diesel (R$)', name: 'fuel_loaded_total', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
  { label: 'Litro (R$)', name: 'fuel_loaded_price', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
  { label: 'Média l/km', name: 'fuel_loaded_media', icon: 'TruckIcon', readOnly: true },
  { label: 'Pedágio', name: 'toll_loaded', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
  { label: 'Comissão', name: 'driver_payment', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
  { label: 'Custo Total (R$)', name: 'trip_cost', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
  { label: 'Livre (R$)', name: 'trip_profit', icon: 'CurrencyDollarIcon', readOnly: true },
];

export interface IEmptyTripForm {
  drivers: DriverField[];
  trucks: TruckField[];
  setValue: UseFormSetValue<TripForm>;
  control: Control<TripForm, string, TripForm>;
}

interface IGetEmptyFields {
  driversOptions: IOption[];
  trucksOptions: IOption[];
}

export function getEmptyFields({
  driversOptions,
  trucksOptions
}: IGetEmptyFields) {
  const fields: FieldMapper<TripForm> = [
    { label: 'Motorista', name: 'driver_id', icon: 'UserIcon', fieldType: 'select', options: driversOptions },
    { label: 'Caminhão', name: 'truck_id', icon: 'TruckIcon', fieldType: 'select', options: trucksOptions },
    { label: 'Data', name: 'date_empty', icon: 'CalendarIcon', fieldType: 'date-picker' },
    { label: 'Origem', name: 'origin', icon: 'EnvelopeIcon' },
    { label: 'Destino', name: 'load_city', icon: 'EnvelopeOpenIcon' },
    { label: 'Km Inicial', name: 'odometer_start', icon: 'TruckIcon' },
    { label: 'Km Final', name: 'odometer_loaded_city', icon: 'TruckIcon' },
    { label: 'Km Rodado', name: 'empty_distance', icon: 'TruckIcon', readOnly: true },
    { label: 'Diesel (lt)', name: 'fuel_empty_amount', icon: 'FunnelIcon' },
    { label: 'Diesel (R$)', name: 'fuel_empty_total', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Litro (R$)', name: 'fuel_empty_price', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
    { label: 'Média l/km', name: 'fuel_empty_media', icon: 'TruckIcon', readOnly: true },
    { label: 'Pedágio', name: 'toll_empty', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Custo Total (R$)', name: 'total_empty', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
  ];

  return fields;
}
