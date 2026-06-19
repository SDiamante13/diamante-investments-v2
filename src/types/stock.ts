export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dollarChange: number;
  percentChange: number;
  openPrice?: number | null;
  dayHigh?: number | null;
  dayLow?: number | null;
  marketCap?: number | null;
  peRatio?: number | null;
  yearHigh?: number | null;
  yearLow?: number | null;
}
