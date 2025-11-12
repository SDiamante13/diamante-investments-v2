const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export async function fetchFinnhub(endpoint: string): Promise<Response> {
  const url = `${BASE_URL}${endpoint}&token=${API_KEY}`;
  return globalThis.fetch(url);
}
