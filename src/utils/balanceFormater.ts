export const balanceFormater = (value: number, currency?: string) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedValue = formatter.format(value);
  if (value % 1 === 0) {
    return formattedValue.replace(/\.00$/, "");
  }
  return formattedValue;
};
