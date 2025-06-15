
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import HeaderLogo from "./header/HeaderLogo";
import DesktopNavigation from "./header/DesktopNavigation";
import UserDropdown from "./header/UserDropdown";
import MobileMenu from "./header/MobileMenu";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left in LTR, Right in RTL */}
          <div className={`flex-shrink-0 ${isRTL ? 'order-3' : 'order-1'}`}>
            <HeaderLogo />
          </div>

          {/* Center - Navigation - Absolutely centered to the page */}
          <div className="order-2 absolute left-1/2 transform -translate-x-1/2">
            <DesktopNavigation />
          </div>

          {/* Actions - Right in LTR, Left in RTL */}
          <div className={`flex items-center gap-2 flex-shrink-0 ${isRTL ? 'order-1' : 'order-3'}`}>
            <LanguageSelector />
            <UserDropdown />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
