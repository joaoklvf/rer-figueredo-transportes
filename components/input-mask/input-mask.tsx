import { formatDecimal, formatCurrency, formatPercent } from "@/lib/utils";
import { InputMaskProps, MaskType } from "../interfaces";
import { ChangeEvent } from "react";

const handleInputChange: { [key in MaskType]: (value: string) => string } = {
  'decimal': formatDecimal,
  'percent': formatPercent,
  'currency': formatCurrency
};

export function InputMask({ mask, ...rest }: Readonly<InputMaskProps>) {
  return (
    <input
      {...rest}
      onChange={(e) => {
        if (e.target.value)
          e.target.value = handleInputChange[mask](e.target.value);
        if (rest.onChange) rest.onChange(e);
      }}
      onKeyUp={(e) => {
        const value = (e.target as EventTarget & HTMLInputElement).value;
        if (!value && rest.onChange) {
          rest.onChange(e as unknown as ChangeEvent<HTMLInputElement>);
          return;
        }

        const index = value.length - 2;
        if (e.key === 'Backspace' && mask === 'percent')
          (e.target as EventTarget & HTMLInputElement).value = `${value.substring(0, index)}${value.substring(index + 1)}`;
      }}
    />
  );
}
