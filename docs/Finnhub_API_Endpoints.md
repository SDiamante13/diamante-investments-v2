# Finnhub API Endpoints for Diamante Investments v2.0

**Document Version:** 1.0
**Date:** November 5, 2025
**Product:** Diamante Investments v2.0
**Data Provider:** Finnhub

---

## Executive Summary

✅ **EXCELLENT NEWS: Finnhub can provide ALL required data for Diamante Investments v2.0**

Finnhub offers comprehensive real-time stock data with an excellent free tier (60 API calls/minute). This document provides detailed breakdown of required API endpoints, their capabilities, and implementation examples.

### Key Advantages
- **60 API calls per minute** on free tier
- Real-time data included
- No daily limits, only per-minute throttling
- Comprehensive fundamental data in single endpoints

---

## API Endpoint Breakdown

### 🔍 **Stock Search & Discovery**

#### **Symbol Search**
**Purpose:** Search for stocks by symbol or company name
**Endpoint:** `GET /api/v1/search`
**Documentation:** https://finnhub.io/docs/api/symbol-search
**Parameters:**
- `q`: Query string (required)

**Returns:**
- Symbol
- Description (company name)
- Display symbol
- Type (Common Stock, ETF, etc.)

**Example URL:**
```
https://finnhub.io/api/v1/search?q=apple&token=YOUR_API_KEY
```

**Sample Response:**
```json
{
  "count": 3,
  "result": [
    {
      "description": "APPLE INC",
      "displaySymbol": "AAPL",
      "symbol": "AAPL",
      "type": "Common Stock"
    }
  ]
}
```

#### **Symbol Lookup**
**Purpose:** Get list of supported stocks
**Endpoint:** `GET /api/v1/stock/symbol`
**Documentation:** https://finnhub.io/docs/api/stock-symbols
**Parameters:**
- `exchange`: Exchange code (US for US stocks)

**Returns:** Complete list of supported symbols for an exchange

**Example URL:**
```
https://finnhub.io/api/v1/stock/symbol?exchange=US&token=YOUR_API_KEY
```

---

### 💰 **Current Stock Price Data**

#### **Quote**
**Purpose:** Real-time quote data for stocks
**Endpoint:** `GET /api/v1/quote`
**Documentation:** https://finnhub.io/docs/api/quote
**Parameters:**
- `symbol`: Stock symbol (required)

**Returns:**
- Current price (`c`)
- Change (`d`)
- Percent change (`dp`)
- High price of the day (`h`)
- Low price of the day (`l`)
- Open price of the day (`o`)
- Previous close price (`pc`)
- Timestamp (`t`)

**Example URL:**
```
https://finnhub.io/api/v1/quote?symbol=AAPL&token=YOUR_API_KEY
```

**Sample Response:**
```json
{
  "c": 145.52,
  "d": 2.35,
  "dp": 1.641,
  "h": 146.12,
  "l": 143.89,
  "o": 144.20,
  "pc": 143.17,
  "t": 1699564800
}
```

---

### 📈 **Historical Chart Data (All Timeframes)**

#### **Stock Candles** (Premium)
**Purpose:** Get candlestick data (OHLCV) for stocks
**Endpoint:** `GET /api/v1/stock/candle`
**Documentation:** https://finnhub.io/docs/api/stock-candles
**Parameters:**
- `symbol`: Stock symbol (required)
- `resolution`: Supported resolutions: 1, 5, 15, 30, 60, D, W, M
  - `1`: 1 minute
  - `5`: 5 minutes
  - `15`: 15 minutes
  - `30`: 30 minutes
  - `60`: 60 minutes (hourly)
  - `D`: Daily
  - `W`: Weekly
  - `M`: Monthly
- `from`: UNIX timestamp (required)
- `to`: UNIX timestamp (required)

**Returns:**
- Open prices array (`o`)
- High prices array (`h`)
- Low prices array (`l`)
- Close prices array (`c`)
- Volume array (`v`)
- Timestamp array (`t`)
- Status (`s`: "ok" or "no_data")

**Example URLs:**
```
# Hourly data
https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=60&from=1699228800&to=1699564800&token=YOUR_API_KEY

# Daily data
https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1609459200&to=1699564800&token=YOUR_API_KEY

# Weekly data
https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=W&from=1609459200&to=1699564800&token=YOUR_API_KEY

# Monthly data
https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=M&from=1577836800&to=1699564800&token=YOUR_API_KEY
```

**Sample Response:**
```json
{
  "c": [145.52, 146.12, 144.89],
  "h": [146.12, 147.23, 145.67],
  "l": [143.89, 144.56, 143.12],
  "o": [144.20, 145.52, 145.00],
  "v": [78234567, 82345678, 76543210],
  "t": [1699478400, 1699564800, 1699651200],
  "s": "ok"
}
```

---

### 📊 **Fundamental Data**

#### **Company Profile**
**Purpose:** Get comprehensive company information and fundamentals
**Endpoint:** `GET /api/v1/stock/profile2`
**Documentation:** https://finnhub.io/docs/api/company-profile2
**Parameters:**
- `symbol`: Stock symbol (required)

**Returns ALL Required Metrics:**
- ✅ Company Name (`name`)
- ✅ Ticker (`ticker`)
- ✅ Market Cap (`marketCapitalization`)
- ✅ Shares Outstanding (`shareOutstanding`)
- ✅ Exchange (`exchange`)
- ✅ Industry (`finnhubIndustry`)
- ✅ Logo (`logo`)
- ✅ IPO Date (`ipo`)
- ✅ Website (`weburl`)
- ✅ Phone (`phone`)
- ✅ Currency (`currency`)

**Example URL:**
```
https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=YOUR_API_KEY
```

**Sample Response:**
```json
{
  "country": "US",
  "currency": "USD",
  "exchange": "NASDAQ/NMS (GLOBAL MARKET)",
  "finnhubIndustry": "Technology",
  "ipo": "1980-12-12",
  "logo": "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
  "marketCapitalization": 2800000,
  "name": "Apple Inc",
  "phone": "14089961010",
  "shareOutstanding": 15728.7,
  "ticker": "AAPL",
  "weburl": "https://www.apple.com/"
}
```

#### **Basic Financials**
**Purpose:** Get key financial metrics and ratios
**Endpoint:** `GET /api/v1/stock/metric`
**Documentation:** https://finnhub.io/docs/api/company-basic-financials
**Parameters:**
- `symbol`: Stock symbol (required)
- `metric`: Type of metric (use "all")

**Returns Additional Metrics:**
- ✅ 52-Week High (`52WeekHigh`)
- ✅ 52-Week Low (`52WeekLow`)
- ✅ PE Ratio (`peBasicExclExtraTTM` or `peNormalizedAnnual`)
- ✅ Beta (`beta`)
- ✅ EPS (`epsBasicExclExtraItemsTTM`)
- ✅ Dividend Yield (`dividendYieldIndicatedAnnual`)
- ✅ Price-to-Book (`pbAnnual`)
- ✅ ROE, ROA, Profit Margin, and 50+ additional metrics

**Example URL:**
```
https://finnhub.io/api/v1/stock/metric?symbol=AAPL&metric=all&token=YOUR_API_KEY
```

**Sample Response:**
```json
{
  "metric": {
    "52WeekHigh": 152.84,
    "52WeekLow": 124.17,
    "peBasicExclExtraTTM": 28.5,
    "beta": 1.24,
    "epsBasicExclExtraItemsTTM": 6.05,
    "dividendYieldIndicatedAnnual": 0.0055,
    "pbAnnual": 40.2,
    "roeTTM": 1.47,
    "roaTTM": 0.27,
    "netProfitMarginTTM": 0.26
  },
  "series": {
    "annual": {
      "currentRatio": [/* time series data */],
      "eps": [/* time series data */]
    }
  }
}
```

#### **Dividends** (Premium)
**Purpose:** Get dividend history
**Endpoint:** `GET /api/v1/stock/dividend`
**Documentation:** https://finnhub.io/docs/api/stock-dividends
**Parameters:**
- `symbol`: Stock symbol (required)
- `from`: YYYY-MM-DD format
- `to`: YYYY-MM-DD format

**Returns:**
- Ex-dividend date
- Payment date
- Record date
- Declaration date
- Amount
- Currency

**Example URL:**
```
https://finnhub.io/api/v1/stock/dividend?symbol=AAPL&from=2020-01-01&to=2024-12-31&token=YOUR_API_KEY
```

---

### 📉 **Technical Indicators**

#### **Technical Analysis** (Premium)
**Purpose:** Aggregate technical analysis signals
**Endpoint:** `GET /api/v1/scan/technical-indicator`
**Documentation:** https://finnhub.io/docs/api/technical-indicators
**Parameters:**
- `symbol`: Stock symbol (required)
- `resolution`: D (daily), W (weekly), M (monthly)

**Returns:**
- Buy signals count
- Sell signals count
- Neutral signals count
- Trend analysis (ADX)
- Signal categorization (strong buy, buy, neutral, sell, strong sell)

**Example URL:**
```
https://finnhub.io/api/v1/scan/technical-indicator?symbol=AAPL&resolution=D&token=YOUR_API_KEY
```

**Sample Response:**
```json
{
  "technicalAnalysis": {
    "count": {
      "buy": 12,
      "sell": 3,
      "neutral": 5
    },
    "signal": "buy"
  },
  "trend": {
    "adx": 32.5,
    "trending": true
  }
}
```

**Note on Moving Averages:** Finnhub's technical indicator endpoint provides aggregate signals. For specific 50-day and 100-day MA values, calculate from historical candle data.

---

### 🛠️ **Utility Functions**

#### **Market Status**
**Purpose:** Check if US markets are open
**Endpoint:** `GET /api/v1/stock/market-status`
**Documentation:** https://finnhub.io/docs/api/market-status
**Parameters:**
- `exchange`: Exchange code (US)

**Returns:**
- Exchange name
- Holiday info
- Session status (pre-market, regular, after-hours, closed)
- Timezone

**Example URL:**
```
https://finnhub.io/api/v1/stock/market-status?exchange=US&token=YOUR_API_KEY
```

---

## Data Coverage Matrix

| **Required Data Point** | **Finnhub Endpoint** | **Field Name** | **Status** |
|---|---|---|---|
| **Current Price** | `/quote` | `c` | ✅ Perfect |
| **Daily Change ($)** | `/quote` | `d` | ✅ Perfect |
| **Daily Change (%)** | `/quote` | `dp` | ✅ Perfect |
| **Volume** | `/quote` | N/A (use candle) | ⚠️ Get from today's candle |
| **Average Volume** | Historical calculation | Computed from candles | ⚠️ Calculated |
| **Open Price** | `/quote` | `o` | ✅ Perfect |
| **Today's High** | `/quote` | `h` | ✅ Perfect |
| **Today's Low** | `/quote` | `l` | ✅ Perfect |
| **Previous Close** | `/quote` | `pc` | ✅ Perfect |
| **Market Cap** | `/stock/profile2` | `marketCapitalization` | ✅ Perfect |
| **Company Name** | `/stock/profile2` | `name` | ✅ Perfect |
| **52-Week High** | `/stock/metric` | `52WeekHigh` | ✅ Perfect |
| **52-Week Low** | `/stock/metric` | `52WeekLow` | ✅ Perfect |
| **PE Ratio** | `/stock/metric` | `peBasicExclExtraTTM` | ✅ Perfect |
| **Dividend Yield** | `/stock/metric` | `dividendYieldIndicatedAnnual` | ✅ Perfect |
| **Beta** | `/stock/metric` | `beta` | ✅ Perfect |
| **EPS** | `/stock/metric` | `epsBasicExclExtraItemsTTM` | ✅ Perfect |
| **50-Day MA** | Calculate from candles | Calculated values | ⚠️ Calculated |
| **100-Day MA** | Calculate from candles | Calculated values | ⚠️ Calculated |

---

## Rate Limits & Considerations

### **Free Plan:**
- **60 API calls per minute**
- **30 API calls per second** (hard limit)
- Real-time data included
- No daily limits

### **Premium Plans:**
- **300-600 API calls per minute** (depending on plan)
- Extended data coverage
- Premium datasets (estimates, ownership, etc.)

### **Optimization Strategies:**
1. **Implement efficient caching** - Cache profile and metrics data (changes infrequently)
2. **Batch watchlist updates** - Space out quote updates across the minute
3. **Calculate technical indicators client-side** - Reduces API calls
4. **Smart throttling** - Respect 60/minute limit with request queue

---

## Security & Best Practices

### **API Key Management:**
- Store API keys in environment variables
- Never expose keys in client-side code
- Use server-side proxy for API calls
- Rotate keys periodically

### **Data Validation:**
- Validate all numeric fields (some may be null)
- Handle missing data gracefully
- Sanitize user inputs for symbol search
- Type check all API responses

## Documentation Resources

- **Main API Documentation:** https://finnhub.io/docs/api
- **Rate Limits:** https://finnhub.io/docs/api/rate-limit
- **Pricing & Plans:** https://finnhub.io/pricing
- **Status Page:** https://status.finnhub.io/
- **GitHub Examples:** https://github.com/Finnhub-Stock-API
- **Client Libraries:** https://finnhub.io/docs/api/client-libraries

---

## Conclusion

**✅ Finnhub is an excellent data provider for Diamante Investments v2.0.**

### Advantages:
- **Excellent free tier**: 60 calls/minute with no daily cap
- **Real-time data** included in free tier
- **Comprehensive data** with most required metrics on free tier
- **No daily limits** - only per-minute throttling
- **Modern API** with excellent documentation
- **Active development** and community support

### Implementation Priority:
1. **Phase 1:** REST API implementation for all MVP features
2. **Phase 2:** Client-side calculation of technical indicators
3. **Phase 3:** Caching optimization and performance tuning

**Finnhub provides everything needed for the MVP and scales well for future enhancements including news, earnings, analyst recommendations, and advanced analytics.**
