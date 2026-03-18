# Test Report: Story 1.2 - Detailed Metrics on Stock Card

**Date:** 2026-03-17
**URL:** http://localhost:3000
**Branch:** triangle-tech-talks-03-17-26

## Features Tested

### Scenario 1: Detailed Metrics on Card
- [x] Open price displayed ($252.96)
- [x] High price displayed ($255.13)
- [x] Low price displayed ($252.18)
- [x] Market Cap displayed ($3.73T) - correctly formatted from millions
- [x] PE Ratio displayed (31.69)
- [x] Metrics grid layout: 3-col top row (Open/High/Low), 2-col bottom row (Market Cap/PE Ratio)

### Scenario 2: 52-Week Range
- [x] 52-week low label displayed ($169.21)
- [x] 52-week high label displayed ($288.62)
- [x] Range track with dot marker rendered
- [x] Dot position visually correct (~71% for $254.23 in $169.21-$288.62 range)
- [x] "52-Week Range" header label displayed

### Existing Features (Regression)
- [x] Search input works
- [x] Preview list appears on typing
- [x] Clicking preview item shows stock card
- [x] Price, dollar change, percent change displayed
- [x] Positive changes shown in green with triangle

## Issues Found
None - all features working as expected.

## UX/UI Suggestions
- Range track and dot marker are small; could benefit from slightly more visual weight for better scannability
- Consider adding the current price value near the dot marker on the range bar for quick reference
