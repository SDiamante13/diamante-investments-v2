import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { useStockSearch } from './hooks/useStockSearch';
import React from 'react';

function App(): React.ReactElement {
  const { results, error, search } = useStockSearch();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SearchBar onSearch={search} />
      {error && <div className="max-w-2xl mx-auto px-4 py-2 text-red-600">{error}</div>}
      <SearchResults results={results} />
    </div>
  );
}

export default App;
