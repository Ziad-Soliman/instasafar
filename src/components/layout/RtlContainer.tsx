
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface RtlContainerProps {
  children: React.ReactNode;
  className?: string;
}

const RtlContainer: React.FC<RtlContainerProps> = ({ children, className }) => {
  const { isRTL } = useLanguage();

  return (
    <div 
      className={cn(className)} 
      dir={isRTL ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
};

export default RtlContainer;
