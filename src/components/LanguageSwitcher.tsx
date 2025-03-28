
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useRouter } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const router = useRouter();

  // On component mount, check if there's a saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("instasafar_language") as "en" | "ar" | null;
    if (savedLang) {
      setLanguage(savedLang);
      applyLanguageSettings(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    localStorage.setItem("instasafar_language", lang);
    applyLanguageSettings(lang);
    
    // Reload the current page to apply language changes
    // In a full Next.js implementation, you would use next-i18next router functionality
    toast({
      title: lang === "en" ? "Language changed to English" : "تم تغيير اللغة إلى العربية",
      description: lang === "en" ? "The page will refresh with English content" : "ستتم إعادة تحميل الصفحة بالمحتوى العربي",
    });
    
    // Small delay to show the toast before reload
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const applyLanguageSettings = (lang: "en" | "ar") => {
    // Apply RTL for Arabic, LTR for English
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("font-arabic"); // Add a class for Arabic font if needed
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.classList.remove("font-arabic");
    }
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
