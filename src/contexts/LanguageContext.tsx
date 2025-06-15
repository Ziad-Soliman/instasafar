
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Direction, LanguageContextType } from '@/types/language';
import { translations } from '@/data/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('instasafar_language');
    return (savedLanguage as Language) || 'en';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';

  // Updated translation function that accepts optional fallback and replacements
  const t = (key: string, fallback?: string, replacements?: Record<string, string | number>): string => {
    let translation = translations[language][key] || fallback || key;

    if (replacements) {
      Object.keys(replacements).forEach((replacementKey) => {
        const value = replacements[replacementKey];
        translation = translation.replace(new RegExp(`{${replacementKey}}`, 'g'), String(value));
      });
    }
    
    return translation;
  };

  useEffect(() => {
    document.dir = direction;
    document.documentElement.lang = language;
    
    // Apply RTL class to html element for Tailwind RTL support
    if (isRTL) {
      document.documentElement.classList.add('rtl');
      // Apply Arabic fonts for RTL
      document.body.style.fontFamily = "'Cairo', 'Tajawal', sans-serif";
    } else {
      document.documentElement.classList.remove('rtl');
      // Use default Inter font for LTR
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
    
    // Save language preference to localStorage
    localStorage.setItem('instasafar_language', language);
  }, [language, direction, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, direction, isRTL, setLanguage, t }}>
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
