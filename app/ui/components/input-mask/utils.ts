export const formatDateToLocal = (value: Date) =>
  value.toLocaleDateString('pt-BR').toString();

export const removeNonNumericCaracteres = (value: string) =>
  value.replaceAll(/\D/g, "")

export const formatDecimal = (value: string) => {
  const amountNumber = Number(removeNonNumericCaracteres(value)) / 100;
  return amountNumber.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
}

export const formatCurrency = (value: string) => {
  const amountNumber = Number(removeNonNumericCaracteres(value)) / 100;
  return Number(amountNumber).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
