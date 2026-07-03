
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function MetricCard({ value, label, icon: Icon, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    const increment = numericValue / (duration * 60);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [isInView, value, duration]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glassmorphism rounded-2xl p-8 hover:green-glow transition-all duration-300 group"
    >
      {Icon && (
        <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
      )}
      <div className="text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}

export default MetricCard;
