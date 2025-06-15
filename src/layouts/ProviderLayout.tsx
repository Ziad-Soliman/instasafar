
import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Package, Hotel, Users, UserCircle, Menu, LogOut, ChevronRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const ProviderLayout: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { isRTL } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Define sidebar items
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      path: "/provider/dashboard",
    },
    {
      title: "My Listings",
      icon: Hotel,
      path: "/provider/listings",
    },
    {
      title: "Bookings",
      icon: Package,
      path: "/provider/bookings",
    },
    {
      title: "Profile",
      icon: UserCircle,
      path: "/provider/profile",
    },
  ];

  // Check if current path matches item path
  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // If still checking authentication status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  // Allow both provider and admin access to provider routes
  if (!loading && (!user || (user.role !== "provider" && user.role !== "admin"))) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-navy-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IS</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-navy-700 dark:text-white">Provider Portal</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Manage your business</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = isActivePath(item.path);
            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-400/25"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-navy-700 dark:hover:text-white"
                )}
                onClick={() => setOpen(false)}
              >
                <item.icon 
                  size={18} 
                  className={cn(
                    "transition-all duration-200",
                    isActive 
                      ? "text-white" 
                      : "text-gray-500 dark:text-gray-400 group-hover:text-brand-500"
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
            <div className="w-10 h-10 bg-gradient-to-r from-brand-400 to-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'P'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy-700 dark:text-white truncate">
                {user?.full_name || 'Provider'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-9"
          onClick={logout}
        >
          <LogOut size={14} className="mr-2" />
          <span className="text-xs font-medium">Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-navy-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Mobile navbar */}
      <div className="lg:hidden bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-600 sticky top-0 z-30 shadow-sm">
        <div className="flex h-16 items-center px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] px-0 py-0 bg-white dark:bg-navy-800">
              <div className="flex flex-col h-full">
                <SidebarContent />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center mx-auto">
            <h1 className="text-lg font-semibold text-navy-700 dark:text-white">Provider Portal</h1>
          </div>

          <div className="ml-auto">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-xs">
                {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'P'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] border-r border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 h-screen sticky top-0 shadow-xl">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
