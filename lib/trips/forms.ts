import { IGetEmptyFields, IGetLoadedFields, ITripForm } from "@/lib/trips/trips.definitions";
import { ChangeEvent } from "react";
import { FieldMapper, IOption } from "../definitions";
import { convertDecimalStr, formatCurrency } from "../utils";

const COMMISSION_PERCENTAGES: IOption[] = [
  { label: '13,00%', value: 13 },
  { label: '13,50%', value: 13.5 },
  { label: '14,00%', value: 14 },
  { label: '14,50%', value: 14.5 },
  { label: '15,00%', value: 15 },
]

export function getEmptyFields({
  driversOptions,
  trucksOptions,
  getValues,
  setValue
}: IGetEmptyFields) {
  const onFuelPriceChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newPrice = convertDecimalStr(value);
    if (!newPrice) return;

    const fuelAmount = convertDecimalStr(getValues('fuel_empty_amount')) ?? 0;
    setValue('fuel_empty_total', formatCurrency(fuelAmount * newPrice));
  }

  const onFuelTotalChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newTotal = convertDecimalStr(value);
    if (!newTotal) return;

    const fuelAmount = convertDecimalStr(getValues('fuel_empty_amount'));
    if (fuelAmount)
      setValue('fuel_empty_price', formatCurrency(newTotal / fuelAmount));
  }

  const onFuelAmountChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newAmount = convertDecimalStr(value);
    if (!newAmount) return;

    const fuelTotal = convertDecimalStr(getValues('fuel_empty_total'));
    if (fuelTotal)
      setValue('fuel_empty_price', formatCurrency(fuelTotal / newAmount));
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
    { label: 'Diesel (lt)', name: 'fuel_empty_amount', icon: 'FunnelIcon', fieldType: 'input-mask', mask: 'decimal', onChange: onFuelAmountChange },
    { label: 'Diesel (R$)', name: 'fuel_empty_total', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency', onChange: onFuelTotalChange },
    { label: 'Litro (R$)', name: 'fuel_empty_price', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency', onChange: onFuelPriceChange },
    { label: 'Média l/km', name: 'fuel_empty_media', icon: 'TruckIcon', readOnly: true },
    { label: 'Pedágio', name: 'toll_empty', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Custo Total (R$)', name: 'total_empty', icon: 'DocumentCurrencyDollarIcon', readOnly: true },
  ];

  return fields;
}

export function getLoadedFields({ getValues, setValue }: IGetLoadedFields) {
  const onFuelPriceChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newPrice = convertDecimalStr(value);
    if (!newPrice) return;

    const fuelAmount = convertDecimalStr(getValues('fuel_loaded_amount')) ?? 0;
    setValue('fuel_loaded_total', formatCurrency(fuelAmount * newPrice));
  }

  const onFuelTotalChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newTotal = convertDecimalStr(value);
    if (!newTotal) return;

    const fuelAmount = convertDecimalStr(getValues('fuel_loaded_amount'));
    if (fuelAmount)
      setValue('fuel_loaded_price', formatCurrency(newTotal / fuelAmount));
  }

  const onFuelAmountChange = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newAmount = convertDecimalStr(value);
    if (!newAmount) return;

    const fuelTotal = convertDecimalStr(getValues('fuel_loaded_total'));
    if (fuelTotal)
      setValue('fuel_loaded_price', formatCurrency(fuelTotal / newAmount));
  }

  const fields: FieldMapper<ITripForm> = [
    { label: 'Data', name: 'date_loaded', icon: 'CalendarIcon', fieldType: 'date-picker' },
    { label: 'Origem', name: 'load_city', icon: 'EnvelopeIcon', readOnly: true },
    { label: 'Destino', name: 'destination', icon: 'EnvelopeOpenIcon' },
    { label: 'Nota', name: 'note_number', icon: 'DocumentIcon' },
    { label: 'Peso', name: 'load_weight', icon: 'ScaleIcon' },
    { label: 'Valor', name: 'load_price', icon: 'CurrencyDollarIcon', readOnly: true },
    { label: 'Km Inicial', name: 'odometer_loaded_city', icon: 'TruckIcon', readOnly: true },
    { label: 'Km Final', name: 'odometer_end', icon: 'TruckIcon' },
    { label: 'Km Rodado', name: 'load_distance', icon: 'TruckIcon', readOnly: true },
    { label: 'Frete', name: 'load_total', icon: 'CurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Descontos', name: 'discounts', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Gorgeta', name: 'meal', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Ajuda de custo', name: 'allowance', icon: 'DocumentCurrencyDollarIcon', fieldType: 'input-mask', mask: 'currency' },
    { label: 'Diesel (lt)', name: 'fuel_loaded_amount', icon: 'FunnelIcon', fieldType: 'input-mask', mask: 'decimal', onChange: onFuelAmountChange },
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
