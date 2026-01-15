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

export interface FinnhubProfile2 {
  name: string;
  ticker: string;
  marketCapitalization: number;
  exchange: string;
  currency: string;
}

export interface FinnhubMetrics {
  metric: {
    '52WeekHigh': number;
    '52WeekLow': number;
    peBasicExclExtraTTM: number | null;
  };
}
