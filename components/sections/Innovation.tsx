import React from 'react';
import { Droplet, Thermometer, Leaf } from 'lucide-react';

const Innovation: React.FC = () => {
  const features = [
    {
      icon: <Droplet size={32} />,
      title: "Extracción de Precisión",
      desc: "Nuestros accesorios están diseñados con hidrodinámica avanzada para asegurar una extracción uniforme y perfecta."
    },
    {
      icon: <Thermometer size={32} />,
      title: "Control Térmico IA",
      desc: "Utilizamos sensores inteligentes durante el tueste para modular la temperatura con una precisión de 0.1°C."
    },
    {
      icon: <Leaf size={32} />,
      title: "Empaque Eco-Lujo",
      desc: "Materiales 100% compostables con tecnología de válvula unidireccional para preservar la frescura sin plástico."
    }
  ];

  return (
    <div className="py-24 bg-coffee-900 text-white relative overflow-hidden">
      {/* Decorative bg elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-4 block">
            El Futuro del Café
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Innovación en Cada Detalle</h2>
          <p className="text-white/70 leading-relaxed">
            Fusionamos la tradición centenaria con la tecnología moderna para crear una experiencia de café sin precedentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-sm border border-white/10 hover:border-gold-400/50 transition-colors group">
              <div className="text-gold-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif mb-4">{feature.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Innovation;