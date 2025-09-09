// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from 'next/link';
import Image from 'next/image'; // 1. Импорт next/image
import { translations, laptopsData, hubData, unbounded, nunito } from '../lib/data';
import ChatWidget from '../components/ChatWidget';
import AboutUsSection from '../components/AboutUsSection';

// 2. Определение интерфейсов для типов any
interface LaptopData {
  id: number;
  img: string;
  name: Record<string, string>;
  prices: Record<string, string>;
  descriptions: Record<string, string>;
  specs: Record<string, string[]>;
  // Добавляем images, так как оно добавляется динамически в openPreview
  images?: string[];
}

interface CartItem extends LaptopData {
  quantity: number;
}

// Функция для плавной прокрутки с учетом центрирования
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middleOfScreen = window.innerHeight / 2;
    const middleOfElement = elementRect.height / 2;
    const scrollTo = absoluteElementTop - middleOfScreen + middleOfElement;

    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
  }
};

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ru' | 'et'>('ru');
  const t = translations[currentLanguage];
  // 3. Уточнение типа для selectedLaptop
  const [selectedLaptop, setSelectedLaptop] = useState<LaptopData | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  // 4. Уточнение типа для cartItems
  const [cartItems, setCartItems] = useState<Record<number, number>>({});
  const [cartMessage, setCartMessage] = useState<{ message: string; show: boolean }>({ message: '', show: false });
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Добавлено: Загрузка языка и корзины из localStorage при монтировании ---
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ru' | 'et' | null;
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const savedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemsMap: Record<number, number> = {};
    savedCart.forEach((item) => {
      itemsMap[item.id] = item.quantity;
    });
    setCartItems(itemsMap);
  }, []);

  // --- Добавлено: Сохранение языка в localStorage при изменении ---
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  // --- Добавлено: Функции для работы с корзиной ---
  // Проверка, находится ли товар в корзине
  const checkIfInCart = (laptopId: number) => {
    return cartItems[laptopId] > 0;
  };

  // Функция для добавления в корзину
  const addToCart = (laptopId: number) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item) => item.id === laptopId);
    let newQuantity = 1;
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
      newQuantity = cart[existingItemIndex].quantity;
    } else {
      const laptop = laptopsData.find(l => l.id === laptopId);
      if (laptop) {
        cart.push({ ...laptop, quantity: 1 });
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(prev => ({ ...prev, [laptopId]: newQuantity }));
    setCartMessage({ message: t.addedToCart, show: true });
    setTimeout(() => setCartMessage({ message: '', show: false }), 2000);
  };

  // Функция для изменения количества в корзине
  const updateQuantity = (laptopId: number, newQuantity: number) => {
    if (newQuantity < 1) {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.filter((item) => item.id !== laptopId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(prev => {
            const newItems = { ...prev };
            delete newItems[laptopId];
            return newItems;
        });
        return;
    }
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item) => item.id === laptopId);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(prev => ({ ...prev, [laptopId]: newQuantity }));
    }
  };
  // --------------------------------------------------

  // Функции для управления превью
  const openPreview = (laptopId: number) => {
    const fullLaptopData = laptopsData.find(laptop => laptop.id === laptopId);
    if (!fullLaptopData) {
      console.error("Laptop data not found for ID:", laptopId);
      return;
    }

    const images = [
      fullLaptopData.img,
      "/gallery1.jpg",
      "/gallery2.jpg",
      "/gallery3.jpg"
    ];
    // 5. Уточнение типа при установке состояния
    setSelectedLaptop({...fullLaptopData, images} as LaptopData);
    setPreviewImageIndex(0);
  };

  const closePreview = () => {
    setSelectedLaptop(null);
  };

  const nextImage = () => {
    if (selectedLaptop && selectedLaptop.images) {
      setPreviewImageIndex((prev) =>
        prev < selectedLaptop.images!.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedLaptop && selectedLaptop.images) {
      setPreviewImageIndex((prev) =>
        prev > 0 ? prev - 1 : selectedLaptop.images!.length - 1
      );
    }
  };


  return (
    <main className="bg-white text-black">
      {/* Сообщение о добавлении в корзину - добавлено */}
      {cartMessage.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#C0FC60] text-black px-4 py-2 rounded z-50 shadow-lg">
          {cartMessage.message}
        </div>
      )}
      {/* Бегущая строка Time to Create */}
      <div className="bg-[#C0FC60] text-black py-2 overflow-hidden whitespace-nowrap relative w-full">
        <div className="inline-block whitespace-nowrap animate-marquee pl-[100%]">
          <span className={`${unbounded.className} font-medium text-sm md:text-base`}>
            {t.marquee} &nbsp; • &nbsp;
            {t.marquee} &nbsp; • &nbsp;
            {t.marquee} &nbsp; • &nbsp;
            {t.marquee} &nbsp; • &nbsp;
            {t.marquee} &nbsp; • &nbsp;
            {t.marquee} &nbsp; • &nbsp;
          </span>
        </div>
      </div>

      {/* Хедер с переключателем языка и корзиной */}
      <header className="sticky top-0 bg-white border-b border-black flex justify-between items-center px-6 py-4 z-50">
        <div className="flex items-center">
          {/* 6. Замена img на Image */}
          <div className="relative h-20 w-20 mr-6"> {/* Контейнер с размерами */}
            <Image
              src="/logo.png"
              alt="Logo"
              fill // Заполняет контейнер
              style={{objectFit: 'contain'}} // Сохраняет пропорции
              sizes="(max-width: 768px) 80px, 80px" // Подсказка для оптимизации
            />
          </div>
        </div>

        <nav className={`${nunito.className} uppercase text-sm flex gap-6`}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t.about}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('laptops'); }}>{t.laptops}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('co-create'); }}>{t.coCreate}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('create-with-us'); }}>{t.createWithUs}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('locations'); }}>{t.locations}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t.contactUs}</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center text-sm">
              <span className="mr-1">🌐</span>
              {currentLanguage.toUpperCase()}
            </button>

            <div className="absolute top-full right-0 mt-1 bg-white border border-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setCurrentLanguage('en')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLanguage('ru')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                RU
              </button>
              <button
                onClick={() => setCurrentLanguage('et')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                ET
              </button>
            </div>
          </div>

          <button className={`${unbounded.className} bg-black text-white px-4 py-2 uppercase rounded text-sm`}>
            {t.book}
          </button>

          <Link href="/cart" className={`${unbounded.className} bg-[#C0FC60] text-black px-4 py-2 uppercase rounded text-sm`}>
            {t.cart}
          </Link>
        </div>
      </header>

      {/* Hero секция */}
      <section className="relative h-screen" id="menu">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 right-0 bg-black">
            {/* 7. Замена img на Image */}
            <div className="relative w-full h-full">
              <Image
                src="/hero-background.jpg"
                alt="Background"
                fill
                style={{objectFit: 'cover', opacity: '0.7'}}
                sizes="100vw"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 h-full relative z-10">
          <div className="relative flex items-center justify-center">
            {/* 8. Видео остается без изменений, так как это не img */}
            <video autoPlay loop muted className="w-full h-full object-cover">
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <button className="absolute bg-transparent text-[#C0FC60] px-6 py-2 font-bold uppercase border border-[#C0FC60] rounded">
              {t.learnMore}
            </button>
          </div>

          <div className="relative flex flex-col justify-end p-10">
            <div className="mb-16">
              <h1 className={`${unbounded.className} text-5xl font-medium mb-2 text-white`}>
                {t.title}
              </h1>
              <p className={`${nunito.className} text-lg text-white`}>
                {t.subtitle}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
              <div className="flex-1 border-t-[40px] border-[#C0FC60]"></div>
              <div className="flex items-center justify-between px-4 py-2 bg-[#C0FC60]">
                <span className={`${unbounded.className} uppercase text-black text-sm`}>
                  {t.discoverMore}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="uppercase">{t.scroll}</span>
                  <span className="text-black">↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Добавьте AboutUsSection здесь --- */}
      <AboutUsSection />

      {/* Вторая бегущая строка - черная с зеленым текстом */}
      <div className="bg-black text-[#C0FC60] py-3 overflow-hidden whitespace-nowrap relative">
        <div className="inline-block whitespace-nowrap animate-marquee pl-[100%]">
          <span className={`${unbounded.className} font-medium text-sm md:text-base`}>
            {t.secondMarquee} &nbsp; • &nbsp;
            {t.secondMarquee} &nbsp; • &nbsp;
            {t.secondMarquee} &nbsp; • &nbsp;
            {t.secondMarquee} &nbsp; • &nbsp;
          </span>
        </div>
      </div>

      {/* Секция с видео слева и пунктами справа - обновленная */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-black text-white" id="about">
        {/* Левая часть с видео */}
        <div className="relative">
          {/* 9. Видео остается без изменений */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/your-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Правая часть с заголовками */}
        <div className="flex flex-col justify-center p-6 md:p-12 relative">
          <div className="flex flex-col justify-center h-full">
            <h2 className={`${unbounded.className} text-3xl md:text-4xl font-medium mb-8 text-[#C0FC60]`}>
              {t.pricingModel}
            </h2>

            <div className="ml-6 md:ml-10 space-y-12">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center">
                    <span className={`${unbounded.className} text-white text-xl font-bold`}>1</span>
                  </div>
                </div>
                <div>
                  <h3 className={`${unbounded.className} text-2xl md:text-3xl font-medium mb-2`}>
                    {t.tasteFeel}
                  </h3>
                  <p className={`${nunito.className} text-base md:text-lg text-gray-300`}>
                    {t.tasteFeelDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center">
                    <span className={`${unbounded.className} text-white text-xl font-bold`}>2</span>
                  </div>
                </div>
                <div>
                  <h3 className={`${unbounded.className} text-2xl md:text-3xl font-medium mb-2`}>
                    {t.learnGrow}
                  </h3>
                  <p className={`${nunito.className} text-base md:text-lg text-gray-300`}>
                    {t.learnGrowDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-transparent flex items-center justify-center">
                    <span className={`${unbounded.className} text-white text-xl font-bold`}>3</span>
                  </div>
                </div>
                <div>
                  <h3 className={`${unbounded.className} text-2xl md:text-3xl font-medium mb-2`}>
                    {t.ownShine}
                  </h3>
                  <p className={`${nunito.className} text-base md:text-lg text-gray-300`}>
                    {t.ownShineDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Бегущая строка Creator Tools */}
      <div className="bg-[#C0FC60] text-black py-3 overflow-hidden whitespace-nowrap relative">
        <div className="inline-block whitespace-nowrap animate-marquee pl-[100%]">
          <span className={`${unbounded.className} font-medium text-xl`}>
            {t.creatorTools} &nbsp; • &nbsp;
            {t.creatorTools} &nbsp; • &nbsp;
            {t.creatorTools} &nbsp; • &nbsp;
            {t.creatorTools} &nbsp; • &nbsp;
          </span>
        </div>
      </div>

      {/* Секция с карточками ноутбуков */}
      <section className="px-6 md:px-12 py-16" id="laptops">
        <h2 className={`${unbounded.className} text-3xl md:text-4xl font-bold mb-6`}>{t.laptops}</h2>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".laptops-swiper .swiper-button-next-custom",
            prevEl: ".laptops-swiper .swiper-button-prev-custom",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="laptops-swiper relative"
        >
          {laptopsData.map((laptop) => (
            <SwiperSlide key={laptop.id}>
              <div
                className="relative group border-b border-r border-black cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                onClick={() => openPreview(laptop.id)}
              >
                <div className="w-full aspect-[3/4] relative overflow-hidden">
                  {/* 10. Замена img на Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={laptop.img}
                      alt={"Laptop " + (laptop.name[currentLanguage] || laptop.name.ru)}
                      fill
                      style={{objectFit: 'cover'}}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <div
                    className={`
                      absolute bottom-0 left-0 right-0 bg-white
                      border-t border-black p-2 text-center transition-colors duration-300
                      group-hover:bg-[#C0FC60]
                      -mt-px
                    `}
                  >
                    <h4 className={`${nunito.className} uppercase font-extralight text-sm`}>
                      {laptop.name[currentLanguage] || laptop.name.ru}
                    </h4>
                    <p className={`${nunito.className} font-light text-xs`}>
                      {laptop.prices[currentLanguage] || laptop.prices.ru}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-black text-2xl font-bold cursor-pointer after:content-none">
            ←
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-black text-2xl font-bold cursor-pointer after:content-none">
            →
          </div>
        </Swiper>
      </section>

      {/* Секция Co Create Hub (Галерея хабов) */}
      <section className="px-6 md:px-12 py-16" id="co-create">
        <h2 className={`${unbounded.className} text-3xl md:text-4xl font-bold mb-6`}>{t.galleryTitle}</h2>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".hubs-swiper .swiper-button-next-custom",
            prevEl: ".hubs-swiper .swiper-button-prev-custom",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="hubs-swiper relative"
        >
          {hubData.map((hub) => (
            <SwiperSlide key={hub.id}>
              <div className="relative group">
                <div className="w-full aspect-[4/3] relative overflow-hidden rounded-lg">
                  {/* 11. Замена img на Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={hub.img}
                      alt={`${t.hubCity} ${t[hub.city_key] || t.hubCityAddisAbaba}`}
                      fill
                      style={{objectFit: 'cover'}}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                    <h3 className={`${unbounded.className} text-lg font-bold`}>
                      {t.hubCity} {t[hub.city_key] || t.hubCityAddisAbaba}
                    </h3>
                    <p className={`${nunito.className} text-sm`}>
                      {hub.location[currentLanguage] || hub.location.ru}
                    </p>
                    <p className={`${nunito.className} text-xs mt-1`}>
                      {hub.address[currentLanguage] || hub.address.ru}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-black text-2xl font-bold cursor-pointer after:content-none">
            ←
          </div>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-black text-2xl font-bold cursor-pointer after:content-none">
            →
          </div>
        </Swiper>
      </section>

      {/* Новый видеоблок Create With Us */}
      <section className="w-full bg-black text-white py-16" id="create-with-us">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-2 relative h-full">
              <div className="relative w-full h-full">
                {/* 12. Видео остается без изменений */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                >
                  <source src="/co-create-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="md:col-span-1 bg-black flex flex-col justify-center p-6">
              <h2 className={`${unbounded.className} text-3xl md:text-4xl font-bold text-[#C0FC60] mb-4`}>
                {t.becomePartOfArt}
              </h2>
              <h3 className={`${unbounded.className} text-xl md:text-2xl font-medium text-white mb-6`}>
                {t.yourTalentShapes}
              </h3>
              <p className={`${nunito.className} text-base md:text-lg text-gray-300 flex-grow`}>
                {t.osioIsntJust}
              </p>

              <div className="mt-8 flex-shrink-0">
                {/* Удалена двойная линия, оставлена только одна с текстом */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#C0FC60] w-full">
                  <span className={`${unbounded.className} uppercase text-black text-sm`}>
                    {t.fillTheForm}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="uppercase text-black">{t.scroll}</span>
                    <span className="text-black">↓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма для заполнения */}
      <section className="w-full py-16 relative" id="form-section">
        <div className="absolute inset-0 z-0 bg-black/90">
          {/* 13. Замена img на Image */}
          <div className="relative w-full h-full">
            <Image
              src="/form-background.jpg"
              alt="Form Background"
              fill
              style={{objectFit: 'cover'}}
              sizes="100vw"
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto bg-white/15 backdrop-blur-lg rounded-xl p-8 border border-[#C0FC60]/30">
            <h2 className={`${unbounded.className} text-2xl md:text-3xl font-bold text-center text-[#C0FC60] mb-6`}>
              {t.formTitle}
            </h2>

            <form className="space-y-4">
              <div className="relative">
                <label className={`${nunito.className} block text-xs mb-1 text-gray-300`}>{t.formName}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t.formNamePlaceholder || "Иван Иванов"}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-[#C0FC60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0FC60] text-white placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <label className={`${nunito.className} block text-xs mb-1 text-gray-300`}>{t.formEmail}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t.formEmailPlaceholder || "example@mail.com"}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-[#C0FC60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0FC60] text-white placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <label className={`${nunito.className} block text-xs mb-1 text-gray-300`}>{t.formSpecialization}</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  placeholder={t.formSpecializationPlaceholder || "Графический дизайнер"}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-[#C0FC60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0FC60] text-white placeholder-gray-400"
                />
              </div>

              <div className="relative">
                <label className={`${nunito.className} block text-xs mb-1 text-gray-300`}>{t.formStyle}</label>
                <textarea
                  id="style"
                  name="style"
                  placeholder={t.formStylePlaceholder || "Опишите ваш стиль и предпочтения"}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-[#C0FC60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0FC60] text-white placeholder-gray-400"
                ></textarea>
              </div>

              <div className="relative">
                <label className={`${nunito.className} block text-xs mb-1 text-gray-300`}>{t.formPortfolio}</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  placeholder={t.formPortfolioPlaceholder || "https://yourportfolio.com"}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-[#C0FC60]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C0FC60] text-white placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className={`${unbounded.className} w-full bg-[#C0FC60] hover:bg-[#a8e04a] text-black font-bold uppercase py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-[1.02]`}
              >
                {t.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Карта с адресами */}
      <section className="px-6 md:px-12 py-16" id="locations">
        <h2 className={`${unbounded.className} text-3xl md:text-4xl font-bold mb-6`}>{t.locations}</h2>

        <div className="w-full h-96 border border-black rounded-lg overflow-hidden">
          {/* 14. iframe остается без изменений, это не img */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243645.22142263055!2d37.290699!3d9.010793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85d9e16f4e57%3A0x77f8bda821a2b4fd!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1692817400000!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

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
                {/* 16. SVG остается без изменений */}
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

      {/* Модальное окно предпросмотра ноутбука */}
      {selectedLaptop && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className={`${unbounded.className} text-2xl md:text-3xl font-bold`}>
                  {selectedLaptop.name[currentLanguage] || selectedLaptop.name.ru}
                </h2>
                <button
                  onClick={closePreview}
                  className="text-2xl font-bold p-1 rounded-full hover:bg-gray-200 w-8 h-8 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="relative mb-4 border border-gray-300 rounded-lg overflow-hidden">
                    {selectedLaptop.images && (
                      <div className="relative w-full h-64 md:h-80">
                        <Image
                          src={selectedLaptop.images[previewImageIndex]}
                          alt={`${selectedLaptop.name[currentLanguage] || selectedLaptop.name.ru} - View ${previewImageIndex + 1}`}
                          fill
                          style={{objectFit: 'contain', backgroundColor: '#f9fafb'}} // object-contain и фон как у img
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedLaptop.images && selectedLaptop.images.slice(0, 4).map((img: string, index: number) => (
                      <div key={index} className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                        <Image
                          src={img}
                          alt={`Preview ${index + 1} of ${selectedLaptop.name[currentLanguage] || selectedLaptop.name.ru}`}
                          fill
                          style={{objectFit: 'cover'}}
                          className={`rounded border cursor-pointer ${index === previewImageIndex ? 'border-black ring-2 ring-[#C0FC60]' : 'border-gray-300'}`}
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="mb-6">
                    <h3 className={`${unbounded.className} text-lg font-bold mb-2`}>{t.aboutLaptop}</h3>
                    <p className={`${nunito.className} font-light`}>
                      {selectedLaptop.descriptions[currentLanguage] || selectedLaptop.descriptions.ru}
                    </p>
                  </div>

                  <div>
                    <h3 className={`${unbounded.className} text-lg font-bold mb-2`}>{t.specifications}</h3>
                    <ul className={`${nunito.className} space-y-1`}>
                      {selectedLaptop.specs && selectedLaptop.specs[currentLanguage] && selectedLaptop.specs[currentLanguage].length > 0 ? (
                        selectedLaptop.specs[currentLanguage].map((spec: string, i: number) => (
                          <li key={i} className="font-light flex">
                            <span className="mr-2">•</span>
                            <span>{spec}</span>
                          </li>
                        ))
                      ) : (
                        <li className="font-light">{t.specsSoon}</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-1 flex flex-col">
                  <div className="mb-6">
                    <p className={`${unbounded.className} text-2xl md:text-3xl font-bold`}>
                      {selectedLaptop.prices[currentLanguage] || selectedLaptop.prices.ru}
                    </p>
                  </div>

                  <div className="mt-auto space-y-4">
                    {/* --- ИЗМЕНЕНО: Кнопка "Купить" с функционалом корзины --- */}
                    {checkIfInCart(selectedLaptop.id) ? (
                      <div className="flex items-center w-full rounded-md overflow-hidden border border-[#C0FC60]">
                        <button
                          onClick={() => updateQuantity(selectedLaptop.id, cartItems[selectedLaptop.id] - 1)}
                          className="bg-[#C0FC60] text-black px-3 py-3 hover:bg-[#a8e04a] transition-colors flex-shrink-0 font-bold"
                          disabled={cartItems[selectedLaptop.id] <= 1}
                          aria-label="Уменьшить количество"
                        >
                          -
                        </button>
                        <span className={`${unbounded.className} bg-[#C0FC60] text-black font-bold px-2 py-3 flex-grow text-center truncate`}>
                          {t.cartInCart} ({cartItems[selectedLaptop.id]})
                        </span>
                        <button
                          onClick={() => updateQuantity(selectedLaptop.id, cartItems[selectedLaptop.id] + 1)}
                          className="bg-[#C0FC60] text-black px-3 py-3 hover:bg-[#a8e04a] transition-colors flex-shrink-0 font-bold"
                          aria-label="Увеличить количество"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(selectedLaptop.id)}
                        className={`${unbounded.className} w-full bg-[#C0FC60] hover:bg-[#a8e04a] text-black font-bold uppercase py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-[1.02]`}
                      >
                        {t.addToCart}
                      </button>
                    )}
                    {/* ---------------------------------------------------------- */}

                    <button
                      className={`${unbounded.className} w-full bg-black hover:bg-gray-800 text-[#C0FC60] font-bold uppercase py-3 px-4 rounded border border-black transition duration-300 ease-in-out transform hover:scale-[1.02]`}
                    >
                      {t.bookInHub}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Компонент чата Kate */}
      <ChatWidget />

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </main>
  );
}