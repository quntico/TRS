import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Layers, TrendingUp } from 'lucide-react';
import OperationCard from './OperationCard';
import LazyBackground from './LazyBackground';

function Operacion({ backgroundProps }) {
  const operations = [
    { icon: Recycle, title: 'Separación mecanizada', description: 'Líneas automatizadas de última generación para la clasificación.' },
    { icon: Layers, title: 'Cribado por trommel', description: 'Tecnología rotativa que permite la separación granulométrica.' },
    { icon: TrendingUp, title: 'Recuperación eficiente', description: 'Sistemas que garantizan altos índices de aprovechamiento.' }
  ];
  
  return (
    <section id="operacion" className="relative py-24 bg-background overflow-hidden">
      <LazyBackground backgroundProps={backgroundProps}>
        <div className="absolute inset-0 bg-background/80" />
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
            Nuestra <span className="text-primary">Operación</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Contamos con líneas mecanizadas de separación y equipamiento especializado para el procesamiento eficiente de residuos sólidos urbanos.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {operations.map((operation, index) => (
            <OperationCard
              key={index}
              icon={operation.icon}
              title={operation.title}
              description={operation.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Operacion;
