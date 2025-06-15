
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Home, Search, Package, Plane, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import HeaderLogo from "./header/HeaderLogo";
import UserDropdown from "./header/UserDropdown";
import MobileMenu from "./header/MobileMenu";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: t("home", "Home"), url: "/", icon: Home },
    { name: t("hotels", "Hotels"), url: "/search", icon: Search },
    { name: t("packages", "Packages"), url: "/packages", icon: Package },
    { name: t("flights", "Flights"), url: "/flights", icon: Plane },
    { name: t("transport", "Transport"), url: "/transport", icon: Car },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left in LTR, Right in RTL */}
          <div className={`flex-shrink-0 ${isRTL ? 'order-3' : 'order-1'}`}>
            <HeaderLogo />
          </div>

          {/* Center - Tubelight Navigation */}
          <div className="order-2 absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <NavBar items={navItems} />
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
