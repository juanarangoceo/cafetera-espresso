// services/gemini.ts
// Servicio para interactuar con Google AI Studio (Gemini API)

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface Message {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

// Especificaciones de la cafetera espresso
const PRODUCT_SPECS = `
ESPECIFICACIONES DE LA CAFETERA ESPRESSO PRO:

Material: Plástico + acero inoxidable
Energía: 850W
Tamaño del producto: 28x23x29cm
Tamaño de embalaje: 34x27.5x35.5cm
Rango de presión de extracción: 0-20Bar
Capacidad del tanque de agua: 1.5L

CARACTERÍSTICAS PRINCIPALES:
- Pantalla táctil inteligente: Controla tu café con un solo toque
- Tubo de vapor en acero inoxidable: Para espuma de leche perfecta
- Diseño de doble filtro: Precisión y versatilidad para un espresso perfecto
- Embudo de fondo plano: Disfruta de la sencillez en cada preparación
- Superficie en acero inoxidable con rejilla para calentar tazas
- Tanque de agua de 1.5L
- Cuchara medidora incluida
- Perilla de vapor para control manual
- Tablero táctil con múltiples opciones (café simple, doble, vapor, etc.)

INCLUYE EN EL PAQUETE:
- 1x cafetera espresso
- 1x mango de filtro de café (portafilter)
- 2x cuerpos de filtro para polvo de café (simple y doble)
- 1x cuchara medidora
- 1x manual de instrucciones

CALIDAD GARANTIZADA: 100% Quality Guaranteed
`;

const SYSTEM_PROMPT = `Eres un asistente virtual experto en cafeteras espresso de la marca "Espresso Pro". 
Tu objetivo es ayudar a los clientes de manera profesional, natural y amigable.

INSTRUCCIONES IMPORTANTES:
1. Responde siempre en español de manera natural y profesional
2. Usa las especificaciones del producto proporcionadas para responder preguntas técnicas
3. Sé entusiasta pero no agresivo con las ventas
4. Cuando detectes intención de compra (palabras como: comprar, precio, compra, quiero, me interesa, adquirir, etc.), 
   debes responder de manera positiva y al final de tu respuesta incluye exactamente esta frase: 
   "[SHOW_BUY_BUTTON]"
5. Si el cliente pregunta sobre precio, menciona que puede ver el precio en el botón de compra
6. Si el cliente pregunta sobre disponibilidad, confirma que está disponible
7. Mantén las respuestas concisas pero informativas
8. Si no sabes algo, admítelo honestamente

ESPECIFICACIONES DEL PRODUCTO:
${PRODUCT_SPECS}

Recuerda: Cuando detectes intención de compra, termina tu respuesta con [SHOW_BUY_BUTTON]`;

/**
 * Detecta si hay intención de compra en el mensaje
 */
export function detectPurchaseIntent(message: string): boolean {
  const purchaseKeywords = [
    'comprar', 'compra', 'precio', 'cuesta', 'costo', 'quiero', 'me interesa',
    'adquirir', 'comprarlo', 'comprarla', 'donde compro', 'como compro',
    'disponible', 'stock', 'envío', 'entrega', 'pago', 'tarjeta',
    'comprar ahora', 'quiero comprar', 'me gustaría comprar'
  ];
  
  const lowerMessage = message.toLowerCase();
  return purchaseKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Envía un mensaje al modelo Gemini y obtiene la respuesta
 */
export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<{ text: string; showBuyButton: boolean }> {
  if (!GEMINI_API_KEY) {
    throw new Error('La API key de Gemini no está configurada. Por favor, configura VITE_GEMINI_API_KEY en tu archivo .env');
  }

  // Construir el historial de conversación
  const messages: Message[] = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    },
    {
      role: 'model',
      parts: [{ text: 'Entendido. Estoy listo para ayudarte con información sobre la Cafetera Espresso Pro. ¿En qué puedo ayudarte?' }]
    },
    ...conversationHistory,
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: msg.parts
        }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Error en la API de Gemini: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data: GeminiResponse = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No se recibió respuesta del modelo');
    }

    let responseText = data.candidates[0].content.parts[0].text;
    
    // Detectar si debe mostrar el botón de compra
    const showBuyButton = responseText.includes('[SHOW_BUY_BUTTON]') || detectPurchaseIntent(userMessage);
    
    // Limpiar el marcador del texto
    responseText = responseText.replace(/\[SHOW_BUY_BUTTON\]/g, '').trim();

    return {
      text: responseText,
      showBuyButton
    };
  } catch (error) {
    console.error('Error al comunicarse con Gemini:', error);
    throw error;
  }
}

