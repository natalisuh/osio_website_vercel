import { Unbounded, Nunito } from "next/font/google";

// Шрифты
export const unbounded = Unbounded({ subsets: ["latin"], weight: ["500"] });
export const nunito = Nunito({ subsets: ["latin"], weight: ["200", "400"] });

// Интерфейс для переводов с индексной подписью
interface Translations {
  marquee: string;
  about: string;
  laptops: string;
  coCreate: string;
  createWithUs: string;
  locations: string;
  contactUs: string;
  book: string;
  learnMore: string;
  title: string;
  subtitle: string;
  scroll: string;
  secondMarquee: string;
  email: string;
  address: string;
  phone: string;
  follow: string;
  copyright: string;
  pricingModel: string;
  tasteFeel: string;
  tasteFeelDesc: string;
  learnGrow: string;
  learnGrowDesc: string;
  ownShine: string;
  ownShineDesc: string;
  creatorTools: string;
  aboutLaptop: string;
  specifications: string;
  specsSoon: string;
  buy: string;
  bookInHub: string;
  fillForm: string;
  discoverMore: string;
  galleryTitle: string;
  hubCity: string;
  hubLocation: string;
  becomePartOfArt: string;
  yourTalentShapes: string;
  osioIsntJust: string;
  fillTheForm: string;
  ramSsd: string;
  formTitle: string;
  formName: string;
  formEmail: string;
  formSpecialization: string;
  formStyle: string;
  formPortfolio: string;
  formSubmit: string;
  formNamePlaceholder: string;
  formEmailPlaceholder: string;
  formSpecializationPlaceholder: string;
  formStylePlaceholder: string;
  formPortfolioPlaceholder: string;
  hubAddressExample: string;
  cart: string;
  cartTitle: string;
  cartEmpty: string;
  cartProduct: string;
  cartPrice: string;
  cartQuantity: string;
  cartTotal: string;
  cartRemove: string;
  cartFavorite: string;
  cartOrder: string;
  cartName: string;
  cartSurname: string;
  cartAddress: string;
  cartPhone: string;
  cartEmail: string;
  cartComment: string;
  cartBonuses: string;
  cartPaymentMethod: string;
  cartCash: string;
  cartCard: string;
  cartBNPL: string; // Исправлено: добавлено cartBNPL
  cartSubscribe: string;
  cartCalculate: string;
  cartCheckout: string;
  cartFormNamePlaceholder: string;
  cartFormSurnamePlaceholder: string;
  cartFormAddressPlaceholder: string;
  cartFormPhonePlaceholder: string;
  cartFormEmailPlaceholder: string;
  cartFormCommentPlaceholder: string;
  cartFormBonusesPlaceholder: string;
  addToCart: string;
  backToShop: string;
  addedToCart: string;
  cartInCart: string;
  cartItems: string;
  cartItem: string;
  cartProductImage: string;
  cartProductName: string;
  cartProductPrice: string;
  cartProductQuantity: string;
  cartProductTotal: string;
  cartActions: string;
  cartFavoriteFull: string;
  cartRemoveFull: string;
  cartOrderSummary: string;
  cartSubtotal: string;
  cartShipping: string;
  cartEstimatedTax: string;
  cartGrandTotal: string;
  cartHavePromoCode: string;
  cartApply: string;
  cartCheckoutButton: string;
  cartContinueShopping: string;
  cartEmptyCart: string;
  cartAddItems: string;
  hubCityAddisAbaba: string;
  hubCityDireDawa: string;
  hubCityMekelle: string;
  hubCityBahirDar: string;
  hubCityHawassa: string;
  laptopPriceRub: string;
  mission: string;
  missionText: string;
  energy: string;
  energyText: string;
  technology: string;
  technologyText: string;
  space: string;
  spaceText: string;
  ecosystem: string;
  ecosystemText: string;
  [key: string]: string; // Индексная подпись для динамических ключей
}

// Данные для многоязычного контента
export const translations: Record<'en' | 'ru' | 'et', Translations> = {
  en: {
    marquee: "TIME TO CREATE - NOW! CREATE, SHARE, INSPIRE!",
    about: "About",
    laptops: "Laptops",
    coCreate: "Co Create Hub",
    createWithUs: "Create With Us",
    locations: "Find Your OSiO Solar Hub",
    contactUs: "Contact Us",
    book: "Book an appointment",
    learnMore: "Learn More",
    title: "OSiO Solar Hubs",
    subtitle: "Where innovation meets community",
    scroll: "Scroll Down",
    secondMarquee: "OSiO Solar Hubs: We know your culture. We are here to provide",
    email: "Email",
    address: "Address",
    phone: "Phone",
    follow: "Follow Us",
    copyright: "All rights reserved",
    pricingModel: "Pricing Model",
    tasteFeel: "Taste & Feel",
    tasteFeelDesc: "hourly rental (birr/hour)",
    learnGrow: "Learn & Grow",
    learnGrowDesc: "monthly subscription with training",
    ownShine: "Own & Shine",
    ownShineDesc: "installment plan through partner banks",
    creatorTools: "CREATOR TOOLS",
    aboutLaptop: "About Laptop",
    specifications: "Specifications",
    specsSoon: "Specifications will be added soon.",
    buy: "Buy",
    bookInHub: "Book in OSIO Solar Hub",
    fillForm: "Fill the form",
    discoverMore: "Discover More",
    galleryTitle: "View Our Hubs",
    hubCity: "OSiO Solar Hub",
    hubLocation: "City, Ethiopia",
    becomePartOfArt: "Become Part of the OSiO Solar Hub Art Installation",
    yourTalentShapes: "Your Talent Shapes Ethiopia's Future. Join the Creative Movement!",
    osioIsntJust: "OSiO Solar Hub isn't just a coworking space—it's where technology, art, and community pulse together as one. We're seeking visionary artists, designers, and creators to collaborate on a street art masterpiece that embodies creativity, sustainability, and Afrofuturism. Your work becomes part of a living art installation that will beat at the heart of your city!",
    fillTheForm: "Fill the form",
    ramSsd: "RAM/SSD",
    formTitle: "Join the OSiO Art Collaboration",
    formName: "Name",
    formEmail: "Email",
    formSpecialization: "Specialization (Artist/Graffiti Artist/Designer/Other)",
    formStyle: "Briefly about your style and experience",
    formPortfolio: "Link to portfolio or social networks",
    formSubmit: "Submit",
    formNamePlaceholder: "John Smith",
    formEmailPlaceholder: "john.smith@example.com",
    formSpecializationPlaceholder: "Designer",
    formStylePlaceholder: "Digital art with vibrant colors...",
    formPortfolioPlaceholder: "https://instagram.com/your_handle",
    hubAddressExample: "Main Street 123, Addis Ababa",
    cart: "Cart",
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartProduct: "Product",
    cartPrice: "Price",
    cartQuantity: "Quantity",
    cartTotal: "Total",
    cartRemove: "Remove",
    cartFavorite: "Add to Favorites",
    cartOrder: "Place Order",
    cartName: "First Name",
    cartSurname: "Last Name",
    cartAddress: "Address",
    cartPhone: "Phone Number",
    cartEmail: "Email",
    cartComment: "Comment",
    cartBonuses: "Bonuses",
    cartPaymentMethod: "Payment Method",
    cartCash: "Cash",
    cartCard: "Card",
    cartBNPL: "Buy Now, Pay Later", // Исправлено: добавлено cartBNPL
    cartSubscribe: "Subscribe for 24 months",
    cartCalculate: "Calculate",
    cartCheckout: "Checkout",
    cartFormNamePlaceholder: "First Name",
    cartFormSurnamePlaceholder: "Last Name",
    cartFormAddressPlaceholder: "Address",
    cartFormPhonePlaceholder: "Phone Number",
    cartFormEmailPlaceholder: "Email",
    cartFormCommentPlaceholder: "Comment",
    cartFormBonusesPlaceholder: "Promocode",
    addToCart: "Add to Cart",
    backToShop: "← Back to Shop",
    addedToCart: "Added to Cart!",
    cartInCart: "In Cart",
    cartItems: "Items",
    cartItem: "Item",
    cartProductImage: "Image",
    cartProductName: "Name",
    cartProductPrice: "Price",
    cartProductQuantity: "Quantity",
    cartProductTotal: "Total",
    cartActions: "Actions",
    cartFavoriteFull: "Favorite",
    cartRemoveFull: "Remove",
    cartOrderSummary: "Order Summary",
    cartSubtotal: "Subtotal",
    cartShipping: "Shipping",
    cartEstimatedTax: "Estimated Tax",
    cartGrandTotal: "Grand Total",
    cartHavePromoCode: "Have a promo code?",
    cartApply: "Apply",
    cartCheckoutButton: "Proceed to Checkout",
    cartContinueShopping: "Continue Shopping",
    cartEmptyCart: "Your cart is empty.",
    cartAddItems: "Add some items to your cart!",
    hubCityAddisAbaba: "Addis Ababa",
    hubCityDireDawa: "Dire Dawa",
    hubCityMekelle: "Mekelle",
    hubCityBahirDar: "Bahir Dar",
    hubCityHawassa: "Hawassa",
    laptopPriceRub: "Br", // Символ бирра (или измените на нужный)
    mission: "Our Mission",
    missionText: "OSiO Solar Hub is more than a co-working space. It's an ecosystem for Africa's ambitious generation. We've solved the main problem for young entrepreneurs, creatives and students - lack of reliable infrastructure for work and creativity.",
    energy: "Energy Without Limits",
    energyText: "Our hubs run on 100% solar energy, guaranteeing stable electricity 24/7. No outages, no restrictions - just constant access to technologies.",
    technology: "Technology Under Any Conditions",
    technologyText: "Book a convenient time and work on a professional OSiO laptop at any of our hubs. Buy the device right away or sign up for a subscription - after 16-24 months, the laptop will be yours. Flexible terms for any budget and ambitions.",
    space: "Space for Creativity",
    spaceText: "Each hub is equipped with sound recording studios, lecture halls and creative workshops spaces. The walls are painted by local artists in collaboration with museums - working here is as inspiring as it is productive.",
    ecosystem: "Ecosystem of Success",
    ecosystemText: "Here startups are born, albums are recorded, projects are defended and like-minded people are found. OSiO Solar Hub is the infrastructure for the ambitions of young Africa."
  },
  ru: {
    marquee: "ВРЕМЯ ТВОРИТЬ - СЕЙЧАС! СОЗДАВАЙ, ДЕЛИСЬ, ВДОХНОВЛЯЙ!",
    about: "О нас",
    laptops: "Ноутбуки",
    coCreate: "Co Create Hub",
    createWithUs: "Создавать с нами",
    locations: "Найти свой OSiO Solar Hub",
    contactUs: "Связаться с нами",
    book: "Забронировать",
    learnMore: "Узнать больше",
    title: "OSiO Solar Hubs",
    subtitle: "Место, где технологии объединяют людей",
    scroll: "Листайте вниз",
    secondMarquee: "OSiO Solar Hubs: Мы знаем вашу культуру. Мы здесь, чтобы предоставить возможности",
    email: "Email",
    address: "Адрес",
    phone: "Телефон",
    follow: "Мы в соцсетях",
    copyright: "Все права защищены",
    pricingModel: "Цены и подписки",
    tasteFeel: "Попробовать и почувствовать",
    tasteFeelDesc: "Почасовая аренда",
    learnGrow: "Учись и расти",
    learnGrowDesc: "Месячная подписка с обучением",
    ownShine: "Владей и сияй",
    ownShineDesc: "Рассрочка через партнерские банки",
    creatorTools: "CREATOR TOOLS",
    aboutLaptop: "Описание",
    specifications: "Технические характеристики",
    specsSoon: "Характеристики скоро будут добавлены.",
    buy: "Купить",
    bookInHub: "Забронировать в OSIO Solar Hub",
    fillForm: "Заполни форму",
    discoverMore: "Открой для себя больше",
    galleryTitle: "Посмотреть наши хабы",
    hubCity: "OSiO Solar Hub",
    hubLocation: "Город, Эфиопия",
    formTitle: "Присоединяйтесь к арт-коллаборации OSiO",
    formName: "Имя",
    formEmail: "Email",
    formSpecialization: "Специализация (Художник/Граффитист/Дизайнер/Другое)",
    formStyle: "Кратко о вашем стиле и опыте",
    formPortfolio: "Ссылка на портфолио или соцсети",
    formSubmit: "Отправить",
    becomePartOfArt: "Стань частью арт-объекта OSiO Solar Hub",
    yourTalentShapes: "Твой талант — часть будущего Эфиопии. Присоединяйся к коллаборации!",
    osioIsntJust: "OSiO Solar Hub — это не просто коворкинг. Это пространство, где технологии, искусство и сообщество встречаются в едином ритме. Мы ищем талантливых художников, дизайнеров и артистов, чтобы вместе создать уличное произведение искусства, которое станет символом творчества, устойчивости и афрофутуризма. Твоя работа — часть арт-объекта, который будет виден в сердце твоего города!",
    fillTheForm: "Заполнить форму",
    ramSsd: "RAM/SSD",
    formNamePlaceholder: "Иван Иванов",
    formEmailPlaceholder: "ivan.ivanov@example.com",
    formSpecializationPlaceholder: "Художник",
    formStylePlaceholder: "Абстрактные картины с яркими красками...",
    formPortfolioPlaceholder: "https://vk.com/your_page",
    hubAddressExample: "Главная улица 123, Аддис-Абеба",
    cart: "Корзина",
    cartTitle: "Ваша корзина",
    cartEmpty: "Ваша корзина пуста",
    cartProduct: "Товар",
    cartPrice: "Цена",
    cartQuantity: "Количество",
    cartTotal: "Итого",
    cartRemove: "Удалить",
    cartFavorite: "В избранное",
    cartOrder: "Заказать",
    cartName: "Имя",
    cartSurname: "Фамилия",
    cartAddress: "Адрес",
    cartPhone: "Номер телефона",
    cartEmail: "Email",
    cartComment: "Комментарий",
    cartBonuses: "Промокод",
    cartPaymentMethod: "Способ оплаты",
    cartCash: "Наличные",
    cartCard: "Карта",
    cartBNPL: "Купить сейчас, оплатить позже", // Исправлено: добавлено cartBNPL
    cartSubscribe: "Оформить подписку на 24 мес.",
    cartCalculate: "Рассчитать",
    cartCheckout: "Оформить заказ",
    cartInCart: "В корзине",
    cartItems: "Товаров",
    cartItem: "Товар",
    cartProductImage: "Изображение",
    cartProductName: "Название",
    cartProductPrice: "Цена",
    cartProductQuantity: "Количество",
    cartProductTotal: "Итого",
    cartActions: "Действия",
    cartFavoriteFull: "В избранное",
    cartRemoveFull: "Удалить",
    cartOrderSummary: "Заказ",
    cartSubtotal: "Подытог",
    cartShipping: "Доставка",
    cartEstimatedTax: "Приблизительный налог",
    cartGrandTotal: "Общая сумма",
    cartHavePromoCode: "Есть промокод?",
    cartApply: "Применить",
    cartCheckoutButton: "Перейти к оформлению",
    cartContinueShopping: "Продолжить покупки",
    cartEmptyCart: "Ваша корзина пуста.",
    cartAddItems: "Добавьте товары в корзину!",
    cartFormNamePlaceholder: "Имя",
    cartFormSurnamePlaceholder: "Фамилия",
    cartFormAddressPlaceholder: "Адрес",
    cartFormPhonePlaceholder: "Номер телефона",
    cartFormEmailPlaceholder: "Email",
    cartFormCommentPlaceholder: "Комментарий",
    cartFormBonusesPlaceholder: "Промокод",
    addToCart: "В корзину",
    backToShop: "← Назад в магазин",
    addedToCart: "Добавлено в корзину!",
    laptopPriceRub: "₽",
    hubCityAddisAbaba: "Аддис-Абеба",
    hubCityDireDawa: "Дире Дауа",
    hubCityMekelle: "Мекелле",
    hubCityBahirDar: "Бахир Дар",
    hubCityHawassa: "Хавасса",
    mission: "Наша миссия",
    missionText: "OSiO Solar Hub — это больше чем коворкинг. Это экосистема для амбициозного поколения Африки. Мы решили главную проблему молодых предпринимателей, креативщиков и студентов — отсутствие надежной инфраструктуры для работы и творчества.",
    energy: "Энергия без ограничений",
    energyText: "Наши хабы работают на 100% солнечной энергии, гарантируя стабильное электричество 24/7. Никаких отключений, никаких ограничений — только постоянный доступ к технологиям.",
    technology: "Технологии на любых условиях",
    technologyText: "Запишись на удобное время и работай за профессиональным ноутбуком OSiO в любом из наших хабов. Покупай устройство сразу или оформляй подписку — через 16-24 месяца ноутбук станет твоим. Гибкие условия для любого бюджета и амбиций.",
    space: "Пространство для творчества",
    spaceText: "Каждый хаб оборудован звукозаписывающими студиями, лекторными залами и творческими мастерскими. Стены расписаны местными художниками в коллаборации с музеями — здесь работать так же вдохновляюще, как и продуктивно.",
    ecosystem: "Экосистема успеха",
    ecosystemText: "Здесь рождаются стартапы, записываются альбомы, защищаются проекты и находятся единомышленники. OSiO Solar Hub — это инфраструктура для амбиций молодой Африки."
  },
  et: {
    marquee: "ጊዜ ለመፍጠር - አሁን! ፍጥር, አጋራ, አነሳስ!",
    about: "ስለኛ",
    laptops: "ላፕቶፖች",
    coCreate: "የጋራ ማዕከል መፍጠር",
    createWithUs: "እኛ ሰርተን ይፍጠሩ",
    locations: "የእርስዎን OSiO Solar Hub ይፈልጉ",
    contactUs: "እኛን ያነጋግሩ",
    book: "እገባ ያድርጉ",
    learnMore: "ተጨማሪ ለመረዳት",
    title: "OSiO Solar Hubs",
    subtitle: "አዲስ ሀሳብ ከማህበረሰብ ጋር የሚገናኝበት",
    scroll: "ወደ ታች ይሸብልሉ",
    secondMarquee: "OSiO Solar Hubs: ባህልዎን እናውቃለን። ለመስጠት እዚህ ነን።",
    email: "Email",
    address: "አድራሻ",
    phone: "ስልክ",
    follow: "በማህበራዊ ሚዲያ ይከተሉን",
    copyright: "ሁሉም መብቶች የተጠበቁ ናቸው",
    pricingModel: "የዋጋ አሰጣጥ ሞዴል",
    tasteFeel: "ጣዕም እና ስሜት",
    tasteFeelDesc: "በሰዓት ኪራይ (ብር/ሰዓት)",
    learnGrow: "መማር እና መድገም",
    learnGrowDesc: "ወርሃዊ ምዝገባ ከስልጠና",
    ownShine: "ተያዥ እና ብሩህ",
    ownShineDesc: "የክፍያ እቅድ በአጋሮች ባንኮች",
    creatorTools: "የፈጣሪ መሳርያዎች",
    aboutLaptop: "ስለ ላፕቶፕ",
    specifications: "የቴክኒክ መግለጫዎች",
    specsSoon: "የቴክኒክ መግለጫዎች በቅርብ ጊዜ ይታከላሉ።",
    buy: "ይግዙ",
    bookInHub: "በ OSIO Solar Hub ውስጥ ያስቀምጡ",
    fillForm: "ቅፅ ይሙሉ",
    discoverMore: "በበለጠ ያግኙ",
    galleryTitle: "የእኛ ማዕከሎችን ይመልከቱ",
    hubCity: "OSiO Solar Hub",
    hubLocation: "ከተማ, ኢትዮጵያ",
    formTitle: "ወደ OSiO አርት ኮላቦሬሽን ይቀላቀሉ",
    formName: "ስም",
    formEmail: "ኢሜል",
    formSpecialization: "የልዩ ልዩነት (አርቲስት/ግራፊቲ አርቲስት/ዲዛይነር/ሌላ)",
    formStyle: "በጭንቀት ስለ የእርስዎ ዘዴ እና ተሞክሮ",
    formPortfolio: "ወደ ፖርትፎሊዮ ወይም ማህበራዊ ኔትዎርኮች አገናኝ",
    formSubmit: "ላክ",
    becomePartOfArt: "የOSiO Solar Hub የጥበብ ፕሮጀክት አካል ሁን",
    yourTalentShapes: "ችሎታህ የኢትዮጵያ ወደፊት አካል ነው። ከጥበባዊ ትስስር ጋር ተቀላቀል!",
    osioIsntJust: "OSiO Solar Hub ከቀላል የስራ ቦታ በላይ ነው። ይህ ቴክኖሎጂ፣ ጥበብ እና ማህበረሰብ በአንድ ምት የሚገናኙበት ቦታ ነው። የዘመናዊነትን፣ ዘላቂነትን እና የአፍሮ ፊውቸሪዝምን የሚወክል የመንገድ ጥበብ ስራ ለመፍጠር ተሰጥኦ ያላቸውን አርቲስቶች፣ ዲዛይነሮችና ጥበበኞች እንፈልጋለን። ስራህ በከተማህ መሃል የሚታይ የጥበብ ፕሮጀክት አካል ይሆናል!",
    fillTheForm: "ቅፅ ይሙሉ",
    ramSsd: "RAM/SSD",
    formNamePlaceholder: "አበበ ተስፋዬ",
    formEmailPlaceholder: "abeba.tesfaye@example.com",
    formSpecializationPlaceholder: "አርቲስት",
    formStylePlaceholder: "የአብስትራክት ስዕሎች ከብሩህ ቀለሞች ጋር...",
    formPortfolioPlaceholder: "https://t.me/your_username",
    hubAddressExample: "ዋና መንገድ 123, አዲስ አበባ",
    cart: "መርመጃ",
    cartTitle: "የእርስዎ መርመጃ",
    cartEmpty: "መርመጃዎ ባዶ ነው",
    cartProduct: "ምርት",
    cartPrice: "ዋጋ",
    cartQuantity: "ብዛት",
    cartTotal: "ጠቅላላ",
    cartRemove: "አስወግድ",
    cartFavorite: "ወደ የተወደዱ ያክሉ",
    cartOrder: "ትዕዛዝ ይስጡ",
    cartName: "ስም",
    cartSurname: "የአባት ስም",
    cartAddress: "አድራሻ",
    cartPhone: "ስልክ ቁጥር",
    cartEmail: "ኢሜል",
    cartComment: "አስተያየት",
    cartBonuses: "ቦኑሶች",
    cartPaymentMethod: "የክፍያ ዘዴ",
    cartCash: "ገንዘብ",
    cartCard: "ካርድ",
    cartBNPL: "አሁን ይግዙ, በኋላ ይክፈሉ", // Исправлено: добавлено cartBNPL
    cartSubscribe: "ለ 24 ወራት ይመዝገቡ",
    cartCalculate: "ያስሉ",
    cartCheckout: "ትዕዛዝ ይስጡ",
    cartInCart: "በመርመጃ ውስጥ",
    cartItems: "እቃዎች",
    cartItem: "እቃ",
    cartProductImage: "ምስል",
    cartProductName: "ስም",
    cartProductPrice: "ዋጋ",
    cartProductQuantity: "ብዛት",
    cartProductTotal: "ጠቅላላ",
    cartActions: "እርምጃዎች",
    cartFavoriteFull: "ወደ የተወደዱ ያክሉ",
    cartRemoveFull: "አስወግድ",
    cartOrderSummary: "የትዕዛዝ ማጠቃለያ",
    cartSubtotal: "ንዑስ ድምር",
    cartShipping: "መላኪያ",
    cartEstimatedTax: "የተገመተ ገቢ ገዢ",
    cartGrandTotal: "ጠቅላላ ድምር",
    cartHavePromoCode: "የተቀነሰ ኮድ አለዎት?",
    cartApply: "ያመልጡ",
    cartCheckoutButton: "ወደ ክፍያ ይቀጥሉ",
    cartContinueShopping: "ግዢዎን ይቀጥሉ",
    cartEmptyCart: "መርመጃዎ ባዶ ነው።",
    cartAddItems: "አንዳንድ እቃዎችን ወደ መርመጃዎ ያክሉ!",
    cartFormNamePlaceholder: "ስም",
    cartFormSurnamePlaceholder: "የአባት ስም",
    cartFormAddressPlaceholder: "አድራሻ",
    cartFormPhonePlaceholder: "ስልክ ቁጥር",
    cartFormEmailPlaceholder: "ኢሜል",
    cartFormCommentPlaceholder: "አስተያየት",
    cartFormBonusesPlaceholder: "ቦኑሶች",
    addToCart: "ወደ መርመጃ ያክሉ",
    backToShop: "← ወደ ሱቅ ተመለስ",
    addedToCart: "ወደ መርመጃ ታክሏል!",
    laptopPriceRub: "Br",
    hubCityAddisAbaba: "አዲስ አበባ",
    hubCityDireDawa: "ድሬ ዳዋ",
    hubCityMekelle: "መቐለ",
    hubCityBahirDar: "ባህር ዳር",
    hubCityHawassa: "ሃዋሳ",
    mission: "የእኛ ተልዕኮ",
    missionText: "OSiO Solar Hub ከኮርኪንግ በላይ ነው። ይህ ለአፍሪካ የተሰማሚቱ ትውልድ የተቀመጠ ኢኮሲስተም ነው። የተመቻቸ የንግድ አስተዳደሮች፣ ፈጠራ አርቲስቶች እና ተማሪዎች ዋናውን ችግር አስተካክለን - ለሥራ እና ፈጠራ የተረጋጋ መሣሪያ የሌለሱትን አመልካች አቅርተን።",
    energy: "እንርጀትክ ያለ ገደብ",
    energyText: "የእኛ ማዕከሎች በ100% የሸመን ኃይል ይሠራሉ፣ በ24/7 የተረጋጋ ሐይሎ መስጠት። ምንም አጥቃቀን፣ ምንም ገደብ የለም - የተቋቋመ መድረስ ብቻ ነው።",
    technology: "በማንኛውም ሁኔታ ቴክኖሎጂ",
    technologyText: "ተስማሚ ሰዓት ያስቀምጡ እና በእኛ ማዕከል ላይ በፕሮፌሽናል OSiO ላፕቶፕ ይሥሩ። መሳሪያውን በቀጥታ ይግዙ ወይም ለመመዝገብ ይመዝገቡ - ከ16-24 ወር በኋላ ላፕቶፕዎ ይሆናል። ለማንኛውም በጀት እና ምርጫዎች ተስማሚ ውሎች።",
    space: "ለፈጠራ ቦታ",
    spaceText: "እያንዳንዱ ማዕከል የድምፅ መቅረጽ ስታዲዮዎች፣ የግብይት ክፍሎች እና የፈጠራ የሥራ ቦታዎች ይዘዋል። ግድግዳዎቹ በአካባቢ አርቲስቶች በሙዚያዊ ቤቶች ጋር በተባባሩ ተቀርተዋል - እዚህ ላይ መሥራት እንደ ፈጠራ እንዲሁም እንዲያድ ነው።",
    ecosystem: "የተሳካ ኢኮሲስተም",
    ecosystemText: "እዚህ ላይ የንግድ ሀሳቦች ይወለዳሉ፣ አልበሞች ይመዝገባሉ፣ ፕሮጀክቶች ይከበራሉ እና የተመሳሳይ አስተሳሰቦች ይገኛሉ። OSiO Solar Hub ለየአፍሪካ ዘመኑ የተቀመጠ መሣሪያ ነው።"
  }
};

// Интерфейс для данных ноутбуков
interface LaptopData {
  id: number;
  img: string;
  name: Record<'en' | 'ru' | 'et', string>;
  prices: Record<'en' | 'ru' | 'et', string>;
  descriptions: Record<'en' | 'ru' | 'et', string>;
  specs: Record<'en' | 'ru' | 'et', string[]>;
}

// Данные ноутбуков
export const laptopsData: LaptopData[] = [
  {
    id: 1,
    img: "/laptop1.jpg",
    name: {
      ru: "OSiO FocusLine 16.1\" 16GB/512GB SSD",
      en: "OSiO FocusLine 16.1\" 16GB/512GB SSD",
      et: "OSiO FocusLine 16.1\" 16GB/512GB SSD"
    },
    prices: {
      ru: "55 500 ₽",
      en: "$690",
      et: "ETB 38,000"
    },
    descriptions: {
      ru: "Производительный ноутбук для работы и развлечений. Оснащен мощным процессором AMD Ryzen 7 5700U с 8 ядрами, что обеспечивает высокую производительность в многозадачных сценариях. Экран 16.1\" с разрешением Full HD и матрицей IPS обеспечивает четкое и яркое изображение. Идеально подходит для дизайнеров, программистов и геймеров.",
      en: "A powerful laptop for work and entertainment. Equipped with a powerful AMD Ryzen 7 5700U processor with 8 cores, which provides high performance in multitasking scenarios. A 16.1\" screen with Full HD resolution and an IPS matrix provides a clear and bright image. Perfect for designers, programmers and gamers.",
      et: "የሥራ እና የመዝናኛ አስተዳደር ላፕቶፕ። ከ8 ኮር ጋር የተጎናኘ የአምድ ራይዘን 7 5700U ፕሮሰሰር ይዘዋል፣ ይህም በብዙ ስራዎች ላይ ከፍተኛ አፈጻጸም ያቀርባል። 16.1\" ማያ ገጽ ከሙሉ HD መፍትሄ እና ከአይፒኤስ ማትሪክስ ጋር በግልጽ እና በብሩህ ምስል ያቀርባል። ለዲዛይነሮች፣ ፕሮግራም ሰሪዎች እና ለጌም ሰሪዎች ተስማሚ።"
    },
    specs: {
      ru: [
        "Диагональ экрана: 16.1\"",
        "Разрешение экрана: 1920×1080",
        "Процессор: AMD Ryzen 7 5700U (8 ядер)",
        "Видеокарта: AMD Radeon Graphics",
        "Оперативная память: 16 ГБ",
        "Объем SSD: 512 ГБ",
        "Операционная система: Windows 11 Home / os unicom",
        "Цвет: Серый"
      ],
      en: [
        "Screen diagonal: 16.1\"",
        "Screen resolution: 1920×1080",
        "Processor: AMD Ryzen 7 5700U (8 cores)",
        "Graphics card: AMD Radeon Graphics",
        "RAM: 16 GB",
        "SSD capacity: 512 GB",
        "Operating system: Windows 11 Home / os unicom",
        "Color: Gray"
      ],
      et: [
        "የማያ ገጽ ዲያግናል: 16.1\"",
        "የማያ ገጽ መፍትሄ: 1920×1080",
        "ፕሮሰሰር: AMD Ryzen 7 5700U (8 ኮር)",
        "ግራፊክስ ካርድ: AMD Radeon Graphics",
        "RAM: 16 ጌባ",
        "የኤስኤስዲ መጠን: 512 ጌባ",
        "የኦፕሬቲንግ ስርዓት: Windows 11 Home / os unicom",
        "ቀለም: ግራጫ"
      ]
    }
  },
  // ... остальные элементы laptopsData без изменений
  {
    id: 2,
    img: "/laptop2.jpg",
    name: {
      ru: "OSiO FocusLine 15.6\" 16GB/1TB SSD",
      en: "OSiO FocusLine 15.6\" 16GB/1TB SSD",
      et: "OSiO FocusLine 15.6\" 16GB/1TB SSD"
    },
    prices: {
      ru: "46 990 ₽",
      en: "$590",
      et: "ETB 32,500"
    },
    descriptions: {
      ru: "Сбалансированный ноутбук с производительным процессором Intel Core i5 12-го поколения. Гибридная архитектура (2 производительных + 8 энергоэффективных ядер) обеспечивает оптимальное сочетание производительности и автономности. Отличный выбор для офисной работы и учебы.",
      en: "A balanced laptop with a powerful 12th generation Intel Core i5 processor. The hybrid architecture (2 performance + 8 energy-efficient cores) provides an optimal combination of performance and autonomy. An excellent choice for office work and study.",
      et: "ከአቅም ያለው የአንተል ኮር i5 ፕሮሰሰር ጋር የተመጣጠነ ላፕቶፕ። ሃይብሪድ አርክቴክቸር (2 አፈጻጸም + 8 ኤነርጂ ተቃዋሚ ኮር) የአፈጻጸም እና የራስ መቆሚያ ጊዜ መከፋፈል ይፈጥራል። ለቢሮ ስራ እና ለትምህርት በጣም ጥሩ ምርጫ።"
    },
    specs: {
      ru: [
        "Диагональ экрана: 15.6\"",
        "Разрешение экрана: 1920×1080",
        "Процессор: Intel Core i5‑1235U (2P+8E)",
        "Видеокарта: Intel Iris Xe",
        "Оперативная память: 16 ГБ",
        "Объем SSD: 1000 ГБ",
        "Операционная система: No OS",
        "Цвет: Серый"
      ],
      en: [
        "Screen diagonal: 15.6\"",
        "Screen resolution: 1920×1080",
        "Processor: Intel Core i5‑1235U (2P+8E)",
        "Graphics card: Intel Iris Xe",
        "RAM: 16 GB",
        "SSD capacity: 1000 GB",
        "Operating system: No OS",
        "Color: Gray"
      ],
      et: [
        "የማያ ገጽ ዲያግናል: 15.6\"",
        "የማያ ገጽ መፍትሄ: 1920×1080",
        "ፕሮሰሰር: Intel Core i5‑1235U (2P+8E)",
        "ግራፊክስ ካርድ: Intel Iris Xe",
        "RAM: 16 ጌባ",
        "የኤስኤስዲ መጠን: 1000 ጌባ",
        "የኦፕሬቲንግ ስርዓት: No OS",
        "ቀለም: ግራጫ"
      ]
    }
  },
  {
    id: 3,
    img: "/laptop3.jpg",
    name: {
      ru: "OSiO BaseLine 15.6\" 8GB/512GB SSD",
      en: "OSiO BaseLine 15.6\" 8GB/512GB SSD",
      et: "OSiO BaseLine 15.6\" 8GB/512GB SSD"
    },
    prices: {
      ru: "26 590 ₽",
      en: "$320",
      et: "ETB 18,600"
    },
    descriptions: {
      ru: "Бюджетный ноутбук для повседневных задач. Процессор Intel N200 обеспечивает достаточную производительность для работы с документами, интернет-серфинга и просмотра видео. Элегантный серебристый корпус и легкий вес делают его идеальным мобильным компаньоном.",
      en: "A budget laptop for everyday tasks. The Intel N200 processor provides sufficient performance for working with documents, web browsing and watching videos. An elegant silver case and light weight make it an ideal mobile companion.",
      et: "ለየቀኑ ስራዎች የተቀመጠ ላፕቶፕ። ኢንተል N200 ፕሮሰሰር ለሰነዶች፣ ድር መቃኛ እና ቪዲዮ መመልከት በቂ የሆነ አፈጻጸም ያቀርባል። የቀለም ሰፊ ሽቦ እና የቀላል ክብደት የተለመደ የተንቀሳቃሽ ጓደኛ ያደርጋል።"
    },
    specs: {
      ru: [
        "Диагональ экрана: 15.6\"",
        "Разрешение экрана: 1920×1080",
        "Процессор: Intel N200 (4 ядра)",
        "Видеокарта: Intel UHD Graphics",
        "Оперативная память: 8 ГБ",
        "Объем SSD: 512 ГБ",
        "Операционная система: Windows 11 Home / os unicom",
        "Цвет: Серебристый"
      ],
      en: [
        "Screen diagonal: 15.6\"",
        "Screen resolution: 1920×1080",
        "Processor: Intel N200 (4 cores)",
        "Graphics card: Intel UHD Graphics",
        "RAM: 8 GB",
        "SSD capacity: 512 GB",
        "Operating system: Windows 11 Home / os unicom",
        "Color: Silver"
      ],
      et: [
        "የማያ ገጽ ዲያግናል: 15.6\"",
        "የማያ ገጽ መፍትሄ: 1920×1080",
        "ፕሮሰሰር: Intel N200 (4 ኮር)",
        "ግራፊክስ ካርድ: Intel UHD Graphics",
        "RAM: 8 ጌባ",
        "የኤስኤስዲ መጠን: 512 ጌባ",
        "የኦፕሬቲንግ ስርዓት: Windows 11 Home / os unicom",
        "ቀለም: ነጭ"
      ]
    }
  },
  {
    id: 4,
    img: "/laptop4.jpg",
    name: {
      ru: "OSiO FocusLine 14.0\" 16GB/512GB SSD",
      en: "OSiO FocusLine 14.0\" 16GB/512GB SSD",
      et: "OSiO FocusLine 14.0\" 16GB/512GB SSD"
    },
    prices: {
      ru: "39 900 ₽",
      en: "$490",
      et: "ETB 27,000"
    },
    descriptions: {
      ru: "Компактный и производительный ноутбук с 14-дюймовым экраном. Процессор AMD Ryzen 5 и 16 ГБ оперативной памяти обеспечивают высокую скорость работы. Идеальный баланс мобильности и производительности. Тонкий корпус и малый вес (всего 1.4 кг) делают его идеальным спутником в поездках.",
      en: "A compact and powerful laptop with a 14-inch screen. The AMD Ryzen 5 processor and 16 GB of RAM provide high working speed. The perfect balance of mobility and performance. A thin case and low weight (only 1.4 kg) make it an ideal companion on trips.",
      et: "14-ኢንች ማያ ገጽ ያለው ትንሽ እና የአፈጻጸም ላፕቶፕ። AMD Ryzen 5 ፕሮሰሰር እና 16GB RAM ከፍተኛ የሥራ ፍጥነት ያቀርባሉ። የተለመደ የተንቀሳቃሽነት እና የአፈጻጸም ሚዛን። ትንሽ ክብደት (1.4 ኪ.ግ. ብቻ) ያለው ትንሽ ኳስ በጉዞ ላይ ምርጥ ጓደኛ ነው።"
    },
    specs: {
      ru: [
        "Диагональ экрана: 14.0\"",
        "Разрешение экрана: 1920×1080",
        "Процессор: AMD Ryzen 5 5500U (6 ядер)",
        "Видеокарта: AMD Radeon Graphics",
        "Оперативная память: 16 ГБ",
        "Объем SSD: 512 ГБ",
        "Операционная система: Windows 11 Home / os unicom",
        "Цвет: Серый"
      ],
      en: [
        "Screen diagonal: 14.0\"",
        "Screen resolution: 1920×1080",
        "Processor: AMD Ryzen 5 5500U (6 cores)",
        "Graphics card: AMD Radeon Graphics",
        "RAM: 16 GB",
        "SSD capacity: 512 GB",
        "Operating system: Windows 11 Home / os unicom",
        "Color: Gray"
      ],
      et: [
        "የማያ ገጽ ዲያግናል: 14.0\"",
        "የማያ ገጽ መፍትሄ: 1920×1080",
        "ፕሮሰሰር: AMD Ryzen 5 5500U (6 ኮር)",
        "ግራፊክስ ካርድ: AMD Radeon Graphics",
        "RAM: 16 ጌባ",
        "የኤስኤስዲ መጠን: 512 ጌባ",
        "የኦፕሬቲንግ ስርዓት: Windows 11 Home / os unicom",
        "ቀለም: ግራጫ"
      ]
    }
  },
  {
    id: 5,
    img: "/laptop5.jpg",
    name: {
      ru: "OSiO BaseLine 15.6\" 8GB/256GB SSD",
      en: "OSiO BaseLine 15.6\" 8GB/256GB SSD",
      et: "OSiO BaseLine 15.6\" 8GB/256GB SSD"
    },
    prices: {
      ru: "33 900 ₽",
      en: "$420",
      et: "ETB 23,100"
    },
    descriptions: {
      ru: "Доступный ноутбук в синем корпусе для повседневных задач. Процессор Intel N200 и 8 ГБ оперативной памяти справятся с офисными приложениями и интернет-серфингом. Стильный дизайн и эргономичная клавиатура. Идеальный выбор для студентов и школьников благодаря оптимальному сочетанию цены и функциональности.",
      en: "An affordable laptop in a blue case for everyday tasks. The Intel N200 processor and 8 GB of RAM will handle office applications and web browsing. Stylish design and ergonomic keyboard. The ideal choice for students and schoolchildren due to the optimal combination of price and functionality.",
      et: "ለየቀኑ ስራዎች የተቀመጠ ላፕቶፕ በሰማያዊ ቦታ ውስጥ። ኢንተል N200 ፕሮሰሰር እና 8 ጌባ ራም የቢሮ መተግበሪያዎችን እና የድር መቃኛን ያስተናግዳሉ። የቀለም ሰፊ ዲዛይን እና የኢርጎኖሚክስ ቁልፍ ሰሌዳ። ለተማሪዎች እና ትምህርት ቤት ልጆች ምርጥ ምርጫ።"
    },
    specs: {
      ru: [
        "Диагональ экрана: 15.6\"",
        "Разрешение экрана: 1920×1080",
        "Процессор: Intel N200 (4 ядра)",
        "Видеокарта: Intel UHD Graphics",
        "Оперативная память: 8 ГБ",
        "Объем SSD: 256 ГБ",
        "Операционная система: Windows 11 Home / os unicom",
        "Цвет: Синий"
      ],
      en: [
        "Screen diagonal: 15.6\"",
        "Screen resolution: 1920×1080",
        "Processor: Intel N200 (4 cores)",
        "Graphics card: Intel UHD Graphics",
        "RAM: 8 GB",
        "SSD capacity: 256 GB",
        "Operating system: Windows 11 Home / os unicom",
        "Color: Blue"
      ],
      et: [
        "የማያ ገጽ ዲያግናል: 15.6\"",
        "የማያ ገጽ መፍትሄ: 1920×1080",
        "ፕሮሰሰር: Intel N200 (4 ኮር)",
        "ግራፊክስ ካርድ: Intel UHD Graphics",
        "RAM: 8 ጌባ",
        "የኤስኤስዲ መጠን: 256 ጌባ",
        "የኦፕሬቲንግ ስርዓት: Windows 11 Home / os unicom",
        "ቀለም: ሰማያዊ"
      ]
    }
  },
  {
    id: 6,
    img: "/laptop6.jpg",
    name: {
      ru: "OSiO BaseLine 15.6\" 8GB/256GB SSD Black",
      en: "OSiO BaseLine 15.6\" 8GB/256GB SSD Black",
      et: "OSiO BaseLine 15.6\" 8GB/256GB SSD Black"
    },
    prices: {
      ru: "32 990 ₽",
      en: "$399",
      et: "ETB 22,000"
    },
    descriptions: {
      ru: "Классический черный ноутбук для работы и учебы. Надежная работа от процессора Intel N200, 8 ГБ оперативной памяти и быстрый SSD. Отличный выбор для тех, кто ищет недорогой и функциональный ноутбук. Аккумулятор обеспечивает до 8 часов автономной работы, что достаточно для учебного дня или рабочей смены.",
      en: "A classic black laptop for work and study. Reliable performance from the Intel N200 processor, 8 GB of RAM and a fast SSD. A great choice for those looking for an affordable and functional laptop. The battery provides up to 8 hours of autonomy, which is enough for a school day or a work shift.",
      et: "ለሥራ እና ለትምህርት የተቀመጠ ቀለም ሰፊ ላፕቶፕ። ከኢንተል N200 ፕሮሰሰር፣ 8 ጌባ ራም እና ፈጣን ኤስኤስዲ ጋር የተጠራ አፈጻጸም። ለተመጣጠነ እና ለተግባራዊ ላፕቶፕ የሚፈልጉ ሰዎች ምርጥ ምርጫ። ባትሪው እስከ 8 ሰዓታት ድረስ ይቆያል፣ ይህም ለትምህርት ቀን ወይም ለሥራ ሽፍት በቂ ነው።"
    },
    specs: {
      ru: [
        "Диагональ экрана: 15.6\"",
        "Разрешение экрана: 1920×1080",
        "Процессор: Intel N200 (4 ядра)",
        "Видеокарта: Intel UHD Graphics",
        "Оперативная память: 8 ГБ",
        "Объем SSD: 256 ГБ",
        "Операционная система: Windows 11 Home / os unicom",
        "Цвет: Черный"
      ],
      en: [
        "Screen diagonal: 15.6\"",
        "Screen resolution: 1920×1080",
        "Processor: Intel N200 (4 cores)",
        "Graphics card: Intel UHD Graphics",
        "RAM: 8 GB",
        "SSD capacity: 256 GB",
        "Operating system: Windows 11 Home / os unicom",
        "Color: Black"
      ],
      et: [
        "የማያ ገጽ ዲያግናል: 15.6\"",
        "የማያ ገጽ መፍትሄ: 1920×1080",
        "ፕሮሰሰር: Intel N200 (4 ኮር)",
        "ግራፊክስ ካርድ: Intel UHD Graphics",
        "RAM: 8 ጌባ",
        "የኤስኤስዲ መጠን: 256 ጌባ",
        "የኦፕሬቲንግ ስርዓት: Windows 11 Home / os unicom",
        "ቀለም: ጥቁር"
      ]
    }
  }
];

// Интерфейс для данных хабов
interface HubData {
  id: number;
  img: string;
  city_key: string;
  location: Record<'en' | 'ru' | 'et', string>;
  address: Record<'en' | 'ru' | 'et', string>;
}

// Данные для галереи хабов
export const hubData: HubData[] = [
  {
    id: 1,
    img: "/hub1.jpg",
    city_key: "hubCityAddisAbaba", // Fixed: Added closing quote and corrected key to match translations
    location: {
      en: "Addis Ababa, Ethiopia",
      ru: "Аддис-Абеба, Эфиопия",
      et: "አዲስ አበባ, ኢትዮጵያ"
    },
    address: {
      en: "Main Street 123, Addis Ababa",
      ru: "Главная улица 123, Аддис-Абеба",
      et: "ዋና መንገድ 123, አዲስ አበባ"
    }
  },
  {
    id: 2,
    img: "/hub2.jpg",
    city_key: "hubCityDireDawa",
    location: {
      en: "Dire Dawa, Ethiopia",
      ru: "Дире Дауа, Эфиопия",
      et: "ድሬ ዳዋ, ኢትዮጵያ"
    },
    address: {
      en: "Central Avenue 456, Dire Dawa",
      ru: "Центральный проспект 456, Дире Дауа",
      et: "ማዕከላዊ ጎዳና 456, ድሬ ዳዋ"
    }
  },
  {
    id: 3,
    img: "/hub3.jpg",
    city_key: "hubCityMekelle",
    location: {
      en: "Mekelle, Ethiopia",
      ru: "Мекелле, Эфиопия",
      et: "መቐለ, ኢትዮጵያ"
    },
    address: {
      en: "University Road 789, Mekelle",
      ru: "Университетская дорога 789, Мекелле",
      et: "ዩኒቨርሲቲ መንገድ 789, መቐለ"
    }
  },
  {
    id: 4,
    img: "/hub4.jpg",
    city_key: "hubCityBahirDar",
    location: {
      en: "Bahir Dar, Ethiopia",
      ru: "Бахир Дар, Эфиопия",
      et: "ባህር ዳር, ኢትዮጵያ"
    },
    address: {
      en: "Lake Shore Drive 101, Bahir Dar",
      ru: "Набережная озера 101, Бахир Дар",
      et: "የሐይቅ ዳርቻ 101, ባህር ዳር"
    }
  },
  {
    id: 5,
    img: "/hub5.jpg",
    city_key: "hubCityHawassa",
    location: {
      en: "Hawassa, Ethiopia",
      ru: "Хавасса, Эфиопия",
      et: "ሃዋሳ, ኢትዮጵያ"
    },
    address: {
      en: "City Center 202, Hawassa",
      ru: "Городской центр 202, Хавасса",
      et: "የከተማ መሃል 202, ሃዋሳ"
    }
  }
];