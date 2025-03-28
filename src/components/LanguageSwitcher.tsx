
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    localStorage.setItem("instasafar_language", lang);
    
    // Show toast notification about language change
    toast({
      title: lang === "en" ? "Language changed to English" : "تم تغيير اللغة إلى العربية",
      description: lang === "en" ? "The page will refresh with English content" : "ستتم إعادة تحميل الصفحة بالمحتوى العربي",
    });
    
    // Small delay to show the toast before reload
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language" className={className}>
          <Globe size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          className={`flex items-center cursor-pointer ${language === "en" ? "font-medium" : ""}`}
          onClick={() => handleLanguageChange("en")}
        >
          <span className="mr-2">🇺🇸</span>
          <span>English</span>
          {language === "en" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex items-center cursor-pointer ${language === "ar" ? "font-medium" : ""}`}
          onClick={() => handleLanguageChange("ar")}
        >
          <span className="mr-2">🇸🇦</span>
          <span>العربية</span>
          {language === "ar" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
