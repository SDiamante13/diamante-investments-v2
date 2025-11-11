import { http, HttpResponse } from 'msw';

const API_BASE = 'https://finnhub.io/api/v1';

const mockAAPL = {
  description: 'Apple Inc',
  displaySymbol: 'AAPL',
  symbol: 'AAPL',
  type: 'Common Stock',
};

const mockMSFT = {
  description: 'Microsoft Corporation',
  displaySymbol: 'MSFT',
  symbol: 'MSFT',
  type: 'Common Stock',
};

export const handlers = [
  http.get(`${API_BASE}/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    if (query === 'ERROR') return HttpResponse.error();
    if (query === 'AAPL') return HttpResponse.json({ count: 1, result: [mockAAPL] });
    if (query === 'MSFT') return HttpResponse.json({ count: 1, result: [mockMSFT] });
    return HttpResponse.json({ count: 0, result: [] });
  }),
  http.get(`${API_BASE}/quote`, ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');
    if (symbol === 'AAPL') return HttpResponse.json({ c: 145.52, d: 2.35, dp: 1.64 });
    if (symbol === 'MSFT') return HttpResponse.json({ c: 330.45, d: -1.2, dp: -0.36 });
    return HttpResponse.json({ c: 0, d: 0, dp: 0 });
  }),
];
