
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useSectionBackgrounds } from '@/hooks/useSectionBackgrounds';
import FileUploader from './FileUploader';
import { toast } from 'sonner';

export default function SectionBackgroundManager({ sectionName }) {
  const { getBackgroundForSection, updateBackground, deleteBackground } = useSectionBackgrounds();
  const background = getBackgroundForSection(sectionName);
  const [localOpacity, setLocalOpacity] = useState(background?.opacity ?? 100);

  const handleUpload = async (url, type) => {
    try {
      await updateBackground(sectionName, { media_url: url, media_type: type, opacity: localOpacity });
      toast.success(`Fondo de ${sectionName} actualizado`);
    } catch (err) {
      toast.error('Error al actualizar');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBackground(sectionName);
      toast.success(`Fondo de ${sectionName} eliminado`);
    } catch (err) {
      toast.error('Error al eliminar');
    }
  };

  const handleOpacityChange = async (val) => {
    const newOpacity = val[0];
    setLocalOpacity(newOpacity);
    if (background?.media_url) {
      try {
        await updateBackground(sectionName, { opacity: newOpacity });
      } catch (err) {}
    }
  };

  return (
    <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800">
      <h4 className="text-lg font-bold mb-4 text-white">{sectionName}</h4>
      
      {background?.media_url ? (
        <div className="space-y-4 mb-6">
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video max-w-sm border border-gray-800">
            <div className="absolute inset-0 z-0" style={{ opacity: localOpacity / 100 }}>
              {background.media_type === 'video' ? (
                <video src={background.media_url} autoPlay loop muted className="w-full h-full object-cover" />
              ) : (
                <img src={background.media_url} alt={sectionName} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
              <span className="text-white font-bold text-shadow bg-black/30 px-2 py-1 rounded">Vista Previa</span>
            </div>
            <div className="absolute top-2 right-2 z-20">
              <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
                Eliminar
              </Button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2 text-gray-400">
              <span>Opacidad del Fondo</span>
              <span>{localOpacity}%</span>
            </div>
            <Slider
              value={[localOpacity]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleOpacityChange}
              className="w-full max-w-sm"
            />
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground mb-4 text-sm">Sin fondo personalizado (usando predeterminado).</p>
      )}

      <FileUploader onUpload={handleUpload} acceptsVideo={true} />
    </div>
  );
}
