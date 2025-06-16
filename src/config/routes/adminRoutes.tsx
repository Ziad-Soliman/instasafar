
import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
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

const AdminRoutes = () => (
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
);

export default AdminRoutes;
