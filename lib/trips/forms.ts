import { DriverField } from "@/lib/drivers/drivers.definitions";
import { ITripForm } from "@/lib/trips/trips.definitions";
import { TruckField } from "@/lib/trucks/trucks.definitions";
import { Control, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { FieldMapper, IOption } from "../definitions";
import { ChangeEvent } from "react";
import { removeNonNumericCaracteres } from "../utils";

export interface LoadedTripFormProps {
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
  control: Control<ITripForm, string, ITripForm>;
}

interface IGetLoadedFields {
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}

const COMMISSION_PERCENTAGES: IOption[] = [
  { label: '12,00%', value: 12 },
  { label: '12,50%', value: 12.5 },
  { label: '13,00%', value: 13 },
  { label: '13,50%', value: 13.5 },
  { label: '14,00%', value: 14 },
  { label: '14,50%', value: 14.5 },
  { label: '15,00%', value: 15 },
]

const getAmount = (value: string) =>
  Number(value?.replaceAll('.', '').replace(',', '.')).toFixed(2);

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function getLoadedFields({ getValues, setValue }: IGetLoadedFields) {
  const onFuelPriceChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newPrice = Number(getAmount(removeNonNumericCaracteres(value || ''))) / 100;
    if (!newPrice) return;

    const fuelAmount = Number(getAmount(getValues('fuel_loaded_amount')) || '');
    setValue('fuel_loaded_total', formatCurrency(fuelAmount * newPrice));
  }

  const onFuelTotalChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newTotal = Number(getAmount(removeNonNumericCaracteres(value || '')));
    if (!newTotal) return;

    const fuelAmount = Number(getAmount(getValues('fuel_loaded_amount')) || '');
    console.log('fuelAmount', fuelAmount)

    if (fuelAmount)
      setValue('fuel_loaded_price', formatCurrency(newTotal / fuelAmount));
  }

  const fields: FieldMapper<ITripForm> = [
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
    { label: 'Gorgeta', name: 'meal', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Ajuda de custo', name: 'allowance', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Diesel (lt)', name: 'fuel_loaded_amount', icon: 'FunnelIcon', fieldType: 'input-mask', mask: 'decimal' },
    { label: 'Diesel (R$)', name: 'fuel_loaded_total', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency', onChange: onFuelTotalChange },
    { label: 'Litro (R$)', name: 'fuel_loaded_price', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency', onChange: onFuelPriceChange },
    { label: 'Média l/km', name: 'fuel_loaded_media', icon: 'TruckIcon', readOnly: true },
    { label: 'Pedágio', name: 'toll_loaded', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Comissão (%)', name: 'commission_percentage', icon: 'PercentBadgeIcon', fieldType: 'select', options: COMMISSION_PERCENTAGES },
    { label: 'Comissão (R$)', name: 'driver_payment', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
    { label: 'Custo Total (R$)', name: 'trip_cost', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
    { label: 'Livre (R$)', name: 'trip_profit', icon: 'CurrencyDollarIcon', readOnly: true },
  ];

  return fields;
}

export interface IEmptyTripForm {
  drivers: DriverField[];
  trucks: TruckField[];
  control: Control<ITripForm, string, ITripForm>;
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}

interface IGetEmptyFields {
  driversOptions: IOption[];
  trucksOptions: IOption[];
  setValue: UseFormSetValue<ITripForm>;
  getValues: UseFormGetValues<ITripForm>;
}

export function getEmptyFields({
  driversOptions,
  trucksOptions,
  getValues,
  setValue
}: IGetEmptyFields) {
  const onFuelPriceChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newPrice = Number(getAmount(removeNonNumericCaracteres(value || ''))) / 100;
    if (!newPrice) return;

    const fuelAmount = Number(getAmount(getValues('fuel_empty_amount') || ''));
    setValue('fuel_empty_total', formatCurrency(fuelAmount * newPrice));
  }

  const onFuelTotalChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newTotal = Number(getAmount(removeNonNumericCaracteres(value || '')));
    if (!newTotal) return;

    const fuelAmount = Number(getAmount(getValues('fuel_empty_amount') || ''));
    console.log('fuelAmount', fuelAmount)

    if (fuelAmount)
      setValue('fuel_empty_price', formatCurrency(newTotal / fuelAmount));
  }

  const fields: FieldMapper<ITripForm> = [
    { label: 'Motorista', name: 'driver_id', icon: 'UserIcon', fieldType: 'select', options: driversOptions },
    { label: 'Caminhão', name: 'truck_id', icon: 'TruckIcon', fieldType: 'select', options: trucksOptions },
    { label: 'Data', name: 'date_empty', icon: 'CalendarIcon', fieldType: 'date-picker' },
    { label: 'Origem', name: 'origin', icon: 'EnvelopeIcon' },
    { label: 'Destino', name: 'load_city', icon: 'EnvelopeOpenIcon' },
    { label: 'Km Inicial', name: 'odometer_start', icon: 'TruckIcon' },
    { label: 'Km Final', name: 'odometer_loaded_city', icon: 'TruckIcon' },
    { label: 'Km Rodado', name: 'empty_distance', icon: 'TruckIcon', readOnly: true },
    { label: 'Diesel (lt)', name: 'fuel_empty_amount', icon: 'FunnelIcon', fieldType: 'input-mask', mask: 'decimal' },
    { label: 'Diesel (R$)', name: 'fuel_empty_total', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency', onChange: onFuelTotalChange },
    { label: 'Litro (R$)', name: 'fuel_empty_price', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency', onChange: onFuelPriceChange },
    { label: 'Média l/km', name: 'fuel_empty_media', icon: 'TruckIcon', readOnly: true },
    { label: 'Pedágio', name: 'toll_empty', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Custo Total (R$)', name: 'total_empty', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
  ];

  return fields;
}
