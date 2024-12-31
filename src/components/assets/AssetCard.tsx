import React from 'react';
import { Asset } from '../../types/assets';

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const renderAssetDetails = () => {
    if (asset.type === 'software' && asset.software_assets) {
      return (
        <div className="mt-2 text-sm text-gray-600">
          <p>Version: {asset.software_assets.version || 'N/A'}</p>
          <p>Vendor: {asset.software_assets.vendor || 'N/A'}</p>
        </div>
      );
    } else if (asset.type === 'hardware' && asset.hardware_assets) {
      return (
        <div className="mt-2 text-sm text-gray-600">
          <p>Manufacturer: {asset.hardware_assets.manufacturer || 'N/A'}</p>
          <p>Model: {asset.hardware_assets.model || 'N/A'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{asset.name}</h3>
          <p className="text-sm text-gray-500">{asset.description}</p>
          {renderAssetDetails()}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {asset.status}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {asset.type}
          </span>
        </div>
      </div>
    </div>
  );
};