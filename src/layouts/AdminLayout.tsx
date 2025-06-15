
import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminLayout: React.FC = () => {
  const { user, loading, isAdmin } = useAuth();
  const { isRTL } = useLanguage();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // If still checking authentication status
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-400 mx-auto mb-4"></div>
        <div className="text-xl font-semibold text-gray-600 dark:text-gray-300 animate-pulse">Loading...</div>
      </div>
    </div>;
  }

  // If user is not logged in or not an admin, redirect to login
  if (!loading && (!user || !isAdmin)) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <div className={`flex h-screen overflow-hidden bg-gray-50 dark:bg-navy-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader openSidebar={() => setSidebarOpen(true)} />
        
        <motion.main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
