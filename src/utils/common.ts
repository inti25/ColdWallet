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

function getStringBetween(str: string, start: string, end: string) {
  const result = str.match(new RegExp(start + "(.*)" + end));
  if (result != null && result.length > 1) return result[1];
  return "";
  // return result[1];
}

export function getTransactionErr(e: any) {
  if (e && e.reason) {
    return e.reason;
  } else {
    return "Transaction failed, please try again later.";
  }
}
