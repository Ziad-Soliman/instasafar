
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LanguageType = "en" | "ar";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

// Create a context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isRTL: false,
  t: (key) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

// Simple translations - in a real app, you would load these from JSON files
const translations: Record<LanguageType, Record<string, string>> = {
  en: {
    "app.name": "InstaSafar",
    "home.hero.title": "Discover the Ultimate Hajj & Umrah Experience",
    "home.hero.subtitle": "Book your sacred journey with ease and confidence",
    // Add more translations as needed
  },
  ar: {
    "app.name": "انستاسفر",
    "home.hero.title": "اكتشف تجربة الحج والعمرة المثالية",
    "home.hero.subtitle": "احجز رحلتك المقدسة بسهولة وثقة",
    // Add more translations as needed
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>("en");
  const isRTL = language === "ar";

  useEffect(() => {
    // Check for saved language preference on component mount
    const savedLang = localStorage.getItem("instasafar_language") as LanguageType | null;
    if (savedLang) {
      setLanguageState(savedLang);
      applyLanguageSettings(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    applyLanguageSettings(lang);
  };

  const applyLanguageSettings = (lang: LanguageType) => {
    // Apply RTL for Arabic, LTR for English
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("font-arabic"); // Add a class for Arabic font if needed
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.classList.remove("font-arabic");
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
