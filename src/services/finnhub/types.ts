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
  name: string;
  marketCapitalization: number;
}

export interface FinnhubMetricResponse {
  metric: FinnhubMetric;
}

export interface FinnhubMetric {
  '52WeekHigh': number;
  '52WeekLow': number;
  peBasicExclExtraTTM: number;
}
