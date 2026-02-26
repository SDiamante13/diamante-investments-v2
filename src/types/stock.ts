export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  dollarChange: number;
  percentChange: number;
  open: number | null;
  high: number | null;
  low: number | null;
  marketCap: number | null;
  peRatio: number | null;
  week52High: number | null;
  week52Low: number | null;
}
