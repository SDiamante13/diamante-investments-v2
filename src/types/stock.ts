export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dollarChange: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  marketCap: number | null;
  peRatio: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
}
