
import React from "react";
import { motion } from "framer-motion";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomerStatsCards from "@/components/customer/dashboard/CustomerStatsCards";
import UpcomingTripsCard from "@/components/customer/dashboard/UpcomingTripsCard";
import RecentBookingsCard from "@/components/customer/dashboard/RecentBookingsCard";

const CustomerDashboard: React.FC = () => {
  const { stats, recentBookings, upcomingBookings, loading, formatCurrency, formatDate } = useCustomerDashboard();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-400 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-8"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-2">Customer Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Welcome back! Here's your travel overview</p>
        </div>
        
        <CustomerStatsCards stats={stats} formatCurrency={formatCurrency} />
        
        <UpcomingTripsCard 
          upcomingBookings={upcomingBookings}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        <RecentBookingsCard 
          recentBookings={recentBookings}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
