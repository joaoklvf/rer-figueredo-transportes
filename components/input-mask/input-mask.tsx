import { formatDecimal, formatCurrency, formatPercent } from "@/lib/utils";
import { InputMaskProps, MaskType } from "../interfaces";

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
        let value = (e.target as EventTarget & HTMLInputElement).value;
        if (!value && rest.onChange) {
          rest.onChange(e as any);
          return;
        }

        const index = value.length - 2;
        if (e.key === 'Backspace' && mask === 'percent')
          (e.target as EventTarget & HTMLInputElement).value = `${value.substring(0, index)}${value.substring(index + 1)}`;
      }}
    />
  );
}
