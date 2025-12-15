import React from 'react';

interface HeroProps {
  onCta: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCta }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" 
          alt="Granos de café oscuros" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/60 via-coffee-900/40 to-coffee-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="block text-gold-400 tracking-[0.2em] uppercase text-sm mb-6 animate-fade-in-up">
          Establecido en 2024
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight animate-fade-in-up delay-100">
          El Arte del Café <br/> <span className="italic text-gold-400">Redefinido</span>
        </h1>
        <p className="text-cream-100 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed opacity-90 animate-fade-in-up delay-200">
          Descubre una colección exclusiva de granos seleccionados a mano, tostados a la perfección para los paladares más exigentes.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <button 
            onClick={onCta}
            className="bg-gold-400 text-coffee-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300"
          >
            Comprar Colección
          </button>
          <button 
            onClick={() => document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-coffee-900 transition-all duration-300"
          >
            Descubrir Más
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;