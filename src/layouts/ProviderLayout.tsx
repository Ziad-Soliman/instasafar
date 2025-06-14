import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Home, Package, Hotel, Users, UserCircle, Menu, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderLayout: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { isRTL } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Define sidebar items
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
      path: "/provider/dashboard",
    },
    {
      title: "My Listings",
      icon: <Hotel className="mr-2 h-4 w-4" />,
      path: "/provider/listings",
    },
    {
      title: "Bookings",
      icon: <Package className="mr-2 h-4 w-4" />,
      path: "/provider/bookings",
    },
    {
      title: "Profile",
      icon: <UserCircle className="mr-2 h-4 w-4" />,
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
    // For demonstration, we're allowing admin access
    // In a real app, this would check for a specific "provider" role
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className={`min-h-screen bg-muted/30 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Mobile navbar */}
      <div className="lg:hidden bg-background border-b sticky top-0 z-30">
        <div className="flex h-16 items-center px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] px-0 py-0">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Provider Dashboard</h2>
                <p className="text-sm text-muted-foreground">Manage your listings and bookings</p>
              </div>

              <div className="py-2">
                <nav className="flex flex-col space-y-1 px-2">
                  {sidebarItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={`flex items-center py-2 px-3 text-sm rounded-md ${
                        isActivePath(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>

              <Separator />

              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center mx-auto">
            <h1 className="text-lg font-semibold">Provider Portal</h1>
          </div>

          <div className="ml-auto">
            <UserCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-60 border-r bg-background h-screen sticky top-0">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Provider Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your listings and bookings</p>
          </div>

          <div className="flex-1 py-4">
            <nav className="flex flex-col space-y-1 px-2">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center py-2 px-3 text-sm rounded-md ${
                    isActivePath(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t mt-auto">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.full_name}</p>
                <p className="text-xs text-muted-foreground truncate w-36">
                  {user?.email}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
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
