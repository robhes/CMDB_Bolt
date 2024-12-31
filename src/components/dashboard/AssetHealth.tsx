import React from 'react';
import { Asset } from '../../types/assets';

interface AssetHealthProps {
  assets: Asset[];
}

export function AssetHealth({ assets }: AssetHealthProps) {
  const statusCounts = assets.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statuses = [
    { label: 'Active', key: 'active', color: 'bg-green-100 text-green-800' },
    { label: 'Maintenance', key: 'maintenance', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Inactive', key: 'inactive', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Health</h2>
      <div className="space-y-4">
        {statuses.map(({ label, key, color }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                {label}
              </span>
            </div>
            <span className="text-sm text-gray-500">{statusCounts[key] || 0} assets</span>
          </div>
        ))}
      </div>
    </div>
  );
}