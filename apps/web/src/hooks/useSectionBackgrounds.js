
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useSectionBackgrounds() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBackgrounds = async () => {
    try {
      const { data, error } = await supabase
        .from('section_backgrounds')
        .select('*');

      if (error) {
        console.error('Failed to fetch backgrounds from Supabase', error);
        const local = localStorage.getItem('trs_section_backgrounds');
        if (local) setBackgrounds(JSON.parse(local));
      } else {
        setBackgrounds(data ?? []);
        localStorage.setItem('trs_section_backgrounds', JSON.stringify(data ?? []));
      }
    } catch (error) {
      console.error('Failed to fetch backgrounds', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const getBackgroundForSection = (sectionName) => {
    return backgrounds.find(bg => bg.section_name === sectionName);
  };

  const updateBackground = async (sectionName, data) => {
    try {
      const existing = getBackgroundForSection(sectionName);
      let result;
      if (existing) {
        const { data: updated, error } = await supabase
          .from('section_backgrounds')
          .update(data)
          .eq('id', existing.id)
          .select();

        if (error) throw error;
        result = updated?.[0];
      } else {
        const { data: created, error } = await supabase
          .from('section_backgrounds')
          .insert({
            section_name: sectionName,
            ...data
          })
          .select();

        if (error) throw error;
        result = created?.[0];
      }
      await fetchBackgrounds();
      return result;
    } catch (error) {
      console.error('Failed to update background in Supabase', error);
      // Local fallback
      const existing = getBackgroundForSection(sectionName);
      let updatedBackgrounds;
      if (existing) {
        updatedBackgrounds = backgrounds.map(bg => 
          bg.section_name === sectionName ? { ...bg, ...data } : bg
        );
      } else {
        updatedBackgrounds = [...backgrounds, { id: Math.random().toString(), section_name: sectionName, ...data }];
      }
      setBackgrounds(updatedBackgrounds);
      localStorage.setItem('trs_section_backgrounds', JSON.stringify(updatedBackgrounds));
      throw error;
    }
  };

  const deleteBackground = async (sectionName) => {
    try {
      const existing = getBackgroundForSection(sectionName);
      if (existing) {
        const { error } = await supabase
          .from('section_backgrounds')
          .delete()
          .eq('id', existing.id);

        if (error) throw error;
        await fetchBackgrounds();
      }
    } catch (error) {
      console.error('Failed to delete background from Supabase', error);
      const updatedBackgrounds = backgrounds.filter(bg => bg.section_name !== sectionName);
      setBackgrounds(updatedBackgrounds);
      localStorage.setItem('trs_section_backgrounds', JSON.stringify(updatedBackgrounds));
      throw error;
    }
  };

  return { backgrounds, getBackgroundForSection, updateBackground, deleteBackground, loading, refresh: fetchBackgrounds };
}
