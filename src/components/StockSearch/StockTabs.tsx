import type { ReactElement } from 'react';
import type { StockSearchTab } from './stockSearchTypes';
import styles from './StockSearch.module.css';

interface StockTabsProps {
  activeTab: StockSearchTab;
  onSelect: (tab: StockSearchTab) => void;
}

function tabLabel(tab: StockSearchTab): string {
  return tab === 'search' ? 'Search' : 'Watchlist';
}

function TabButton({
  activeTab,
  tab,
  onSelect,
}: Readonly<{
  activeTab: StockSearchTab;
  tab: StockSearchTab;
  onSelect: (tab: StockSearchTab) => void;
}>): ReactElement {
  function handleClick(): void {
    onSelect(tab);
  }

  return (
    <button className={styles.tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={handleClick}>
      {tabLabel(tab)}
    </button>
  );
}

export default function StockTabs({ activeTab, onSelect }: Readonly<StockTabsProps>): ReactElement {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Stock workspace">
      <TabButton activeTab={activeTab} tab="search" onSelect={onSelect} />
      <TabButton activeTab={activeTab} tab="watchlist" onSelect={onSelect} />
    </div>
  );
}
