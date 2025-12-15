// hooks/useCheckoutKit.js
import { useEffect, useState } from 'react';

const CHECKOUT_KIT_SRC = "https://cdn.shopify.com/shopifycloud/checkout-web/component/unstable/kit.js";

export const useCheckoutKit = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verificar si el web component ya está registrado
    if (customElements.get('shopify-checkout')) {
      console.log('Checkout Kit ya está cargado');
      setIsLoaded(true);
      return;
    }

    // Evitar doble carga si ya existe el script
    if (document.querySelector(`script[src="${CHECKOUT_KIT_SRC}"]`)) {
      // Esperar a que el web component se registre
      const checkInterval = setInterval(() => {
        if (customElements.get('shopify-checkout')) {
          console.log('Checkout Kit detectado después de esperar');
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout después de 5 segundos
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!customElements.get('shopify-checkout')) {
          console.warn('Checkout Kit no se registró después de 5 segundos');
        }
      }, 5000);

      return () => clearInterval(checkInterval);
    }

    console.log('Cargando Checkout Kit...');
    const script = document.createElement('script');
    script.type = 'module';
    script.src = CHECKOUT_KIT_SRC;
    
    script.onload = () => {
      console.log('Script de Checkout Kit cargado');
      // Esperar a que el web component se registre
      const checkInterval = setInterval(() => {
        if (customElements.get('shopify-checkout')) {
          console.log('Web component shopify-checkout registrado');
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout después de 5 segundos
      setTimeout(() => {
        clearInterval(checkInterval);
        if (customElements.get('shopify-checkout')) {
          setIsLoaded(true);
        } else {
          console.warn('El web component no se registró después de cargar el script');
        }
      }, 5000);
    };

    script.onerror = (error) => {
      console.error('Error al cargar Checkout Kit:', error);
    };

    document.head.appendChild(script);

    return () => {
      // Opcional: limpieza si fuera necesaria
    };
  }, []);

  return isLoaded;
};

