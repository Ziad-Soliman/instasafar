
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";

// Layout components
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProviderLayout from "@/layouts/ProviderLayout";

// Main pages
import Index from "@/pages/Index";
import SearchPage from "@/pages/SearchPage";
import PackagesPage from "@/pages/PackagesPage";
import PackageDetailPage from "@/pages/PackageDetailPage";
import HotelDetailPage from "@/pages/HotelDetailPage";
import FlightSearchPage from "@/pages/FlightSearchPage";
import TransportSearchPage from "@/pages/TransportSearchPage";
import BookingConfirmPage from "@/pages/BookingConfirmPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";
import NotFound from "@/pages/NotFound";

// Auth pages
import AuthPage from "@/pages/auth/AuthPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProviderRegisterPage from "@/pages/auth/ProviderRegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import AuthCallbackPage from "@/pages/auth/AuthCallbackPage";

// Account pages
import DashboardPage from "@/pages/account/DashboardPage";
import ProfilePage from "@/pages/account/ProfilePage";
import BookingsPage from "@/pages/account/BookingsPage";
import WishlistPage from "@/pages/account/WishlistPage";

// Admin pages
import AdminDashboard from "@/pages/admin/DashboardPage";
import AdminUsers from "@/pages/admin/UsersPage";
import AdminHotels from "@/pages/admin/HotelsPage";
import AdminPackages from "@/pages/admin/PackagesPage";
import AdminFlights from "@/pages/admin/FlightsPage";
import AdminTransport from "@/pages/admin/TransportPage";
import AdminBookings from "@/pages/admin/BookingsPage";
import AdminProviders from "@/pages/admin/ProvidersPage";
import AdminReviews from "@/pages/admin/ReviewsPage";
import AdminExternalListings from "@/pages/admin/ExternalListingsPage";

// Provider pages
import ProviderDashboard from "@/pages/provider/DashboardPage";
import ProviderBookings from "@/pages/provider/BookingsPage";
import ProviderListings from "@/pages/provider/ListingsPage";
import ProviderProfile from "@/pages/provider/ProfilePage";
import ProviderBookingDetail from "@/pages/provider/BookingDetailPage";

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
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="packages" element={<PackagesPage />} />
                <Route path="packages/:id" element={<PackageDetailPage />} />
                <Route path="hotels/:id" element={<HotelDetailPage />} />
                <Route path="flights" element={<FlightSearchPage />} />
                <Route path="transport" element={<TransportSearchPage />} />
                <Route path="booking/confirm" element={<BookingConfirmPage />} />
                <Route path="booking/success" element={<BookingSuccessPage />} />
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

              {/* Account routes */}
              <Route path="/account" element={<MainLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="bookings" element={<BookingsPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="hotels" element={<AdminHotels />} />
                <Route path="packages" element={<AdminPackages />} />
                <Route path="flights" element={<AdminFlights />} />
                <Route path="transport" element={<AdminTransport />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="providers" element={<AdminProviders />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="external-listings" element={<AdminExternalListings />} />
              </Route>

              {/* Provider routes */}
              <Route path="/provider" element={<ProviderLayout />}>
                <Route index element={<ProviderDashboard />} />
                <Route path="dashboard" element={<ProviderDashboard />} />
                <Route path="bookings" element={<ProviderBookings />} />
                <Route path="bookings/:id" element={<ProviderBookingDetail />} />
                <Route path="listings" element={<ProviderListings />} />
                <Route path="profile" element={<ProviderProfile />} />
              </Route>

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
