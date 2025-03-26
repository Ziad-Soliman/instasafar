
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import HomePage from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingPage from "./pages/LoadingPage";

// Lazy-loaded pages for better performance
const SearchPage = lazy(() => import("./pages/SearchPage"));
const HotelDetailPage = lazy(() => import("./pages/HotelDetailPage"));
const PackageDetailPage = lazy(() => import("./pages/PackageDetailPage"));
const BookingConfirmPage = lazy(() => import("./pages/BookingConfirmPage"));
const BookingSuccessPage = lazy(() => import("./pages/BookingSuccessPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/account/ProfilePage"));
const BookingsPage = lazy(() => import("./pages/account/BookingsPage"));
const AdminDashboard = lazy(() => import("./pages/admin/DashboardPage"));
const AdminHotels = lazy(() => import("./pages/admin/HotelsPage"));
const AdminPackages = lazy(() => import("./pages/admin/PackagesPage"));
const AdminExternalListings = lazy(() => import("./pages/admin/ExternalListingsPage"));
const AdminBookings = lazy(() => import("./pages/admin/BookingsPage"));
const AdminUsers = lazy(() => import("./pages/admin/UsersPage"));
const AdminReviews = lazy(() => import("./pages/admin/ReviewsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Route change observer for page transitions
const RouteChangeObserver = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteChangeObserver />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              {/* Main Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
                <Route path="/packages/:packageId" element={<PackageDetailPage />} />
                <Route path="/booking/confirm" element={<BookingConfirmPage />} />
                <Route path="/booking/success" element={<BookingSuccessPage />} />
              </Route>

              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
              </Route>

              {/* Account Routes - Protected */}
              <Route element={<MainLayout requireAuth />}>
                <Route path="/account/profile" element={<ProfilePage />} />
                <Route path="/account/bookings" element={<BookingsPage />} />
              </Route>

              {/* Admin Routes - Protected */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/hotels" element={<AdminHotels />} />
                <Route path="/admin/packages" element={<AdminPackages />} />
                <Route path="/admin/external-listings" element={<AdminExternalListings />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/reviews" element={<AdminReviews />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
