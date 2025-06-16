
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AuthLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const { t, isRTL } = useLanguage();

  // If user is already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'} bg-background text-foreground`}>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="flex-grow">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
