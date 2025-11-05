```
═══════════════════════════════════════════════════════════════════════════

    ██████╗ ██╗ █████╗ ███╗   ███╗ █████╗ ███╗   ██╗████████╗███████╗
    ██╔══██╗██║██╔══██╗████╗ ████║██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
    ██║  ██║██║███████║██╔████╔██║███████║██╔██╗ ██║   ██║   █████╗
    ██║  ██║██║██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║   ██║   ██╔══╝
    ██████╔╝██║██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║   ██║   ███████╗
    ╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

    ██╗███╗   ██╗██╗   ██╗███████╗███████╗████████╗███╗   ███╗███████╗███╗   ██╗████████╗███████╗
    ██║████╗  ██║██║   ██║██╔════╝██╔════╝╚══██╔══╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    ██║██╔██╗ ██║██║   ██║█████╗  ███████╗   ██║   ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    ██║██║╚██╗██║╚██╗ ██╔╝██╔══╝  ╚════██║   ██║   ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    ██║██║ ╚████║ ╚████╔╝ ███████╗███████║   ██║   ██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   ███████║
    ╚═╝╚═╝  ╚═══╝  ╚═══╝  ╚══════╝╚══════╝   ╚═╝   ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

                            v2.0
═══════════════════════════════════════════════════════════════════════════
```

## Overview

Modern web platform for tracking and analyzing US stock market data in real-time. Empowers retail investors with clean UI, comprehensive metrics, and personalized watchlists.

### Key Features

- **Stock Search & Discovery** - Real-time search with instant comprehensive results
- **Watchlist Management** - One-click add/remove, persistent storage, expandable detail views
- **Interactive Charts** - Candlestick charts with multiple timeframes (hourly, daily, weekly, monthly)
- **Real-time Data** - Live pricing, daily changes, volume, market cap, PE ratios
- **Technical Analysis** - 52-week ranges, moving averages (50d/100d), fundamental metrics
- **Mobile-First Design** - Responsive across all devices (320px-2560px)

### Tech Stack

- React 19 + TypeScript
- Alpha Vantage API (stock data)
- Strict code quality (max 150 lines/file, 25 lines/function, complexity 10)
- Pre-commit hooks (Prettier, ESLint, jscpd, build)
- Pre-push hooks (tests)

### Quick Start

```bash
npm install
npm start       # Development server
npm test        # Run tests
npm run build   # Production build
```

### Scripts

```bash
npm run lint              # Check linting
npm run lint:fix          # Fix linting issues
npm run prettier:check    # Check formatting
npm run prettier:format   # Format code
npm run type-check        # TypeScript validation
```

---

**Target Users**: Retail investors (25-55) and trading enthusiasts (20-40) seeking simplified stock tracking with clean, efficient interfaces.
