import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProviderLayout from "@/layouts/ProviderLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingPage from "@/pages/LoadingPage";

// Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const HotelDetailPage = lazy(() => import("@/pages/HotelDetailPage"));
const PackagesPage = lazy(() => import("@/pages/PackagesPage"));
const PackageDetailPage = lazy(() => import("@/pages/PackageDetailPage"));
const FlightSearchPage = lazy(() => import("@/pages/FlightSearchPage"));
const TransportSearchPage = lazy(() => import("@/pages/TransportSearchPage"));
const BookingConfirmPage = lazy(() => import("@/pages/BookingConfirmPage"));
const BookingSuccessPage = lazy(() => import("@/pages/BookingSuccessPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Auth pages
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ProviderRegisterPage = lazy(() => import("@/pages/auth/ProviderRegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const UpdatePasswordPage = lazy(() => import("@/pages/auth/UpdatePasswordPage"));
const AuthCallbackPage = lazy(() => import("@/pages/auth/AuthCallbackPage"));

// Account pages
const ProfilePage = lazy(() => import("@/pages/account/ProfilePage"));
const BookingsPage = lazy(() => import("@/pages/account/BookingsPage"));
const WishlistPage = lazy(() => import("@/pages/account/WishlistPage"));
const CustomerDashboard = lazy(() => import("@/pages/account/DashboardPage"));

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/DashboardPage"));
const AdminHotels = lazy(() => import("@/pages/admin/HotelsPage"));
const AdminPackages = lazy(() => import("@/pages/admin/PackagesPage"));
const AdminBookings = lazy(() => import("@/pages/admin/BookingsPage"));
const AdminUsers = lazy(() => import("@/pages/admin/UsersPage"));
const AdminProviders = lazy(() => import("@/pages/admin/ProvidersPage"));
const AdminReviews = lazy(() => import("@/pages/admin/ReviewsPage"));
const AdminExternalListings = lazy(() => import("@/pages/admin/ExternalListingsPage"));

// Provider pages
const ProviderDashboard = lazy(() => import("@/pages/provider/DashboardPage"));
const ProviderListings = lazy(() => import("@/pages/provider/ListingsPage"));
const ProviderBookings = lazy(() => import("@/pages/provider/BookingsPage"));
const ProviderBookingDetail = lazy(() => import("@/pages/provider/BookingDetailPage"));
const ProviderProfile = lazy(() => import("@/pages/provider/ProfilePage"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WishlistProvider>
            <NotificationProvider>
              <ScrollToTop />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Index />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="hotel/:id" element={<Navigate to="/search" replace />} />
                    <Route path="packages" element={<PackagesPage />} />
                    <Route path="package/:id" element={<PackageDetailPage />} />
                    <Route path="flights" element={<FlightSearchPage />} />
                    <Route path="transport" element={<TransportSearchPage />} />
                    <Route path="booking/confirm" element={<BookingConfirmPage />} />
                    <Route path="booking/success" element={<BookingSuccessPage />} />
                    
                    {/* Account routes */}
                    <Route path="account/dashboard" element={<CustomerDashboard />} />
                    <Route path="account/profile" element={<ProfilePage />} />
                    <Route path="account/bookings" element={<BookingsPage />} />
                    <Route path="account/wishlist" element={<WishlistPage />} />
                  </Route>

                  {/* Auth routes */}
                  <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<AuthPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="provider-register" element={<ProviderRegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="update-password" element={<UpdatePasswordPage />} />
                    <Route path="callback" element={<AuthCallbackPage />} />
                  </Route>

                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="hotels" element={<AdminHotels />} />
                    <Route path="packages" element={<AdminPackages />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="providers" element={<AdminProviders />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="external-listings" element={<AdminExternalListings />} />
                  </Route>

                  {/* Provider routes */}
                  <Route path="/provider" element={<ProviderLayout />}>
                    <Route index element={<ProviderDashboard />} />
                    <Route path="listings" element={<ProviderListings />} />
                    <Route path="bookings" element={<ProviderBookings />} />
                    <Route path="booking/:id" element={<ProviderBookingDetail />} />
                    <Route path="profile" element={<ProviderProfile />} />
                  </Route>

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
              <Sonner />
            </NotificationProvider>
          </WishlistProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
