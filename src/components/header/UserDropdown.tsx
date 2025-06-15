
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Settings, BookOpen, Heart, UserCircle } from "lucide-react";
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

const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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

  if (!user) {
    return (
      <div className={`hidden md:flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Button asChild variant="ghost" size="sm">
          <Link to="/auth">{t("auth.signIn", "Sign In")}</Link>
        </Button>
        <Button asChild variant="saudi" size="sm">
          <Link to="/auth?tab=register">{t("auth.signUp", "Sign Up")}</Link>
        </Button>
      </div>
    );
  }

  return (
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
  );
};

export default UserDropdown;
