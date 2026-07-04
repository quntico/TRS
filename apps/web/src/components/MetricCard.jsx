import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function MetricCard({ value, label, icon: Icon, suffix = '', duration = 2, index = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1 
      }}
      className="glassmorphism rounded-2xl p-8 hover:green-glow transition-all duration-300 group flex flex-col items-center text-center cursor-pointer"
    >
      {Icon && (
        <Icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
      )}
      <div className="text-5xl font-bold text-primary mb-2 tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-lg text-muted-foreground font-medium leading-snug">{label}</div>
    </motion.div>
  );
}

export default MetricCard;
