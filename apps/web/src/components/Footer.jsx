
import React from 'react';
import { Recycle } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Recycle className="w-8 h-8 text-primary" />
            <div>
              <div className="text-xl font-bold">Grupo TRS</div>
              <div className="text-sm text-muted-foreground">Evolución Sustentable</div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#inicio" className="hover:text-primary transition-colors duration-200">
              Inicio
            </a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Política de Privacidad
            </a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Términos de Servicio
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2026 Grupo TRS. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
