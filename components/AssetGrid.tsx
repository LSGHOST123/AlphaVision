
import React from 'react';
import { Asset } from '../types';
import AssetCard from './AssetCard';

interface AssetGridProps {
  assets: Asset[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const AssetGrid: React.FC<AssetGridProps> = ({ assets, favorites, onToggleFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          isFavorite={favorites.has(asset.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default AssetGrid;