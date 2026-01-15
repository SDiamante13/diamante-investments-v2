export function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}T`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}B`;
  }
  return `${value.toFixed(1)}M`;
}

export function formatMetricValue(value: number | null): string {
  if (value === null) {
    return 'N/A';
  }
  return value.toString();
}

export function calculateRangePosition(current: number, low: number, high: number): number {
  const position = ((current - low) / (high - low)) * 100;
  return Math.max(0, Math.min(100, position));
}

export function formatDollarChange(value: number): string {
  return `${value >= 0 ? '+' : '-'}$${Math.abs(value)}`;
}

export function formatPercentChange(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}
