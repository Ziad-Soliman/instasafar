
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const { user, loading } = useAuth();

  // If user is already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left side - Image */}
        <div className="hidden md:block md:w-1/2 bg-primary">
          <div className="h-full flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Link to="/" className="block mb-8">
                <img 
                  src="/logo-white.png" 
                  alt="InstaSafar" 
                  className="h-10"
                  onError={(e) => {
                    // Fallback if logo image doesn't exist yet
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMCAyNUgxODBNOTAgMTVIOTVNOTAgMzVIOTUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIvPjx0ZXh0IHg9IjQwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSI+SW5zdGFTYWZhcjwvdGV4dD48L3N2Zz4=";
                  }}
                />
              </Link>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-4">Hajj & Umrah Journey</h1>
                <p className="text-white/80">Begin your spiritual journey with us.</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Right side - Auth form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:hidden mb-8 text-center">
              <Link to="/" className="inline-block">
                <img 
                  src="/logo.png" 
                  alt="InstaSafar" 
                  className="h-10 mx-auto mb-4"
                  onError={(e) => {
                    // Fallback if logo image doesn't exist yet
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMCAyNUgxODBNOTAgMTVIOTVNOTAgMzVIOTUiIHN0cm9rZT0iIzAwOTliZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHRleHQgeD0iNDAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMwMDk5YmYiPkluc3RhU2FmYXI8L3RleHQ+PC9zdmc+";
                  }}
                />
              </Link>
            </div>
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
