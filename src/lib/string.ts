export function nominal(angka: number | string): string {
  return `${angka
    .toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      style: "currency",
      currency: "IDR",
      currencyDisplay: "symbol",
    })
    .replace(/,/g, "")
    .replace(/\./g, ",")}`;
}

export function stringToJsonArray(str: string) {
  return str
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
