// components/ShopifyCheckout.tsx
import React, { useEffect, useRef } from 'react';
import { useCheckoutKit } from '../hooks/useCheckoutKit';

interface ShopifyCheckoutProps {
  checkoutUrl: string | null;
  open: boolean;
  onClose?: () => void;
  onComplete?: (event: any) => void;
}

// Extender HTMLElement para incluir los métodos del web component de Shopify Checkout Kit 2026
interface ShopifyCheckoutElement extends HTMLElement {
  src?: string;
  open: () => void;
  close: () => void;
}

const ShopifyCheckout: React.FC<ShopifyCheckoutProps> = ({ checkoutUrl, open, onClose, onComplete }) => {
  const isKitLoaded = useCheckoutKit();
  const checkoutRef = useRef<ShopifyCheckoutElement | null>(null);

  // Efecto para configurar el web component cuando esté listo
  useEffect(() => {
    if (!isKitLoaded || !checkoutRef.current || !checkoutUrl) return;

    const checkoutElement = checkoutRef.current;
    
    console.log('Configurando Checkout Kit 2026:', {
      url: checkoutUrl,
      element: checkoutElement,
      isOpen: open
    });

    // Asignar la URL del checkout al web component
    checkoutElement.src = checkoutUrl;

    // Abrir o cerrar el checkout según el estado
    if (open) {
      // Esperar un momento para que el web component se inicialice
      setTimeout(() => {
        try {
          if (typeof checkoutElement.open === 'function') {
            console.log('Abriendo checkout con Checkout Kit 2026');
            checkoutElement.open();
          } else {
            console.warn('El método open() no está disponible en el web component');
          }
        } catch (error) {
          console.error('Error al abrir checkout:', error);
        }
      }, 100);
    } else {
      try {
        if (typeof checkoutElement.close === 'function') {
          checkoutElement.close();
        }
      } catch (error) {
        console.error('Error al cerrar checkout:', error);
      }
    }
  }, [isKitLoaded, checkoutUrl, open]);

  // Efecto para escuchar eventos del Checkout Kit 2026
  useEffect(() => {
    const checkoutElement = checkoutRef.current;
    if (!checkoutElement) return;

    const handleClose = () => {
      console.log('Checkout cerrado');
      onClose && onClose();
    };

    const handleComplete = (event: CustomEvent) => {
      console.log('Checkout completado:', event.detail);
      onComplete && onComplete(event.detail || event);
    };

    // Los eventos del Checkout Kit 2026
    checkoutElement.addEventListener('checkout:close', handleClose);
    checkoutElement.addEventListener('checkout:completed', handleComplete);

    return () => {
      checkoutElement.removeEventListener('checkout:close', handleClose);
      checkoutElement.removeEventListener('checkout:completed', handleComplete);
    };
  }, [onClose, onComplete]);

  // No mostrar nada si el kit no está cargado, no hay URL o no está abierto
  if (!isKitLoaded || !checkoutUrl || !open) {
    if (!isKitLoaded) {
      return (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 9999
        }}>
          <p style={{ color: '#666' }}>Cargando Checkout Kit...</p>
        </div>
      );
    }
    return null;
  }

  // Renderizar el web component de Checkout Kit 2026
  return (
    <div>
      {/* @ts-ignore - shopify-checkout es un web component personalizado de Shopify Checkout Kit 2026 */}
      <shopify-checkout 
        ref={checkoutRef}
      ></shopify-checkout>
    </div>
  );
};

export default ShopifyCheckout;

