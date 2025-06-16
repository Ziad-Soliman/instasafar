
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Home, Search, Package, Plane, Car } from "lucide-react";
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
    { href: "/", label: t("home", "Home"), icon: Home },
    { href: "/search", label: t("hotels", "Hotels"), icon: Search },
    { href: "/packages", label: t("packages", "Packages"), icon: Package },
    { href: "/flights", label: t("flights", "Flights"), icon: Plane },
    { href: "/transport", label: t("transport", "Transport"), icon: Car },
  ];

  const userNavItems = user ? [
    { href: "/account/bookings", label: t("bookings", "Bookings") },
    { href: "/account/wishlist", label: t("wishlist", "Wishlist") },
    { href: "/account/profile", label: t("profile", "Profile") },
  ] : [];

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin':
        return { href: "/admin", label: t("admin.dashboard", "Admin Dashboard") };
      case 'provider':
        return { href: "/provider", label: t("dashboard.overview", "Dashboard") };
      default:
        return { href: "/account/dashboard", label: t("dashboard.overview", "Dashboard") };
    }
  };

  const dashboardLink = getDashboardLink();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-3 sm:mx-4 bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="py-4 space-y-1 max-h-[80vh] overflow-y-auto">
        {/* Main Navigation */}
        <div className="px-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
            {t("navigation", "Navigation")}
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-foreground/80 hover:text-foreground hover:bg-accent rounded-xl transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                onClick={onClose}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {user && (
          <>
            <div className="h-px bg-border mx-4" />
            
            {/* User Navigation */}
            <div className="px-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                {t("account", "Account")}
              </div>
              
              {dashboardLink && (
                <Link
                  to={dashboardLink.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-foreground/80 hover:text-foreground hover:bg-accent rounded-xl transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  onClick={onClose}
                >
                  <span className="font-medium">{dashboardLink.label}</span>
                </Link>
              )}

              {userNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-foreground/80 hover:text-foreground hover:bg-accent rounded-xl transition-colors ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  onClick={onClose}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {!user && (
          <>
            <div className="h-px bg-border mx-4" />
            
            {/* Auth Buttons */}
            <div className="px-2 pt-2">
              <div className="space-y-2">
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
            </div>
          </>
        )}

        {user && (
          <>
            <div className="h-px bg-border mx-4" />
            
            {/* Logout */}
            <div className="px-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 ${isRTL ? 'flex-row-reverse' : ''}`}
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t("logout", "Logout")}
              </Button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
