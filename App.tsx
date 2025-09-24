import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import AssetGrid from './components/AssetGrid';
import LoadingSpinner from './components/LoadingSpinner';
import Controls from './components/Controls';
import AssetDetailView from './components/AssetDetailView';
import MarketOverview from './components/MarketOverview';
import { subscribeToMarketData } from './services/marketDataService';
import { Asset } from './types';
import { useLanguage } from './contexts';
import { translations } from './translations';
import { loadFavorites, saveFavorites } from './services/localStorageService';

const MARKET_OVERVIEW_SYMBOLS = ['IBOV', 'SPX', 'DJI', 'IXIC', 'USD/BRL', 'EUR/BRL'];

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('name_asc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [route, setRoute] = useState(window.location.hash);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange, false);
    return () => window.removeEventListener('hashchange', handleHashChange, false);
  }, []);

  useEffect(() => {
    setFavorites(loadFavorites());
    setIsInitialLoading(true);
    let hasLoaded = false;
    
    const unsubscribe = subscribeToMarketData((updatedAssets) => {
      setAssets(updatedAssets);
      if (!hasLoaded) {
        setIsInitialLoading(false);
        hasLoaded = true;
      }
    });

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };
  
  const handleToggleFavorite = (assetId: string) => {
    setFavorites(prevFavorites => {
        const newFavorites = new Set(prevFavorites);
        if (newFavorites.has(assetId)) {
            newFavorites.delete(assetId);
        } else {
            newFavorites.add(assetId);
        }
        return newFavorites;
    });
  };

  const handleShowFavoritesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowFavoritesOnly(e.target.checked);
  };

  const { marketOverviewAssets, gridAssets } = useMemo(() => {
    const overview = assets.filter(a => MARKET_OVERVIEW_SYMBOLS.includes(a.symbol));
    const grid = assets.filter(a => !MARKET_OVERVIEW_SYMBOLS.includes(a.symbol));
    return { marketOverviewAssets: overview, gridAssets: grid };
  }, [assets]);


  const filteredAndSortedAssets = useMemo(() => {
    const [key, order] = sortValue.split('_');

    return gridAssets
      .filter(asset =>
        (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!showFavoritesOnly || favorites.has(asset.id))
      )
      .sort((a, b) => {
        const aIsFavorite = favorites.has(a.id);
        const bIsFavorite = favorites.has(b.id);
        
        if (!showFavoritesOnly) {
            if (aIsFavorite && !bIsFavorite) return -1;
            if (!aIsFavorite && bIsFavorite) return 1;
        }

        let comparison = 0;
        if (key === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (key === 'price') {
          comparison = b.price - a.price;
        } else if (key === 'changePercent') {
          comparison = b.changePercent - a.changePercent;
        }

        if (order === 'asc') {
            if (key === 'price' || key === 'changePercent') return -comparison;
            return comparison;
        }
        if (order === 'desc' && key === 'name') return -comparison;
        return comparison;
      });
  }, [gridAssets, searchTerm, sortValue, favorites, showFavoritesOnly]);
  
  const assetIdFromRoute = useMemo(() => {
      if (route.startsWith('#/asset/')) {
          return route.split('/')[2];
      }
      return null;
  }, [route]);

  const assetForDetailView = useMemo(() => {
      if (!assetIdFromRoute || assets.length === 0) return null;
      return assets.find(a => a.id === assetIdFromRoute) || null;
  }, [assetIdFromRoute, assets]);

  const renderContent = () => {
    if (isInitialLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <LoadingSpinner size="h-16 w-16" />
          <p className="mt-4 text-xl text-gray-500 dark:text-slate-400">{t.loadingMarket}</p>
        </div>
      );
    }

    if (assetForDetailView) {
      return (
        <AssetDetailView 
          key={assetForDetailView.id}
          asset={assetForDetailView}
          isFavorite={favorites.has(assetForDetailView.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      );
    }
    
    if (assetIdFromRoute && !assetForDetailView) {
        // Asset ID in URL but not found in state yet (still loading or invalid)
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner size="h-16 w-16" />
                <p className="mt-4 text-xl text-gray-500 dark:text-slate-400">{t.loadingAsset}</p>
            </div>
        );
    }

    return (
      <>
        <MarketOverview assets={marketOverviewAssets} />
        <Controls 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          sortValue={sortValue}
          onSortChange={handleSortChange}
          showFavoritesOnly={showFavoritesOnly}
          onShowFavoritesChange={handleShowFavoritesChange}
        />
        <AssetGrid 
          assets={filteredAndSortedAssets} 
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-sans min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;