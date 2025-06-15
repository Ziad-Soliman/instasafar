
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
  const { t, isRTL } = useLanguage();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t("dashboard.title", "Dashboard")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage your business and track performance
            </p>
          </div>
          <Button 
            onClick={() => navigate("/provider/listings")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t("dashboard.manageListings", "Manage Listings")}
            <ArrowRight className={cn("h-4 w-4", isRTL ? "mr-2 rotate-180" : "ml-2")} />
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
                {t("dashboard.loadingData", "Loading dashboard data...")}
              </p>
            </div>
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
      </motion.div>
    </div>
  );
};

export default ProviderDashboard;
