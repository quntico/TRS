
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function AdminLoginModal({ onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      setError('');
      if (onClose) onClose();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1B1B1B] border border-[#2a2a2a] rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
        
        <h2 className="text-2xl font-bold mb-2 text-white">Acceso Admin</h2>
        <p className="text-muted-foreground mb-6">Ingresa la contraseña del panel de edición.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-gray-700 text-white"
            />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>
          
          <Button type="submit" className="w-full bg-[#B6F21A] hover:bg-[#B6F21A]/90 text-black font-bold">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}
