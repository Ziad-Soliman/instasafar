import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RtlContainer from '@/components/layout/RtlContainer';

// Pages
import HomePage from '@/pages/Index';
import HotelsPage from '@/pages/HotelsPage';
import PackagesPage from '@/pages/PackagesPage';
import FlightsPage from '@/pages/FlightsPage';
import TransportPage from '@/pages/TransportPage';
import AuthPage from '@/pages/auth/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import BookingsPage from '@/pages/BookingsPage';
import WishlistPage from '@/pages/WishlistPage';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminHotels from '@/pages/admin/AdminHotels';
import AdminPackages from '@/pages/admin/AdminPackages';
import AdminBookings from '@/pages/admin/AdminBookings';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminReviews from '@/pages/admin/AdminReviews';

// Provider Pages
import ProviderDashboard from '@/pages/provider/ProviderDashboard';
import ProviderHotels from '@/pages/provider/ProviderHotels';
import ProviderPackages from '@/pages/provider/ProviderPackages';
import ProviderBookings from '@/pages/provider/ProviderBookings';

function App() {
  const { isRTL } = useLanguage();

  return (
    <RtlContainer className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/hotels" element={<AdminHotels />} />
            <Route path="/admin/packages" element={<AdminPackages />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            
            {/* Provider Routes */}
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/hotels" element={<ProviderHotels />} />
            <Route path="/provider/packages" element={<ProviderPackages />} />
            <Route path="/provider/bookings" element={<ProviderBookings />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
      
      <Toaster />
    </RtlContainer>
  );
}

export default App;
