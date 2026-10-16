import { useState } from 'react';
import type { SearchHistoryEntry } from '../../types/searchHistory';
import { MIN_PREVIEW_QUERY_LENGTH } from '../../utils/previewQuery';

export interface SearchHistoryView {
  entries: SearchHistoryEntry[];
  isOpen: boolean;
  onBlur: () => void;
  onFocus: () => void;
  onSelect: (entry: SearchHistoryEntry) => void;
}

export function useSearchHistoryDropdown(
  entries: SearchHistoryEntry[],
  query: string,
  loadSymbol: (symbol: string) => void
): SearchHistoryView {
  const [isFocused, setIsFocused] = useState(false);
  const isOpen = isFocused && query.trim().length < MIN_PREVIEW_QUERY_LENGTH && entries.length > 0;

  function handleSelect(entry: SearchHistoryEntry): void {
    setIsFocused(false);
    loadSymbol(entry.symbol);
  }

  return {
    entries,
    isOpen,
    onBlur: (): void => setIsFocused(false),
    onFocus: (): void => setIsFocused(true),
    onSelect: handleSelect,
  };
}
