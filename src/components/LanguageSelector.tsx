
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      
      const message = newLanguage === 'ar' 
        ? t("language.changedToArabic", "Language changed to Arabic")
        : t("language.changedToEnglish", "Language changed to English");
      
      toast({
        title: message,
        description: t("language.pageWillRefresh", "The page will refresh to apply changes"),
      });

      // Small delay to show the toast before refresh
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {language === 'ar' ? 'عربي' : 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('ar')}
          className={language === 'ar' ? 'bg-accent' : ''}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
