import * as yup from 'yup';
import { removeNonNumericCaracteres } from './utils';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { IconType, MaskType } from '../ui/components/interfaces';

// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export const DEFAULT_STRING_REQUIRED = yup.string().required('Campo obrigatório.').trim().min(1, 'Campo obrigatório.');

export const DEFAULT_STRING_NULLABLE = yup.string().trim().nullable().optional();
export const DEFAULT_NUMBER = yup
  .string()
  .trim()
  .test(
    'must-be-valid-number',
    'Deve ser um número válido.',
    (val?: string) => val === undefined || val === '' || !Number.isNaN(Number(removeNonNumericCaracteres(val))),
  );

export const DEFAULT_NUMBER_NULLABLE = DEFAULT_NUMBER.optional();
export const DEFAULT_NUMBER_REQUIRED = DEFAULT_NUMBER.required('Campo obrigatório');

export interface IOption {
  label: string,
  value: string | number
}

type FieldTypes = 'input' | 'date-picker' | 'input-mask' | 'select';
export type FieldMapper<T> = {
  label: string;
  name: keyof T;
  icon: IconType;
  fieldType?: FieldTypes;
  readOnly?: boolean;
  mask?: MaskType;
  options?: IOption[];
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  step?: number | string;
}[];
