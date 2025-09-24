import React, { useState, useEffect, useRef } from 'react';
import { Asset } from '../types';
import { useCurrency, useLanguage } from '../contexts';
import { translations } from '../translations';

interface AssetCardProps {
  asset: Asset;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const AssetCard: React.FC<AssetCardProps> = ({ asset, isFavorite, onToggleFavorite }) => {
  const { formatCurrency } = useCurrency();
  const { lang } = useLanguage();
  const t = translations[lang];
  const [flashColor, setFlashColor] = useState('');
  const prevPrice = usePrevious(asset.price);

  useEffect(() => {
    if (prevPrice !== undefined && asset.price !== prevPrice) {
      setFlashColor(asset.price > prevPrice ? 'bg-emerald-500/10' : 'bg-red-500/10');
      const timer = setTimeout(() => {
        setFlashColor('');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [asset.price, prevPrice]);


  const isPositive = asset.changePercent >= 0;
  const changeColor = isPositive ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';
  const changeSymbol = isPositive ? '▲' : '▼';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(asset.id);
  };
  
  const handleNavigate = () => {
    if (window.location.hash !== `#/asset/${asset.id}`) {
        window.location.hash = `#/asset/${asset.id}`;
    }
  }

  return (
    <div className={`relative bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-1 ${flashColor}`}>
      <button 
        onClick={handleFavoriteClick}
        title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
        className="absolute top-3 right-3 text-gray-400 dark:text-slate-500 hover:text-yellow-400 transition-colors z-20 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label={isFavorite ? t.removeFromFavorites : t.addToFavorites}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill={isFavorite ? '#facc15' : 'none'} stroke={isFavorite ? '#facc15' : 'currentColor'} strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>
      
       <div
        className="block p-5 h-full cursor-pointer"
        onClick={handleNavigate}
        role="link"
        aria-label={`View details for ${asset.name}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigate();
          }
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <img src={asset.logo} alt={`${asset.name} logo`} className="w-10 h-10" style={{ filter: asset.symbol === 'AAPL' ? 'invert(1)' : 'none' }} />
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">{asset.name}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">{asset.symbol}</p>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold text-gray-900 dark:text-slate-50">{formatCurrency(asset.price, asset.baseCurrency)}</p>
          <div className={`flex items-center gap-2 text-md font-medium ${changeColor} transition-colors duration-300`}>
            <span>{changeSymbol} {formatCurrency(asset.change, asset.baseCurrency)}</span>
            <span>({asset.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
