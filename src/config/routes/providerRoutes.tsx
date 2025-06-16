
import { Routes, Route } from "react-router-dom";
import ProviderLayout from "@/layouts/ProviderLayout";
import ProviderDashboard from "@/pages/provider/DashboardPage";
import ProviderBookings from "@/pages/provider/BookingsPage";
import ProviderListings from "@/pages/provider/ListingsPage";
import ProviderProfile from "@/pages/provider/ProfilePage";
import ProviderBookingDetail from "@/pages/provider/BookingDetailPage";

const ProviderRoutes = () => (
  <Route path="/provider" element={<ProviderLayout />}>
    <Route index element={<ProviderDashboard />} />
    <Route path="dashboard" element={<ProviderDashboard />} />
    <Route path="bookings" element={<ProviderBookings />} />
    <Route path="bookings/:id" element={<ProviderBookingDetail />} />
    <Route path="listings" element={<ProviderListings />} />
    <Route path="profile" element={<ProviderProfile />} />
  </Route>
);

export default ProviderRoutes;
