
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation function (would be replaced with proper i18n)
const translations: Record<string, Record<string, string>> = {
  en: {
    'welcome': 'Welcome',
    'search': 'Search',
    'hotels': 'Hotels',
    'packages': 'Packages',
    'flights': 'Flights',
    'transport': 'Transport',
  },
  ar: {
    'welcome': 'مرحباً',
    'search': 'بحث',
    'hotels': 'الفنادق',
    'packages': 'الباقات',
    'flights': 'الطيران',
    'transport': 'النقل',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  useEffect(() => {
    // Set HTML dir attribute for RTL support
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
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
