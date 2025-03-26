
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher: React.FC = () => {
  // In a real implementation, this would be connected to i18n
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    // Here you would update the app's language context/state
    // and potentially redirect to the localized route
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language">
          <Globe size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
