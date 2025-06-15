
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeaderLogo: React.FC = () => {
  const { isRTL } = useLanguage();

  return (
    <Link to="/" className="flex items-center">
      <span className="text-lg font-bold text-foreground whitespace-nowrap">InstaSafar</span>
    </Link>
  );
};

export default HeaderLogo;
