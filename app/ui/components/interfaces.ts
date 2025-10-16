import { DetailedHTMLProps, ForwardRefExoticComponent, InputHTMLAttributes, RefAttributes, SelectHTMLAttributes, SVGProps } from "react";
import { DatePickerProps } from "react-datepicker";

export interface FormInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  errors?: string[];
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export type FormDatePickerProps = Readonly<Omit<DatePickerProps, "onChange">> & FormInputProps;

export interface FormSelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  id: string;
  errors?: string[];
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
  options: Option[];
}

interface Option {
  label: string;
  value: string | number;
  key?: string;
}

export type MaskType = 'decimal' | 'currency';

export interface InputMaskProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type"> {
  mask: MaskType
}

export interface FormInputMaskProps extends FormInputProps {
  mask: MaskType;
}

export type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & RefAttributes<SVGSVGElement>>;