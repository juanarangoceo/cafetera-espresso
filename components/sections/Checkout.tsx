import React, { useState } from 'react';
import { ArrowLeft, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { createCheckout } from '../../services/shopify';
import ShopifyCheckout from '../ShopifyCheckout';

interface CheckoutProps {
  onBack: () => void;
}

// TODO: Reemplaza estos valores con los IDs reales de tu producto en Shopify
// Puedes obtenerlos usando la función getProductByHandle del servicio
const PRODUCT_VARIANT_ID = 'gid://shopify/ProductVariant/41877406548023'; // Reemplaza con tu variant ID
const QUANTITY = 1;

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Crear checkout usando Checkout Kit 2026
  const handleInitiateCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = await createCheckout([
        {
          variantId: PRODUCT_VARIANT_ID,
          quantity: QUANTITY
        }
      ]);
      // Guardar la URL y abrir el Checkout Kit 2026
      setCheckoutUrl(url);
      setIsCheckoutOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el checkout. Por favor, intenta de nuevo.');
      console.error('Error al crear checkout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckoutClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleCheckoutComplete = (event: any) => {
    console.log('Checkout completado:', event);
    setIsCompleted(true);
    setIsCheckoutOpen(false);
  };

  // Pantalla de éxito después de completar el checkout
  if (isCompleted) {
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

        <div className="max-w-2xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white p-8 shadow-md rounded-sm mb-6">
            <h2 className="text-2xl font-serif text-coffee-900 mb-6">Tu Pedido</h2>
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

            <div className="space-y-3 text-sm mb-6">
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

            {/* Error message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Checkout Button */}
            <button 
              onClick={handleInitiateCheckout}
              disabled={isLoading || isCheckoutOpen}
              className="w-full bg-coffee-900 text-white py-4 font-bold uppercase tracking-wider hover:bg-coffee-800 transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Creando checkout...
                </>
              ) : (
                "Proceder al Pago"
              )}
            </button>

            <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
              <Lock size={14} className="mr-2" /> Pagos seguros procesados por Shopify
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Kit 2026 Component */}
      {checkoutUrl && (
        <ShopifyCheckout
          checkoutUrl={checkoutUrl}
          open={isCheckoutOpen}
          onClose={handleCheckoutClose}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
};

export default Checkout;