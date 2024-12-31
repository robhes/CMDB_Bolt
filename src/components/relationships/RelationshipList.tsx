import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AssetRelationship } from '../../types/assets';

export const RelationshipList: React.FC = () => {
  const [relationships, setRelationships] = React.useState<AssetRelationship[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadRelationships();
  }, []);

  const loadRelationships = async () => {
    try {
      const { data, error } = await supabase
        .from('asset_relationships')
        .select(`
          *,
          source_asset:assets!source_asset_id(name, type),
          target_asset:assets!target_asset_id(name, type)
        `);

      if (error) throw error;
      setRelationships(data || []);
    } catch (error) {
      console.error('Error loading relationships:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading relationships...</div>;
  }

  if (relationships.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Settings className="w-12 h-12 mx-auto mb-2" />
        <p>No relationships found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {relationships.map((relationship) => (
        <div
          key={relationship.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="font-medium">{relationship.source_asset?.name}</p>
              <p className="text-sm text-gray-500">{relationship.source_asset?.type}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-600">
                {relationship.relationship_type.replace('_', ' ')}
              </p>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 text-right">
              <p className="font-medium">{relationship.target_asset?.name}</p>
              <p className="text-sm text-gray-500">{relationship.target_asset?.type}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};