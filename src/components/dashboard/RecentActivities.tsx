import React from 'react';
import { format } from 'date-fns';
import { Asset } from '../../types/assets';

interface RecentActivitiesProps {
  assets: Asset[];
}

export function RecentActivities({ assets }: RecentActivitiesProps) {
  const sortedAssets = [...assets].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {sortedAssets.length === 0 ? (
          <p className="text-gray-600">No recent activities</p>
        ) : (
          sortedAssets.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{asset.name}</p>
                <p className="text-sm text-gray-500">Added new {asset.type} asset</p>
              </div>
              <p className="text-sm text-gray-500">
                {format(new Date(asset.created_at), 'MMM d, yyyy')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}