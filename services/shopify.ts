// services/shopify.ts
// Servicio para interactuar con la Storefront API de Shopify

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

interface LineItem {
  variantId: string;
  quantity: number;
}

interface CartCreateResponse {
  cart: {
    id: string;
    checkoutUrl: string;
  } | null;
  userErrors: Array<{
    field: string[];
    message: string;
  }>;
}

/**
 * Crea un carrito en Shopify usando la Storefront API y retorna la URL de checkout
 * @param lineItems Array de productos a agregar al carrito
 * @returns URL del checkout creado
 */
export async function createCheckout(lineItems: LineItem[]): Promise<string> {
  // Verificar que las variables de entorno estén configuradas
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

  if (!domain || !token) {
    console.error('Variables de entorno:', {
      domain: domain ? `${domain.substring(0, 10)}...` : 'NO CONFIGURADO',
      token: token ? `${token.substring(0, 10)}...` : 'NO CONFIGURADO'
    });
    throw new Error('Las credenciales de Shopify no están configuradas. Por favor, configura VITE_SHOPIFY_STORE_DOMAIN y VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN en tu archivo .env');
  }

  // Usar cartCreate en lugar de checkoutCreate (checkoutCreate fue deprecado)
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    }
  };

  const apiUrl = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    if (!response.ok) {
      // Intentar obtener más información del error
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.errors) {
          errorMessage += ` - ${JSON.stringify(errorData.errors)}`;
        }
      } catch (e) {
        // Si no se puede parsear el error, usar el mensaje por defecto
      }
      
      // Mensajes específicos para errores comunes
      if (response.status === 401) {
        errorMessage += '\n\nPosibles causas:\n';
        errorMessage += '1. El Storefront Access Token es incorrecto o ha expirado\n';
        errorMessage += '2. El token no tiene los permisos necesarios\n';
        errorMessage += '3. El dominio de la tienda es incorrecto\n';
        errorMessage += '4. Las variables de entorno no se cargaron correctamente (reinicia el servidor)';
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('Errores de GraphQL:', data.errors);
      throw new Error(`Error de GraphQL: ${JSON.stringify(data.errors)}`);
    }

    if (!data.data || !data.data.cartCreate) {
      console.error('Respuesta inesperada:', data);
      throw new Error('La respuesta de Shopify no tiene el formato esperado');
    }

    const result: CartCreateResponse = data.data.cartCreate;

    if (result.userErrors && result.userErrors.length > 0) {
      const errors = result.userErrors.map(e => e.message).join(', ');
      throw new Error(`Errores al crear carrito: ${errors}`);
    }

    if (!result.cart || !result.cart.checkoutUrl) {
      throw new Error('No se pudo obtener la URL del checkout');
    }

    return result.cart.checkoutUrl;
  } catch (error) {
    console.error('Error al crear checkout:', error);
    throw error;
  }
}

/**
 * Obtiene información de un producto por su handle
 * Útil para obtener el variant ID antes de crear el checkout
 */
export async function getProductByHandle(handle: string) {
  if (!SHOPIFY_STORE_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Las credenciales de Shopify no están configuradas');
  }

  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: { handle }
      })
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Error de GraphQL: ${JSON.stringify(data.errors)}`);
    }

    return data.data.product;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
}

