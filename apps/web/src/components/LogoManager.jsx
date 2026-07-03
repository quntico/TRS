
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import FileUploader from './FileUploader';
import { toast } from 'sonner';

export default function LogoManager() {
  const { config, updateConfig, loading } = useSiteConfig();

  const handleUpload = async (url) => {
    try {
      await updateConfig({ logo_url: url });
      toast.success('Logo actualizado con éxito');
    } catch (err) {
      toast.error('Error al actualizar el logo');
    }
  };

  const handleDelete = async () => {
    try {
      await updateConfig({ logo_url: '' });
      toast.success('Logo eliminado');
    } catch (err) {
      toast.error('Error al eliminar el logo');
    }
  };

  if (loading) return <div className="animate-pulse h-32 bg-muted rounded-xl" />;

  return (
    <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-gray-800">
      <h3 className="text-xl font-semibold mb-4 text-white">Logo del Sitio</h3>
      
      {config?.logo_url ? (
        <div className="mb-6 bg-black/40 p-4 rounded-xl inline-block border border-gray-800">
          <img src={config.logo_url} alt="Logo del Sitio" className="h-16 object-contain" />
          <div className="mt-4">
            <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>
              Eliminar Logo
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground mb-4">No hay logo configurado. Usando logo de texto predeterminado.</p>
      )}

      <FileUploader onUpload={handleUpload} acceptsVideo={false} />
    </div>
  );
}
