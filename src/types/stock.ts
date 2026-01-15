export interface StockData {
  symbol: string;
  companyName: string;
  quote: {
    currentPrice: number;
    dollarChange: number;
    percentChange: number;
    open: number;
    high: number;
    low: number;
  };
  profile: {
    marketCap: number;
  };
  metrics: {
    peRatio: number | null;
    yearHigh: number;
    yearLow: number;
  };
}
