import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(key: string, parse: (raw: string | null) => T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => parse(localStorage.getItem(key)));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
