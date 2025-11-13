import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://finnhub.io/api/v1';

function handleSearch({ request }: { request: Request }): Response {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  if (query === 'AAPL') {
    return HttpResponse.json({
      count: 1,
      result: [
        {
          description: 'Apple Inc',
          displaySymbol: 'AAPL',
          symbol: 'AAPL',
          type: 'Common Stock',
        },
      ],
    });
  }

  return HttpResponse.json({ count: 0, result: [] });
}

const AAPL_QUOTE = {
  c: 145.52,
  d: 2.35,
  dp: 1.64,
  h: 146.0,
  l: 143.0,
  o: 144.0,
  pc: 143.17,
  t: 1699564800,
};

const EMPTY_QUOTE = {
  c: 0,
  d: 0,
  dp: 0,
  h: 0,
  l: 0,
  o: 0,
  pc: 0,
  t: 0,
};

function handleQuote({ request }: { request: Request }): Response {
  const url = new URL(request.url);
  const symbol = url.searchParams.get('symbol');
  const quote = symbol === 'AAPL' ? AAPL_QUOTE : EMPTY_QUOTE;
  return HttpResponse.json(quote);
}

export const handlers = [http.get(`${BASE_URL}/search`, handleSearch), http.get(`${BASE_URL}/quote`, handleQuote)];
