
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';

function ProjectCard({ location, description, scope, status, index }) {
  const isActive = status === 'Operando';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">{location}</h3>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
          isActive ? 'bg-primary/10 text-primary' : 'bg-muted/20 text-muted-foreground'
        }`}>
          {isActive ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          {status}
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
      
      <div className="pt-4 border-t border-border">
        <div className="text-sm font-medium text-primary mb-1">Alcance</div>
        <div className="text-sm text-muted-foreground">{scope}</div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
