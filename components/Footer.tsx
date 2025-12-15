import React from 'react';
import { ViewState } from '../types';
import { Instagram, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  onLinkClick: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-coffee-900 text-cream-100 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-gold-400 mb-4">NOIR & OR</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Redefiniendo la cultura del café con granos de origen único y un proceso de tueste artesanal incomparable.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><button onClick={() => window.location.hash = '#experience'} className="hover:text-gold-400 transition-colors">La Experiencia</button></li>
              <li><button onClick={() => window.location.hash = '#craft'} className="hover:text-gold-400 transition-colors">Nuestra Maestría</button></li>
              <li><button onClick={() => window.location.hash = '#innovation'} className="hover:text-gold-400 transition-colors">Innovación</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contacto</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>hola@noiror-cafe.com</li>
              <li>+34 912 345 678</li>
              <li>Calle Serrano 45, Madrid</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg mb-6">Únete al Club</h4>
            <p className="text-xs mb-4 opacity-70">Recibe acceso anticipado a nuestras cosechas limitadas.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-coffee-800 text-white px-4 py-2 text-sm w-full outline-none focus:ring-1 focus:ring-gold-400"
              />
              <button className="bg-gold-400 text-coffee-900 px-4 py-2 text-sm font-bold hover:bg-white transition-colors">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <button onClick={() => onLinkClick('privacy')} className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-gold-400">Política de Privacidad</button>
            <button onClick={() => onLinkClick('terms')} className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-gold-400">Términos de Servicio</button>
          </div>
          
          <div className="flex space-x-4 text-gold-400">
            <Instagram size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Facebook size={20} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div className="text-center mt-8 text-[10px] opacity-40">
          © {new Date().getFullYear()} NOIR & OR. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;