import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, DollarSign, Award, FileCheck, Users } from 'lucide-react';
import AllianceItem from './AllianceItem';
import LazyBackground from './LazyBackground';

function Alianzas({ backgroundProps }) {
  const alliances = [
    { icon: HeartHandshake, title: 'USAID, Siemens y Evensen', description: 'Colaboración estratégica para proyectos de valorización.' },
    { icon: DollarSign, title: 'NREL', description: 'Estructuración financiera con respaldo de laboratorio nacional de EE.UU.' },
    { icon: Award, title: 'UN CDM-UNFCCC', description: 'Registro de proyectos de biodigestión y bonos de carbono.' },
    { icon: FileCheck, title: 'SEMARNAT', description: 'Contrato federal para la operación de infraestructura.' },
    { icon: Users, title: 'VEOLIA', description: 'Adquisición de talento especializado en reciclaje.' }
  ];
  
  return (
    <section id="alianzas" className="relative py-24 bg-card overflow-hidden">
      <LazyBackground backgroundProps={backgroundProps}>
        <div className="absolute inset-0 bg-card/85" />
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
            Alianzas <span className="text-primary">Estrategicas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Colaboraciones con organizaciones líderes a nivel nacional e internacional.
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {alliances.map((alliance, index) => (
            <AllianceItem key={index} {...alliance} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Alianzas;
