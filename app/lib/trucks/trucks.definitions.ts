import * as yup from 'yup';
import { DEFAULT_STRING_REQUIRED, DEFAULT_STRING_NULLABLE } from "../definitions";

export type Truck = {
  id: string;
  license_plate: string;
  renavam: string | null;
  chassi: string | null;
  truck_brand: string;
  color: string | null;
  year: string | null;
  mileage: string | null;
};

export type TrucksTable = {
  id: string;
  license_plate: string;
  truck_brand: string;
  color: string;
  year: string;
};

export type TruckState = {
  errors?: {
    license_plate?: string[];
    renavam?: string[];
    chassi?: string[];
    truck_brand?: string[];
    color?: string[];
    year?: string[];
    mileage?: string[];
  };
  message?: string | null;
};

export type TruckField = {
  id: string;
  license_plate: string;
};

export const FormSchema = yup.object({
  id: yup.string(),
  license_plate: DEFAULT_STRING_REQUIRED,
  renavam: DEFAULT_STRING_NULLABLE,
  chassi: DEFAULT_STRING_NULLABLE,
  truck_brand: DEFAULT_STRING_REQUIRED,
  color: DEFAULT_STRING_NULLABLE,
  year: DEFAULT_STRING_NULLABLE,
  mileage: DEFAULT_STRING_NULLABLE,
});

export const EMPTY_FORM = {
  license_plate: '',
  renavam: '',
  chassi: '',
  truck_brand: '',
  color: '',
  year: '',
  mileage: '',
};

export type TruckForm = typeof EMPTY_FORM;
