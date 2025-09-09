// app/api/bot-response/route.ts
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Ожидаем, что n8n отправит что-то вроде { sessionId: '...', reply: '...' }
    const { sessionId, reply, messageId } = body;

    if (!sessionId || !reply) {
      console.error('[API/Bot-Response] Отсутствуют sessionId или reply в теле запроса:', body);
      return new Response(JSON.stringify({ error: 'Missing sessionId or reply' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`[API/Bot-Response] Получен ответ для сессии ${sessionId}:`, reply);
    
    // !!! ВАЖНО !!!
    // Здесь должна быть логика передачи этого ответа
    // конкретному пользователю на сайте.
    // Простейший (но НЕ ПРОИЗВОДИТЕЛЬНЫЙ) способ:
    // 1. Сохранить ответ в долговременное хранилище (например, Redis, БД)
    // 2. Уведомить frontend сайта, что для sessionId есть новый ответ
    //    (например, через Server-Sent Events или WebSockets).
    
    // Для ПРОСТОГО тестирования (НЕ ДЕЛАЙТЕ ТАК В ПРОДАКШЕНЕ):
    // Можно временно сохранить в памяти сервера (например, в Map).
    // global.__BOT_RESPONSES__ = global.__BOT_RESPONSES__ || {};
    // if (!global.__BOT_RESPONSES__[sessionId]) {
    //   global.__BOT_RESPONSES__[sessionId] = [];
    // }
    // global.__BOT_RESPONSES__[sessionId].push({ reply, timestamp: Date.now() });
    
    // Пока просто логируем и возвращаем успех.
    // Ваш фронтенд на сайте должен будет как-то опрашивать этот endpoint
    // или получать уведомления.
    
    // В реальном приложении здесь будет логика отправки
    // через WebSocket соединение, связанное с sessionId.

    return new Response(JSON.stringify({ success: true, message: 'Response received' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API/Bot-Response] Ошибка:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}