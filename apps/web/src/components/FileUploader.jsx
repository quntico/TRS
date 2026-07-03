
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
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    // Validate size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size exceeds 50MB limit.');
      return;
    }

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      toast.error('Invalid file type. Only images and videos are supported.');
      return;
    }

    if (isVideo && !acceptsVideo) {
      toast.error('Videos are not allowed here.');
      return;
    }

    setUploading(true);
    setProgress(0);

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
      setTimeout(() => {
        onUpload(publicUrl, isVideo ? 'video' : 'image');
        setUploading(false);
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setUploading(false);
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
    setExternalUrl('');
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="sm" onClick={() => setUseUrlMode(!useUrlMode)} className="text-xs">
          <LinkIcon className="w-4 h-4 mr-2" />
          {useUrlMode ? 'Switch to File Upload' : 'Provide URL instead'}
        </Button>
      </div>

      {useUrlMode ? (
        <div className="flex items-center gap-2">
          <Input 
            placeholder="https://example.com/image.jpg" 
            value={externalUrl} 
            onChange={(e) => setExternalUrl(e.target.value)} 
          />
          <Button onClick={handleUrlSubmit} className="bg-primary text-black hover:bg-primary/80">Save URL</Button>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'
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
              <div className="text-sm font-medium">Uploading... {progress}%</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 cursor-pointer">
              <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Drag & drop your file here</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP{acceptsVideo ? ', MP4, WEBM' : ''} (Max 50MB)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
