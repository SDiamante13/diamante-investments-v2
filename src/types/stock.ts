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

export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dollarChange: number;
  percentChange: number;
}
