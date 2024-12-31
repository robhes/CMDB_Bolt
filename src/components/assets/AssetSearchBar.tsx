import React from 'react';
import { SearchInput } from '../search/SearchInput';
import { FilterDropdown } from '../filters/FilterDropdown';
import { AssetType, AssetStatus } from '../../types/assets';

interface AssetSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    type?: AssetType;
    status?: AssetStatus;
  };
  onFilterChange: (key: string, value: string) => void;
}

export const AssetSearchBar: React.FC<AssetSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
}) => {
  const typeOptions = [
    { value: 'hardware', label: 'Hardware' },
    { value: 'software', label: 'Software' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'retired', label: 'Retired' },
  ];

  return (
    <div className="space-y-4">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search assets..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FilterDropdown
          label="Asset Type"
          value={filters.type || ''}
          options={typeOptions}
          onChange={(value) => onFilterChange('type', value)}
        />
        <FilterDropdown
          label="Status"
          value={filters.status || ''}
          options={statusOptions}
          onChange={(value) => onFilterChange('status', value)}
        />
      </div>
    </div>
  );
};