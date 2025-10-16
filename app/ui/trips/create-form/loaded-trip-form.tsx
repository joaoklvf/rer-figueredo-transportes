import { FormDatePicker } from "../../components/form-date-picker";
import { FormInput } from "../../components/form-input";
import { FormInputMask } from "../../components/form-input-mask";
import { MaskType } from "../../components/interfaces";
import { LoadedTripFormProps, LOADED_FIELDS } from "./utils";

export function LoadedTripForm({ form, handleChange, state }: Readonly<LoadedTripFormProps>) {
  return (
    <div>
      <h2>Viagem Carregado</h2>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-4 my-3">
        {LOADED_FIELDS.map(({ fieldType, icon: Icon, label, name, readOnly, mask }) => {
          const commonProps = {
            id: name,
            onChange: handleChange,
            label: label,
            name: name,
            placeholder: label,
            errors: state.errors ? state.errors[name] : undefined,
            containerClassName: "mb-4",
            icon: <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />,
            value: form[name],
            readOnly
          };
          const key = `${label}${name}${fieldType}`;
          switch (fieldType) {
            case 'input':
              return <FormInput key={key} {...commonProps} />
            case 'date-picker':
              return <FormDatePicker key={key} {...commonProps} />
            case 'input-mask':
              return <FormInputMask key={key} {...commonProps} mask={mask as MaskType} />
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}