import { useState } from 'react';
import type { SearchHistoryEntry } from '../../types/searchHistory';

const MIN_PREVIEW_QUERY_LENGTH = 2;

export interface SearchHistoryView {
  entries: SearchHistoryEntry[];
  isOpen: boolean;
  onBlur: () => void;
  onFocus: () => void;
  onSelect: (entry: SearchHistoryEntry) => void;
}

export function useSearchHistoryDropdown(entries: SearchHistoryEntry[], query: string): SearchHistoryView {
  const [isFocused, setIsFocused] = useState(false);
  const isOpen = isFocused && query.trim().length < MIN_PREVIEW_QUERY_LENGTH && entries.length > 0;

  return {
    entries,
    isOpen,
    onBlur: (): void => setIsFocused(false),
    onFocus: (): void => setIsFocused(true),
    onSelect: (): void => undefined,
  };
}
