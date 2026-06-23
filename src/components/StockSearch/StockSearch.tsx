import type { ReactElement } from 'react';
import { useState } from 'react';
import WatchlistView from '../WatchlistView/WatchlistView';
import StockSearchPanel from './StockSearchPanel';
import StockTabs from './StockTabs';
import styles from './StockSearch.module.css';
import type { StockSearchTab } from './stockSearchTypes';
import { useSelectedWatchlist } from './useSelectedWatchlist';
import { useStockSearchFlow } from './useStockSearchFlow';
import type { SelectedWatchlist } from './useSelectedWatchlist';
import type { StockSearchFlow } from './useStockSearchFlow';

interface StockSearchLayoutProps {
  activeTab: StockSearchTab;
  onTabSelect: (tab: StockSearchTab) => void;
  search: StockSearchFlow;
  watchlist: SelectedWatchlist;
}

function StockSearchLayout({ activeTab, onTabSelect, search, watchlist }: Readonly<StockSearchLayoutProps>): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.decorativeLines} />
      <h1 className={styles.title}>Diamante Investments</h1>
      <StockTabs activeTab={activeTab} onSelect={onTabSelect} />
      {activeTab === 'search' ? (
        <StockSearchPanel
          query={search.query}
          onQueryChange={search.onQueryChange}
          onSubmit={search.onSubmit}
          previewResults={search.previewResults}
          showPreviews={search.showPreviews}
          debouncedQuery={search.debouncedQuery}
          onSelect={search.onSelect}
          error={search.error}
          loadingSymbol={search.loadingSymbol}
          stockData={search.stockData}
          isWatched={watchlist.isWatched}
          watchlistStatus={watchlist.status}
          onToggleWatchlist={watchlist.onToggle}
        />
      ) : (
        <WatchlistView items={watchlist.items} />
      )}
    </div>
  );
}

export default function StockSearch(): ReactElement {
  const [activeTab, setActiveTab] = useState<StockSearchTab>('search');
  const search = useStockSearchFlow();
  const watchlist = useSelectedWatchlist(search.stockData);

  return <StockSearchLayout activeTab={activeTab} onTabSelect={setActiveTab} search={search} watchlist={watchlist} />;
}
