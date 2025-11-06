import { StockSearchMatch } from '../types/stock';

interface FinnhubSearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

interface FinnhubSearchResponse {
  count: number;
  result: FinnhubSearchResult[];
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const API_BASE = 'https://finnhub.io/api/v1';

function mapToStockMatch(match: FinnhubSearchResult): StockSearchMatch {
  return {
    symbol: match.symbol,
    name: match.description,
    type: match.type,
    region: 'US',
    matchScore: '1.0',
  };
}

export async function searchStockBySymbol(keyword: string): Promise<StockSearchMatch[]> {
  if (!API_KEY) throw new Error('API key is missing');
  const url = `${API_BASE}/search?q=${encodeURIComponent(keyword)}&token=${API_KEY}`;
  const response = await globalThis.fetch(url);
  if (response.status === 429) {
    throw new RateLimitError('Rate limit exceeded. Please try again later.');
  }
  if (!response.ok) throw new Error('Network request failed');
  const data = (await response.json()) as FinnhubSearchResponse;
  const matches = data.result || [];
  return matches.map(mapToStockMatch);
}
