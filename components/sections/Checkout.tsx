import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';

interface CheckoutProps {
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  if (step === 2) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-cream-50 px-4">
        <div className="bg-white p-12 shadow-xl text-center max-w-md w-full animate-fade-in-up">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-serif text-coffee-900 mb-4">¡Gracias por tu pedido!</h2>
          <p className="text-charcoal/70 mb-8">
            Hemos enviado la confirmación a tu correo electrónico. Tu café de especialidad está en camino.
          </p>
          <button 
            onClick={onBack}
            className="bg-coffee-900 text-white px-8 py-3 w-full hover:bg-gold-400 hover:text-coffee-900 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <button onClick={onBack} className="flex items-center text-charcoal/60 hover:text-coffee-900 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Volver a la tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-serif text-coffee-900 mb-6">Tu Pedido</h2>
            <div className="bg-white p-6 shadow-sm rounded-sm">
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Noir Reserve" 
                  className="w-24 h-24 object-cover rounded-sm"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-coffee-900">Noir Reserve - Etiopía</h3>
                    <span className="font-bold">24.00€</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Grano Entero, 250g</p>
                  <div className="flex items-center text-sm text-gold-500">
                    <span className="bg-gold-100 px-2 py-0.5 rounded text-xs">Alta Demanda</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>24.00€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>4.50€</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-coffee-900 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>28.50€</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
              <Lock size={14} className="mr-2" /> Pagos seguros procesados por Stripe
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white p-8 shadow-md rounded-sm">
              <h2 className="text-2xl font-serif text-coffee-900 mb-6">Detalles de Pago</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                  <input type="email" required className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold-400" placeholder="tu@email.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre</label>
                    <input type="text" required className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Juan" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Apellidos</label>
                    <input type="text" required className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Pérez" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Dirección</label>
                  <input type="text" required className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Calle Ejemplo 123" />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                    Tarjeta de Crédito <CreditCard size={16} className="ml-2 text-gray-400" />
                  </label>
                  <div className="border border-gray-200 rounded-sm p-3 bg-gray-50">
                    <input type="text" className="w-full bg-transparent outline-none mb-3" placeholder="0000 0000 0000 0000" />
                    <div className="flex gap-4">
                      <input type="text" className="w-1/2 bg-transparent outline-none" placeholder="MM/YY" />
                      <input type="text" className="w-1/2 bg-transparent outline-none" placeholder="CVC" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-coffee-900 text-white py-4 font-bold uppercase tracking-wider hover:bg-coffee-800 transition-colors flex justify-center items-center"
                >
                  {isProcessing ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Pagar 28.50€"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;