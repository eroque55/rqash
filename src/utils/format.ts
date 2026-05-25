export const formatCurrency = (value: number, absolute: boolean = false) => {
  const parsedValue = absolute ? Math.abs(value) : value;

  return parsedValue.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};
