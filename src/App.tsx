import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { ErrorMessage } from './components/ErrorMessage';
import { useStockSearch } from './hooks/useStockSearch';
import React from 'react';

function App(): React.ReactElement {
  const { results, error, search } = useStockSearch();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SearchBar onSearch={search} />
      {error && <ErrorMessage message={error} />}
      <SearchResults results={results} />
    </div>
  );
}

export default App;
