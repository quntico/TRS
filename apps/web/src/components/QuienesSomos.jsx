
import React from 'react';
import { motion } from 'framer-motion';

function QuienesSomos({ backgroundProps }) {
  return (
    <section id="quienes-somos" className="relative py-24 bg-card overflow-hidden">
      {backgroundProps?.media_url && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: (backgroundProps.opacity ?? 100) / 100 }}>
          {backgroundProps.media_type === 'video' ? (
            <video src={backgroundProps.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={backgroundProps.media_url} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Quiénes <span className="text-primary">Somos</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Grupo TRS es un holding mexicano con más de 17 años de experiencia en el diseño, inversión, construcción y operación de infraestructura ambiental en México.
            </p>
            
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg mb-6">
              <p className="text-lg font-semibold leading-relaxed">
                Diseñamos, invertimos, construimos y operamos cada una de nuestras plantas de principio a fin.
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestra experiencia abarca desde plantas de separación mecanizada (MRF), rellenos sanitarios, hasta proyectos de valorización energética y remediación ambiental. Operamos en 9 estados de la República Mexicana, generando más de 500 empleos directos.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1589839591369-348e67364223"
              alt="Infraestructura ambiental moderna"
              className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover border-2 border-primary/30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
