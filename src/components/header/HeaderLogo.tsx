
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeaderLogo: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <Link to="/" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
      <div className="w-8 h-8 bg-saudi-green rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">I</span>
      </div>
      <span className="text-xl font-bold text-foreground">InstaSafar</span>
    </Link>
  );
};

export default HeaderLogo;
