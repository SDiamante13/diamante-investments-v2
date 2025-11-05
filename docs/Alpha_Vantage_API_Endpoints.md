# Alpha Vantage API Endpoints for Diamante Investments v2.0

**Document Version:** 1.0  
**Date:** November 4, 2025  
**Product:** Diamante Investments v2.0  
**Data Provider:** Alpha Vantage  

---

## Executive Summary

✅ **EXCELLENT NEWS: Alpha Vantage can provide ALL required data for Diamante Investments v2.0**

Alpha Vantage has comprehensive coverage for every data point needed in the application. This document provides a detailed breakdown of the required API endpoints, their capabilities, and links to official documentation.

---

## API Endpoint Breakdown

### 🔍 **Stock Search & Discovery**

#### **SYMBOL_SEARCH**
**Purpose:** Real-time stock search by symbol or company name  
**Documentation:** https://www.alphavantage.co/documentation/#symbolsearch  
**Returns:**
- Symbol
- Company name  
- Type (Equity, ETF, etc.)
- Region
- Market open/close times
- Currency
- Match score

**Example URL:**
```
https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=microsoft&apikey=demo
```

---

### 💰 **Current Stock Price Data**

#### **GLOBAL_QUOTE**
**Purpose:** Current price and volume information for individual stocks  
**Documentation:** https://www.alphavantage.co/documentation/#latestprice  
**Returns:**
- Current price
- Daily change (absolute & percentage)
- Open, high, low prices
- Volume
- Previous close

**Example URL:**
```
https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
```

#### **REALTIME_BULK_QUOTES** (Premium)
**Purpose:** Bulk quotes for up to 100 stocks in single request  
**Documentation:** https://www.alphavantage.co/documentation/#realtime-bulk-quotes  
**Returns:** Same data as GLOBAL_QUOTE but for multiple symbols  
**Note:** Premium feature for high-throughput applications

**Example URL:**
```
https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM&apikey=demo
```

---

### 📈 **Historical Chart Data (All Timeframes)**

#### **TIME_SERIES_INTRADAY**
**Purpose:** Hourly and minute-level historical data  
**Documentation:** https://www.alphavantage.co/documentation/#intraday  
**Supported Intervals:** 1min, 5min, 15min, 30min, 60min  
**Returns:** OHLCV data with pre/post market hours  
**History:** 20+ years available

**Example URL:**
```
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&apikey=demo
```

#### **TIME_SERIES_DAILY**
**Purpose:** Daily OHLCV historical data  
**Documentation:** https://www.alphavantage.co/documentation/#daily  
**Returns:** Raw (as-traded) daily data  
**History:** 20+ years available

**Example URL:**
```
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo
```

#### **TIME_SERIES_WEEKLY**
**Purpose:** Weekly OHLCV historical data  
**Documentation:** https://www.alphavantage.co/documentation/#weekly  
**Returns:** Last trading day of each week data  
**History:** 20+ years available

**Example URL:**
```
https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo
```

#### **TIME_SERIES_MONTHLY**
**Purpose:** Monthly OHLCV historical data  
**Documentation:** https://www.alphavantage.co/documentation/#monthly  
**Returns:** Last trading day of each month data  
**History:** 20+ years available

**Example URL:**
```
https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo
```

#### **TIME_SERIES_DAILY_ADJUSTED** (Premium)
**Purpose:** Daily data with split and dividend adjustments  
**Documentation:** https://www.alphavantage.co/documentation/#dailyadj  
**Returns:** Adjusted close values and corporate action events  
**Note:** Premium feature

**Example URL:**
```
https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
```

---

### 📊 **Fundamental Data**

#### **OVERVIEW** ⭐ (Primary Fundamental Endpoint)
**Purpose:** Company overview with 50+ financial metrics  
**Documentation:** https://www.alphavantage.co/documentation/#company-overview  
**Returns ALL Required Metrics:**
- ✅ Market Cap (`MarketCapitalization`)
- ✅ PE Ratio (`PERatio`)
- ✅ Dividend Yield (`DividendYield`)
- ✅ 52-week High/Low (`52WeekHigh`, `52WeekLow`)
- ✅ Company Name (`Name`)
- ✅ Sector (`Sector`)
- ✅ Beta (`Beta`)
- ✅ EPS (`EPS`)
- ✅ Book Value (`BookValue`)
- ✅ Shares Outstanding (`SharesOutstanding`)
- ✅ Revenue TTM (`RevenueTTM`)
- ✅ EBITDA (`EBITDA`)
- ✅ Profit Margin (`ProfitMargin`)
- ✅ And 30+ additional metrics

**Example URL:**
```
https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
```

**Sample Response Fields:**
```json
{
  "Symbol": "IBM",
  "Name": "International Business Machines",
  "MarketCapitalization": "132276568064",
  "PERatio": "22.03",
  "DividendYield": "0.0463",
  "52WeekHigh": "152.84",
  "52WeekLow": "114.56",
  "Beta": "1.131",
  "EPS": "6.63"
}
```

---

### 📉 **Technical Indicators**

#### **SMA (Simple Moving Average)**
**Purpose:** Calculate 50-day and 100-day moving averages  
**Documentation:** https://www.alphavantage.co/documentation/#sma  
**Parameters:**
- `symbol`: Stock symbol
- `interval`: daily, weekly, monthly
- `time_period`: 50 or 100 for the periods we need
- `series_type`: close, open, high, low

**Example URLs:**
```
https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=daily&time_period=50&series_type=close&apikey=demo
https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=daily&time_period=100&series_type=close&apikey=demo
```

#### **EMA (Exponential Moving Average)**
**Purpose:** Alternative to SMA with more weight on recent prices  
**Documentation:** https://www.alphavantage.co/documentation/#ema  
**Use Case:** Optional enhancement for more responsive moving averages

**Example URL:**
```
https://www.alphavantage.co/query?function=EMA&symbol=IBM&interval=daily&time_period=50&series_type=close&apikey=demo
```

#### **50+ Additional Technical Indicators Available:**
**Documentation:** https://www.alphavantage.co/documentation/#technical-indicators
- RSI (Relative Strength Index)
- MACD 
- Bollinger Bands
- Stochastic Oscillator
- ADX (Average Directional Index)
- And many more for future enhancements

---

### 🛠️ **Utility Functions**

#### **MARKET_STATUS**
**Purpose:** Check if markets are open or closed  
**Documentation:** https://www.alphavantage.co/documentation/#market-status  
**Returns:** Status of major global markets  
**Use Case:** Display market hours, show if data is real-time vs delayed

**Example URL:**
```
https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo
```

---

## Data Coverage Matrix

| **Required Data Point** | **Alpha Vantage Endpoint** | **Field Name** | **Status** |
|---|---|---|---|
| **Current Price** | `GLOBAL_QUOTE` | `05. price` | ✅ Perfect |
| **Daily Change ($)** | `GLOBAL_QUOTE` | `09. change` | ✅ Perfect |
| **Daily Change (%)** | `GLOBAL_QUOTE` | `10. change percent` | ✅ Perfect |
| **Volume** | `GLOBAL_QUOTE` | `06. volume` | ✅ Perfect |
| **Average Volume** | Historical calculation | Computed from history | ⚠️ Calculated |
| **Open Price** | `GLOBAL_QUOTE` | `02. open` | ✅ Perfect |
| **Today's High** | `GLOBAL_QUOTE` | `03. high` | ✅ Perfect |
| **Today's Low** | `GLOBAL_QUOTE` | `04. low` | ✅ Perfect |
| **Market Cap** | `OVERVIEW` | `MarketCapitalization` | ✅ Perfect |
| **52-Week High** | `OVERVIEW` | `52WeekHigh` | ✅ Perfect |
| **52-Week Low** | `OVERVIEW` | `52WeekLow` | ✅ Perfect |
| **PE Ratio** | `OVERVIEW` | `PERatio` | ✅ Perfect |
| **Dividend Yield** | `OVERVIEW` | `DividendYield` | ✅ Perfect |
| **50-Day MA** | `SMA` | Calculated values | ✅ Perfect |
| **100-Day MA** | `SMA` | Calculated values | ✅ Perfect |

---

## Implementation Strategy

### **For Basic Stock Cards:**
```javascript
// Get current price data
const quote = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`);

// Get fundamental data  
const overview = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`);
```

### **For Detailed Expandable Cards:**
```javascript
// Add moving averages
const sma50 = await fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=50&series_type=close&apikey=${apikey}`);

const sma100 = await fetch(`https://www.alphavantage.co/query?function=SMA&symbol=${symbol}&interval=daily&time_period=100&series_type=close&apikey=${apikey}`);
```

### **For Charts with Multiple Timeframes:**
```javascript
// Hourly chart
const hourlyData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${apikey}`);

// Daily chart  
const dailyData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apikey}`);

// Weekly chart
const weeklyData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apikey}`);

// Monthly chart
const monthlyData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apikey}`);
```

### **For Stock Search:**
```javascript
// Real-time search
const searchResults = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apikey}`);
```

---

## Rate Limits & Considerations

### **Free Plan:**
- **5 API calls per minute**
- **500 API calls per day**
- End-of-day data (not real-time)

### **Premium Plans:**
- **75-1200 API calls per minute** (depending on plan)
- **Unlimited daily calls**
- Real-time and 15-minute delayed data
- Premium endpoints (bulk quotes, adjusted data)

### **Optimization Strategies:**
1. **Cache frequently requested data** (company overviews change rarely)
2. **Batch requests efficiently** within rate limits
3. **Use bulk quotes endpoint** for watchlist updates (premium)
4. **Implement smart polling** - don't update outside market hours

---

## Missing Data & Workarounds

### **⚠️ Average Volume**
**Issue:** Not directly provided in any endpoint  
**Solution:** Calculate from historical volume data
```javascript
// Calculate 30-day average volume from daily data
const historicalData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apikey}`);
// Calculate average from last 30 days of volume data
```

### **✅ All Other Data Points**
Every other required data point is directly available through Alpha Vantage endpoints.

---

## Security & Best Practices

### **API Key Management:**
- Store API keys securely (environment variables)
- Never expose keys in client-side code
- Use server-side proxy for API calls

### **Error Handling:**
- Handle rate limit responses (HTTP 429)
- Implement retry logic with exponential backoff
- Graceful degradation when data unavailable

### **Data Validation:**
- Validate numeric fields (some may be "None" or "--")
- Handle missing data gracefully
- Sanitize all user inputs for symbol search

---

## Documentation Resources

- **Main API Documentation:** https://www.alphavantage.co/documentation/
- **Technical Indicators Guide:** https://www.alphavantage.co/documentation/#technical-indicators
- **Rate Limits & Premium Plans:** https://www.alphavantage.co/premium/
- **Community Libraries:** https://github.com/search?q=alpha+vantage
- **Realtime Data Policy:** https://www.alphavantage.co/realtime_data_policy/

---

## Conclusion

**✅ Alpha Vantage is the perfect data provider for Diamante Investments v2.0.**

- **100% data coverage** for all required metrics
- **Comprehensive chart data** supporting all timeframes (hourly, daily, weekly, monthly)
- **Robust search functionality** for stock discovery
- **Excellent documentation** and community support
- **Scalable pricing** from free to enterprise levels
- **Reliable, exchange-licensed data** with 20+ years of history

**No alternative data provider needed** - Alpha Vantage alone will power the entire application with room for future enhancements like news sentiment, earnings data, and advanced technical indicators.
