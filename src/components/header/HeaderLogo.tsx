
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeaderLogo: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <Link to="/" className={`flex items-center ${isRTL ? 'space-x-reverse' : ''}`}>
      <span className="text-xl font-bold text-foreground">InstaSafar</span>
    </Link>
  );
};

export default HeaderLogo;
