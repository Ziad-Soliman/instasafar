
import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import ProviderSidebarContent from "@/components/provider/ProviderSidebarContent";
import ProviderMobileHeader from "@/components/provider/ProviderMobileHeader";

const ProviderLayout: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { isRTL } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

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

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-navy-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Mobile navbar */}
      <ProviderMobileHeader open={open} setOpen={setOpen} />

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] border-r border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 h-screen sticky top-0 shadow-xl">
          <ProviderSidebarContent />
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
