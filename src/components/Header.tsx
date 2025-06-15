
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
          "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          isSticky ? "top-4" : "top-6"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center bg-background/5 border border-border backdrop-blur-lg py-2 px-6 rounded-full shadow-lg min-w-fit">
          {/* Logo - Always on the left in LTR, right in RTL */}
          <div className={cn("flex-shrink-0", isRTL ? "order-3" : "order-1")}>
            <HeaderLogo />
          </div>

          {/* Navigation Items - Always in the center */}
          <div className="hidden md:flex items-center gap-1 mx-8 order-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                    "text-foreground/80 hover:text-primary",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <span>{item.name}</span>
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

          {/* Actions - Always on the right in LTR, left in RTL */}
          <div className={cn("flex items-center gap-2 flex-shrink-0", isRTL ? "order-1" : "order-3")}>
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
      </motion.header>

      {/* Spacer to prevent content from hiding behind floating header */}
      <div className="h-20" />
    </>
  );
};

export default Header;
