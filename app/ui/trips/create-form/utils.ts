import { DriverField } from "@/app/lib/drivers/drivers.definitions";
import { TripForm } from "@/app/lib/trips/trips.definitions";
import { TruckField } from "@/app/lib/trucks/trucks.definitions";
import { TruckIcon } from "@heroicons/react/24/outline";
import { Control, UseFormSetValue } from "react-hook-form";
import { IconType, MaskType } from "../../components/interfaces";
import { ChangeEvent } from "react";

export interface LoadedTripFormProps {
  setValue: UseFormSetValue<TripForm>;
  control: Control<TripForm, string, TripForm>;
}

interface IOption {
  label: string,
  value: string | number
}

type FieldTypes = 'input' | 'date-picker' | 'input-mask' | 'select';
export type FieldMapper = {
  label: string;
  name: keyof TripForm;
  icon: IconType;
  fieldType?: FieldTypes;
  readOnly?: boolean;
  mask?: MaskType;
  options?: IOption[];
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}[];

export const LOADED_FIELDS: FieldMapper = [
  { label: 'Data', name: 'date_loaded', icon: TruckIcon, fieldType: 'date-picker' },
  { label: 'Origem', name: 'load_city', icon: TruckIcon, readOnly: true },
  { label: 'Destino', name: 'destination', icon: TruckIcon },
  { label: 'Nota', name: 'note_number', icon: TruckIcon },
  { label: 'Frete', name: 'load_total', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
  { label: 'Peso', name: 'load_weight', icon: TruckIcon },
  { label: 'Valor', name: 'load_price', icon: TruckIcon, readOnly: true },
  { label: 'Km Inicial', name: 'odometer_loaded_city', icon: TruckIcon },
  { label: 'Km Final', name: 'odometer_end', icon: TruckIcon },
  { label: 'Km Rodado', name: 'load_distance', icon: TruckIcon, readOnly: true },
  { label: 'Descontos', name: 'discounts', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
  { label: 'Refeição', name: 'meal', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
  { label: 'Diesel (lt)', name: 'fuel_loaded_amount', icon: TruckIcon },
  { label: 'Diesel (R$)', name: 'fuel_loaded_total', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
  { label: 'Litro (R$)', name: 'fuel_loaded_price', icon: TruckIcon, readOnly: true },
  { label: 'Média l/km', name: 'fuel_loaded_media', icon: TruckIcon, readOnly: true },
  { label: 'Pedágio', name: 'toll_loaded', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
  { label: 'Comissão', name: 'driver_payment', icon: TruckIcon, readOnly: true },
  { label: 'Custo Total (R$)', name: 'trip_cost', icon: TruckIcon, readOnly: true },
  { label: 'Livre (R$)', name: 'trip_profit', icon: TruckIcon, readOnly: true },
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
  const fields: FieldMapper = [
    { label: 'Motorista', name: 'driver_id', icon: TruckIcon, fieldType: 'select', options: driversOptions },
    { label: 'Caminhão', name: 'truck_id', icon: TruckIcon, fieldType: 'select', options: trucksOptions },
    { label: 'Data', name: 'date_empty', icon: TruckIcon, fieldType: 'date-picker' },
    { label: 'Origem', name: 'origin', icon: TruckIcon },
    { label: 'Destino', name: 'load_city', icon: TruckIcon },
    { label: 'Km Inicial', name: 'odometer_start', icon: TruckIcon },
    { label: 'Km Final', name: 'odometer_loaded_city', icon: TruckIcon },
    { label: 'Km Rodado', name: 'empty_distance', icon: TruckIcon, readOnly: true },
    { label: 'Diesel (lt)', name: 'fuel_empty_amount', icon: TruckIcon },
    { label: 'Diesel (R$)', name: 'fuel_empty_total', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
    { label: 'Litro (R$)', name: 'fuel_empty_price', icon: TruckIcon, readOnly: true },
    { label: 'Média l/km', name: 'fuel_empty_media', icon: TruckIcon, readOnly: true },
    { label: 'Pedágio', name: 'toll_empty', icon: TruckIcon, fieldType: 'input-mask', mask: 'currency' },
    { label: 'Custo Total (R$)', name: 'total_empty', icon: TruckIcon, readOnly: true },
  ];

  return fields;
}
