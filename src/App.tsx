
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "@/pages/NotFound";

// Route configurations
import PublicRoutes from "@/config/routes/publicRoutes";
import AuthRoutes from "@/config/routes/authRoutes";
import AdminRoutes from "@/config/routes/adminRoutes";
import AccountRoutes from "@/config/routes/accountRoutes";
import ProviderRoutes from "@/config/routes/providerRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <NotificationProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <Routes>
              {/* Public routes */}
              <PublicRoutes />

              {/* Auth routes */}
              <AuthRoutes />

              {/* Account routes */}
              <AccountRoutes />

              {/* Admin routes */}
              <AdminRoutes />

              {/* Provider routes */}
              <ProviderRoutes />

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </WishlistProvider>
      </NotificationProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
