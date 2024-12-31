import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Asset, RelationshipType } from '../../types/assets';

interface CreateRelationshipFormProps {
  onSuccess?: () => void;
}

export const CreateRelationshipForm: React.FC<CreateRelationshipFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    sourceAssetId: '',
    targetAssetId: '',
    relationshipType: '' as RelationshipType,
  });

  React.useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('asset_relationships')
        .insert([{
          source_asset_id: formData.sourceAssetId,
          target_asset_id: formData.targetAssetId,
          relationship_type: formData.relationshipType,
          organization_id: '00000000-0000-0000-0000-000000000000', // Replace with actual org ID
        }]);

      if (error) throw error;
      onSuccess?.();
      navigate('/relationships');
    } catch (error) {
      console.error('Error creating relationship:', error);
    }
  };

  const relationshipTypes: RelationshipType[] = [
    'runs_on',
    'connects_to',
    'depends_on',
    'manages',
    'contains',
  ];

  if (loading) {
    return <div className="text-center py-8">Loading assets...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Source Asset</label>
        <select
          value={formData.sourceAssetId}
          onChange={(e) => setFormData({ ...formData, sourceAssetId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select source asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.type})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Relationship Type</label>
        <select
          value={formData.relationshipType}
          onChange={(e) => setFormData({ ...formData, relationshipType: e.target.value as RelationshipType })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select relationship type</option>
          {relationshipTypes.map((type) => (
            <option key={type} value={type}>
              {type.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Asset</label>
        <select
          value={formData.targetAssetId}
          onChange={(e) => setFormData({ ...formData, targetAssetId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select target asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.type})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => navigate('/relationships')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Relationship
        </button>
      </div>
    </form>
  );
};