
import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

export function useSectionBackgrounds() {
  const [backgrounds, setBackgrounds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBackgrounds = async () => {
    try {
      const records = await pb.collection('section_backgrounds').getFullList({ $autoCancel: false });
      setBackgrounds(records);
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
        result = await pb.collection('section_backgrounds').update(existing.id, data, { $autoCancel: false });
      } else {
        result = await pb.collection('section_backgrounds').create({
          section_name: sectionName,
          ...data
        }, { $autoCancel: false });
      }
      await fetchBackgrounds();
      return result;
    } catch (error) {
      console.error('Failed to update background', error);
      throw error;
    }
  };

  const deleteBackground = async (sectionName) => {
    try {
      const existing = getBackgroundForSection(sectionName);
      if (existing) {
        await pb.collection('section_backgrounds').delete(existing.id, { $autoCancel: false });
        await fetchBackgrounds();
      }
    } catch (error) {
      console.error('Failed to delete background', error);
      throw error;
    }
  };

  return { backgrounds, getBackgroundForSection, updateBackground, deleteBackground, loading, refresh: fetchBackgrounds };
}
