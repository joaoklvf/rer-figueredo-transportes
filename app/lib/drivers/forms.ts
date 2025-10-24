import { TruckIcon } from "@heroicons/react/24/outline";
import { FieldMapper } from "../definitions";
import { IDriverForm } from "./drivers.definitions";

export const DRIVER_FIELDS: FieldMapper<IDriverForm> = [
  { label: 'Nome', name: 'name', icon: TruckIcon, maxLength: 1000 },
  { label: 'RG', name: 'rg', icon: TruckIcon, maxLength: 12 },
  { label: 'CPF', name: 'cpf', icon: TruckIcon, maxLength: 14 },
  { label: 'Data de nascimento', name: 'birth_date', icon: TruckIcon, fieldType: 'date-picker' },
  { label: 'Número de telefone', name: 'phone_number', icon: TruckIcon, maxLength: 15 },
  { label: 'Comissão', name: 'commission_percentage', icon: TruckIcon, type: "number", step: "0.5" },
];
