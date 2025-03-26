
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
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r",
          "flex flex-col md:relative md:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="InstaSafar" 
              className="h-8"
              onError={(e) => {
                // Fallback if logo image doesn't exist yet
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMCAyNUgxODBNOTAgMTVIOTVNOTAgMzVIOTUiIHN0cm9rZT0iIzAwOTliZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMwMDk5YmYiPkluc3RhU2FmYXI8L3RleHQ+PC9zdmc+";
              }}
            />
            <span className="ml-2 text-sm font-semibold">Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-2">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">Logged in as:</p>
            <div className="text-sm font-medium truncate">
              {user?.full_name || user?.email}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/" className="w-full justify-start">
                <Home size={16} className="mr-2" />
                Back to Site
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={() => logout()}
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
