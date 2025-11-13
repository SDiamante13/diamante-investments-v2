import { useState } from 'react';
import { getStockData } from './services/finnhub';
import { StockData } from './types/finnhub';

async function fetchAndSetStock(ticker: string, setStock: (s: StockData | null) => void, setError: (e: boolean) => void): Promise<void> {
  const data = await getStockData(ticker);
  if (data) {
    setStock(data);
    setError(false);
  } else {
    setStock(null);
    setError(true);
  }
}

function App(): React.ReactElement {
  const [ticker, setTicker] = useState('');
  const [stock, setStock] = useState<StockData | null>(null);
  const [error, setError] = useState(false);

  async function handleSearch(): Promise<void> {
    await fetchAndSetStock(ticker, setStock, setError);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setTicker(e.target.value);
  }

  return (
    <div>
      <input type="text" value={ticker} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      {error && <div>No results found</div>}
      {stock && (
        <div>
          <div>{stock.symbol}</div>
          <div>{stock.companyName}</div>
        </div>
      )}
    </div>
  );
}

export default App;
