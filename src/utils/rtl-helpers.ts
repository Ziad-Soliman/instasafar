
/**
 * RTL Helper Functions
 * Utility functions to help with RTL layout implementation
 */

import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Returns class names with RTL-specific variants applied
 * This is a utility function to help with applying RTL-specific Tailwind classes
 * 
 * @param baseClasses - Base classes that apply to both LTR and RTL
 * @param ltrClasses - Classes that only apply in LTR mode
 * @param rtlClasses - Classes that only apply in RTL mode
 * @returns Combined class string with RTL variants applied as needed
 */
export const getRtlClasses = (
  baseClasses: string = "", 
  ltrClasses: string = "", 
  rtlClasses: string = ""
): string => {
  // This will be used with the isRTL context value
  return `${baseClasses} ${ltrClasses} rtl:${rtlClasses}`;
};

/**
 * A hook that provides RTL-aware class names
 * @returns Object with utility functions for RTL class handling
 */
export const useRtlHelpers = () => {
  const { isRTL } = useLanguage();

  /**
   * Conditionally apply classes based on the current RTL state
   */
  const getDirectionalClasses = (ltrClasses: string, rtlClasses: string): string => {
    return isRTL ? rtlClasses : ltrClasses;
  };

  /**
   * Get the correct direction-aware class for margin, padding, etc.
   */
  const getDirectionalClass = (property: 'p' | 'm', side: 'l' | 'r', size: number): string => {
    const actualSide = isRTL ? (side === 'l' ? 'r' : 'l') : side;
    return `${property}${actualSide}-${size}`;
  };
  
  /**
   * Get the appropriate direction class when an element should be positioned differently in RTL
   */
  const getDirectionalPosition = (position: 'left' | 'right', value: string): string => {
    const actualPosition = isRTL ? (position === 'left' ? 'right' : 'left') : position;
    return `${actualPosition}-${value}`;
  };

  return { getDirectionalClasses, getDirectionalClass, getDirectionalPosition, isRTL };
};
