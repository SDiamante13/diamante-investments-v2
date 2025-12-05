export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dollarChange: number;
  percentChange: number;
  openPrice: number;
  high: number;
  low: number;
  volume: number | null;
  marketCap: number | null;
  peRatio: number | null;
  weekHigh52: number | null;
  weekLow52: number | null;
}
