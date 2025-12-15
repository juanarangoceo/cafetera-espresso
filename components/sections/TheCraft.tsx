import React from 'react';

const TheCraft: React.FC = () => {
  return (
    <div className="py-24 bg-cream-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Image Grid */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=987&auto=format&fit=crop" 
              alt="Tueste de café" 
              className="w-full h-80 object-cover rounded-sm translate-y-8 shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1442512595367-42732509f576?q=80&w=1032&auto=format&fit=crop" 
              alt="Latte art" 
              className="w-full h-80 object-cover rounded-sm shadow-xl"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-2 block">
              La Maestría
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-coffee-900 mb-8">
              Del Grano a la Excelencia
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              En Noir & Or, creemos que el café es más que una bebida; es un ritual. Trabajamos directamente con agricultores de microlotes en Etiopía, Colombia y Sumatra para asegurar no solo la más alta calidad, sino también prácticas sostenibles que respetan la tierra.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              Nuestros maestros tostadores aplican un enfoque científico y artístico a cada lote, realzando las notas naturales de chocolate, frutas y especias que hacen que cada taza sea inolvidable.
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-coffee-900/10 pt-8">
              <div>
                <h4 className="text-2xl font-serif text-coffee-900 mb-1">100%</h4>
                <p className="text-xs uppercase tracking-wide text-charcoal/60">Arábica Premium</p>
              </div>
              <div>
                <h4 className="text-2xl font-serif text-coffee-900 mb-1">24h</h4>
                <p className="text-xs uppercase tracking-wide text-charcoal/60">Frescura de Tueste</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TheCraft;