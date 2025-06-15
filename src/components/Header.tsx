
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DesktopNavigation from "@/components/header/DesktopNavigation";
import UserDropdown from "@/components/header/UserDropdown";
import MobileMenu from "@/components/header/MobileMenu";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const { isRTL, t } = useLanguage();
  const { logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: t("auth.loggedOut", "Logged out successfully"),
      description: t("auth.loggedOutDesc", "You have been logged out"),
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className={`flex h-16 items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Building className="h-8 w-8 text-saudi-green" />
            <span className="text-xl font-bold text-saudi-green">
              {t("common.appName", "InstaSafar")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Right side actions */}
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageSwitcher />
            <UserDropdown />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t("common.menu", "Menu")}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onLogout={handleLogout}
          />
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
