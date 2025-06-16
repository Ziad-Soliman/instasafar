
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/account/DashboardPage";
import ProfilePage from "@/pages/account/ProfilePage";
import BookingsPage from "@/pages/account/BookingsPage";
import WishlistPage from "@/pages/account/WishlistPage";

const AccountRoutes = () => (
  <Route path="/account" element={<MainLayout />}>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="bookings" element={<BookingsPage />} />
    <Route path="wishlist" element={<WishlistPage />} />
  </Route>
);

export default AccountRoutes;
