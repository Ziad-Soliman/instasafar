
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations object
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.hotels': 'Hotels',
    'nav.flights': 'Flights',
    'nav.packages': 'Packages',
    'nav.transport': 'Transport',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.bookings': 'Bookings',
    'nav.wishlist': 'Wishlist',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Register',

    // Homepage
    'home.hero.title': 'Discover Saudi Arabia with InstaSafar',
    'home.hero.subtitle': 'Your gateway to unforgettable experiences in the Kingdom',
    'home.hero.cta': 'Start Your Journey',
    'home.search.placeholder': 'Where would you like to go?',
    'home.search.button': 'Search',
    'home.features.title': 'Why Choose InstaSafar?',
    'home.features.booking.title': 'Easy Booking',
    'home.features.booking.description': 'Book your perfect trip in just a few clicks',
    'home.features.support.title': '24/7 Support',
    'home.features.support.description': 'Get help whenever you need it',
    'home.features.deals.title': 'Best Deals',
    'home.features.deals.description': 'Exclusive offers and competitive prices',
    'home.popular.title': 'Popular Destinations',
    'home.popular.viewAll': 'View All',

    // Language
    'language.select': 'Select Language',
    'language.changedToEnglish': 'Language changed to English',
    'language.changedToArabic': 'Language changed to Arabic',
    'language.pageWillRefresh': 'The page will refresh to apply changes',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',

    // Buttons
    'button.bookNow': 'Book Now',
    'button.learnMore': 'Learn More',
    'button.exploreMore': 'Explore More',
    'button.viewDetails': 'View Details',
    'button.addToWishlist': 'Add to Wishlist',
    'button.removeFromWishlist': 'Remove from Wishlist',

    // Forms
    'form.email': 'Email',
    'form.password': 'Password',
    'form.confirmPassword': 'Confirm Password',
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.phone': 'Phone Number',
    'form.submit': 'Submit',
    'form.reset': 'Reset',

    // Destinations
    'destinations.riyadh': 'Riyadh',
    'destinations.jeddah': 'Jeddah',
    'destinations.mecca': 'Mecca',
    'destinations.medina': 'Medina',
    'destinations.dammam': 'Dammam',
    'destinations.taif': 'Taif',
    'destinations.abha': 'Abha',
    'destinations.tabuk': 'Tabuk',
    'destinations.alula': 'AlUla',
    'destinations.neom': 'NEOM'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.hotels': 'الفنادق',
    'nav.flights': 'الطيران',
    'nav.packages': 'الباقات',
    'nav.transport': 'النقل',
    'nav.dashboard': 'لوحة التحكم',
    'nav.profile': 'الملف الشخصي',
    'nav.bookings': 'الحجوزات',
    'nav.wishlist': 'المفضلة',
    'nav.logout': 'تسجيل الخروج',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',

    // Homepage
    'home.hero.title': 'اكتشف المملكة العربية السعودية مع إنستا سفر',
    'home.hero.subtitle': 'بوابتك إلى تجارب لا تُنسى في المملكة',
    'home.hero.cta': 'ابدأ رحلتك',
    'home.search.placeholder': 'أين تريد أن تذهب؟',
    'home.search.button': 'بحث',
    'home.features.title': 'لماذا تختار إنستا سفر؟',
    'home.features.booking.title': 'حجز سهل',
    'home.features.booking.description': 'احجز رحلتك المثالية بنقرات قليلة',
    'home.features.support.title': 'دعم على مدار الساعة',
    'home.features.support.description': 'احصل على المساعدة متى احتجت إليها',
    'home.features.deals.title': 'أفضل العروض',
    'home.features.deals.description': 'عروض حصرية وأسعار تنافسية',
    'home.popular.title': 'الوجهات الشائعة',
    'home.popular.viewAll': 'عرض الكل',

    // Language
    'language.select': 'اختر اللغة',
    'language.changedToEnglish': 'تم تغيير اللغة إلى الإنجليزية',
    'language.changedToArabic': 'تم تغيير اللغة إلى العربية',
    'language.pageWillRefresh': 'ستتم إعادة تحميل الصفحة لتطبيق التغييرات',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق',
    'common.open': 'فتح',
    'common.yes': 'نعم',
    'common.no': 'لا',

    // Buttons
    'button.bookNow': 'احجز الآن',
    'button.learnMore': 'اعرف المزيد',
    'button.exploreMore': 'استكشف المزيد',
    'button.viewDetails': 'عرض التفاصيل',
    'button.addToWishlist': 'أضف للمفضلة',
    'button.removeFromWishlist': 'إزالة من المفضلة',

    // Forms
    'form.email': 'البريد الإلكتروني',
    'form.password': 'كلمة المرور',
    'form.confirmPassword': 'تأكيد كلمة المرور',
    'form.firstName': 'الاسم الأول',
    'form.lastName': 'اسم العائلة',
    'form.phone': 'رقم الهاتف',
    'form.submit': 'إرسال',
    'form.reset': 'إعادة تعيين',

    // Destinations
    'destinations.riyadh': 'الرياض',
    'destinations.jeddah': 'جدة',
    'destinations.mecca': 'مكة المكرمة',
    'destinations.medina': 'المدينة المنورة',
    'destinations.dammam': 'الدمام',
    'destinations.taif': 'الطائف',
    'destinations.abha': 'أبها',
    'destinations.tabuk': 'تبوك',
    'destinations.alula': 'العلا',
    'destinations.neom': 'نيوم'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('instasafar_language');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('instasafar_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const t = (key: string, fallback?: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[typeof language]];
    return translation || fallback || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
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
