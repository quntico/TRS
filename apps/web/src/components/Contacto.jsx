import React from 'react';
import { motion } from 'framer-motion';
import OfficeCard from './OfficeCard';
import ContactForm from './ContactForm';

function Contacto({ backgroundProps }) {
  const offices = [
    { name: 'Grupo TRS', address: 'Tennyson 97, Polanco, CDMX', email: 'diego@grupo-trs.com', phone: '5588517873' },
    { name: 'SMQ LATAM', address: 'Arquímedes 130, Polanco, CDMX', email: 'direccion@smq.mx', phone: null },
    { name: 'SMQ International', address: 'Lindong Village, China', email: null, phone: null }
  ];
  
  return (
    <section id="contacto" className="relative py-24 bg-background text-foreground overflow-hidden">
      {backgroundProps?.media_url && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: (backgroundProps.opacity ?? 100) / 100 }}>
          {backgroundProps.media_type === 'video' ? (
            <video src={backgroundProps.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={backgroundProps.media_url} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-background/85" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contacto</h2>
          <p className="text-xl text-gray-300">Nuestras oficinas, cerca de ti.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {offices.map((office, index) => (
            <OfficeCard key={index} {...office} index={index} />
          ))}
        </div>
        
        <motion.div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-12 border-l-4 border-primary shadow-xl">
          <h3 className="text-2xl font-bold mb-2 text-white">Envíanos un mensaje</h3>
          <p className="text-gray-300 mb-8">Completa el formulario y nos pondremos en contacto contigo a la brevedad.</p>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

export default Contacto;
