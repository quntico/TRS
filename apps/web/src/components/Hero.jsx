
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Factory, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Hero({ backgroundProps }) {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const metrics = [
    { icon: Calendar, value: '17+', label: 'Años de operación continua' },
    { icon: Factory, value: '7', label: 'Plantas diseñadas y construidas' },
    { icon: Users, value: '500+', label: 'Empleos directos' },
    { icon: MapPin, value: '9', label: 'Estados con operación' }
  ];
  
  return (
    <section id="inicio" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        {backgroundProps?.hero_media_url ? (
          backgroundProps.hero_media_type === 'video' ? (
            <video 
              src={backgroundProps.hero_media_url} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover" 
            />
          ) : (
            <img 
              src={backgroundProps.hero_media_url} 
              alt="Hero Background" 
              className="w-full h-full object-cover" 
            />
          )
        ) : (
          <img
            src="https://images.unsplash.com/photo-1567516847971-81df16eefa90"
            alt="Planta industrial de reciclaje"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            Grupo TRS
          </h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Evolución Sustentable
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-primary mx-auto rounded-full"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Diseñamos, invertimos, construimos y operamos plantas de separación, rellenos sanitarios y proyectos de valorización de residuos en México. Líderes en infraestructura ambiental con más de 17 años de experiencia.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Button
              onClick={() => scrollToSection('#trayectoria')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 green-glow px-8 py-6 text-lg font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              Conocer trayectoria
            </Button>
            
            <Button
              onClick={() => scrollToSection('#proyectos')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              Ver proyectos
            </Button>
            
            <Button
              onClick={() => scrollToSection('#contacto')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              Contacto
            </Button>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white/5 border border-primary/20 backdrop-blur-md p-6 rounded-xl flex flex-col items-center md:items-start text-center md:text-left hover:border-primary/50 hover:scale-[1.03] transition-all duration-300 group"
            >
              <metric.icon className="w-8 h-8 text-primary mb-4" />
              <div className="text-4xl md:text-4xl font-bold text-primary mb-2 tracking-tight group-hover:text-white transition-colors duration-300">
                {metric.value}
              </div>
              <div className="text-sm md:text-base text-gray-200 font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
}

export default Hero;
