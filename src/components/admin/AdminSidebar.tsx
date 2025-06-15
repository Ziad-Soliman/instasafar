
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  LayoutDashboard, 
  Users, 
  Hotel, 
  Package, 
  Plane, 
  Car, 
  Calendar, 
  Star, 
  Building2, 
  ExternalLink,
  X,
  Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { isRTL } = useLanguage();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Hotels",
      href: "/admin/hotels",
      icon: Hotel,
    },
    {
      name: "Packages",
      href: "/admin/packages",
      icon: Package,
    },
    {
      name: "Flights",
      href: "/admin/flights",
      icon: Plane,
    },
    {
      name: "Transport",
      href: "/admin/transport",
      icon: Car,
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      name: "Providers",
      href: "/admin/providers",
      icon: Building2,
    },
    {
      name: "Reviews",
      href: "/admin/reviews",
      icon: Star,
    },
    {
      name: "External Listings",
      href: "/admin/external-listings",
      icon: ExternalLink,
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 z-50 h-full bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-700 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isRTL ? "right-0 lg:right-auto" : "left-0 lg:left-auto",
        "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-navy-700">
            <Link to="/admin/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-saudi-green rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = isActivePath(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-saudi-green/10 text-saudi-green dark:bg-saudi-green/20 dark:text-saudi-green"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-navy-700"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isRTL ? "ml-3" : "mr-3")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
