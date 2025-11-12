import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { useStockSearch } from './hooks/useStockSearch';

function App(): React.ReactElement {
  const { results, search } = useStockSearch();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <SearchBar onSearch={search} />
      <SearchResults results={results} />
    </div>
  );
}

export default App;
