import type { StockData } from '../types/stock';
import React from 'react';

interface StockCardProps {
  stock: StockData;
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '-';
  const absChange = Math.abs(change);
  return `${sign}$${absChange.toFixed(2)}`;
}

function formatChangePercent(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
}

export function StockCard({ stock }: StockCardProps): React.JSX.Element {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-gray-600">{stock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{formatPrice(stock.currentPrice)}</p>
          <p className={changeColor}>
            {formatChange(stock.change)} ({formatChangePercent(stock.changePercent)})
          </p>
        </div>
      </div>
    </div>
  );
}
