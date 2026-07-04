import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function LazyBackground({ backgroundProps, className = "", children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "300px" });

  if (!backgroundProps?.media_url) return null;

  return (
    <div 
      ref={ref} 
      className={`absolute inset-0 z-0 pointer-events-none ${className}`} 
      style={{ opacity: (backgroundProps.opacity ?? 100) / 100 }}
    >
      {isInView && (
        backgroundProps.media_type === 'video' ? (
          <video 
            src={backgroundProps.media_url} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover" 
          />
        ) : (
          <img 
            src={backgroundProps.media_url} 
            alt="Background" 
            loading="lazy" 
            className="w-full h-full object-cover" 
          />
        )
      )}
      {children}
    </div>
  );
}
