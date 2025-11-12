import type { StockData } from '../types/stock';
import { StockCard } from './StockCard';
import React from 'react';

interface SearchResultsProps {
  results: StockData[];
}

export function SearchResults({ results }: SearchResultsProps): React.JSX.Element {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="space-y-4">
        {results.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
