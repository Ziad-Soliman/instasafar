
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.packages': 'Packages',
    'nav.hotels': 'Hotels',
    'nav.flights': 'Flights',
    'nav.transport': 'Transport',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Common
    'common.search': 'Search',
    'common.book_now': 'Book Now',
    'common.view_details': 'View Details',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Homepage
    'hero.title': 'Discover Saudi Arabia',
    'hero.subtitle': 'Your gateway to unforgettable experiences',
    'features.title': 'Why Choose Us',
    'packages.title': 'Featured Packages',
    'hotels.title': 'Top Hotels',
    
    // Packages
    'packages.hajj': 'Hajj',
    'packages.umrah': 'Umrah',
    'packages.custom': 'Custom',
    'packages.duration': 'Duration',
    'packages.price': 'Price',
    'packages.includes': 'Package Includes',
    
    // Hotels
    'hotels.rating': 'Rating',
    'hotels.price_per_night': 'per night',
    'hotels.amenities': 'Amenities',
    'hotels.distance': 'Distance to Haram',
    
    // Flights
    'flights.departure': 'Departure',
    'flights.arrival': 'Arrival',
    'flights.duration': 'Duration',
    'flights.stops': 'Stops',
    'flights.nonstop': 'Non-stop',
    
    // Booking
    'booking.guests': 'Guests',
    'booking.checkin': 'Check-in',
    'booking.checkout': 'Check-out',
    'booking.total': 'Total',
    'booking.confirm': 'Confirm Booking',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgot_password': 'Forgot Password?',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.bookings': 'Bookings',
    'dashboard.revenue': 'Revenue',
    'dashboard.listings': 'Listings',
    'dashboard.analytics': 'Analytics'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.packages': 'الباقات',
    'nav.hotels': 'الفنادق',
    'nav.flights': 'الطيران',
    'nav.transport': 'النقل',
    'nav.about': 'حولنا',
    'nav.contact': 'اتصل بنا',
    
    // Common
    'common.search': 'بحث',
    'common.book_now': 'احجز الآن',
    'common.view_details': 'عرض التفاصيل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    
    // Homepage
    'hero.title': 'اكتشف المملكة العربية السعودية',
    'hero.subtitle': 'بوابتك لتجارب لا تُنسى',
    'features.title': 'لماذا تختارنا',
    'packages.title': 'الباقات المميزة',
    'hotels.title': 'أفضل الفنادق',
    
    // Packages
    'packages.hajj': 'الحج',
    'packages.umrah': 'العمرة',
    'packages.custom': 'مخصص',
    'packages.duration': 'المدة',
    'packages.price': 'السعر',
    'packages.includes': 'تشمل الباقة',
    
    // Hotels
    'hotels.rating': 'التقييم',
    'hotels.price_per_night': 'لليلة الواحدة',
    'hotels.amenities': 'المرافق',
    'hotels.distance': 'المسافة إلى الحرم',
    
    // Flights
    'flights.departure': 'المغادرة',
    'flights.arrival': 'الوصول',
    'flights.duration': 'المدة',
    'flights.stops': 'التوقفات',
    'flights.nonstop': 'مباشر',
    
    // Booking
    'booking.guests': 'الضيوف',
    'booking.checkin': 'تسجيل الوصول',
    'booking.checkout': 'تسجيل المغادرة',
    'booking.total': 'الإجمالي',
    'booking.confirm': 'تأكيد الحجز',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgot_password': 'نسيت كلمة المرور؟',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.bookings': 'الحجوزات',
    'dashboard.revenue': 'الإيرادات',
    'dashboard.listings': 'القوائم',
    'dashboard.analytics': 'التحليلات'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
