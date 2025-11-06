import { StockSearchMatch } from '../types/stock';

interface AlphaVantageMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '9. matchScore': string;
}

interface AlphaVantageResponse {
  bestMatches?: AlphaVantageMatch[];
}

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const API_BASE = import.meta.env.VITE_ALPHA_VANTAGE_API_URL || 'https://www.alphavantage.co/query';

function mapToStockMatch(match: AlphaVantageMatch): StockSearchMatch {
  return {
    symbol: match['1. symbol'],
    name: match['2. name'],
    type: match['3. type'],
    region: match['4. region'],
    matchScore: match['9. matchScore'],
  };
}

export async function searchStockBySymbol(keyword: string): Promise<StockSearchMatch[]> {
  if (!API_KEY) throw new Error('API key is missing');
  const url = `${API_BASE}?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`;
  const response = await globalThis.fetch(url);
  if (!response.ok) throw new Error('Network request failed');
  const data = (await response.json()) as AlphaVantageResponse;
  const matches = data.bestMatches || [];
  return matches.map(mapToStockMatch);
}
