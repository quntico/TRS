import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

function OfficeCard({ name, address, email, phone, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white text-zinc-900 rounded-2xl p-8 border border-zinc-300/60 hover:border-primary/50 hover:shadow-xl transition-all duration-300 shadow-md flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold mb-6 text-zinc-900 border-b border-zinc-100 pb-3">{name}</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <span className="text-zinc-600 leading-relaxed">{address}</span>
          </div>
          
          {email && (
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-zinc-700 hover:text-primary transition-colors duration-200 group/link"
            >
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span className="break-all">{email}</span>
            </a>
          )}
          
          {phone && (
            <a 
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-zinc-700 hover:text-primary transition-colors duration-200"
            >
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>{phone}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default OfficeCard;
