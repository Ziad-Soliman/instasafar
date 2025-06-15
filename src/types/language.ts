
export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string, replacements?: Record<string, string | number>) => string;
}

export type TranslationRecord = Record<string, string>;
export type Translations = Record<Language, TranslationRecord>;
