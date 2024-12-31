import React, { useEffect, useState } from 'react';
import { Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Asset } from '../types/assets';

const HardwareAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*, hardware_assets(*)')
        .eq('type', 'hardware');

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading assets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Hardware Assets</h1>
        <div className="flex gap-4">
          <Link
            to="/search"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Search Assets
          </Link>
          <Link
            to="/hardware/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Hardware
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {assets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Server className="w-12 h-12 mx-auto mb-2" />
            <p>No hardware assets found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{asset.name}</h3>
                    <p className="text-sm text-gray-500">{asset.description}</p>
                    {asset.hardware_assets && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Manufacturer: {asset.hardware_assets.manufacturer || 'N/A'}</p>
                        <p>Model: {asset.hardware_assets.model || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {asset.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareAssets;