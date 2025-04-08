
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useRtlHelpers } from "@/utils/rtl-helpers";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { getDirectionalClasses } = useRtlHelpers();

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    localStorage.setItem("instasafar_language", lang);
    
    // Show toast notification about language change with translation
    toast({
      title: t(
        lang === "en" ? "language.changedToEnglish" : "language.changedToArabic", 
        lang === "en" ? "Language changed to English" : "تم تغيير اللغة إلى العربية"
      ),
      description: t(
        lang === "en" ? "language.pageWillRefresh" : "language.pageWillRefreshAr",
        lang === "en" ? "The page will refresh with English content" : "ستتم إعادة تحميل الصفحة بالمحتوى العربي"
      ),
    });
    
    // Small delay to show the toast before reload
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label={t("language.select", "Select language")} 
          className={className}
        >
          <Globe size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="min-w-[120px] bg-popover">
        <DropdownMenuItem
          className={cn(
            "flex items-center cursor-pointer gap-2", 
            language === "en" ? "font-medium" : ""
          )}
          onClick={() => handleLanguageChange("en")}
        >
          <span className={getDirectionalClasses("mr-2", "mr-2", "ml-2")}>🇺🇸</span>
          <span>English</span>
          {language === "en" && <span className={getDirectionalClasses("ml-auto", "ml-auto", "mr-auto")}>✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "flex items-center cursor-pointer gap-2", 
            language === "ar" ? "font-medium" : ""
          )}
          onClick={() => handleLanguageChange("ar")}
        >
          <span className={getDirectionalClasses("mr-2", "mr-2", "ml-2")}>🇸🇦</span>
          <span>العربية</span>
          {language === "ar" && <span className={getDirectionalClasses("ml-auto", "ml-auto", "mr-auto")}>✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
