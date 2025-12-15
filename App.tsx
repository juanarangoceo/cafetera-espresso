import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import TheCraft from './components/sections/TheCraft';
import Innovation from './components/sections/Innovation';
import Testimonials from './components/sections/Testimonials';
import Support from './components/sections/Support';
import Checkout from './components/sections/Checkout';
import Legal from './components/sections/Legal';
import { ViewState } from './types';
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      // Delay scroll to allow render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-charcoal bg-cream-50 selection:bg-coffee-900 selection:text-white">
      <Navigation 
        currentView={currentView} 
        onNavigate={scrollToSection} 
        onLogoClick={handleLogoClick}
        onCheckout={() => setCurrentView('checkout')}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <section id="experience">
              <Hero onCta={() => setCurrentView('checkout')} />
            </section>
            <section id="craft">
              <TheCraft />
            </section>
            <section id="innovation">
              <Innovation />
            </section>
            <section id="testimonials">
              <Testimonials />
            </section>
            <section id="support">
              <Support />
            </section>
          </>
        )}

        {currentView === 'checkout' && (
          <Checkout onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'privacy' && (
          <Legal title="Política de Privacidad" onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'terms' && (
          <Legal title="Términos de Servicio" onBack={() => setCurrentView('home')} />
        )}
      </main>

      <Footer 
        onLinkClick={(view) => {
          setCurrentView(view);
          window.scrollTo(0, 0);
        }} 
      />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-coffee-900 text-gold-400 p-3 rounded-full shadow-xl transition-all duration-300 z-50 hover:bg-coffee-800 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Volver arriba"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;