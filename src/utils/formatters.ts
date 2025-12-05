export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatVolume(value: number | null): string {
  if (value === null) {
    return 'N/A';
  }

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toString();
}

export function formatMarketCap(millions: number | null): string {
  if (millions === null) {
    return 'N/A';
  }

  if (millions >= 1_000_000) {
    return `$${(millions / 1_000_000).toFixed(2)}T`;
  }

  if (millions >= 1_000) {
    return `$${(millions / 1_000).toFixed(0)}B`;
  }

  return `$${millions.toFixed(0)}M`;
}

export function formatPERatio(value: number | null): string {
  if (value === null) {
    return 'N/A';
  }

  return value.toFixed(1);
}

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
