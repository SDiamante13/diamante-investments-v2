import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://finnhub.io/api/v1';

export const handlers = [
  http.get(`${BASE_URL}/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    if (query === 'AAPL') {
      return HttpResponse.json({
        count: 1,
        result: [
          {
            description: 'APPLE INC',
            displaySymbol: 'AAPL',
            symbol: 'AAPL',
            type: 'Common Stock',
          },
        ],
      });
    }

    return HttpResponse.json({ count: 0, result: [] });
  }),

  http.get(`${BASE_URL}/quote`, ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');

    if (symbol === 'AAPL') {
      return HttpResponse.json({
        c: 145.52,
        d: 2.35,
        dp: 1.641,
        h: 146.12,
        l: 143.89,
        o: 144.2,
        pc: 143.17,
        t: 1699564800,
      });
    }

    return HttpResponse.json({});
  }),

];
