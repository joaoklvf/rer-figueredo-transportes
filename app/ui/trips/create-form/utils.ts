import { DriverField } from "@/app/lib/drivers/drivers.definitions";
import { TripForm, TripState } from "@/app/lib/trips/trips.definitions";
import { TruckField } from "@/app/lib/trucks/trucks.definitions";
import { TruckIcon } from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";
import { IconType, MaskType } from "../../components/interfaces";

export interface LoadedTripFormProps {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  state: TripState;
  form: TripForm;
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
  fieldType: FieldTypes;
  readOnly?: boolean;
  mask?: MaskType;
  options?: IOption[];
  value?: string;
}[];

export const LOADED_FIELDS: FieldMapper = [
  { label: 'Data', name: 'date_loaded', icon: TruckIcon, fieldType: 'date-picker' },
  { label: 'Origem', name: 'load_city', icon: TruckIcon, fieldType: 'input' },
  { label: 'Destino', name: 'destination', icon: TruckIcon, fieldType: 'input' },
  { label: 'Nota', name: 'note_number', icon: TruckIcon, fieldType: 'input' },
  { label: 'Frete', name: 'load_total', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Peso', name: 'load_weight', icon: TruckIcon, fieldType: 'input' },
  { label: 'Valor', name: 'load_price', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Km Inicial', name: 'odometer_loaded_city', icon: TruckIcon, fieldType: 'input' },
  { label: 'Km Final', name: 'odometer_end', icon: TruckIcon, fieldType: 'input' },
  { label: 'Km Rodado', name: 'load_distance', icon: TruckIcon, fieldType: 'input' },
  { label: 'Descontos', name: 'discounts', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Refeição', name: 'meal', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Diesel (lt)', name: 'fuel_loaded_amount', icon: TruckIcon, fieldType: 'input' },
  { label: 'Diesel (R$)', name: 'fuel_loaded_total', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Litro (R$)', name: 'fuel_loaded_price', icon: TruckIcon, fieldType: 'input' },
  { label: 'Média l/km', name: 'fuel_loaded_media', icon: TruckIcon, fieldType: 'input' },
  { label: 'Pedágio', name: 'toll_loaded', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Comissão', name: 'driver_payment', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Custo Total (R$)', name: 'trip_cost', icon: TruckIcon, fieldType: 'input-mask' },
  { label: 'Livre (R$)', name: 'trip_profit', icon: TruckIcon, fieldType: 'input-mask' },
];

export interface IEmptyTripForm {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  drivers: DriverField[];
  trucks: TruckField[];
  state: TripState;
  form: TripForm;
}

export function getEmptyFields(driversOptions: IOption[], trucksOptions: IOption[], totalEmpty: string) {
  const fields: FieldMapper = [
    { label: 'Motorista', name: 'date_loaded', icon: TruckIcon, fieldType: 'select', options: driversOptions },
    { label: 'Caminhão', name: 'load_city', icon: TruckIcon, fieldType: 'select', options: trucksOptions },
    { label: 'Data', name: 'destination', icon: TruckIcon, fieldType: 'input' },
    { label: 'Origem', name: 'note_number', icon: TruckIcon, fieldType: 'input' },
    { label: 'Destino', name: 'load_total', icon: TruckIcon, fieldType: 'input-mask' },
    { label: 'Km Inicial', name: 'odometer_start', icon: TruckIcon, fieldType: 'input' },
    { label: 'Km Final', name: 'odometer_loaded_city', icon: TruckIcon, fieldType: 'input' },
    { label: 'Km Rodado', name: 'empty_distance', icon: TruckIcon, fieldType: 'input' },
    { label: 'Diesel (lt)', name: 'fuel_empty_amount', icon: TruckIcon, fieldType: 'input' },
    { label: 'Diesel (R$)', name: 'fuel_empty_total', icon: TruckIcon, fieldType: 'input-mask' },
    { label: 'Litro (R$)', name: 'fuel_empty_price', icon: TruckIcon, fieldType: 'input' },
    { label: 'Média l/km', name: 'fuel_empty_media', icon: TruckIcon, fieldType: 'input' },
    { label: 'Pedágio', name: 'toll_empty', icon: TruckIcon, fieldType: 'input-mask' },
    { label: 'Custo Total (R$)', name: 'trip_cost', icon: TruckIcon, fieldType: 'input-mask', value: totalEmpty },
  ];

  return fields;
}
