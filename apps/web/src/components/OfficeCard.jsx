
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone } from 'lucide-react';

function OfficeCard({ name, address, email, phone, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white text-black rounded-xl p-8 border-l-4 border-primary hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-600 leading-relaxed">{address}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {email && (
          <a 
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors duration-200"
          >
            <Mail className="w-5 h-5" />
            <span>{email}</span>
          </a>
        )}
        {phone && (
          <a 
            href={`tel:${phone}`}
            className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors duration-200"
          >
            <Phone className="w-5 h-5" />
            <span>{phone}</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default OfficeCard;
