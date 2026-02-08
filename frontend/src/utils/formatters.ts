export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
