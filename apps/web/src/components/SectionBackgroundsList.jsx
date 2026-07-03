
import React from 'react';
import SectionBackgroundManager from './SectionBackgroundManager';

const SECTIONS = [
  'Quiénes Somos',
  'Cifras Clave',
  'Línea de Tiempo',
  'Operación',
  'Portafolio',
  'VEOLIA',
  'SMQ',
  'Alianzas',
  'Compromiso Social',
  'Galería Cancún',
  'Contacto'
];

export default function SectionBackgroundsList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Section Backgrounds</h3>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {SECTIONS.map((section) => (
          <SectionBackgroundManager key={section} sectionName={section} />
        ))}
      </div>
    </div>
  );
}
