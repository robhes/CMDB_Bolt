import React from 'react';
import { Asset } from '../../types/assets';
import { AssetCard } from './AssetCard';
import { Box } from 'lucide-react';

interface AssetListProps {
  assets: Asset[];
}

export const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Box className="w-12 h-12 mx-auto mb-2" />
        <p>No assets found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
};