// app/cart/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { translations, unbounded, nunito } from '../../lib/data';
import ChatWidget from '../../components/ChatWidget';

interface CartItem {
  id: number;
  name: {
    ru: string;
    en: string;
    et: string;
  };
  prices: {
    ru: string;
    en: string;
    et: string;
  };
  quantity: number;
  img?: string;
}

export default function CartPage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ru' | 'et'>('ru');
  const t = translations[currentLanguage];
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [orderData, setOrderData] = useState({
    name: '', surname: '', address: '', phone: '', email: '', comment: '', bonuses: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ru' | 'et' | null;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const updateQuantity = (id: number | string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number | string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    setFavorites(prev => prev.filter(favId => favId !== id));
    localStorage.setItem('favorites', JSON.stringify(favorites.filter(favId => favId !== id)));
  };

  const toggleFavorite = (id: number) => {
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { orderData, paymentMethod, cart });
    alert("Заказ оформлен! (Это демо, данные не отправляются на сервер)");
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Функция для извлечения числовой части цены
  const extractNumericPrice = (priceString: string): number => {
    const numericPart = parseFloat(priceString.replace(/[^\d.]/g, ''));
    return isNaN(numericPart) ? 0 : numericPart;
  };

  // Функция для форматирования полной цены с пробелами каждые 3 цифры
  const formatFullPrice = (price: number): string => {
    return Math.floor(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Определение валюты на основе языка
  const getCurrencySymbol = () => {
    switch (currentLanguage) {
      case 'ru': return '₽';
      case 'en': return '$';
      case 'et': return 'ETB';
      default: return '$';
    }
  };

  const currency = getCurrencySymbol();

  const subtotal = cart.reduce((sum, item) => {
    const numericPrice = extractNumericPrice(item.prices[currentLanguage]);
    return sum + (numericPrice * item.quantity);
  }, 0);
  
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, updateFn: () => void) => {
    updateFn();
    const button = e.currentTarget;
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  };

  return (
    <main className="bg-white text-black min-h-screen">
      <header className="sticky top-0 bg-white border-b border-black flex justify-between items-center px-6 py-4 z-50">
        {/* Исправление: Замена Link на button с router.back() для возврата с сохранением позиции скролла */}
        <button onClick={() => router.back()} className={`${unbounded.className} bg-[#C0FC60] text-black px-4 py-1 uppercase rounded text-sm`}>
          {t.backToShop}
        </button>
        <h1 className={`${unbounded.className} text-2xl text-black`}>{t.cartTitle}</h1>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center text-sm text-black">
              <span className="mr-1">🌐</span>
              {currentLanguage.toUpperCase()}
            </button>
            
            <div className="absolute top-full right-0 mt-1 bg-white border border-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button 
                onClick={() => setCurrentLanguage('en')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
              >
                EN
              </button>
              <button 
                onClick={() => setCurrentLanguage('ru')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
              >
                RU
              </button>
              <button 
                onClick={() => setCurrentLanguage('et')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
              >
                ET
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {cart.length === 0 ? (
          <div className="text-center">
            <p className={`${nunito.className} text-xl mb-4`}>{t.cartEmptyCart}</p>
            <p className={`${nunito.className} text-lg mb-6`}>{t.cartAddItems}</p>
            <Link href="/" className={`${unbounded.className} bg-[#C0FC60] text-black px-6 py-3 uppercase rounded inline-block`}>
              {t.cartContinueShopping}
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full">
              <h2 className={`${unbounded.className} text-xl text-black mb-4`}>{t.cartItems} ({cart.length})</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <tbody>
                    {cart.map((item) => {
                      const numericPrice = extractNumericPrice(item.prices[currentLanguage]);
                      const itemTotal = numericPrice * item.quantity;
                      const nameParts = item.name[currentLanguage].split(':');
                      const modelName = nameParts[0] || item.name[currentLanguage];
                      const params = nameParts.slice(1).join(':') || '';
                      return (
                        <tr key={item.id} className="border-b border-[#C0FC60]">
                          <td className="py-4 pr-4 align-middle">
                            <div className="flex items-center">
                              <img src={item.img} alt={item.name[currentLanguage]} className="w-40 h-40 object-cover rounded mr-4 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className={`${unbounded.className} text-black mb-1 truncate`}>{modelName.trim()}</div>
                                {params && <div className={`${nunito.className} text-sm text-gray-600 truncate`}>{params.trim()}</div>}
                              </div>
                            </div>
                          </td>
                          <td className={`${unbounded.className} text-black text-center py-4 pr-4 align-middle`}>
                            {currentLanguage === 'en' && currency}
                            {formatFullPrice(numericPrice)}
                            {currentLanguage !== 'en' && <span className={currentLanguage === 'ru' ? 'text-xs' : ''}>{currency}</span>}
                          </td>
                          <td className="py-4 text-center align-middle">
                            <div className="flex items-center justify-center space-x-2">
                              <button 
                                onClick={(e) => handleButtonClick(e, () => updateQuantity(item.id, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center border border-black text-black transition-colors duration-300"
                              >
                                -
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={(e) => handleButtonClick(e, () => updateQuantity(item.id, item.quantity + 1))}
                                className="w-8 h-8 flex items-center justify-center border border-black text-black transition-colors duration-300"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className={`${unbounded.className} text-black text-center py-4 pr-4 align-middle`}>
                            {currentLanguage === 'en' && currency}
                            {formatFullPrice(itemTotal)}
                            {currentLanguage !== 'en' && <span className={currentLanguage === 'ru' ? 'text-xs' : ''}>{currency}</span>}
                          </td>
                          <td className="py-4 text-center align-middle space-x-4">
                            <button 
                              onClick={() => toggleFavorite(item.id)}
                              className={`mr-2 ${favorites.includes(item.id) ? 'text-[#C0FC60]' : 'text-black'}`}
                              title={t.cartFavoriteFull}
                            >
                              {favorites.includes(item.id) ? '♥' : '♡'}
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-black"
                              title={t.cartRemoveFull}
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full mt-8">
              <div className="bg-[#C0FC60]/20 border border-[#C0FC60] p-6 rounded-2xl">
                <h2 className={`${unbounded.className} text-xl text-black mb-4`}>{t.cartOrderSummary}</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className={nunito.className}>Итого</span>
                    <span className={nunito.className}>
                      {currentLanguage === 'en' && currency}
                      {formatFullPrice(subtotal)}
                      {currentLanguage !== 'en' && <span className={currentLanguage === 'ru' ? 'text-xs' : ''}>{currency}</span>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={nunito.className}>{t.cartShipping}</span>
                    <span className={nunito.className}>
                      {currentLanguage === 'en' && currency}
                      {formatFullPrice(shipping)}
                      {currentLanguage !== 'en' && <span className={currentLanguage === 'ru' ? 'text-xs' : ''}>{currency}</span>}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={nunito.className}>{t.cartEstimatedTax}</span>
                    <span className={nunito.className}>
                      {currentLanguage === 'en' && currency}
                      {formatFullPrice(tax)}
                      {currentLanguage !== 'en' && <span className={currentLanguage === 'ru' ? 'text-xs' : ''}>{currency}</span>}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#C0FC60]">
                    <span className={`${unbounded.className} text-black`}>{t.cartGrandTotal}</span>
                    <span className={`${unbounded.className} text-black`}>
                      {currentLanguage === 'en' && currency}
                      {formatFullPrice(total)}
                      {currentLanguage !== 'en' && <span className={currentLanguage === 'ru' ? 'text-xs' : ''}>{currency}</span>}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className={`${nunito.className} block mb-1`}>{t.cartName}</label>
                    <input
                      type="text"
                      value={orderData.name}
                      onChange={(e) => setOrderData({...orderData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500"
                      placeholder={t.cartFormNamePlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`${nunito.className} block mb-1`}>{t.cartSurname}</label>
                    <input
                      type="text"
                      value={orderData.surname}
                      onChange={(e) => setOrderData({...orderData, surname: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500"
                      placeholder={t.cartFormSurnamePlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`${nunito.className} block mb-1`}>{t.cartAddress}</label>
                    <input
                      type="text"
                      value={orderData.address}
                      onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500"
                      placeholder={t.cartFormAddressPlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`${nunito.className} block mb-1`}>{t.cartPhone}</label>
                    <input
                      type="tel"
                      value={orderData.phone}
                      onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500"
                      placeholder={t.cartFormPhonePlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`${nunito.className} block mb-1`}>{t.cartEmail}</label>
                    <input
                      type="email"
                      value={orderData.email}
                      onChange={(e) => setOrderData({...orderData, email: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500"
                      placeholder={t.cartFormEmailPlaceholder}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`${nunito.className} block mb-1`}>{t.cartComment}</label>
                    <textarea
                      value={orderData.comment}
                      onChange={(e) => setOrderData({...orderData, comment: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500"
                      placeholder={t.cartFormCommentPlaceholder}
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={orderData.bonuses}
                      onChange={(e) => setOrderData({...orderData, bonuses: e.target.value})}
                      className="flex-1 px-3 py-2 bg-white border border-[#C0FC60] text-black placeholder-gray-500 mr-2"
                      placeholder={t.cartFormBonusesPlaceholder}
                    />
                    <button
                      type="button"
                      className={`${unbounded.className} bg-gray-200 text-black px-3 py-2 rounded`}
                    >
                      {t.cartApply}
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className={`${unbounded.className} block mb-2 text-black`}>{t.cartPaymentMethod}</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          onChange={() => setPaymentMethod('cash')}
                          className="mr-2 accent-[#C0FC60]"
                        />
                        <span className={nunito.className}>
                          {t.cartCash}
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mr-2 accent-[#C0FC60]"
                        />
                        <span className={nunito.className}>
                          {t.cartCard}
                        </span>
                      </label>
                      <span className={nunito.className + " opacity-50"}>
                        {t.cartBNPL} (soon)
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`${unbounded.className} w-full bg-[#C0FC60] text-black py-3 px-4 rounded`}
                  >
                    {t.cartCheckoutButton}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Футер с контактами */}
      <footer className="bg-black text-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex items-start">
            <div className="relative h-16 w-16"> {/* Примерный размер */}
              <Image
                src="/logo-white.png"
                alt="OSiO Solar Hubs"
                fill
                style={{objectFit: 'contain'}}
                sizes="(max-width: 768px) 64px, 64px"
              />
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`${unbounded.className} text-lg font-medium mb-4 text-[#C0FC60]`}>
                {t.email}
              </h3>
              <p className={`${nunito.className} font-light`}>
                osio@osio.ru
              </p>
            </div>

            <div>
              <h3 className={`${unbounded.className} text-lg font-medium mb-4 text-[#C0FC60]`}>
                {t.phone}
              </h3>
              <p className={`${nunito.className} font-light`}>
                8 (800) 201-11-78
              </p>
            </div>

            <div>
              <h3 className={`${unbounded.className} text-lg font-medium mb-4 text-[#C0FC60]`}>
                {t.address}
              </h3>
              <p className={`${nunito.className} font-light`}>
                г. Иннополис, Россия
              </p>
            </div>
          </div>

          <div className="md:col-span-4 mt-8 pt-8 border-t border-gray-700">
            <h3 className={`${unbounded.className} text-lg font-medium mb-6 text-center text-[#C0FC60]`}>
              {t.follow}
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://t.me/OSIORussia_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#C0FC60] transition-colors"
                aria-label="Telegram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>

              <a
                href="https://vk.com/club221334089"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#C0FC60] transition-colors"
                aria-label="VKontakte"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.344 16.163h-1.867c-1.055 0-1.232-.601-2.102-1.469-.781-.781-1.313-.172-1.313.832v1.469c0 .619-.506 1.125-1.125 1.125h-2.927c-.619 0-1.125-.506-1.125-1.125v-7.875c0-.619.506-1.125 1.125-1.125h2.927c.619 0 1.125.506 1.125 1.125v.375c0 1.004.532 1.613 1.313.832.87-.868 1.047-1.469 2.102-1.469h1.867c.619 0 1.125.506 1.125 1.125v5.625c0 .619-.506 1.125-1.125 1.125zm-2.625-5.625c0-.619-.506-1.125-1.125-1.125s-1.125.506-1.125 1.125v3c0 .619.506 1.125 1.125 1.125s1.125-.506 1.125-1.125v-3z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCYnLCslyQPL-H-vc_iwszww"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#C0FC60] transition-colors"
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
                </svg>
              </a>

              <a
                href="https://tiktok.com/osio_ethiopia"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#C0FC60] transition-colors"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 text-center mt-8 pt-8 border-t border-gray-700">
            <p className={`${nunito.className} text-sm font-light text-gray-400`}>
              © {new Date().getFullYear()} OSiO Solar Hubs. {t.copyright}
            </p>
          </div>
        </div>
      </footer>

      <div className="bg-[#C0FC60] text-black text-sm py-2 text-center">
        <span className={`${unbounded.className} font-medium`}>
          Natali Suh for OSiO Solar Hubs Ethiopia • ArtMasters 2025
        </span>
      </div>

      {/* Компонент чата Kate */}
      <ChatWidget />

      <style jsx global>{`
        @keyframes green-flash {
          0% { background-color: white; }
          50% { background-color: #C0FC60; }
          100% { background-color: white; }
        }
        .clicked {
          animation: green-flash 0.3s;
        }
      `}</style>
    </main>
  );
}