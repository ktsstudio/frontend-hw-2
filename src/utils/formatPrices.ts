export function formatCurrentPrice(
  currency: string,
  currentPrice: number | string
): string {
  const userLanguage = window.navigator.language;
  const formatterCurrency = new Intl.NumberFormat(userLanguage, {
    style: "currency",
    currency: currency.toLowerCase(),
    currencyDisplay: "narrowSymbol",
  });

  return formatterCurrency.format(Number(currentPrice));
}

export function formatPriceChange(
  priceChange: number | string,
  toFixed: number
): string {
  return Number(priceChange) > 0
    ? `+${Number(priceChange).toFixed(toFixed).toLocaleString()}`
    : Number(priceChange).toFixed(toFixed).toLocaleString();
}
