
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Enhanced RTL Layout Helpers
 * Comprehensive utilities for RTL layout implementation
 */

export const useRtlLayout = () => {
  const { isRTL, language } = useLanguage();

  /**
   * Get flex direction classes for RTL layouts
   */
  const getFlexDirection = (defaultDirection: 'row' | 'col' = 'row') => {
    if (defaultDirection === 'col') return 'flex-col';
    return isRTL ? 'flex-row-reverse' : 'flex-row';
  };

  /**
   * Get text alignment classes
   */
  const getTextAlign = (align: 'left' | 'right' | 'center' = 'left') => {
    if (align === 'center') return 'text-center';
    if (align === 'left') return isRTL ? 'text-right' : 'text-left';
    if (align === 'right') return isRTL ? 'text-left' : 'text-right';
    return isRTL ? 'text-right' : 'text-left';
  };

  /**
   * Get spacing classes (margin, padding) with RTL awareness
   */
  const getSpacing = (type: 'margin' | 'padding', side: 'left' | 'right' | 'x' | 'y', size: string) => {
    const prefix = type === 'margin' ? 'm' : 'p';
    
    if (side === 'x' || side === 'y') {
      return `${prefix}${side}-${size}`;
    }
    
    const actualSide = isRTL ? (side === 'left' ? 'r' : 'l') : (side === 'left' ? 'l' : 'r');
    return `${prefix}${actualSide}-${size}`;
  };

  /**
   * Get border radius classes with RTL awareness
   */
  const getBorderRadius = (corners: 'left' | 'right' | 'top' | 'bottom' | 'all', size: string = 'md') => {
    if (corners === 'all') return `rounded-${size}`;
    if (corners === 'top' || corners === 'bottom') return `rounded-${corners}-${size}`;
    
    const actualSide = isRTL ? (corners === 'left' ? 'r' : 'l') : corners;
    return `rounded-${actualSide}-${size}`;
  };

  /**
   * Get transform classes for RTL
   */
  const getTransform = (transform: 'scaleX' | 'rotate') => {
    if (transform === 'scaleX' && isRTL) return 'scale-x-[-1]';
    return '';
  };

  return {
    isRTL,
    language,
    getFlexDirection,
    getTextAlign,
    getSpacing,
    getBorderRadius,
    getTransform,
  };
};

/**
 * RTL-aware component wrapper
 */
export const RtlWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const { isRTL } = useRtlLayout();
  
  return (
    <div 
      className={`${className} ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </div>
  );
};
