
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, BarChart3, Shield, Wifi, Database } from 'lucide-react';

function SmqSection({ backgroundProps }) {
  return (
    <section id="smq" className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {backgroundProps?.media_url && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: (backgroundProps.opacity ?? 100) / 100 }}>
          {backgroundProps.media_type === 'video' ? (
            <video src={backgroundProps.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={backgroundProps.media_url} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        </div>
      )}
      
      {!backgroundProps?.media_url && (
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 116, 255, 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
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
            Sinergia Tecnológica <span style={{ color: '#0074FF' }}>SMQ</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Grupo TRS lidera la infraestructura ambiental física en México, mientras que SMQ se posiciona como nuestro aliado estratégico en tecnología e inteligencia operativa.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Esta sinergia permite integrar sistemas inteligentes de monitoreo, control y optimización en todas nuestras operaciones, elevando los estándares de eficiencia y trazabilidad.
            </p>
          </motion.div>
          
          <motion.div className="bg-gradient-to-br from-[#0074FF]/10 to-transparent border border-[#0074FF]/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0074FF' }}>Por qué existe esta sinergia</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><Cpu className="w-5 h-5 mt-1" style={{ color: '#0074FF' }} /><span className="text-gray-300">Integración SCADA en tiempo real</span></li>
              <li className="flex items-start gap-3"><BarChart3 className="w-5 h-5 mt-1" style={{ color: '#0074FF' }} /><span className="text-gray-300">Análisis de datos operativos</span></li>
              <li className="flex items-start gap-3"><Shield className="w-5 h-5 mt-1" style={{ color: '#0074FF' }} /><span className="text-gray-300">Trazabilidad completa</span></li>
              <li className="flex items-start gap-3"><Wifi className="w-5 h-5 mt-1" style={{ color: '#0074FF' }} /><span className="text-gray-300">Conectividad IoT</span></li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SmqSection;
