
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import FileUploader from './FileUploader';
import { toast } from 'sonner';

export default function HeroMediaManager() {
  const { config, updateConfig, loading } = useSiteConfig();

  const handleUpload = async (url, type) => {
    try {
      await updateConfig({ hero_media_url: url, hero_media_type: type });
      toast.success('Hero media updated successfully');
    } catch (err) {
      toast.error('Failed to update hero media');
    }
  };

  const handleDelete = async () => {
    try {
      await updateConfig({ hero_media_url: '', hero_media_type: 'image' });
      toast.success('Hero media removed');
    } catch (err) {
      toast.error('Failed to remove hero media');
    }
  };

  if (loading) return <div className="animate-pulse h-48 bg-muted rounded-xl" />;

  return (
    <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-semibold mb-4 text-white">Hero Background Media</h3>
      
      {config?.hero_media_url ? (
        <div className="mb-6 relative rounded-xl overflow-hidden border border-gray-800 aspect-video max-w-md">
          {config.hero_media_type === 'video' ? (
            <video src={config.hero_media_url} autoPlay loop muted className="w-full h-full object-cover" />
          ) : (
            <img src={config.hero_media_url} alt="Hero" className="w-full h-full object-cover" />
          )}
          <div className="absolute top-2 right-2">
            <Button variant="destructive" size="sm" onClick={handleDelete}>Remove</Button>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground mb-4">No custom hero media configured. Using default image.</p>
      )}

      <FileUploader onUpload={handleUpload} acceptsVideo={true} />
    </div>
  );
}
