
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Utility function to get the appropriate text based on current language
 * @param englishText - The English version of the text
 * @param arabicText - The Arabic version of the text (optional)
 * @returns The text in the current language, fallback to English if Arabic is not available
 */
export const useBilingualText = () => {
  const { language } = useLanguage();
  
  const getText = (englishText: string, arabicText?: string | null): string => {
    if (language === 'ar' && arabicText) {
      return arabicText;
    }
    return englishText;
  };
  
  return { getText };
};

/**
 * Direct function to get bilingual text without hook (for use outside components)
 */
export const getBilingualText = (
  englishText: string, 
  arabicText: string | null | undefined, 
  currentLanguage: string
): string => {
  if (currentLanguage === 'ar' && arabicText) {
    return arabicText;
  }
  return englishText;
};
