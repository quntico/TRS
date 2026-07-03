
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

function OperationCard({ icon: Icon, title, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ y }}
      className="relative overflow-hidden rounded-2xl group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm" />
      <div className="relative p-8 border border-primary/20 hover:border-primary/50 transition-all duration-300">
        <Icon className="w-16 h-16 text-primary mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default OperationCard;
