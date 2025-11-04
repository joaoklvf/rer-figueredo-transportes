import { FieldMapper, IOption } from "@/lib/definitions";
import { FormDatePicker } from "./form-date-picker";
import { FormInput } from "./form-input";
import { FormInputMask } from "./form-input-mask";
import { FormSelect } from "./form-select";
import { MaskType } from "./interfaces";
import { Control, FieldValues } from "react-hook-form";

export function FormMapper<T extends FieldValues>({ fields, control }: Readonly<{ fields: FieldMapper<T>, control: Control<T, string, T> }>) {
  return fields.map(({ fieldType, label, name, mask, options, ...rest }) => {
    const commonProps = {
      id: name,
      label: label,
      placeholder: label,
      containerClassName: "mb-4",
      control,
      name,
      ...rest
    };
    const key = `${label}${name}${fieldType}`;
    switch (fieldType) {
      case 'date-picker':
        return <FormDatePicker key={key} {...commonProps} />
      case 'input-mask':
        return <FormInputMask key={key} {...commonProps} mask={mask as MaskType} />
      case 'select':
        return <FormSelect key={key} {...commonProps} options={options as IOption[]} />
      default:
        return <FormInput key={key} {...commonProps} />
    }
  });
}
