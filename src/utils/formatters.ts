export function formatDollarChange(value: number): string {
  if (value >= 0) {
    return `+$${value}`;
  }
  return `-$${Math.abs(value)}`;
}

export function formatPercentChange(value: number): string {
  const prefix = value >= 0 ? '+' : '';
  return `${prefix}${value.toFixed(2)}%`;
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatMarketCap(value: number | null): string {
  if (value === null) return 'N/A';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}T`;
  if (value >= 1000) return `$${(value / 1000).toFixed(2)}B`;
  return `$${value.toFixed(2)}M`;
}

export function formatNullable(value: number | null): string {
  if (value === null) return 'N/A';
  return value.toFixed(2);
}

export function calculateRangePosition(current: number, low: number, high: number): number {
  if (high === low) return 50;
  return ((current - low) / (high - low)) * 100;
}
