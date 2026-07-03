
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import FileUploader from './FileUploader';
import { toast } from 'sonner';

export default function HeroMediaManager() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [opacity, setOpacity] = useState(80);

  useEffect(() => {
    if (config && config.hero_opacity !== undefined) {
      setOpacity(config.hero_opacity);
    }
  }, [config]);

  const handleUpload = async (url, type) => {
    try {
      await updateConfig({ hero_media_url: url, hero_media_type: type });
      toast.success('Fondo multimedia del Hero actualizado con éxito');
    } catch (err) {
      toast.error('Error al actualizar el fondo multimedia');
    }
  };

  const handleDelete = async () => {
    try {
      await updateConfig({ hero_media_url: '', hero_media_type: 'image' });
      toast.success('Se restableció el fondo predeterminado');
    } catch (err) {
      toast.error('Error al eliminar el fondo multimedia');
    }
  };

  const handleSliderChange = (e) => {
    setOpacity(Number(e.target.value));
  };

  const handleSliderRelease = async () => {
    try {
      await updateConfig({ hero_opacity: opacity });
      toast.success('Transparencia del overlay guardada');
    } catch (err) {
      toast.error('Error al guardar la transparencia');
    }
  };

  if (loading) return <div className="animate-pulse h-48 bg-muted rounded-xl" />;

  return (
    <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-1 text-white">Multimedia del Hero</h3>
        <p className="text-xs text-muted-foreground">
          Sube un video o una imagen de fondo para la sección de inicio del sitio.
        </p>
      </div>
      
      {config?.hero_media_url ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-800 aspect-video max-w-md">
          {config.hero_media_type === 'video' ? (
            <video src={config.hero_media_url} autoPlay loop muted className="w-full h-full object-cover" />
          ) : (
            <img src={config.hero_media_url} alt="Hero Preview" className="w-full h-full object-cover" />
          )}
          <div className="absolute top-2 right-2">
            <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Eliminar Fondo
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-black/20 border border-gray-800 p-4 rounded-xl max-w-md text-center">
          <p className="text-xs text-muted-foreground">Usando imagen de fondo predeterminada (Unsplash).</p>
        </div>
      )}

      <div className="max-w-md">
        <FileUploader onUpload={handleUpload} acceptsVideo={true} />
      </div>

      <hr className="border-gray-800" />

      <div className="space-y-3 max-w-md">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-200">
            Opacidad de la Capa Oscura: <span className="text-[#B6F21A] font-semibold">{opacity}%</span>
          </label>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Ajusta la opacidad del filtro oscuro sobre el fondo. Un porcentaje mayor oscurece la imagen o video para hacer más legible el texto blanco.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">0% (Claro)</span>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
            className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#B6F21A]"
          />
          <span className="text-xs text-muted-foreground">100% (Oscuro)</span>
        </div>
      </div>
    </div>
  );
}
