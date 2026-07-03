
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function TimelineItem({ year, title, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-start gap-8 mb-16"
    >
      <div className="flex-shrink-0 w-32 text-right">
        <div className="text-4xl font-bold text-primary">{year}</div>
      </div>
      
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="w-6 h-6 rounded-full bg-primary border-4 border-background relative z-10"
        />
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-transparent" />
      </div>
      
      <div className="flex-1 pb-8">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default TimelineItem;
