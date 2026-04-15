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

export const mockMultipleSearchResults = {
  result: [
    { symbol: 'AAPL', description: 'APPLE INC', displaySymbol: 'AAPL', type: 'Common Stock' },
    { symbol: 'AAPD', description: 'DIREXION AAPL BEAR', displaySymbol: 'AAPD', type: 'ETF' },
  ],
};

export const mockEmptySearchResult = { count: 0, result: [] };

export const mockAppleProfile = {
  name: 'Apple Inc',
  ticker: 'AAPL',
  marketCapitalization: 2800000,
  country: 'US',
  currency: 'USD',
  exchange: 'NASDAQ/NMS (GLOBAL MARKET)',
  finnhubIndustry: 'Technology',
  ipo: '1980-12-12',
  logo: 'https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png',
  phone: '14089961010',
  shareOutstanding: 15728.7,
  weburl: 'https://www.apple.com/',
};

export const mockAppleMetrics = {
  metric: {
    '52WeekHigh': 152.84,
    '52WeekLow': 124.17,
    peBasicExclExtraTTM: 28.5,
  },
};
