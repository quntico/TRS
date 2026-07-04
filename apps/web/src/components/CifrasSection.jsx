import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, Users, MapPin } from 'lucide-react';
import MetricCard from './MetricCard';

function CifrasSection({ backgroundProps }) {
  const metrics = [
    { value: '17', label: 'Años de operación', icon: Calendar, suffix: '+' },
    { value: '7', label: 'Plantas diseñadas y construidas', icon: Building2, suffix: '' },
    { value: '500', label: 'Empleos directos', icon: Users, suffix: '+' },
    { value: '9', label: 'Estados con operación', icon: MapPin, suffix: '' }
  ];
  
  return (
    <section id="cifras" className="relative py-24 bg-background overflow-hidden">
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
      <div className="absolute inset-0 grid-pattern opacity-10 z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trayectoria y <span className="text-primary">Cifras</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Más de una década y media de experiencia consolidada en el sector ambiental mexicano, con presencia nacional y resultados medibles.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
              icon={metric.icon}
              suffix={metric.suffix}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CifrasSection;
