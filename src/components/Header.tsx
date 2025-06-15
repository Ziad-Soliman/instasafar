
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut, Settings, BookOpen, Heart, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const mainNavItems = [
    { href: "/", label: t("home", "Home") },
    { href: "/hotels", label: t("hotels", "Hotels") },
    { href: "/packages", label: t("packages", "Packages") },
    { href: "/flights", label: t("flights", "Flights") },
    { href: "/transport", label: t("transport", "Transport") },
  ];

  const mobileNavItems = [
    ...mainNavItems,
    ...(user ? [
      { href: "/bookings", label: t("bookings", "Bookings") },
      { href: "/wishlist", label: t("wishlist", "Wishlist") },
      { href: "/profile", label: t("profile", "Profile") },
    ] : [])
  ];

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

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="w-8 h-8 bg-saudi-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-bold text-foreground">InstaSafar</span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Side Actions */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageSelector />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <UserCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {user.full_name || user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                  <div className={`flex items-center justify-start gap-2 p-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <div className={`flex flex-col space-y-1 leading-none ${isRTL ? 'items-end' : ''}`}>
                      <p className="font-medium">{user.full_name || t("profile", "Profile")}</p>
                      <p className={`w-[200px] truncate text-sm text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {dashboardLink && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to={dashboardLink.href} className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Settings className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {dashboardLink.label}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t("profile", "Profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings" className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <BookOpen className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t("bookings", "Bookings")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Heart className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t("wishlist", "Wishlist")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className={`cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t("logout", "Logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className={`hidden md:flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">{t("auth.signIn", "Sign In")}</Link>
                </Button>
                <Button asChild variant="saudi" size="sm">
                  <Link to="/auth?tab=register">{t("auth.signUp", "Sign Up")}</Link>
                </Button>
              </div>
            )}

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

        {/* Mobile Navigation */}
        {isMenuOpen && (
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {dashboardLink && (
                <Link
                  to={dashboardLink.href}
                  className={`block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-md transition-colors ${isRTL ? 'text-right' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dashboardLink.label}
                </Link>
              )}

              {!user && (
                <div className="px-4 pt-4 space-y-2 border-t border-border">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t("auth.signIn", "Sign In")}
                    </Link>
                  </Button>
                  <Button asChild variant="saudi" size="sm" className="w-full justify-start">
                    <Link to="/auth?tab=register" onClick={() => setIsMenuOpen(false)}>
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
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t("logout", "Logout")}
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
