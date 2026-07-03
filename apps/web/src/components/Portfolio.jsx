
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

function Portfolio({ backgroundProps }) {
  const projects = [
    { location: 'Mérida, Yucatán', description: 'Primera planta de separación mecanizada del grupo, operando desde 2009.', scope: 'MRF 400 ton/día', status: 'Operando' },
    { location: 'Cancún / Isla Mujeres', description: 'Planta de separación que atiende la zona turística más importante del Caribe.', scope: 'MRF 300 ton/día', status: 'Operando' },
    { location: 'Hidalgo', description: 'Relleno sanitario regional con control ambiental.', scope: 'Relleno 500 ton/día', status: 'Operando' },
    { location: 'Aguascalientes', description: 'Planta de separación metropolitana.', scope: 'MRF 350 ton/día', status: 'Operando' },
    { location: 'San Vicente Chicoloapan', description: 'Planta estratégica en la zona metropolitana del Valle de México.', scope: 'MRF 600 ton/día', status: 'Operando' },
    { location: 'Nayarit', description: 'Proyecto de remediación y clausura.', scope: 'Remediación', status: 'Completado' },
    { location: 'Tuxtla Gutiérrez', description: 'Nueva planta de separación.', scope: 'MRF 400 ton/día', status: 'En construcción' }
  ];
  
  return (
    <section id="proyectos" className="relative py-24 bg-card overflow-hidden">
      {backgroundProps?.media_url && (
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: (backgroundProps.opacity ?? 100) / 100 }}>
          {backgroundProps.media_type === 'video' ? (
            <video src={backgroundProps.media_url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={backgroundProps.media_url} alt="Background" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-card/85" />
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
            Portafolio de <span className="text-primary">Plantas y Proyectos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Infraestructura ambiental de clase mundial distribuida estratégicamente en todo México.
          </p>
        </motion.div>
        
        <div className="hidden lg:block overflow-x-auto bg-card border border-border rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-6 py-4 text-left font-semibold rounded-tl-xl">Ubicación</th>
                <th className="px-6 py-4 text-left font-semibold">Descripción</th>
                <th className="px-6 py-4 text-left font-semibold">Alcance</th>
                <th className="px-6 py-4 text-left font-semibold rounded-tr-xl">Estado</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border-b border-border hover:bg-background/50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold">{project.location}</td>
                  <td className="px-6 py-4 text-muted-foreground">{project.description}</td>
                  <td className="px-6 py-4 text-sm">{project.scope}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Operando' ? 'bg-primary/10 text-primary' :
                      project.status === 'Completado' ? 'bg-muted/20 text-muted-foreground' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="lg:hidden grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
