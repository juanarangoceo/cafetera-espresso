import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalProps {
  title: string;
  onBack: () => void;
}

const Legal: React.FC<LegalProps> = ({ title, onBack }) => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <button onClick={onBack} className="flex items-center text-charcoal/60 hover:text-coffee-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Volver al inicio
        </button>
        
        <h1 className="text-4xl font-serif text-coffee-900 mb-8">{title}</h1>
        
        <div className="prose prose-stone max-w-none text-charcoal/80">
          <p>
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
          <p>
            Bienvenido a Noir & Or. Esta página describe nuestros términos legales y cómo manejamos sus datos.
          </p>
          <h3>1. Introducción</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h3>2. Uso de Datos</h3>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h3>3. Propiedad Intelectual</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <div className="p-4 bg-cream-50 border-l-4 border-gold-400 mt-8">
            <p className="italic text-sm">
              Nota: Este es un documento legal de ejemplo generado para la demostración de la interfaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;