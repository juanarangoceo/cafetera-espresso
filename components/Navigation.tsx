import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  onNavigate: (sectionId: string) => void;
  onLogoClick: () => void;
  onCheckout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, onLogoClick, onCheckout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'La Experiencia', id: 'experience' },
    { label: 'La Maestría', id: 'craft' },
    { label: 'Innovación', id: 'innovation' },
    { label: 'Testimonios', id: 'testimonials' },
    { label: 'Soporte', id: 'support' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button onClick={onLogoClick} className="text-2xl font-serif font-bold tracking-wider text-coffee-900 z-50 relative">
          NOIR <span className="text-gold-400">&</span> OR
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm tracking-wide uppercase font-medium hover:text-gold-400 transition-colors ${
                isScrolled ? 'text-charcoal' : 'text-coffee-900' // Dark text always better on light/transparent in this design
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onCheckout}
            className="flex items-center gap-2 bg-coffee-900 text-white px-5 py-2 rounded-sm hover:bg-coffee-800 transition-colors"
          >
            <ShoppingBag size={18} />
            <span>Comprar</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-coffee-900 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-cream-50 z-40 flex flex-col justify-center items-center space-y-8 transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-2xl font-serif text-coffee-900 hover:text-gold-400"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onCheckout();
            }}
            className="mt-8 bg-coffee-900 text-gold-400 px-8 py-3 text-lg rounded-sm"
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;