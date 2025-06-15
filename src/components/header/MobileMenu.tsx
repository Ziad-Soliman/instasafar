
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onLogout }) => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();

  const mainNavItems = [
    { href: "/", label: t("home", "Home") },
    { href: "/hotels", label: t("hotels", "Hotels") },
    { href: "/packages", label: t("packages", "Packages") },
    { href: "/flights", label: t("flights", "Flights") },
    { href: "/transport", label: t("transport", "Transport") },
  ];

  const userNavItems = user ? [
    { href: "/bookings", label: t("bookings", "Bookings") },
    { href: "/wishlist", label: t("wishlist", "Wishlist") },
    { href: "/profile", label: t("profile", "Profile") },
  ] : [];

  const mobileNavItems = [...mainNavItems, ...userNavItems];

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin':
        return { href: "/admin", label: t("admin.dashboard", "Admin Dashboard") };
      case 'provider':
        return { href: "/provider", label: t("dashboard.overview", "Dashboard") };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden border-t border-border bg-background"
    >
      <nav className="py-4 space-y-2">
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors ${isRTL ? 'text-right' : ''}`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
        
        {dashboardLink && (
          <Link
            to={dashboardLink.href}
            className={`block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors ${isRTL ? 'text-right' : ''}`}
            onClick={onClose}
          >
            {dashboardLink.label}
          </Link>
        )}

        {!user && (
          <div className="px-4 pt-4 space-y-2 border-t border-border">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start">
              <Link to="/auth" onClick={onClose}>
                {t("auth.signIn", "Sign In")}
              </Link>
            </Button>
            <Button asChild variant="saudi" size="sm" className="w-full justify-start">
              <Link to="/auth?tab=register" onClick={onClose}>
                {t("auth.signUp", "Sign Up")}
              </Link>
            </Button>
          </div>
        )}

        {user && (
          <div className="px-4 pt-4 border-t border-border">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`w-full justify-start text-red-600 ${isRTL ? 'flex-row-reverse' : ''}`}
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t("logout", "Logout")}
            </Button>
          </div>
        )}
      </nav>
    </motion.div>
  );
};

export default MobileMenu;
