
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const DesktopNavigation: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const mainNavItems = [
    { href: "/", label: t("home", "Home") },
    { href: "/hotels", label: t("hotels", "Hotels") },
    { href: "/packages", label: t("packages", "Packages") },
    { href: "/flights", label: t("flights", "Flights") },
    { href: "/transport", label: t("transport", "Transport") },
  ];

  return (
    <nav className={`hidden md:flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
