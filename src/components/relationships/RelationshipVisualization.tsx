import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Asset, AssetRelationship } from '../../types/assets';
import { RelationshipGraph } from './RelationshipGraph';
import { SearchInput } from '../search/SearchInput';
import { FilterDropdown } from '../filters/FilterDropdown';
import { assetTypeColors } from '../../utils/colors';

export const RelationshipVisualization: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [relationships, setRelationships] = useState<AssetRelationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [assetsResponse, relationshipsResponse] = await Promise.all([
        supabase.from('assets').select('*'),
        supabase.from('asset_relationships').select('*'),
      ]);

      if (assetsResponse.error) throw assetsResponse.error;
      if (relationshipsResponse.error) throw relationshipsResponse.error;

      setAssets(assetsResponse.data || []);
      setRelationships(relationshipsResponse.data || []);
    } catch (error) {
      console.error('Error loading visualization data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = React.useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = !searchQuery || 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || asset.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [assets, searchQuery, selectedType]);

  const filteredRelationships = React.useMemo(() => {
    const filteredAssetIds = new Set(filteredAssets.map(a => a.id));
    return relationships.filter(rel => 
      filteredAssetIds.has(rel.source_asset_id) && 
      filteredAssetIds.has(rel.target_asset_id)
    );
  }, [relationships, filteredAssets]);

  if (loading) {
    return <div className="text-center py-8">Loading visualization...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search assets..."
        />
        <FilterDropdown
          label="Asset Type"
          value={selectedType}
          options={[
            { value: 'hardware', label: 'Hardware' },
            { value: 'software', label: 'Software' },
          ]}
          onChange={setSelectedType}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <RelationshipGraph
          assets={filteredAssets}
          relationships={filteredRelationships}
          onNodeClick={(asset) => {
            console.log('Clicked asset:', asset);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: assetTypeColors.hardware }}></div>
              <span>Hardware Assets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: assetTypeColors.software }}></div>
              <span>Software Assets</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Statistics</h3>
          <div className="space-y-1">
            <p>Total Assets: {filteredAssets.length}</p>
            <p>Total Relationships: {filteredRelationships.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};