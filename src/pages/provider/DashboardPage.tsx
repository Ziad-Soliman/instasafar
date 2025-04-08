
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useProviderDashboard } from "@/hooks/useProviderDashboard";
import StatsCards from "@/components/provider/dashboard/StatsCards";
import AnalyticsCharts from "@/components/provider/dashboard/AnalyticsCharts";
import RecentBookingsTable from "@/components/provider/dashboard/RecentBookingsTable";
import { useRtlHelpers } from "@/utils/rtl-helpers";

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const { getDirectionalClasses } = useRtlHelpers();
  const {
    recentBookings,
    stats,
    loading,
    bookingFilter,
    setBookingFilter,
    monthlyData,
    formatCurrency,
    formatDate
  } = useProviderDashboard();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate("/provider/listings")}>
          Manage Listings 
          <ArrowRight className={cn("h-4 w-4", isRTL ? "mr-2 rotate-180" : "ml-2")} />
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-muted-foreground animate-pulse">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <StatsCards 
            stats={stats} 
            formatCurrency={formatCurrency} 
          />

          <AnalyticsCharts 
            monthlyData={monthlyData} 
            formatCurrency={formatCurrency} 
          />

          <RecentBookingsTable 
            bookings={recentBookings}
            bookingFilter={bookingFilter}
            setBookingFilter={setBookingFilter}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        </>
      )}
    </div>
  );
};

export default ProviderDashboard;
