
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Hotel,
  Package,
  ExternalLink,
  BookOpen,
  Users,
  Star,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/admin",
    },
    {
      title: "Hotels",
      icon: Hotel,
      path: "/admin/hotels",
    },
    {
      title: "Packages",
      icon: Package,
      path: "/admin/packages",
    },
    {
      title: "External Listings",
      icon: ExternalLink,
      path: "/admin/external-listings",
    },
    {
      title: "Bookings",
      icon: BookOpen,
      path: "/admin/bookings",
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/admin/reviews",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-600",
          "flex flex-col md:relative md:translate-x-0 shadow-xl"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-navy-600">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-saudi-green-400 to-saudi-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IS</span>
              </div>
              <div>
                <span className="text-lg font-bold text-navy-700 dark:text-white">InstaSafar</span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Admin Panel</div>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto py-6">
          <nav className="px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-saudi-green-400 to-saudi-green-600 text-white shadow-lg shadow-saudi-green/25"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-navy-700 dark:hover:text-white"
                  )}
                >
                  <item.icon 
                    size={18} 
                    className={cn(
                      "transition-all duration-200",
                      isActive 
                        ? "text-white" 
                        : "text-gray-500 dark:text-gray-400 group-hover:text-saudi-green"
                    )} 
                  />
                  <span className="font-medium">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-navy-600">
          {/* User Info */}
          <div className="mb-4 p-3 bg-gray-50 dark:bg-navy-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-saudi-green-400 to-saudi-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-700 dark:text-white truncate">
                  {user?.full_name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
              <Link to="/" className="flex items-center space-x-2">
                <Home size={14} />
                <span className="text-xs font-medium">Back to Site</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-9"
              onClick={() => logout()}
            >
              <LogOut size={14} className="mr-2" />
              <span className="text-xs font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
