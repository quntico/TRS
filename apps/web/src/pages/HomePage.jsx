
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import QuienesSomos from '../components/QuienesSomos';
import CifrasSection from '../components/CifrasSection';
import Timeline from '../components/Timeline';
import Operacion from '../components/Operacion';
import Portfolio from '../components/Portfolio';
import VeoliaSection from '../components/VeoliaSection';
import SmqSection from '../components/SmqSection';
import Alianzas from '../components/Alianzas';
import CompromisoSocial from '../components/CompromisoSocial';
import GaleriaProyectos from '../components/GaleriaProyectos';
import Contacto from '../components/Contacto';
import Footer from '../components/Footer';
import { Toaster } from '@/components/ui/sonner';

import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useSectionBackgrounds } from '@/hooks/useSectionBackgrounds';

function HomePage() {
  const { config, loading: configLoading } = useSiteConfig();
  const { getBackgroundForSection, loading: backgroundsLoading } = useSectionBackgrounds();

  return (
    <>
      <Helmet>
        <title>Grupo TRS | Evolución Sustentable</title>
        <meta 
          name="description" 
          content="Grupo líder en diseño, inversión, construcción y operación de plantas de separación, rellenos sanitarios y valorización de residuos en México." 
        />
        <meta 
          name="keywords" 
          content="Grupo TRS, reciclaje, residuos sólidos urbanos, plantas de separación, MRF, rellenos sanitarios, valorización de residuos, infraestructura ambiental, VEOLIA México, SMQ" 
        />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <Hero backgroundProps={config} />
        <QuienesSomos backgroundProps={getBackgroundForSection('Quiénes Somos')} />
        <CifrasSection backgroundProps={getBackgroundForSection('Cifras Clave')} />
        <Timeline backgroundProps={getBackgroundForSection('Línea de Tiempo')} />
        <Operacion backgroundProps={getBackgroundForSection('Operación')} />
        <Portfolio backgroundProps={getBackgroundForSection('Portafolio')} />
        <VeoliaSection backgroundProps={getBackgroundForSection('VEOLIA')} />
        <SmqSection backgroundProps={getBackgroundForSection('SMQ')} />
        <Alianzas backgroundProps={getBackgroundForSection('Alianzas')} />
        <CompromisoSocial backgroundProps={getBackgroundForSection('Compromiso Social')} />
        <GaleriaProyectos backgroundProps={getBackgroundForSection('Galería Cancún')} />
        <Contacto backgroundProps={getBackgroundForSection('Contacto')} />
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default HomePage;
