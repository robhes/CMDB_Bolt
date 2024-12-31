import { useState, useMemo } from 'react';
import { Asset, AssetType, AssetStatus } from '../types/assets';

interface AssetFilters {
  type?: AssetType;
  status?: AssetStatus;
}

export const useAssetSearch = (assets: Asset[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<AssetFilters>({});

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      // Apply search query
      const matchesSearch = !searchQuery || 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Apply filters
      const matchesType = !filters.type || asset.type === filters.type;
      const matchesStatus = !filters.status || asset.status === filters.status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [assets, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredAssets,
  };
};