import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface FormInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  errors?: string[];
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}
