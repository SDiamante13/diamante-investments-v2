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
  marketCapitalization: number;
  name: string;
  ticker: string;
}

export interface FinnhubMetric {
  metric: {
    '52WeekHigh': number | null;
    '52WeekLow': number | null;
    peBasicExclExtraTTM: number | null;
  };
}

export interface FinnhubCandle {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  v: number[];
  t: number[];
  s: string;
}
