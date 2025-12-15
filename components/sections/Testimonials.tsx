import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

const reviews: Testimonial[] = [
  {
    id: 1,
    name: "Elena García",
    role: "Sommelier",
    content: "La complejidad de notas en el 'Noir Reserve' es asombrosa. Rara vez encuentro un café con tanto cuerpo y claridad al mismo tiempo.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Carlos Méndez",
    role: "Arquitecto",
    content: "No solo es el mejor café que he probado, sino que la presentación del paquete eleva toda la experiencia de mi mañana.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Sofía L.",
    role: "Entusiasta del Café",
    content: "El servicio de suscripción es impecable. Nunca me quedo sin café y siempre llega recién tostado. Totalmente recomendado.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-24 bg-cream-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-coffee-900 mb-4">Lo que dicen nuestros clientes</h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex space-x-1 text-gold-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-charcoal/80 italic mb-8 min-h-[80px]">"{review.content}"</p>
              <div className="flex items-center">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4 grayscale"
                />
                <div>
                  <h4 className="font-bold text-coffee-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gold-500 uppercase tracking-wide">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;