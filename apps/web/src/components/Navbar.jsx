
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminButton from './AdminButton';
import { useSiteConfig } from '@/hooks/useSiteConfig';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { config } = useSiteConfig();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Quiénes Somos', href: '#quienes-somos' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Operación', href: '#operacion' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'VEOLIA', href: '#veolia' },
    { label: 'SMQ', href: '#smq' },
    { label: 'Sostenibilidad', href: '#sostenibilidad' },
    { label: 'Contacto', href: '#contacto' }
  ];
  
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#inicio" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}
            className="flex items-center gap-2"
          >
            {config?.logo_url ? (
              <img src={config.logo_url} alt="Grupo TRS Logo" className="h-10 object-contain" />
            ) : (
              <span className="text-2xl font-bold">
                Grupo <span className="text-primary">TRS</span>
              </span>
            )}
          </a>
          
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="text-sm font-medium hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
              <AdminButton />
              <Button 
                onClick={() => scrollToSection('#contacto')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 green-glow transition-all duration-200 active:scale-[0.98]"
              >
                Solicitar información
              </Button>
            </div>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border"
        >
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                className="block py-2 text-sm font-medium hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            <Button 
              onClick={() => scrollToSection('#contacto')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
            >
              Solicitar información
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
