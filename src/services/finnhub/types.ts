export interface FinnhubSearchResponse {
  result: FinnhubSearchResult[];
}

export interface FinnhubSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface FinnhubQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface FinnhubProfile {
  marketCapitalization: number;
}

export interface FinnhubMetricsResponse {
  metric: FinnhubMetrics;
}

export interface FinnhubMetrics {
  '52WeekHigh': number | null;
  '52WeekLow': number | null;
  peBasicExclExtraTTM: number | null;
}
