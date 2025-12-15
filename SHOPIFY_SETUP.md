# Configuración de Shopify Checkout Kit

Esta guía te ayudará a configurar Shopify Checkout Kit en tu aplicación.

## Paso 1: Obtener credenciales de Shopify

### 1.1 Obtener el Store Domain
Tu Store Domain es el dominio de tu tienda Shopify. Ejemplo: `mi-tienda.myshopify.com`

### 1.2 Obtener el Storefront Access Token

1. Ve a tu **Shopify Admin**
2. Navega a **Configuración** > **Apps y canales de venta**
3. Haz clic en **Desarrollar apps** (o **Develop apps**)
4. Crea una nueva app o selecciona una existente
5. Ve a la sección **API credentials**
6. En **Storefront API**, haz clic en **Configure**
7. Selecciona los permisos necesarios:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
8. Guarda y copia el **Storefront access token**

## Paso 2: Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_SHOPIFY_STORE_DOMAIN=tu-tienda.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=tu-storefront-access-token
```

**Importante:** 
- Reemplaza `tu-tienda.myshopify.com` con tu dominio real
- Reemplaza `tu-storefront-access-token` con tu token real
- No subas el archivo `.env` a Git (debe estar en `.gitignore`)

## Paso 3: Obtener el Variant ID del producto

Para que el checkout funcione, necesitas el **Variant ID** de tu producto en Shopify.

### Opción A: Usando la función del servicio

Puedes usar la función `getProductByHandle` del servicio de Shopify:

```typescript
import { getProductByHandle } from './services/shopify';

// Obtener información del producto
const product = await getProductByHandle('noir-reserve-etiopia');
const variantId = product.variants.edges[0].node.id;
console.log('Variant ID:', variantId);
```

### Opción B: Desde Shopify Admin

1. Ve a **Productos** en tu Shopify Admin
2. Selecciona el producto que quieres vender
3. Abre la consola del navegador (F12)
4. El Variant ID aparece en la URL o puedes obtenerlo desde la API

### Opción C: Usando GraphQL directamente

Puedes hacer una consulta GraphQL a tu tienda:

```graphql
query {
  product(handle: "tu-producto-handle") {
    variants(first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
}
```

## Paso 4: Actualizar el Variant ID en el código

Una vez que tengas el Variant ID, actualiza el archivo `components/sections/Checkout.tsx`:

```typescript
// Busca esta línea (aproximadamente línea 15):
const PRODUCT_VARIANT_ID = 'gid://shopify/ProductVariant/XXXXXXXXX';

// Reemplázala con tu Variant ID real:
const PRODUCT_VARIANT_ID = 'gid://shopify/ProductVariant/TU_VARIANT_ID_AQUI';
```

## Paso 5: Probar la integración

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Navega a la página de checkout
3. Haz clic en "Proceder al Pago"
4. Deberías ver el checkout de Shopify abrirse en un modal

## Solución de problemas

### Error: "Las credenciales de Shopify no están configuradas"
- Verifica que el archivo `.env` existe y tiene las variables correctas
- Asegúrate de que las variables empiezan con `VITE_`
- Reinicia el servidor de desarrollo después de crear/modificar `.env`

### Error: "Error al crear checkout"
- Verifica que el Variant ID es correcto
- Verifica que el producto está disponible para venta
- Verifica que el Storefront Access Token tiene los permisos correctos

### El checkout no se abre
- Verifica que el script de Checkout Kit se está cargando (revisa la consola del navegador)
- Verifica que la URL del checkout se está generando correctamente

## Estructura de archivos creados

```
├── hooks/
│   └── useCheckoutKit.js          # Hook para cargar el script de Checkout Kit
├── services/
│   └── shopify.ts                 # Servicio para interactuar con Storefront API
├── components/
│   ├── ShopifyCheckout.tsx        # Componente wrapper del web component
│   └── sections/
│       └── Checkout.tsx           # Componente de checkout integrado
└── .env                           # Variables de entorno (no se sube a Git)
```

## Recursos adicionales

- [Documentación de Shopify Checkout Kit](https://shopify.dev/docs/api/checkout-ui)
- [Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [GraphQL API Explorer](https://shopify.dev/docs/api/admin-graphql)

