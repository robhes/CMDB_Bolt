import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Asset } from '../types/assets';

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAssets() {
      try {
        const { data, error } = await supabase
          .from('assets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAssets(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assets');
      } finally {
        setLoading(false);
      }
    }

    loadAssets();
  }, []);

  return { assets, loading, error };
}