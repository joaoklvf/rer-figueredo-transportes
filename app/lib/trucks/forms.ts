import { TruckIcon } from "@heroicons/react/24/outline";
import { Control, UseFormSetValue } from "react-hook-form";
import { FieldMapper } from "../definitions";
import { TruckForm } from "./trucks.definitions";

export interface LoadedTruckFormProps {
  setValue: UseFormSetValue<TruckForm>;
  control: Control<TruckForm, string, TruckForm>;
}

export const TRUCK_FIELDS: FieldMapper<TruckForm> = [
  { label: 'Placa', name: 'license_plate', icon: TruckIcon, maxLength: 8 },
  { label: 'Renavam', name: 'renavam', icon: TruckIcon, maxLength: 11 },
  { label: 'Chassi', name: 'chassi', icon: TruckIcon, maxLength: 17 },
  { label: 'Marca', name: 'truck_brand', icon: TruckIcon, maxLength: 50 },
  { label: 'Cor', name: 'color', icon: TruckIcon, maxLength: 50 },
  { label: 'Ano', name: 'year', icon: TruckIcon, maxLength: 4 },
  { label: 'Quilometragem', name: 'mileage', icon: TruckIcon, maxLength: 50 },
];
