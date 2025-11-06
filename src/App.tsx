import { useStockSearch } from './hooks/useStockSearch';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import styles from './App.module.css';

function App(): React.ReactElement {
  const { state, handleSearch } = useStockSearch();

  return (
    <div className={styles.app}>
      <SearchBar onChange={handleSearch} />
      <SearchResults state={state} />
    </div>
  );
}

export default App;
