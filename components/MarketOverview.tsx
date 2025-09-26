
import React from 'react';
import { Asset } from '../types';
import { useCurrency } from '../contexts';

interface MarketOverviewProps {
  assets: Asset[];
}

const MarketOverviewItem: React.FC<{ asset: Asset }> = ({ asset }) => {
  const { formatCurrency } = useCurrency();
  const isPositive = asset.changePercent >= 0;
  const changeColor = isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';
  const changeSymbol = isPositive ? '+' : '';
  
  return (
    <div className="flex items-center flex-shrink-0 mx-4">
      <p className="text-sm font-bold text-gray-700 dark:text-slate-300 mr-2">{asset.symbol}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-slate-50 mr-3">{formatCurrency(asset.price, asset.baseCurrency)}</p>
      <div className={`text-sm font-medium ${changeColor}`}>
        <span>{changeSymbol}{asset.changePercent.toFixed(2)}%</span>
      </div>
    </div>
  );
};


const MarketOverview: React.FC<MarketOverviewProps> = ({ assets }) => {
  if (!assets || assets.length === 0) return null;

  // Sort to ensure consistent order
  const sortedAssets = [...assets].sort((a, b) => a.symbol.localeCompare(b.symbol));
  const duplicatedAssets = [...sortedAssets, ...sortedAssets]; // Duplicate for a seamless loop

  return (
    <div className="mb-8 relative overflow-hidden group bg-gray-50 dark:bg-slate-800/50 border-y border-gray-200 dark:border-slate-700 py-3">
        <div className="flex animate-marquee">
            {duplicatedAssets.map((asset, index) => (
                <MarketOverviewItem key={`${asset.id}-${index}`} asset={asset} />
            ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-900 via-transparent to-white dark:to-slate-900 pointer-events-none"></div>
    </div>
  );
};

export default MarketOverview;
