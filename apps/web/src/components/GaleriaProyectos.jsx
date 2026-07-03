
import React from 'react';
import { motion } from 'framer-motion';
import GalleryImage from './GalleryImage';

function GaleriaProyectos({ backgroundProps }) {
  const images = [
    { src: 'https://images.unsplash.com/photo-1602499199350-fe0651758979', alt: 'Planta de reciclaje', description: 'Línea mecanizada en operación' },
    { src: 'https://images.unsplash.com/photo-1626178789615-38b80689d33a', alt: 'Infraestructura', description: 'Vista aérea' },
    { src: 'https://images.unsplash.com/photo-1567516847971-81df16eefa90', alt: 'Instalaciones', description: 'Equipamiento' },
    { src: 'https://images.unsplash.com/photo-1589839591369-348e67364223', alt: 'Tecnología', description: 'Sistemas de monitoreo' }
  ];
  
  return (
    <section id="galeria" className="relative py-24 bg-background overflow-hidden">
      {backgroundProps?.media_url && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: (backgroundProps.opacity ?? 100) / 100 }}>
          {backgroundProps.media_type === 'video' ? (
            <video src={backgroundProps.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={backgroundProps.media_url} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-background/80" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proyecto <span className="text-primary">Cancún</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nuestra planta en Cancún representa la excelencia operativa en el Caribe mexicano.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <GalleryImage key={index} {...image} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GaleriaProyectos;
