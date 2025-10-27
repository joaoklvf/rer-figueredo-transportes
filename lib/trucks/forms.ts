import { FieldMapper } from "../definitions";
import { ITruckForm } from "./trucks.definitions";

export const TRUCK_FIELDS: FieldMapper<ITruckForm> = [
  { label: 'Placa', name: 'license_plate', icon: 'TruckIcon', maxLength: 8 },
  { label: 'Renavam', name: 'renavam', icon: 'TruckIcon', maxLength: 11 },
  { label: 'Chassi', name: 'chassi', icon: 'TruckIcon', maxLength: 17 },
  { label: 'Marca', name: 'truck_brand', icon: 'TruckIcon', maxLength: 50 },
  { label: 'Cor', name: 'color', icon: 'PaintBrushIcon', maxLength: 50 },
  { label: 'Ano', name: 'year', icon: 'CalendarIcon', maxLength: 4 },
  { label: 'Quilometragem', name: 'mileage', icon: 'ChartBarIcon', maxLength: 50 },
];
