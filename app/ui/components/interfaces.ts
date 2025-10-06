import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { DatePickerProps } from "react-datepicker";

export interface FormInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  errors?: string[];
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

interface FormProps {
  id: string;
  errors?: string[];
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export type FormDatePickerProps = Readonly<Omit<DatePickerProps, "onChange">> & FormProps;