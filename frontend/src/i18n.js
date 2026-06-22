// Translation system for Habibi VIP Taxi
const translations = {
  en: {
    // Header
    header: {
      about: 'About',
      drivers: 'Drivers',
      helpCentre: 'Help Centre',
      myBooking: 'My booking',
      language: 'English',
      currency: 'EUR'
    },
    // Home page
    home: {
      title: 'Taxi transfers across Egypt',
      subtitle: 'Private transfers from all major Egyptian airports — Cairo, Hurghada, Sharm el-Sheikh, Luxor and more',
      arrivalAirport: 'Arrival airport',
      destination: 'Destination',
      destinationPlaceholder: 'Going to (hotel, address)',
      flightArrival: 'Flight arrival',
      tripType: 'Trip type',
      oneWay: 'One way',
      roundTrip: 'Round trip',
      passengers: 'Number of adults',
      search: 'Search',
      freeCancellation: 'Free cancellation',
      flightMonitoring: 'Flight monitoring',
      noHiddenFees: 'No hidden fees',
      support24_7: '24/7 support'
    },
    // Features section
    features: {
      title: 'All set before you land',
      peaceMind: 'Peace of mind',
      peaceMindDesc: 'No surprises. Your price is confirmed at the time of booking, free cancellation up to 48 hours before pickup, and 24/7 support.',
      onTime: 'On time, every time',
      onTimeDesc: 'We track your flight and coordinate your pickup around it. No queues, no delays, just a direct ride to your hotel door.',
      forYourTrip: 'Whatever your trip needs',
      forYourTripDesc: 'Child seats, group vehicles, wheelchair access. Just tell us what you need and we\'ll take care of the rest.'
    },
    // About page
    about: {
      title: 'About Habibi VIP Taxi',
      tagline: 'Your trusted partner for reliable, affordable airport transfers worldwide',
      globalCoverage: 'Global Coverage',
      globalCoverageDesc: 'Operating in major cities across the globe, we bring you reliable airport transfers wherever you travel.',
      transparentPricing: 'Transparent Pricing',
      transparentPricingDesc: 'No hidden fees. What you see is what you pay. Fair prices guaranteed for all routes and destinations.',
      professionalDrivers: 'Professional Drivers',
      professionalDriversDesc: 'Vetted and experienced drivers committed to delivering excellent service every single time.',
      modernFleet: 'Modern Fleet',
      modernFleetDesc: 'Well-maintained vehicles with comfort features to ensure your ride is smooth and enjoyable.',
      easyBooking: 'Easy Booking',
      easyBookingDesc: 'Book in seconds with our simple app. Track your ride in real-time and manage your bookings effortlessly.',
      safeSecurity: 'Safe & Secure',
      safeSecurityDesc: 'Your safety is our priority. All drivers are background-checked and vehicles are fully insured.',
      mission: 'Our Mission',
      missionDesc: 'At Habibi VIP Taxi, we believe everyone deserves a reliable, affordable way to get to and from the airport. We\'re committed to making airport transfers hassle-free, transparent, and convenient for travelers around the world.',
      whyChooseUs: 'Why Choose Us?',
      whyChooseUsDesc: 'Whether you\'re traveling for business or pleasure, we\'ve got you covered. With thousands of satisfied customers and years of experience in the transportation industry, we know exactly what travelers need. Our 24/7 customer support team is always ready to help.',
      bookTransfer: 'Book Your Transfer Today'
    },
    // Drivers page
    drivers: {
      title: 'Meet Our Drivers',
      tagline: 'Professional, vetted, and dedicated to your safe and comfortable journey',
      ourTeam: 'Our Team',
      standOut: 'Why Our Drivers Stand Out',
      standOutDesc: 'Every driver on the Habibi VIP Taxi team undergoes rigorous vetting and continuous training to ensure they meet our high standards for professionalism, safety, and customer service.',
      joinTeam: 'Want to Join Our Team?',
      joinTeamDesc: 'We\'re always looking for professional drivers who share our commitment to excellence and customer satisfaction. If you\'re interested in becoming part of Habibi VIP Taxi, we\'d love to hear from you. Applications are evaluated based on driving record, experience, customer service skills, and local knowledge.',
      trained: 'Trained & Certified',
      trainedDesc: 'All drivers complete comprehensive training programs covering safety, customer service, and local knowledge.',
      background: 'Background Checked',
      backgroundDesc: 'Every driver undergoes thorough background verification and criminal history checks for your peace of mind.',
      vehicle: 'Vehicle Inspected',
      vehicleDesc: 'Regular vehicle maintenance and inspections ensure your journey is safe, comfortable, and reliable.',
      rated: 'Highly Rated',
      ratedDesc: 'Our drivers maintain an average 4.8+ star rating across thousands of customer reviews and feedback.',
      multilingual: 'Multi-Lingual',
      multilingualDesc: 'Many of our drivers speak multiple languages to serve international travelers with ease and confidence.',
      responsive: 'Responsive Support',
      responsiveDesc: '24/7 customer support team ready to assist with any requests or concerns during your transfer.',
      bookToday: 'Book with Our Drivers Today'
    }
  },
  ar: {
    // Header
    header: {
      about: 'نبذة',
      drivers: 'السائقون',
      helpCentre: 'مركز المساعدة',
      myBooking: 'حجزي',
      language: 'العربية',
      currency: 'ر.س'
    },
    // Home page
    home: {
      title: 'نقل تاكسي عبر مصر',
      subtitle: 'نقل خاص من جميع مطارات مصر الرئيسية — القاهرة، الغردقة، شرم الشيخ، الأقصر والمزيد',
      arrivalAirport: 'مطار الوصول',
      destination: 'الوجهة',
      destinationPlaceholder: 'الذهاب إلى (فندق، عنوان)',
      flightArrival: 'وصول الرحلة',
      tripType: 'نوع الرحلة',
      oneWay: 'ذهاب فقط',
      roundTrip: 'ذهاب وإياب',
      passengers: 'عدد البالغين',
      search: 'بحث',
      freeCancellation: 'إلغاء مجاني',
      flightMonitoring: 'مراقبة الرحلة',
      noHiddenFees: 'لا توجد رسوم خفية',
      support24_7: 'دعم 24/7'
    },
    // Features section
    features: {
      title: 'كل شيء جاهز قبل هبوطك',
      peaceMind: 'راحة البال',
      peaceMindDesc: 'لا توجد مفاجآت. يتم تأكيد سعرك وقت الحجز، إلغاء مجاني حتى 48 ساعة قبل الاستلام، ودعم 24/7.',
      onTime: 'في الوقت المحدد، دائماً',
      onTimeDesc: 'نراقب رحلتك وننسق استلامك حولها. لا طوابير، لا تأخيرات، فقط رحلة مباشرة إلى باب فندقك.',
      forYourTrip: 'مهما احتجت في رحلتك',
      forYourTripDesc: 'مقاعد الأطفال، المركبات الجماعية، إمكانية الوصول للكراسي المتحركة. فقط أخبرنا بما تحتاجه وسنتولى الباقي.'
    },
    // About page
    about: {
      title: 'نبذة عن هبيبي VIP تاكسي',
      tagline: 'شريكك الموثوق به للحصول على نقل مطار موثوق وبأسعار معقولة في جميع أنحاء العالم',
      globalCoverage: 'تغطية عالمية',
      globalCoverageDesc: 'نعمل في المدن الرئيسية حول العالم، ونوفر لك نقل مطار موثوق أينما سافرت.',
      transparentPricing: 'تسعير شفاف',
      transparentPricingDesc: 'لا توجد رسوم خفية. ما تراه هو ما تدفعه. أسعار عادلة مضمونة لجميع المسارات.',
      professionalDrivers: 'سائقون محترفون',
      professionalDriversDesc: 'سائقون معتمدون وذوو خبرة ملتزمون بتقديم خدمة ممتازة في كل مرة.',
      modernFleet: 'أسطول حديث',
      modernFleetDesc: 'مركبات مصانة جيداً مع ميزات راحة لضمان رحلة سلسة وممتعة.',
      easyBooking: 'حجز سهل',
      easyBookingDesc: 'احجز في ثوان باستخدام تطبيقنا البسيط. تتبع رحلتك في الوقت الفعلي وأدر حجوزاتك بسهولة.',
      safeSecurity: 'آمن وموثوق',
      safeSecurityDesc: 'سلامتك هي أولويتنا. جميع السائقين يخضعون للتحقق من السجل والمركبات مؤمنة بالكامل.',
      mission: 'مهمتنا',
      missionDesc: 'في هبيبي VIP تاكسي، نؤمن بأن الجميع يستحقون طريقة موثوقة وبأسعار معقولة للذهاب والعودة من المطار. نحن ملتزمون بجعل نقل المطار خالي من المتاعب وشفاف وسهل للمسافرين حول العالم.',
      whyChooseUs: 'لماذا تختارنا؟',
      whyChooseUsDesc: 'سواء كنت تسافر للعمل أو المتعة، نحن هنا من أجلك. مع آلاف العملاء الراضين وسنوات من الخبرة في صناعة النقل، نعرف بالضبط ما يحتاجه المسافرون. فريق دعم العملاء 24/7 لدينا جاهز دائماً للمساعدة.',
      bookTransfer: 'احجز تحويلك اليوم'
    },
    // Drivers page
    drivers: {
      title: 'تعرف على سائقينا',
      tagline: 'محترفون معتمدون وملتزمون برحلتك الآمنة والمريحة',
      ourTeam: 'فريقنا',
      standOut: 'لماذا يتميز سائقونا',
      standOutDesc: 'يخضع كل سائق في فريق هبيبي VIP تاكسي للتدقيق الصارم والتدريب المستمر لضمان الوفاء بمعايير عالية من الاحترافية والسلامة وخدمة العملاء.',
      joinTeam: 'هل تريد الانضمام إلى فريقنا؟',
      joinTeamDesc: 'نحن نبحث دائماً عن سائقين محترفين يتشاركون التزامنا بالتميز وتسعية العملاء. إذا كنت مهتماً بالانضمام إلى هبيبي VIP تاكسي، فنود أن نسمع منك. يتم تقييم الطلبات بناءً على سجل القيادة والخبرة ومهارات خدمة العملاء والمعرفة المحلية.',
      trained: 'مدرب ومعتمد',
      trainedDesc: 'يكمل جميع السائقين برامج تدريب شاملة تغطي السلامة وخدمة العملاء والمعرفة المحلية.',
      background: 'تم التحقق من السجل',
      backgroundDesc: 'يخضع كل سائق للتحقق الشامل من السجل والتحقق من السجل الجنائي لراحتك.',
      vehicle: 'تم فحص المركبة',
      vehicleDesc: 'الصيانة المنتظمة والفحوصات تضمن أن تكون رحلتك آمنة ومريحة وموثوقة.',
      rated: 'تقييم عالي',
      ratedDesc: 'يحافظ سائقونا على متوسط تقييم 4.8+ من نجوم عبر آلاف تقييمات العملاء.',
      multilingual: 'متعدد اللغات',
      multilingualDesc: 'يتحدث العديد من سائقينا لغات متعددة لخدمة المسافرين الدوليين بسهولة وثقة.',
      responsive: 'دعم استجابي',
      responsiveDesc: 'فريق دعم العملاء 24/7 جاهز لمساعدتك في أي طلبات أو مخاوف أثناء تحويلك.',
      bookToday: 'احجز مع سائقينا اليوم'
    }
  }
}

let currentLanguage = 'en'

export function setLanguage(lang) {
  currentLanguage = lang
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  // Dispatch event so components know to re-render
  window.dispatchEvent(new CustomEvent('language-changed', { detail: { language: lang } }))
}

export function getLanguage() {
  return currentLanguage
}

export function t(path) {
  const keys = path.split('.')
  let value = translations[currentLanguage]
  
  for (const key of keys) {
    value = value?.[key]
  }
  
  return value || path
}
