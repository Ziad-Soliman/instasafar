
import React from 'react';
import { useRtlLayout } from '@/utils/rtl-layout-helpers';

interface RtlContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article' | 'aside';
}

const RtlContainer: React.FC<RtlContainerProps> = ({ 
  children, 
  className = '', 
  as: Component = 'div' 
}) => {
  const { isRTL } = useRtlLayout();
  
  return (
    <Component 
      className={`${className} ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {children}
    </Component>
  );
};

export default RtlContainer;
