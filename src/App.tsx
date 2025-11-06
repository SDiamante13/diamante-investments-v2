import { useState, useRef } from 'react';
import { searchStockBySymbol } from './services/alphaVantageService';
import { SearchState } from './types/stock';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import styles from './App.module.css';

function App(): React.ReactElement {
  const [state, setState] = useState<SearchState>({ status: 'idle' });
  const latestSearchRef = useRef(0);

  const handleSearch = async (keyword: string): Promise<void> => {
    if (!keyword) return;
    const searchId = ++latestSearchRef.current;
    setState({ status: 'loading' });
    try {
      const matches = await searchStockBySymbol(keyword);
      if (searchId === latestSearchRef.current) {
        setState({ status: 'success', data: matches });
      }
    } catch (err) {
      if (searchId === latestSearchRef.current) {
        setState({ status: 'error', message: 'An error occurred' });
      }
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onChange={handleSearch} />
      <SearchResults state={state} />
    </div>
  );
}

export default App;
