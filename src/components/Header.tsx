
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, X, User, Package, LogOut, Heart, MapPin,
  Calendar, Home, Search, Plane, Bus, Building
} from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Navigation items - Fixed to use proper translation keys without "nav." prefix
  const navItems = [
    { name: t("home"), path: "/", icon: Home },
    { name: t("search"), path: "/search", icon: Search },
    { name: t("packages"), path: "/packages", icon: Package },
    { name: t("flights"), path: "/flights", icon: Plane },
    { name: t("transport"), path: "/transport", icon: Bus },
  ];
  
  // Check if window has scrolled
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    
    const nameParts = user.name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };
  
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "bg-background/80 border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span 
              className="text-xl font-bold text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              InstaSafar
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          )}
          
          {/* User Menu & Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {user ? (
              <>
                <NotificationDropdown />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate("/account/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("profile")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/account/bookings")}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{t("bookings")}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/account/wishlist")}>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>{t("wishlist")}</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size={isMobile ? "icon" : "default"}
                  className="hidden sm:flex"
                  onClick={() => navigate("/auth/register")}
                >
                  {!isMobile && t("auth.signUp")}
                  {isMobile && <User className="h-4 w-4" />}
                </Button>
                <Button 
                  size={isMobile ? "icon" : "default"}
                  onClick={() => navigate("/auth/login")}
                >
                  {!isMobile && t("auth.signIn")}
                  {isMobile && <LogOut className="h-4 w-4" />}
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Trigger */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center py-4">
                      <span className="text-lg font-bold">InstaSafar</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <nav className="flex flex-col space-y-5 py-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center space-x-3 px-1 py-2 rounded-md hover:bg-muted transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                      
                      <div className="border-t pt-4">
                        <Link
                          to="/provider"
                          className="flex items-center space-x-3 px-1 py-2 rounded-md hover:bg-muted transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Building className="h-5 w-5 text-primary" />
                          <span className="font-medium">Provider Portal</span>
                        </Link>
                      </div>
                    </nav>
                    
                    <div className="mt-auto">
                      {user ? (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getUserInitials()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name || "User"}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button 
                              variant="outline" 
                              className="justify-start"
                              onClick={() => {
                                navigate("/account/profile");
                                setMobileMenuOpen(false);
                              }}
                            >
                              <User className="mr-2 h-4 w-4" />
                              {t("profile")}
                            </Button>
                            <Button 
                              variant="outline" 
                              className="justify-start"
                              onClick={() => {
                                navigate("/account/bookings");
                                setMobileMenuOpen(false);
                              }}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {t("bookings")}
                            </Button>
                            <Button 
                              variant="outline" 
                              className="justify-start"
                              onClick={() => {
                                navigate("/account/wishlist");
                                setMobileMenuOpen(false);
                              }}
                            >
                              <Heart className="mr-2 h-4 w-4" />
                              {t("wishlist")}
                            </Button>
                            <Button 
                              variant="default" 
                              className="justify-start mt-2"
                              onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                              }}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              {t("logout")}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              navigate("/auth/register");
                              setMobileMenuOpen(false);
                            }}
                          >
                            {t("auth.signUp")}
                          </Button>
                          <Button
                            onClick={() => {
                              navigate("/auth/login");
                              setMobileMenuOpen(false);
                            }}
                          >
                            {t("auth.signIn")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
