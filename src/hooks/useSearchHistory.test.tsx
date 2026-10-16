import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { useSearchHistory } from './useSearchHistory';

const apple = { symbol: 'AAPL', companyName: 'APPLE INC', currentPrice: 145.52, dollarChange: 2.35, percentChange: 1.64 };

describe('useSearchHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('restores recorded searches after remount', () => {
    const first = renderHook(() => useSearchHistory());
    act(() => first.result.current.record(apple));
    first.unmount();

    const { result } = renderHook(() => useSearchHistory());

    expect(result.current.entries).toEqual([{ symbol: 'AAPL', companyName: 'APPLE INC' }]);
  });
});
