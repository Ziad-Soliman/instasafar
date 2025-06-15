
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { sidebarItems } from "./ProviderSidebarItems";

interface ProviderSidebarContentProps {
  onItemClick?: () => void;
}

const ProviderSidebarContent: React.FC<ProviderSidebarContentProps> = ({ onItemClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Check if current path matches item path
  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-navy-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-saudi-green-400 to-saudi-green-600 rounded-lg flex items-center justify-center">
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
                    ? "bg-gradient-to-r from-saudi-green-400 to-saudi-green-600 text-white shadow-lg shadow-saudi-green/25"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-navy-700 dark:hover:text-white"
                )}
                onClick={onItemClick}
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
};

export default ProviderSidebarContent;
