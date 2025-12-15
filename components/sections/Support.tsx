import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../../types';

const faqs: FaqItem[] = [
  {
    question: "¿Cuánto tarda el envío?",
    answer: "Todos los pedidos se procesan en 24 horas. El envío estándar tarda 2-3 días hábiles en España peninsular."
  },
  {
    question: "¿Cuál es la fecha de tueste?",
    answer: "Garantizamos que tu café ha sido tostado en los últimos 7 días antes del envío para asegurar la máxima frescura."
  },
  {
    question: "¿Ofrecen suscripciones?",
    answer: "Sí, puedes suscribirte a cualquiera de nuestras variedades y ahorrar un 15% en cada pedido. Puedes cancelar en cualquier momento."
  },
  {
    question: "¿Es el café de comercio justo?",
    answer: "Absolutamente. Pagamos por encima del precio de mercado directamente a los productores para fomentar relaciones sostenibles a largo plazo."
  }
];

const Support: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-gold-500 font-bold uppercase tracking-widest text-xs mb-2 block">
            Soporte
          </span>
          <h2 className="text-4xl font-serif text-coffee-900">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <button
                className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`font-serif text-lg ${openIndex === index ? 'text-gold-500' : 'text-coffee-900'} group-hover:text-gold-500 transition-colors`}>
                  {faq.question}
                </span>
                <span className="text-gold-400">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-charcoal/70 leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-cream-50 p-8 rounded-sm">
          <h4 className="font-serif text-xl text-coffee-900 mb-2">¿Necesitas más ayuda?</h4>
          <p className="text-charcoal/60 mb-6">Nuestro equipo de concierge está disponible 24/7.</p>
          <a href="mailto:soporte@noiror.com" className="text-gold-500 font-bold hover:text-coffee-900 underline transition-colors">
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;