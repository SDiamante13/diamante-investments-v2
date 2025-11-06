export interface StockSearchMatch {
  symbol: string;
  name: string;
  type: string;
  region: string;
  matchScore: string;
}

export interface StockSearchResponse {
  bestMatches: StockSearchMatch[];
}

export type SearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: StockSearchMatch[] }
  | { status: 'error'; message: string };
