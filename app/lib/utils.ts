import { Revenue } from './definitions';

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const formatDateToLocal = (value: Date) =>
  value.toLocaleDateString('pt-BR').toString();

export const removeNonNumericCaracteres = (value: string) =>
  value.replaceAll(/\D/g, "")

export const formatDecimal = (value: string) => {
  const amountNumber = Number(removeNonNumericCaracteres(value)) / 100;
  return amountNumber.toLocaleString('pt-BR', { style: 'decimal', minimumFractionDigits: 2 });
}

export const formatCurrency = (value: string | number) => {
  const amountNumber = Number(removeNonNumericCaracteres(String(value))) / 100;
  return Number(amountNumber).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const convertDateStr = (value: string | Date) => {
  const date = new Date(value).toLocaleDateString();
  const dateSplitted = date.split('/');
  return dateSplitted ? `${dateSplitted[2]}-${dateSplitted[0]}-${dateSplitted[1]}` : null;
}

export const convertCurrencyStr = (value: string) => {
  return Number(removeNonNumericCaracteres(value));
}

export const convertDataToForm = (value: any) => {
  const newObject = { ...value };
  Object.entries(newObject).forEach(([entry, value]) => {
    newObject[entry] = String(value);
  });
  return newObject;
};
