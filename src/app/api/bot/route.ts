// app/api/bot/route.ts
import { NextRequest } from 'next/server';

// ИСПОЛЬЗУЙТЕ ТОТ ЖЕ URL, КОТОРЫЙ ВЫ ДАЛИ, С /chat В КОНЦЕ
const N8N_CHAT_WEBHOOK_URL = "https://osio-suh.app.n8n.cloud/webhook/f406671e-c954-4691-b39a-66c90aa2f103/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, userId, userName } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Сообщение (message) обязательно.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Используем userId как sessionId или генерируем новый
    const sessionId = userId || `web_user_${Date.now()}`;

    // Формат данных для Chat Trigger node
    const chatTriggerPayload = {
      action: "sendMessage",
      sessionId: sessionId,
      payload: {
        text: message
      },
      type: "manual"
    };

    console.log(`[API/Bot] Отправка сообщения в n8n Chat Trigger для сессии ${sessionId}:`, message);

    // Отправляем запрос в n8n Chat Trigger webhook
    const n8nResponse = await fetch(N8N_CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatTriggerPayload),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error(`[API/Bot] Ошибка от n8n (${n8nResponse.status}):`, errorText);
      return new Response(
        JSON.stringify({ 
          error: `Ошибка n8n: ${n8nResponse.statusText}`, 
          details: errorText 
        }),
        {
          status: n8nResponse.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const n8nData = await n8nResponse.json();
    console.log(`[API/Bot] Получен ответ от n8n для сессии ${sessionId}:`, n8nData);

    // n8n Chat Trigger возвращает объект. Нужно извлечь текст ответа.
    // Проверим несколько возможных полей
    let botReplyText = "Извините, не понял.";
    if (typeof n8nData === 'object' && n8nData !== null) {
        // Часто ответ находится в поле output
        if (n8nData.output && typeof n8nData.output === 'string') {
            botReplyText = n8nData.output;
        } else if (n8nData.text && typeof n8nData.text === 'string') {
            botReplyText = n8nData.text;
        } else {
            // Если output - объект (например, от LLM), попробуем извлечь текст
            // Пример: { "output": { "text": "Привет!" } }
            if (n8nData.output && typeof n8nData.output === 'object' && n8nData.output.text) {
                botReplyText = n8nData.output.text;
            }
            // Или просто сериализуем объект для отладки (временно)
            // else {
            //     botReplyText = JSON.stringify(n8nData.output || n8nData, null, 2);
            // }
        }
    } else if (typeof n8nData === 'string') {
        // Иногда ответ приходит как строка
        botReplyText = n8nData;
    }

    // Формируем ответ для фронтенда в удобном формате
    const responseBody = {
      reply: botReplyText
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[API/Bot] Непредвиденная ошибка:', error);
    return new Response(
      JSON.stringify({ error: 'Внутренняя ошибка сервера.', details: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Опционально: GET handler для health checks
export async function GET() {
  return new Response(JSON.stringify({ message: 'API route /api/bot is operational' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}