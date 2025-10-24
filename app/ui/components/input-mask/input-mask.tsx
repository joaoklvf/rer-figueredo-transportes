import { formatDecimal, formatCurrency } from "@/app/lib/utils";
import { InputMaskProps, MaskType } from "../interfaces";

const handleInputChange: { [key in MaskType]: (value: string) => string } = {
  'decimal': formatDecimal,
  'currency': formatCurrency
};

export function InputMask(props: Readonly<InputMaskProps>) {
  return (
    <input
      {...props}
      onChange={(e) => {
        if (e.target.value)
          e.target.value = handleInputChange[props.mask](e.target.value);
        if (props.onChange) props.onChange(e);
      }}
    />
  );
}
