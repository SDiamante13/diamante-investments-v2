import { useEffect, useState } from 'react';
import { isRecord } from '../utils/guards';

type ItemGuard<T> = (value: unknown) => value is T;

function parseItems<T>(raw: string | null, isItem: ItemGuard<T>): T[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed) || !Array.isArray(parsed.items)) return [];
    return parsed.items.filter(isItem);
  } catch {
    return [];
  }
}

export function usePersistedList<T>(storageKey: string, isItem: ItemGuard<T>): [T[], (update: (items: T[]) => T[]) => void] {
  const [items, setItems] = useState<T[]>(() => parseItems(localStorage.getItem(storageKey), isItem));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ items }));
  }, [storageKey, items]);

  return [items, setItems];
}
