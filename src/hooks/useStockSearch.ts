import { useState, useRef, useCallback } from 'react';
import { searchStockBySymbol, RateLimitError } from '../services/alphaVantageService';
import { SearchState, StockSearchMatch } from '../types/stock';

type SetState = (state: SearchState) => void;

const handleSearchSuccess = (matches: StockSearchMatch[], searchId: number, latestId: number, setState: SetState): void => {
  if (searchId === latestId) {
    setState({ status: 'success', data: matches });
  }
};

const handleSearchError = (searchId: number, latestId: number, setState: SetState): void => {
  if (searchId === latestId) {
    setState({ status: 'error', message: 'An error occurred' });
  }
};

const handleRateLimitError = (searchId: number, latestId: number, setState: SetState): void => {
  window.alert('API rate limit reached. Please try again tomorrow.');
  if (searchId === latestId) {
    setState({ status: 'idle' });
  }
};

const handleError = (error: unknown, searchId: number, latestId: number, setState: SetState): void => {
  if (error instanceof RateLimitError) {
    handleRateLimitError(searchId, latestId, setState);
  } else {
    handleSearchError(searchId, latestId, setState);
  }
};

export function useStockSearch(): {
  state: SearchState;
  handleSearch: (keyword: string) => Promise<void>;
} {
  const [state, setState] = useState<SearchState>({ status: 'idle' });
  const latestSearchRef = useRef(0);

  const handleSearch = useCallback(async (keyword: string): Promise<void> => {
    if (!keyword) {
      setState({ status: 'idle' });
      return;
    }
    const searchId = ++latestSearchRef.current;
    setState({ status: 'loading' });
    try {
      const matches = await searchStockBySymbol(keyword);
      handleSearchSuccess(matches, searchId, latestSearchRef.current, setState);
    } catch (error) {
      handleError(error, searchId, latestSearchRef.current, setState);
    }
  }, []);

  return { state, handleSearch };
}
