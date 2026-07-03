
import React, { useState, useRef } from 'react';
import { UploadCloud, X, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

export default function FileUploader({ onUpload, acceptsVideo = true }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [externalUrl, setExternalUrl] = useState('');
  const [useUrlMode, setUseUrlMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    // Validate size (100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('El archivo supera el límite de 100MB.');
      return;
    }

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      toast.error('Tipo de archivo no válido. Solo se admiten imágenes y videos.');
      return;
    }

    if (isVideo && !acceptsVideo) {
      toast.error('No se permiten videos en esta sección.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setUploadedFile({ name: file.name, status: 'uploading' });

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 10, 90));
    }, 100);

    try {
      const bucket = 'site_assets';
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      clearInterval(interval);
      setProgress(100);
      setUploadedFile({ name: file.name, status: 'success' });
      toast.success('Archivo subido exitosamente a la nube de Supabase.');

      setTimeout(() => {
        onUpload(publicUrl, isVideo ? 'video' : 'image');
        setUploading(false);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setUploading(false);
      setUploadedFile({ name: file.name, status: 'error' });
      console.error('Upload failed, attempting Base64 fallback', err);
      toast.error('Error al subir a Supabase. Guardando localmente...');
      
      // Fallback to Base64 to not block the UI completely
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setProgress(100);
          setTimeout(() => {
            onUpload(reader.result, isVideo ? 'video' : 'image');
            toast.warning('Guardado localmente como Base64 (puede fallar al guardar en base de datos si el archivo es grande).');
          }, 500);
        };
      } catch (fallbackErr) {
        toast.error('Fallo total de la subida.');
      }
    }
  };

  const handleUrlSubmit = () => {
    if (!externalUrl) return;
    const isVideo = externalUrl.match(/\.(mp4|webm)$/i);
    onUpload(externalUrl, isVideo ? 'video' : 'image');
    setUploadedFile({ name: externalUrl, status: 'success' });
    setExternalUrl('');
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="sm" onClick={() => setUseUrlMode(!useUrlMode)} className="text-xs text-gray-400 hover:text-white hover:bg-gray-800">
          <LinkIcon className="w-4 h-4 mr-2" />
          {useUrlMode ? 'Subir Archivo' : 'Provide URL instead'}
        </Button>
      </div>

      {useUrlMode ? (
        <div className="flex items-center gap-2">
          <Input 
            placeholder="https://example.com/image.jpg" 
            value={externalUrl} 
            onChange={(e) => setExternalUrl(e.target.value)} 
            className="bg-black/30 border-gray-800 text-white"
          />
          <Button onClick={handleUrlSubmit} className="bg-[#B6F21A] text-black hover:bg-[#B6F21A]/80">Save URL</Button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
            dragActive ? 'border-[#B6F21A] bg-[#B6F21A]/5' : 'border-gray-800 hover:border-[#B6F21A]/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          
          {uploading ? (
            <div className="space-y-4">
              <div className="text-sm font-medium text-white">Subiendo "{uploadedFile?.name}"... {progress}%</div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-[#B6F21A] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : uploadedFile?.status === 'success' ? (
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <span className="text-4xl">✅</span>
              <p className="text-sm font-medium text-[#B6F21A]">"{uploadedFile.name.substring(0, 40)}" subido con éxito</p>
              <p className="text-xs text-muted-foreground">Haz clic o arrastra otro archivo para cambiarlo</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-white">Drag & drop your file here</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP{acceptsVideo ? ', MP4, WEBM' : ''} (Max 100MB)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

