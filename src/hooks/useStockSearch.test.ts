import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../test/mswServer';
import { useStockSearch } from './useStockSearch';

describe('useStockSearch - 403 Response Filtering', () => {
  beforeEach(() => {
    server.use(
      http.get('https://finnhub.io/api/v1/search', () => {
        return HttpResponse.json({
          count: 2,
          result: [
            { description: 'Stock 1', displaySymbol: 'STK1', symbol: 'STK1', type: 'Common Stock' },
            { description: 'Stock 2', displaySymbol: 'STK2', symbol: 'STK2', type: 'Common Stock' },
          ],
        });
      })
    );
  });

  it('[TEST] When all stock quotes return 403, throw error with no accessible stocks message', async () => {
    server.use(
      http.get('https://finnhub.io/api/v1/quote', () => {
        return new HttpResponse(null, { status: 403 });
      })
    );

    const { result } = renderHook(() => useStockSearch());

    await act(async () => {
      await expect(result.current.search('TEST')).rejects.toThrow('No accessible stock data found');
    });

    expect(result.current.error).toBe('No accessible stock data found');
  });

  it('[TEST] When some stock quotes return 403 and others succeed, return only successful stocks', async () => {
    server.use(
      http.get('https://finnhub.io/api/v1/quote', ({ request }) => {
        const url = new URL(request.url);
        const symbol = url.searchParams.get('symbol');
        if (symbol === 'STK1') {
          return HttpResponse.json({ c: 100, d: 5, dp: 5, h: 105, l: 95, o: 98, pc: 95, t: 1699564800 });
        }
        return new HttpResponse(null, { status: 403 });
      })
    );

    const { result } = renderHook(() => useStockSearch());

    let stocks;
    await act(async () => {
      stocks = await result.current.search('TEST');
    });

    expect(stocks).toHaveLength(1);
    expect(stocks[0].symbol).toBe('STK1');
    expect(result.current.results).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('[TEST] When all stock quotes succeed, return all stocks', async () => {
    server.use(
      http.get('https://finnhub.io/api/v1/quote', ({ request }) => {
        const url = new URL(request.url);
        const symbol = url.searchParams.get('symbol');
        if (symbol === 'STK1') {
          return HttpResponse.json({ c: 100, d: 5, dp: 5, h: 105, l: 95, o: 98, pc: 95, t: 1699564800 });
        }
        return HttpResponse.json({ c: 200, d: 10, dp: 5.26, h: 210, l: 190, o: 195, pc: 190, t: 1699564800 });
      })
    );

    const { result } = renderHook(() => useStockSearch());

    let stocks;
    await act(async () => {
      stocks = await result.current.search('TEST');
    });

    expect(stocks).toHaveLength(2);
    expect(stocks[0].symbol).toBe('STK1');
    expect(stocks[1].symbol).toBe('STK2');
    expect(result.current.results).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });
});
