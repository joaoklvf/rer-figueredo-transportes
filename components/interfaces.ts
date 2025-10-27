import { DetailedHTMLProps, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { DatePickerProps } from "react-datepicker";
import { Control, FieldValues, Path } from "react-hook-form";
import { IconProps } from "./icon/interfaces";

export interface FormInputProps<T extends FieldValues> extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  label?: string;
  icon?: IconProps['name'];
  containerClassName?: string;
  control: Control<T, string, T>;
  name: Path<T>
}

export type FormDatePickerProps<T extends FieldValues> = Readonly<Omit<DatePickerProps, "onChange">> & FormInputProps<T>;

export interface FormSelectProps<T extends FieldValues> extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  id: string;
  label?: string;
  icon?: IconProps['name'];
  containerClassName?: string;
  options: Option[];
  control: Control<T, string, T>;
  name: Path<T>
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

export interface FormInputMaskProps<T extends FieldValues> extends FormInputProps<T> {
  mask: MaskType;
}
