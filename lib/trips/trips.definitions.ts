import * as yup from 'yup';
import { DEFAULT_STRING_REQUIRED, DEFAULT_STRING_NULLABLE, DEFAULT_NUMBER_NULLABLE, DEFAULT_NUMBER, IOption } from "../definitions";
import { Control, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { DriverField } from '../drivers/drivers.definitions';
import { TruckField } from '../trucks/trucks.definitions';

export type Trip = {
  id: string;
  truck_id: string;
  driver_id: string;
  origin: string;
  load_city: string | null;
  destination: string | null;
  odometer_start: number | null;
  odometer_loaded_city: number | null;
  odometer_end: number | null;
  empty_distance: number | null;
  load_distance: number | null;
  fuel_empty_amount: number | null;
  fuel_empty_media: number | null;
  fuel_empty_price: number | null;
  fuel_empty_total: number | null;
  fuel_loaded_amount: number | null;
  fuel_loaded_media: number | null;
  fuel_loaded_price: number | null;
  fuel_loaded_total: number | null;
  toll_empty: number | null;
  toll_loaded: number | null;
  total_empty: number | null;
  date_empty: string | null; // ISO date (YYYY-MM-DD)
  date_loaded: string | null; // ISO date (YYYY-MM-DD)
  note_number: string | null;
  load_weight: number | null;
  load_price: number | null;
  load_total: number | null;
  discounts: number | null;
  meal: number | null;
  allowance: number | null;
  driver_payment: number | null;
  trip_cost: number | null;
  trip_profit: number | null;
  commission_percentage: number | null;
};

export type TripsTable = {
  id: string;
  driver_name: string;
  origin: string;
  destination: string;
  date_empty?: string | null;
  date_loaded?: string | null;
};

export const EMPTY_FORM = {
  id: '',
  date_empty: '',
  date_loaded: '',
  destination: '',
  discounts: '',
  driver_id: '',
  driver_payment: '',
  empty_distance: '',
  fuel_empty_amount: '',
  fuel_empty_media: '',
  fuel_empty_price: '',
  fuel_empty_total: '',
  fuel_loaded_amount: '',
  fuel_loaded_media: '',
  fuel_loaded_price: '',
  fuel_loaded_total: '',
  load_city: '',
  load_distance: '',
  load_price: '',
  load_total: '',
  load_weight: '',
  meal: '',
  allowance: '',
  note_number: '',
  odometer_end: '',
  odometer_loaded_city: '',
  odometer_start: '',
  origin: '',
  toll_empty: '',
  toll_loaded: '',
  total_empty: '',
  trip_cost: '',
  trip_profit: '',
  truck_id: '',
  commission_percentage: '13.5'
};

export type ITripForm = typeof EMPTY_FORM;

export const FormSchema = yup.object({
  id: yup.string().optional(),
  truck_id: DEFAULT_STRING_REQUIRED,
  driver_id: DEFAULT_STRING_REQUIRED,
  origin: DEFAULT_STRING_REQUIRED,
  load_city: DEFAULT_STRING_NULLABLE,
  destination: DEFAULT_STRING_NULLABLE,
  odometer_start: DEFAULT_NUMBER_NULLABLE,
  odometer_loaded_city: DEFAULT_NUMBER_NULLABLE,
  odometer_end: DEFAULT_NUMBER_NULLABLE,
  empty_distance: DEFAULT_NUMBER_NULLABLE,
  load_distance: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_amount: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_media: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_price: DEFAULT_NUMBER_NULLABLE,
  fuel_empty_total: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_amount: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_media: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_price: DEFAULT_NUMBER_NULLABLE,
  fuel_loaded_total: DEFAULT_NUMBER_NULLABLE,
  toll_empty: DEFAULT_NUMBER_NULLABLE,
  toll_loaded: DEFAULT_NUMBER_NULLABLE,
  total_empty: DEFAULT_NUMBER_NULLABLE,
  date_empty: yup.string().trim().optional().nullable(),
  date_loaded: yup.string().trim().optional().nullable(),
  note_number: DEFAULT_STRING_NULLABLE,
  load_weight: DEFAULT_NUMBER_NULLABLE,
  load_price: DEFAULT_NUMBER_NULLABLE,
  load_total: DEFAULT_NUMBER_NULLABLE,
  discounts: DEFAULT_NUMBER_NULLABLE,
  meal: DEFAULT_NUMBER_NULLABLE,
  allowance: DEFAULT_NUMBER_NULLABLE,
  driver_payment: DEFAULT_NUMBER_NULLABLE,
  trip_cost: DEFAULT_NUMBER_NULLABLE,
  trip_profit: DEFAULT_NUMBER_NULLABLE,
  commission_percentage: DEFAULT_NUMBER,
});

export interface IEmptyTripForm {
  drivers: DriverField[];
  trucks: TruckField[];
  control: Control<ITripForm, string, ITripForm>;
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}

export interface IGetEmptyFields {
  driversOptions: IOption[];
  trucksOptions: IOption[];
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}

export interface LoadedTripFormProps {
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
  control: Control<ITripForm, string, ITripForm>;
}

export interface IGetLoadedFields {
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}
