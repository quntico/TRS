import React from 'react';
import { motion } from 'framer-motion';
import OfficeCard from './OfficeCard';
import ContactForm from './ContactForm';
import LazyBackground from './LazyBackground';

function Contacto({ backgroundProps }) {
  const offices = [
    { name: 'Grupo TRS', address: 'Tennyson 97, Polanco, CDMX', email: 'diego@grupo-trs.com', phone: '5588517873' },
    { name: 'SMQ LATAM', address: 'Arquímedes 130, Polanco, CDMX', email: 'direccion@smq.mx', phone: null },
    { name: 'SMQ International', address: 'Lindong Village, China', email: null, phone: null }
  ];
  
  return (
    <section id="contacto" className="relative py-24 bg-zinc-100 text-zinc-900 overflow-hidden">
      <LazyBackground backgroundProps={backgroundProps}>
        <div className="absolute inset-0 bg-zinc-100/90" />
      </LazyBackground>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900">Contacto</h2>
          <p className="text-xl text-zinc-600">Nuestras oficinas, cerca de ti.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {offices.map((office, index) => (
            <OfficeCard key={index} {...office} index={index} />
          ))}
        </div>
        
        <motion.div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 border-l-4 border-primary shadow-xl">
          <h3 className="text-2xl font-bold mb-2 text-zinc-900">Envíanos un mensaje</h3>
          <p className="text-zinc-600 mb-8">Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

export default Contacto;
