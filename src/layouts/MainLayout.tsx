
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { TravelAssistantChat } from "@/components/TravelAssistantChat";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface MainLayoutProps {
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ requireAuth = false }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Only check authentication after loading is complete
    if (!isLoading && requireAuth && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      
      navigate("/auth/login", { 
        state: { from: window.location } 
      });
    }
  }, [user, isLoading, requireAuth, navigate, toast]);

  // If still loading and this is a protected route, don't render yet
  if (isLoading && requireAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <TravelAssistantChat />
    </div>
  );
};

export default MainLayout;
