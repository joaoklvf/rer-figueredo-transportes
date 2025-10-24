import * as yup from 'yup';
import { DEFAULT_STRING_REQUIRED, DEFAULT_STRING_NULLABLE, DEFAULT_NUMBER_REQUIRED } from "../definitions";

export type Driver = {
  id: string;
  name: string;
  rg: string | null;
  cpf: string | null;
  birth_date: string | null;
  phone_number: string;
  commission_percentage: number;
};

export type DriversTable = {
  id: string;
  name: string;
  phone_number: string;
};

export type IDriverForm = {
  id: string;
  name: string;
  rg: string;
  cpf: string;
  birth_date: Date;
  phone_number: string;
  commission_percentage: number;
};

export type DriverField = {
  id: string;
  name: string;
  commission_percentage: number;
};

export const FormSchema = yup.object({
  id: yup.string(),
  name: DEFAULT_STRING_REQUIRED,
  rg: DEFAULT_STRING_NULLABLE,
  cpf: DEFAULT_STRING_NULLABLE,
  phone_number: DEFAULT_STRING_REQUIRED,
  birth_date: DEFAULT_STRING_NULLABLE,
  commission_percentage: DEFAULT_NUMBER_REQUIRED
});

export const EMPTY_FORM = {
  name: '',
  rg: '',
  cpf: '',
  birth_date: '',
  phone_number: '',
  commission_percentage: '',
};

export type DriverForm = typeof EMPTY_FORM;
