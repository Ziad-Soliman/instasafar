
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

interface MainLayoutProps {
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ requireAuth = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If this route requires authentication and there's no user, redirect to login
  if (requireAuth && !loading && !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If still checking authentication status and this is a protected route
  if (requireAuth && loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-primary">Loading...</div>
    </div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;
