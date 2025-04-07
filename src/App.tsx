import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Header from "@/components/Header";

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
const ProviderRegisterPage = lazy(() => import("./pages/auth/ProviderRegisterPage"));
const ProfilePage = lazy(() => import("./pages/account/ProfilePage"));
const BookingsPage = lazy(() => import("./pages/account/BookingsPage"));
const WishlistPage = lazy(() => import("./pages/account/WishlistPage"));
const AdminDashboard = lazy(() => import("./pages/admin/DashboardPage"));
const AdminHotels = lazy(() => import("./pages/admin/HotelsPage"));
const AdminPackages = lazy(() => import("./pages/admin/PackagesPage"));
const AdminExternalListings = lazy(() => import("./pages/admin/ExternalListingsPage"));
const AdminBookings = lazy(() => import("./pages/admin/BookingsPage"));
const AdminUsers = lazy(() => import("./pages/admin/UsersPage"));
const AdminReviews = lazy(() => import("./pages/admin/ReviewsPage"));
const AdminProviders = lazy(() => import("./pages/admin/ProvidersPage"));

// Provider Dashboard Pages
const ProviderLayout = lazy(() => import("./layouts/ProviderLayout"));
const ProviderDashboard = lazy(() => import("./pages/provider/DashboardPage"));
const ProviderListings = lazy(() => import("./pages/provider/ListingsPage"));
const ProviderBookings = lazy(() => import("./pages/provider/BookingsPage"));
const ProviderProfile = lazy(() => import("./pages/provider/ProfilePage"));
const BookingDetailPage = lazy(() => import("./pages/provider/BookingDetailPage"));

// Import the new pages
const FlightSearchPage = lazy(() => import("./pages/FlightSearchPage"));
const TransportSearchPage = lazy(() => import("./pages/TransportSearchPage"));
const PackagesPage = lazy(() => import("./pages/PackagesPage"));

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
    <AuthProvider>
      <LanguageProvider>
        <WishlistProvider>
          <NotificationProvider>
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
                        <Route path="/flights" element={<FlightSearchPage />} />
                        <Route path="/transport" element={<TransportSearchPage />} />
                        <Route path="/packages" element={<PackagesPage />} />
                        <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
                        <Route path="/packages/:packageId" element={<PackageDetailPage />} />
                        <Route path="/booking/confirm" element={<BookingConfirmPage />} />
                        <Route path="/booking/success" element={<BookingSuccessPage />} />
                      </Route>

                      {/* Auth Routes */}
                      <Route element={<AuthLayout />}>
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/register" element={<RegisterPage />} />
                        <Route path="/auth/register-provider" element={<ProviderRegisterPage />} />
                        <Route path="/auth/reset-password" element={<LoginPage />} /> {/* Placeholder */}
                      </Route>

                      {/* Account Routes - Protected */}
                      <Route element={<MainLayout requireAuth />}>
                        <Route path="/account/profile" element={<ProfilePage />} />
                        <Route path="/account/bookings" element={<BookingsPage />} />
                        <Route path="/account/wishlist" element={<WishlistPage />} />
                      </Route>

                      {/* Admin Routes - Protected */}
                      <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/hotels" element={<AdminHotels />} />
                        <Route path="/admin/packages" element={<AdminPackages />} />
                        <Route path="/admin/external-listings" element={<AdminExternalListings />} />
                        <Route path="/admin/bookings" element={<AdminBookings />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/providers" element={<AdminProviders />} />
                        <Route path="/admin/reviews" element={<AdminReviews />} />
                      </Route>

                      {/* Provider Routes - Protected */}
                      <Route element={<ProviderLayout />}>
                        <Route path="/provider" element={<ProviderDashboard />} />
                        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                        <Route path="/provider/listings" element={<ProviderListings />} />
                        <Route path="/provider/bookings" element={<ProviderBookings />} />
                        <Route path="/provider/bookings/:bookingId" element={<BookingDetailPage />} />
                        <Route path="/provider/profile" element={<ProviderProfile />} />
                      </Route>

                      {/* Language-specific routes (for future) */}
                      <Route path="/:lang">
                        {/* Main Routes with language prefix */}
                        <Route element={<MainLayout />}>
                          <Route index element={<HomePage />} />
                          <Route path="search" element={<SearchPage />} />
                          <Route path="flights" element={<FlightSearchPage />} />
                          <Route path="transport" element={<TransportSearchPage />} />
                          <Route path="packages" element={<PackagesPage />} />
                          <Route path="hotels/:hotelId" element={<HotelDetailPage />} />
                          <Route path="packages/:packageId" element={<PackageDetailPage />} />
                          <Route path="booking/confirm" element={<BookingConfirmPage />} />
                          <Route path="booking/success" element={<BookingSuccessPage />} />
                        </Route>

                        {/* Auth Routes with language prefix */}
                        <Route path="auth" element={<AuthLayout />}>
                          <Route path="login" element={<LoginPage />} />
                          <Route path="register" element={<RegisterPage />} />
                          <Route path="register-provider" element={<ProviderRegisterPage />} />
                          <Route path="reset-password" element={<LoginPage />} /> {/* Placeholder */}
                        </Route>

                        {/* Account Routes with language prefix - Protected */}
                        <Route path="account" element={<MainLayout requireAuth />}>
                          <Route path="profile" element={<ProfilePage />} />
                          <Route path="bookings" element={<BookingsPage />} />
                          <Route path="wishlist" element={<WishlistPage />} />
                        </Route>

                        {/* Admin Routes with language prefix - Protected */}
                        <Route path="admin" element={<AdminLayout />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="dashboard" element={<AdminDashboard />} />
                          <Route path="hotels" element={<AdminHotels />} />
                          <Route path="packages" element={<AdminPackages />} />
                          <Route path="external-listings" element={<AdminExternalListings />} />
                          <Route path="bookings" element={<AdminBookings />} />
                          <Route path="users" element={<AdminUsers />} />
                          <Route path="providers" element={<AdminProviders />} />
                          <Route path="reviews" element={<AdminReviews />} />
                        </Route>

                        {/* Provider Routes with language prefix - Protected */}
                        <Route path="provider" element={<ProviderLayout />}>
                          <Route index element={<ProviderDashboard />} />
                          <Route path="dashboard" element={<ProviderDashboard />} />
                          <Route path="listings" element={<ProviderListings />} />
                          <Route path="bookings" element={<ProviderBookings />} />
                          <Route path="bookings/:bookingId" element={<BookingDetailPage />} />
                          <Route path="profile" element={<ProviderProfile />} />
                        </Route>
                      </Route>

                      {/* 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </AnimatePresence>
              </BrowserRouter>
            </TooltipProvider>
          </NotificationProvider>
        </WishlistProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
