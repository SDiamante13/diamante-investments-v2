# Test Report: Stock Metrics & 52-Week Range

**Date:** 2026-04-15  
**Branch:** `taming-the-dragon-04-15-26`  
**URL:** http://localhost:3000

## Features Tested

### 1. Stock Search (Happy Path)
| Test | Result |
|------|--------|
| Type ticker, preview appears | PASS |
| Preview shows symbol + company name | PASS |
| Click preview loads stock card | PASS |
| Debounced input (no flash of stale results) | PASS |
| Search new stock replaces previous card | PASS |

### 2. Stock Detail Card - Metrics
| Test | Result |
|------|--------|
| Symbol + company name displayed | PASS |
| Current price displayed | PASS |
| Dollar change with +/- prefix | PASS |
| Percent change with +/- prefix | PASS |
| Positive change shows green styling | PASS |
| Open price | PASS |
| Market Cap (formatted as T/B) | PASS |
| High price | PASS |
| P/E ratio | PASS |
| Low price | PASS |

### 3. 52-Week Range
| Test | Result |
|------|--------|
| Range label displayed | PASS |
| Low and high values shown | PASS |
| Dot positioned proportionally | PASS |
| Accessible meter role with aria labels | PASS |

### 4. Edge Cases
| Test | Result |
|------|--------|
| Invalid ticker shows "No matches found" | PASS |
| Clearing input hides preview dropdown | PASS |
| Previous stock card persists after clearing | PASS |

## Stocks Tested
- **AAPL** (Apple Inc) — $264.78, +$5.95 (+2.30%)
- **TSLA** (Tesla Inc) — $387.28, +$23.08 (+6.34%)
- **GOOG** (Alphabet Inc) — $332.78, +$2.2 (+0.67%)

## Features Not Working as Expected

**None** — all happy paths passed.

## UX/UI Improvement Suggestions

1. **Dollar change formatting inconsistency**: GOOG shows `+$2.2` instead of `+$2.20`. The `formatDollarChange` function doesn't use `.toFixed(2)`, so values with trailing zeros get truncated.

2. **Metrics grid asymmetry**: The grid has 5 metrics (Open, Mkt Cap, High, P/E, Low) which creates an uneven 2-column layout with Low orphaned. Consider adding a 6th metric (e.g., Volume) or restructuring.

3. **No loading state**: When clicking a preview, the card appears after data loads with no spinner or skeleton. On slow connections this could feel unresponsive.

4. **No negative change tested**: All three stocks happened to be positive today. Could not visually verify red/negative styling — consider adding a visual test or mock for this case.

## Screenshots
- `test-aapl-stock-card.png`
- `test-goog-stock-card.png`
