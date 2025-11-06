import { http, HttpResponse } from 'msw';

const API_BASE = 'https://www.alphavantage.co/query';

const mockAAPL = {
  '1. symbol': 'AAPL',
  '2. name': 'Apple Inc',
  '3. type': 'Equity',
  '4. region': 'United States',
  '9. matchScore': '1.0000',
};

const mockMSFT = {
  '1. symbol': 'MSFT',
  '2. name': 'Microsoft Corporation',
  '3. type': 'Equity',
  '4. region': 'United States',
  '9. matchScore': '1.0000',
};

export const handlers = [
  http.get(API_BASE, ({ request }) => {
    const url = new URL(request.url);
    const func = url.searchParams.get('function');
    const keywords = url.searchParams.get('keywords');
    if (func === 'SYMBOL_SEARCH') {
      if (keywords === 'ERROR') return HttpResponse.error();
      if (keywords === 'AAPL') return HttpResponse.json({ bestMatches: [mockAAPL] });
      if (keywords === 'MSFT') return HttpResponse.json({ bestMatches: [mockMSFT] });
    }
    return HttpResponse.json({ bestMatches: [] });
  }),
];
