
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import SearchPage from "@/pages/SearchPage";
import PackagesPage from "@/pages/PackagesPage";
import PackageDetailPage from "@/pages/PackageDetailPage";
import HotelDetailPage from "@/pages/HotelDetailPage";
import FlightSearchPage from "@/pages/FlightSearchPage";
import TransportSearchPage from "@/pages/TransportSearchPage";
import BookingConfirmPage from "@/pages/BookingConfirmPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";

const PublicRoutes = () => (
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
);

export default PublicRoutes;
