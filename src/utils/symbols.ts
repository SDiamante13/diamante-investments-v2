export function normalizeSymbol(symbol: string): string {
  return symbol.trim().toUpperCase();
}

export function withoutSymbol<T extends { symbol: string }>(items: T[], symbol: string): T[] {
  const normalizedSymbol = normalizeSymbol(symbol);
  return items.filter((item) => normalizeSymbol(item.symbol) !== normalizedSymbol);
}

export function hasSymbol(items: { symbol: string }[], symbol: string): boolean {
  const normalizedSymbol = normalizeSymbol(symbol);
  return items.some((item) => normalizeSymbol(item.symbol) === normalizedSymbol);
}
