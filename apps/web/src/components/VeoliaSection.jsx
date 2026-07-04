import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Calendar } from 'lucide-react';

function VeoliaSection({ backgroundProps }) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    const timer1 = setInterval(() => setCount1(p => p >= 250 ? 250 : p + 5), 20);
    const timer2 = setInterval(() => setCount2(p => p >= 2026 ? 2026 : p + 20), 10);
    return () => { clearInterval(timer1); clearInterval(timer2); };
  }, [isInView]);
  
  return (
    <section id="veolia" className="relative py-24 bg-background text-foreground overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Adquisición <span style={{ color: '#E30613' }}>VEOLIA México</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              En enero de 2026, Grupo TRS adquirió la división de reciclaje de VEOLIA en México, consolidando nuestra posición.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Esta adquisición estratégica incorpora más de 250 colaboradores especializados y estándares de clase mundial.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Fortalecemos nuestra capacidad operativa y expandimos nuestra cobertura nacional.
            </p>
          </motion.div>
          
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="bg-card border-2 border-border rounded-2xl p-8 text-center hover:border-[#E30613] transition-all">
              <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#E30613' }} />
              <div className="text-5xl font-bold mb-2" style={{ color: '#E30613' }}>{count1}+</div>
              <div className="text-gray-300 font-medium">Colaboradores especializados</div>
            </motion.div>
            
            <motion.div className="bg-card border-2 border-border rounded-2xl p-8 text-center hover:border-[#E30613] transition-all">
              <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: '#E30613' }} />
              <div className="text-5xl font-bold mb-2" style={{ color: '#E30613' }}>{count2}</div>
              <div className="text-gray-300 font-medium">Año de adquisición</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VeoliaSection;
