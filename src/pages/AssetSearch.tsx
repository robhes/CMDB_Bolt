import React from 'react';
import { useAssets } from '../hooks/useAssets';
import { AssetSearchBar } from '../components/assets/AssetSearchBar';
import { AssetList } from '../components/assets/AssetList';
import { useAssetSearch } from '../hooks/useAssetSearch';

const AssetSearch: React.FC = () => {
  const { assets, loading, error } = useAssets();
  const { searchQuery, setSearchQuery, filters, setFilters, filteredAssets } = useAssetSearch(assets);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading assets...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Asset Search</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <AssetSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="mt-6">
          <AssetList assets={filteredAssets} />
        </div>
      </div>
    </div>
  );
}

export default AssetSearch;