
import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

export function useSiteConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const records = await pb.collection('site_config').getFullList({ $autoCancel: false });
      if (records.length > 0) {
        setConfig(records[0]);
      } else if (pb.authStore.isValid) {
        // Create initial config if admin is logged in
        const newConfig = await pb.collection('site_config').create({
          logo_url: '',
          hero_media_url: '',
          hero_media_type: 'image'
        }, { $autoCancel: false });
        setConfig(newConfig);
      }
    } catch (error) {
      console.error('Failed to fetch site config', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const updateConfig = async (data) => {
    try {
      if (config?.id) {
        const updated = await pb.collection('site_config').update(config.id, data, { $autoCancel: false });
        setConfig(updated);
        return updated;
      } else {
        const created = await pb.collection('site_config').create(data, { $autoCancel: false });
        setConfig(created);
        return created;
      }
    } catch (error) {
      console.error('Failed to update config', error);
      throw error;
    }
  };

  return { config, updateConfig, loading, refresh: fetchConfig };
}
