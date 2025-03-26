
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center"
      >
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="relative flex items-center justify-center h-full text-primary font-bold text-4xl">
            404
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Link>
          </Button>
          
          <Button asChild>
            <Link to="/" className="flex items-center">
              <Home size={16} className="mr-2" />
              Home Page
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
