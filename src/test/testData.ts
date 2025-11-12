import type { SearchResponse, Quote } from '../types/api';

export const mockSearchResponses: Record<string, SearchResponse> = {
  AAPL: {
    count: 1,
    result: [
      {
        description: 'APPLE INC',
        displaySymbol: 'AAPL',
        symbol: 'AAPL',
        type: 'Common Stock',
      },
    ],
  },
  TSLA: {
    count: 1,
    result: [
      {
        description: 'TESLA INC',
        displaySymbol: 'TSLA',
        symbol: 'TSLA',
        type: 'Common Stock',
      },
    ],
  },
  INVALID123: {
    count: 0,
    result: [],
  },
};

export const mockQuotes: Record<string, Quote> = {
  AAPL: {
    c: 145.52,
    d: 2.35,
    dp: 1.641,
    h: 146.12,
    l: 143.89,
    o: 144.2,
    pc: 143.17,
    t: 1699564800,
  },
  TSLA: {
    c: 238.45,
    d: -1.2,
    dp: -0.5,
    h: 240.5,
    l: 237.8,
    o: 239.65,
    pc: 239.65,
    t: 1699564800,
  },
};
