// components/ChatWidget.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { nunito, unbounded } from '../lib/data'; // Убедитесь, что путь правильный

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  senderName?: string; 
}

const ChatWidget = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [windowSize, setWindowSize] = useState<'small' | 'medium' | 'large' | 'fullscreen'>('medium'); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isMinimized, windowSize]);

  const openChat = () => {
    if (!isVisible) {
      setIsVisible(true);
      setIsMinimized(true);
    } else {
      const wasMinimized = isMinimized;
      setIsMinimized(!isMinimized);
      
      if (wasMinimized && messages.length === 0) { 
         setTimeout(() => {
           setMessages([
             {
               id: 'welcome',
               sender: 'bot',
               text: '👋 Привет! Я Kate, твой виртуальный помощник OSiO. Рада видеть тебя! 😊\nЧем могу быть полезна сегодня?',
               timestamp: new Date(),
               senderName: 'Kate'
             },
           ]);
         }, 300);
      }
    }
  };

  const changeSize = (size: 'small' | 'medium' | 'large' | 'fullscreen') => {
    setWindowSize(size);
    setIsSizeMenuOpen(false);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    const tempId = `temp_${Date.now()}`;

    const newUserMessage: Message = {
      id: tempId,
      sender: 'user',
      text: userMessageText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessageText,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }

      const data = await response.json();
      console.log('[ChatWidget] Получен ответ от API:', data);

      setMessages(prev => prev.filter(msg => msg.id !== tempId));

      const finalUserMessage: Message = {
        ...newUserMessage,
        id: `user_${Date.now()}`,
      };

      const botReplyText = data.reply || data.response || data.text || data.markdown || "Извините, не понял.";

      const botReply: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date(),
        senderName: 'Kate'
      };

      setMessages(prev => [...prev, finalUserMessage, botReply]);

    } catch (error) {
      console.error('[ChatWidget] Ошибка при отправке сообщения:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        sender: 'bot',
        text: 'Произошла ошибка при отправке сообщения. Попробуйте ещё раз.',
        timestamp: new Date(),
        senderName: 'Kate'
      };
      setMessages(prev => [...prev, newUserMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isVisible) {
    return null;
  }

  let sizeClasses = '';
  switch (windowSize) {
    case 'small':
      sizeClasses = 'w-80 h-[30rem]';
      break;
    case 'large':
      sizeClasses = 'w-[36rem] h-[36rem]'; 
      break;
    case 'fullscreen':
      sizeClasses = 'fixed inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]';
      break;
    case 'medium':
    default:
      sizeClasses = 'w-96 h-[32rem]'; 
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Кнопка виджета */}
      {isMinimized && (
        <button
          onClick={openChat}
          className="bg-gradient-to-br from-[#C0FC60] to-[#a8e04a] text-black rounded-full p-4 shadow-lg hover:from-[#a8e04a] hover:to-[#C0FC60] transition-all duration-300 transform hover:scale-110 w-14 h-14 flex items-center justify-center border border-white/30 backdrop-blur-sm"
          aria-label="Открыть чат с Kate"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Окно чата */}
      {!isMinimized && isVisible && (
        <div className="relative">
          {/* Окно чата в стиле "жидкое стекло" */}
          <div className={`bg-white/20 backdrop-blur-md flex flex-col shadow-xl border border-white/30 rounded-2xl overflow-hidden ${sizeClasses}`}>
            
            {/* Заголовок окна чата с градиентом и новым текстом */}
            <div className={`${unbounded.className} flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#a8e04a] to-[#C0FC60] text-black`}>
              <h3 className="text-md font-bold">Kate | OSiO Help</h3> {/* Обновлённый текст в заголовке */}
              <div className="flex items-center space-x-1 relative">
                {/* Кнопка сворачивания */}
                <button 
                  onClick={() => setIsMinimized(true)} 
                  className="text-xl font-bold p-1 rounded-full hover:bg-white/20 w-7 h-7 flex items-center justify-center transition-colors"
                  aria-label="Свернуть чат"
                >
                  &minus;
                </button>
                
                {/* Кнопка изменения размера (черный квадрат) */}
                <button 
                  onClick={() => setIsSizeMenuOpen(!isSizeMenuOpen)} 
                  className="border border-black text-black text-xs font-bold p-1 rounded-full hover:bg-white/20 w-7 h-7 flex items-center justify-center transition-colors"
                  aria-label="Изменить размер"
                >
                </button>

                {/* Выпадающее меню размеров */}
                {isSizeMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg z-10">
                    <button 
                      onClick={() => changeSize('small')} 
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/30 transition-colors ${windowSize === 'small' ? 'font-bold' : ''}`}
                    >
                      Маленькое (S)
                    </button>
                    <button 
                      onClick={() => changeSize('medium')} 
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/30 transition-colors ${windowSize === 'medium' ? 'font-bold' : ''}`}
                    >
                      Среднее (M)
                    </button>
                    <button 
                      onClick={() => changeSize('large')} 
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/30 transition-colors ${windowSize === 'large' ? 'font-bold' : ''}`}
                    >
                      Большое (L)
                    </button>
                    <button 
                      onClick={() => changeSize('fullscreen')} 
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/30 transition-colors ${windowSize === 'fullscreen' ? 'font-bold' : ''}`}
                    >
                      На весь экран
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Область сообщений с полупрозрачным фоном */}
            <div className="flex-grow overflow-y-auto p-3 bg-white/10 backdrop-blur-xs">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                  <p>Напишите сообщение...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Аватар и имя для сообщений бота */}
                      {msg.sender === 'bot' && (
                        <div className="flex flex-col items-center mr-3 flex-shrink-0"> {/* Выравнивание по центру аватара */}
                          {/* Аватар бота */}
                          <img 
                            src="/operator-avatar.gif" 
                            alt="Аватар Kate" 
                            className="w-9 h-9 rounded-full object-cover border-2 border-white/50 shadow-sm"
                          />
                          {/* Имя бота под аватаром, выровненное по центру */}
                          {msg.senderName && (
                            <span className={`${nunito.className} text-xs text-gray-800 mt-1 font-medium text-center`}> {/* text-gray-800 для более темного текста */}
                              {msg.senderName}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Пузырек сообщения в стиле "жидкое стекло", более белый */}
                      <div
                        className={`
                          max-w-[85%] px-4 py-3 text-sm rounded-2xl backdrop-blur-sm
                          ${msg.sender === 'user' 
                            // Стиль для сообщений пользователя (ярко-зеленый)
                            ? 'bg-gradient-to-br from-[#C0FC60] to-[#a8e04a] text-black rounded-tr-none border border-white/30 shadow-inner' 
                            // Стиль для сообщений бота (более белый)
                            : 'bg-white/60 text-gray-800 rounded-tl-none border border-white/20'} {/* bg-white/60 и text-gray-800 */}
                          ${nunito.className}
                        `}
                      >
                        <div className="whitespace-pre-wrap break-words">
                          {msg.text.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex flex-col items-center mr-3 flex-shrink-0"> {/* Аватар при загрузке */}
                        <img 
                          src="/operator-avatar.gif" 
                          alt="Аватар Kate" 
                          className="w-9 h-9 rounded-full object-cover border-2 border-white/50 shadow-sm"
                        />
                        <span className={`${nunito.className} text-xs text-gray-800 mt-1 font-medium text-center`}>
                          Kate
                        </span>
                      </div>
                      <div className={`max-w-[85%] px-4 py-3 text-sm rounded-2xl bg-white/60 text-gray-800 rounded-tl-none backdrop-blur-sm border border-white/20 ${nunito.className}`}> {/* Стиль загрузки тоже более белый */}
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Область ввода с более белым полем и ярко-зеленой кнопкой */}
            <div className="p-3 border-t border-white/20 bg-white/10 backdrop-blur-xs">
              <div className="flex">
                {/* Поле ввода более белое */}
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Сообщение Kate..."
                  disabled={isLoading}
                  rows={1}
                  className={`${nunito.className} flex-grow textarea textarea-bordered border border-white/30 bg-white/50 backdrop-blur-sm rounded-l-2xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 resize-none`} // bg-white/50 для более белого фона
                  style={{ minHeight: '40px', maxHeight: '80px' }}
                />
                {/* Кнопка отправки ярко-зеленая с черной стрелкой */}
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`${unbounded.className} bg-[#C0FC60] text-black px-4 py-2 rounded-r-2xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a8e04a] transition-all border border-white/30 flex items-center justify-center`} // bg-[#C0FC60] для ярко-зеленого фона
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    '➤'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;