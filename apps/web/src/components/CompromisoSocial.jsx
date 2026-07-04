import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Heart, Users, Briefcase } from 'lucide-react';
import ImpactPoint from './ImpactPoint';
import LazyBackground from './LazyBackground';

function CompromisoSocial({ backgroundProps }) {
  const impacts = [
    { icon: Droplet, title: 'Conservación de cenotes', description: 'Inversión de $8 millones USD en conservación en la península de Yucatán.' },
    { icon: Heart, title: 'Apoyo a Siresol', description: 'Destinamos 20% de ingresos a la asociación civil Siresol en Cancún.' },
    { icon: Users, title: 'Comunidades indígenas', description: 'Programas de empleo directo con comunidades indígenas locales.' },
    { icon: Briefcase, title: 'Generación de empleos', description: 'Más de 500 empleos directos formales en 9 estados.' }
  ];
  
  return (
    <section id="sostenibilidad" className="relative py-24 bg-background text-foreground overflow-hidden">
      <LazyBackground backgroundProps={backgroundProps}>
        <div className="absolute inset-0 bg-background/85" />
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Compromiso Social y <span className="text-primary">Ambiental</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nuestro impacto va más allá de la gestión de residuos. Generamos valor compartido con las comunidades donde operamos.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {impacts.map((impact, index) => (
            <ImpactPoint key={index} {...impact} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CompromisoSocial;
