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

export interface FinnhubBasicFinancials {
  metric: {
    marketCapitalization: number;
    peBasicExclExtraTTM: number;
    '52WeekHigh': number;
    '52WeekLow': number;
  };
  metricType: string;
  symbol: string;
}
