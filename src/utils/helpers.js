export const generateId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let id = '';
  for (let i = 0; i < 2; i++) id += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 4; i++) id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  return id;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
