export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatCurrencyUSD = (
  value: number | string,
  maximumFractionDigits: number = 6
): string => {
  if (typeof value === "string") value = parseFloat(String(value));
  return value
    .toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: 0,
    })
    .replace("$", "");
};
