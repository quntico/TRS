import React from 'react';
import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import LazyBackground from './LazyBackground';

function Timeline({ backgroundProps }) {
  const milestones = [
    { year: '2007', title: 'Fundación del holding europeo', description: 'Inicio de operaciones con capital europeo.' },
    { year: '2009', title: 'Primera planta en Mérida', description: 'Arranque de operaciones de nuestra primera planta.' },
    { year: '2013-2016', title: 'Expansión en Hidalgo y Cancún', description: 'Construcción y operación del relleno sanitario.' },
    { year: '2018', title: 'Proyectos en Nayarit y Aguascalientes', description: 'Remediación ambiental y nueva planta.' },
    { year: '2020', title: 'Planta San Vicente', description: 'Inauguración de planta en el Estado de México.' },
    { year: '2026', title: 'Tuxtla y VEOLIA', description: 'Nueva planta y adquisición de la división de VEOLIA.' }
  ];
  
  return (
    <section id="trayectoria" className="relative py-24 bg-card overflow-hidden">
      <LazyBackground backgroundProps={backgroundProps}>
        <div className="absolute inset-0 bg-card/90" />
      </LazyBackground>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestra <span className="text-primary">Trayectoria</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un recorrido de crecimiento sostenido, innovación constante y compromiso con el medio ambiente.
          </p>
        </motion.div>
        
        <div className="relative">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={index}
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
