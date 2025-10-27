import { DataTableColumnProp, FormatValueOptions, getValue } from "@/components/data-table/interfaces";
import { getAmountStr, getBrCurrencyStr, getBrDateStr } from "./text-format";

export const TableFormatMap = {
  [FormatValueOptions.Amount]: (value: string) => getAmountStr(value),
  [FormatValueOptions.Currency]: (value: string) => getBrCurrencyStr(value),
  [FormatValueOptions.Date]: (value: string) => getBrDateStr(value),
  [FormatValueOptions.String]: (value: string) => value,
}

function getCellFormattedValue<T>(value: T[keyof T] | string, formatLabel: FormatValueOptions = FormatValueOptions.String) {
  return TableFormatMap[formatLabel](String(value));
}

export function getCellValue<T>(value: T, columnProp: DataTableColumnProp<T>) {
  return columnProp ?
    getCellFormattedValue(getValue(value, columnProp.fieldName), columnProp.formatValue) : '';
}
