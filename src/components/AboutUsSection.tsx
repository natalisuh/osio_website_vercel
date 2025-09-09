// components/AboutUsSection.tsx
'use client'; // Добавляем 'use client', так как используем useState

import { useState } from 'react'; // Импортируем useState
import { nunito, unbounded, translations } from '../lib/data'; // Импортируем translations

export default function AboutUsSection() {
  // Управление состоянием языка внутри компонента
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ru' | 'et'>('ru');
  // Получаем объект переводов для текущего языка
  const t = translations[currentLanguage];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Основной контейнер */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Левая колонка с текстом */}
          <div className="md:w-1/2 space-y-8">
            {/* Крупный заголовок слева */}
            <h1 className={`${unbounded.className} text-5xl md:text-6xl font-medium leading-tight text-black mb-4`}>
              <span className="block">
                {currentLanguage === 'ru' ? 'МЫ СОЗДАЕМ' :
                 currentLanguage === 'en' ? 'WE CREATE' :
                 'እኛ እየፈጠርን ነን'} {/* Пример для амхарского */}
              </span>
              <span className="block">
                {currentLanguage === 'ru' ? 'ТОЧКИ ДОСТУПА' :
                 currentLanguage === 'en' ? 'ACCESS POINTS' :
                 'የመድረሻ ነጥቦች'} {/* Пример для амхарского */}
              </span>
              <span className="block">
                {currentLanguage === 'ru' ? 'К БУДУЩЕМУ' :
                 currentLanguage === 'en' ? 'TO THE FUTURE' :
                 'ወደ ፍጆና'} {/* Пример для амхарского */}
              </span>
            </h1>

            {/* Разделы с текстом */}
            <div className="space-y-6">
              {/* Наша миссия */}
              <div className="border-t border-gray-300 pt-6">
                <h2 className={`${unbounded.className} text-2xl font-bold mb-3 text-black`}>
                  {t.mission}
                </h2>
                <p className={`${nunito.className} text-base text-gray-700`}>
                  {t.missionText}
                </p>
              </div>

              {/* Энергия без ограничений */}
              <div className="border-t border-gray-300 pt-6">
                <h2 className={`${unbounded.className} text-2xl font-bold mb-3 text-black`}>
                  {t.energy}
                </h2>
                <p className={`${nunito.className} text-base text-gray-700`}>
                  {t.energyText}
                </p>
              </div>

              {/* Технологии на любых условиях */}
              <div className="border-t border-gray-300 pt-6">
                <h2 className={`${unbounded.className} text-2xl font-bold mb-3 text-black`}>
                  {t.technology}
                </h2>
                <p className={`${nunito.className} text-base text-gray-700`}>
                  {t.technologyText}
                </p>
              </div>

              {/* Пространство для творчества */}
              <div className="border-t border-gray-300 pt-6">
                <h2 className={`${unbounded.className} text-2xl font-bold mb-3 text-black`}>
                  {t.space}
                </h2>
                <p className={`${nunito.className} text-base text-gray-700`}>
                  {t.spaceText}
                </p>
              </div>

              {/* Экосистема успеха */}
              <div className="border-t border-gray-300 pt-6">
                <h2 className={`${unbounded.className} text-2xl font-bold mb-3 text-black`}>
                  {t.ecosystem}
                </h2>
                <p className={`${nunito.className} text-base text-gray-700`}>
                  {t.ecosystemText}
                </p>
              </div>
            </div>
          </div>

          {/* Правая колонка с картинкой */}
          <div className="md:w-1/2 relative">
            <img
              src="/about-us-image.jpg" // Замените на путь к вашему изображению
              alt={t.mission} // Используем перевод для alt
              className="w-full h-auto rounded-lg shadow-xl"
            />

            {/* Подпись под картинкой */}
            <div className="mt-4 text-center">
              <p className={`${nunito.className} text-sm text-gray-600 italic`}>
                {/* Текст подписи также можно перевести, если нужно */}
                {currentLanguage === 'ru'
                  ? 'От идеи до воплощения. В любое удобное время. С технологиями, которые скоро станут твоими.'
                  : currentLanguage === 'en'
                  ? 'From idea to implementation. At any convenient time. With technologies that will soon be yours.'
                  : 'ከአስተሳሰብ እስከ ማድረግ ፡፡ በማንኛውም የተገቢ ጊዜ ፡፡ በቅርብ ወቅት የእርስዎ መሆን የሚችሉ ቴክኖሎጂዎች ነዉ ፡፡'} {/* Пример для амхарского */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}