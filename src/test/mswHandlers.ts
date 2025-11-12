import { http, HttpResponse } from 'msw';
import { mockSearchResponses, mockQuotes } from './testData';

const BASE_URL = 'https://finnhub.io/api/v1';

export const handlers = [
  http.get(`${BASE_URL}/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const response = mockSearchResponses[query] || { count: 0, result: [] };
    return HttpResponse.json(response);
  }),

  http.get(`${BASE_URL}/quote`, ({ request }) => {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol') || '';
    const response = mockQuotes[symbol] || {};
    return HttpResponse.json(response);
  }),
];
