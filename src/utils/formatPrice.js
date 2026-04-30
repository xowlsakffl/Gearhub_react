export const formatPrice = (amount) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPriceCalculation = (quantity, price) => {
  const total = Number(quantity) * Number(price);
  return formatPrice(total);
};