import { setupServer } from 'msw/node';
import type { SetupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://finnhub.io/api/v1';

export const server: SetupServer = setupServer(
  http.get(`${BASE_URL}/stock/profile2`, () => HttpResponse.json({})),
  http.get(`${BASE_URL}/stock/metric`, () => HttpResponse.json({ metric: {} }))
);
