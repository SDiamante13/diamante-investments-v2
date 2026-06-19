export const mockAppleSearchResult = {
  result: [
    {
      description: 'APPLE INC',
      displaySymbol: 'AAPL',
      symbol: 'AAPL',
      type: 'Common Stock',
    },
  ],
};

export const mockAppleQuote = {
  c: 145.52,
  d: 2.35,
  dp: 1.64,
  h: 146.12,
  l: 143.89,
  o: 144.2,
  pc: 143.17,
  t: 1699564800,
};

export const mockAppleProfile = {
  marketCapitalization: 2_800_000,
};

export const mockAppleMetrics = {
  metric: {
    peBasicExclExtraTTM: 28.5,
    peNormalizedAnnual: 27.9,
    '52WeekHigh': 152.84,
    '52WeekLow': 124.17,
  },
};

export const mockMultipleSearchResults = {
  result: [
    { symbol: 'AAPL', description: 'APPLE INC', displaySymbol: 'AAPL', type: 'Common Stock' },
    { symbol: 'AAPD', description: 'DIREXION AAPL BEAR', displaySymbol: 'AAPD', type: 'ETF' },
  ],
};

export const mockEmptySearchResult = { count: 0, result: [] };
