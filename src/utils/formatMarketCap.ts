export function formatMarketCap(valueInMillions: number | null): string {
  if (valueInMillions === null) return '\u2014';
  if (valueInMillions >= 1_000_000) return `${(valueInMillions / 1_000_000).toFixed(1)}T`;
  if (valueInMillions >= 1_000) return `${(valueInMillions / 1_000).toFixed(1)}B`;
  return `${valueInMillions.toFixed(1)}M`;
}
