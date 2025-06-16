
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Home, Search, Package, Plane, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import HeaderLogo from "./header/HeaderLogo";
import UserDropdown from "./header/UserDropdown";
import MobileMenu from "./header/MobileMenu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300 flex justify-center px-3 sm:px-4",
          isSticky ? "top-2 sm:top-4" : "top-4 sm:top-6"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between bg-background/5 border border-border backdrop-blur-lg py-2 px-4 sm:px-6 rounded-full shadow-lg w-full max-w-7xl">
          {/* Logo */}
          <div className="flex-shrink-0">
            <HeaderLogo />
          </div>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <div className="hidden lg:flex items-center gap-1 mx-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-3 xl:px-4 py-2 rounded-full transition-colors",
                    "text-foreground/80 hover:text-primary",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <span className="whitespace-nowrap">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Language selector - hidden on small mobile */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
            
            {/* User dropdown - hidden on mobile */}
            <div className="hidden md:block">
              <UserDropdown />
            </div>

            {/* Mobile Menu Button - visible on tablet and mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-8 w-8 p-1"
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
      </motion.header>

      {/* Spacer to prevent content from hiding behind floating header */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Header;
