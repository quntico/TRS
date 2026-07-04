import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useSiteConfig() {
  const [config, setConfig] = useState(() => {
    try {
      const local = localStorage.getItem('trs_site_config');
      return local ? JSON.parse(local) : null;
    } catch (error) {
      return null;
    }
  });
  const [loading, setLoading] = useState(!config);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .order('id', { ascending: true })
        .limit(1);

      if (error) {
        console.error('Failed to fetch site config from Supabase', error);
        const local = localStorage.getItem('trs_site_config');
        if (local) setConfig(JSON.parse(local));
      } else if (data && data.length > 0) {
        setConfig(data[0]);
        localStorage.setItem('trs_site_config', JSON.stringify(data[0]));
      } else {
        const { data: newConfig, error: createError } = await supabase
          .from('site_config')
          .insert({
            logo_url: '',
            hero_media_url: '',
            hero_media_type: 'image',
            hero_opacity: 80
          })
          .select();
        
        if (newConfig && newConfig.length > 0) {
          setConfig(newConfig[0]);
          localStorage.setItem('trs_site_config', JSON.stringify(newConfig[0]));
        }
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
        const { data: updated, error } = await supabase
          .from('site_config')
          .update(data)
          .eq('id', config.id)
          .select();

        if (error) throw error;
        if (updated && updated.length > 0) {
          setConfig(updated[0]);
          localStorage.setItem('trs_site_config', JSON.stringify(updated[0]));
          return updated[0];
        }
      } else {
        const { data: created, error } = await supabase
          .from('site_config')
          .insert(data)
          .select();

        if (error) throw error;
        if (created && created.length > 0) {
          setConfig(created[0]);
          localStorage.setItem('trs_site_config', JSON.stringify(created[0]));
          return created[0];
        }
      }
    } catch (error) {
      console.error('Failed to update config in Supabase', error);
      const updatedLocal = { ...config, ...data };
      setConfig(updatedLocal);
      localStorage.setItem('trs_site_config', JSON.stringify(updatedLocal));
      throw error;
    }
  };

  return { config, updateConfig, loading, refresh: fetchConfig };
}
