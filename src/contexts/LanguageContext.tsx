
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.packages': 'Packages',
    'nav.flights': 'Flights',
    'nav.transport': 'Transport',
    'nav.hotels': 'Hotels',
    'nav.profile': 'Profile',
    'nav.bookings': 'Bookings',
    'nav.wishlist': 'Wishlist',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // Common
    'common.search': 'Search',
    'common.book': 'Book',
    'common.view': 'View',
    'common.details': 'Details',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.update': 'Update',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.remove': 'Remove',
    'common.select': 'Select',
    'common.choose': 'Choose',
    'common.upload': 'Upload',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.copy': 'Copy',
    'common.paste': 'Paste',
    'common.cut': 'Cut',
    'common.undo': 'Undo',
    'common.redo': 'Redo',
    'common.refresh': 'Refresh',
    'common.reload': 'Reload',
    'common.print': 'Print',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.help': 'Help',
    'common.about': 'About',
    'common.contact': 'Contact',
    'common.support': 'Support',
    'common.feedback': 'Feedback',
    'common.settings': 'Settings',
    'common.preferences': 'Preferences',
    'common.privacy': 'Privacy',
    'common.terms': 'Terms',
    'common.conditions': 'Conditions',
    'common.policy': 'Policy',
    'common.agreement': 'Agreement',
    'common.license': 'License',
    'common.copyright': 'Copyright',
    'common.all_rights_reserved': 'All rights reserved',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.search': 'البحث',
    'nav.packages': 'الباقات',
    'nav.flights': 'الرحلات',
    'nav.transport': 'النقل',
    'nav.hotels': 'الفنادق',
    'nav.profile': 'الملف الشخصي',
    'nav.bookings': 'الحجوزات',
    'nav.wishlist': 'المفضلة',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    
    // Common
    'common.search': 'البحث',
    'common.book': 'حجز',
    'common.view': 'عرض',
    'common.details': 'التفاصيل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.add': 'إضافة',
    'common.update': 'تحديث',
    'common.close': 'إغلاق',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
    'common.reset': 'إعادة تعيين',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.clear': 'مسح',
    'common.apply': 'تطبيق',
    'common.remove': 'إزالة',
    'common.select': 'اختيار',
    'common.choose': 'اختر',
    'common.upload': 'رفع',
    'common.download': 'تحميل',
    'common.share': 'مشاركة',
    'common.copy': 'نسخ',
    'common.paste': 'لصق',
    'common.cut': 'قص',
    'common.undo': 'تراجع',
    'common.redo': 'إعادة',
    'common.refresh': 'تحديث',
    'common.reload': 'إعادة تحميل',
    'common.print': 'طباعة',
    'common.export': 'تصدير',
    'common.import': 'استيراد',
    'common.help': 'مساعدة',
    'common.about': 'حول',
    'common.contact': 'اتصال',
    'common.support': 'دعم',
    'common.feedback': 'تعليقات',
    'common.settings': 'إعدادات',
    'common.preferences': 'تفضيلات',
    'common.privacy': 'خصوصية',
    'common.terms': 'شروط',
    'common.conditions': 'أحكام',
    'common.policy': 'سياسة',
    'common.agreement': 'اتفاقية',
    'common.license': 'رخصة',
    'common.copyright': 'حقوق الطبع والنشر',
    'common.all_rights_reserved': 'جميع الحقوق محفوظة',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  // Simple translation function that takes only one argument
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
