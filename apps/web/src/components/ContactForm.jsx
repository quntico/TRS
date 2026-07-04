import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      localStorage.setItem('contactForm', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString()
      }));
      
      toast.success('Mensaje enviado correctamente');
      
      setFormData({
        nombre: '',
        empresa: '',
        correo: '',
        telefono: '',
        mensaje: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="nombre" className="text-zinc-900 mb-2 block font-medium">Nombre *</Label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-primary"
            placeholder="Tu nombre completo"
          />
        </div>
        
        <div>
          <Label htmlFor="empresa" className="text-zinc-900 mb-2 block font-medium">Empresa</Label>
          <Input
            id="empresa"
            name="empresa"
            type="text"
            value={formData.empresa}
            onChange={handleChange}
            className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-primary"
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="correo" className="text-zinc-900 mb-2 block font-medium">Correo electrónico *</Label>
          <Input
            id="correo"
            name="correo"
            type="email"
            required
            value={formData.correo}
            onChange={handleChange}
            className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-primary"
            placeholder="tu@email.com"
          />
        </div>
        
        <div>
          <Label htmlFor="telefono" className="text-zinc-900 mb-2 block font-medium">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleChange}
            className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-primary"
            placeholder="+52 55 1234 5678"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="mensaje" className="text-zinc-900 mb-2 block font-medium">Mensaje *</Label>
        <Textarea
          id="mensaje"
          name="mensaje"
          required
          value={formData.mensaje}
          onChange={handleChange}
          rows={6}
          className="bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-primary resize-none"
          placeholder="Cuéntanos sobre tu proyecto o consulta..."
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold transition-all duration-200 active:scale-[0.98]"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </form>
  );
}

export default ContactForm;
