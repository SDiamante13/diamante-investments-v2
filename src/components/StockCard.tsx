import type { StockData } from '../types/stock';

interface StockCardProps {
  stock: StockData;
}

export function StockCard({ stock }: StockCardProps): React.JSX.Element {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-gray-600">{stock.name}</p>
        </div>
      </div>
    </div>
  );
}
