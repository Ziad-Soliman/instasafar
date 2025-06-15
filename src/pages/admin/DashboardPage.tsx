
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import AdminStatsCards from "@/components/admin/dashboard/AdminStatsCards";
import AdminRecentBookings from "@/components/admin/dashboard/AdminRecentBookings";
import AdminChartsSection from "@/components/admin/dashboard/AdminChartsSection";
import AdminOverviewTab from "@/components/admin/dashboard/AdminOverviewTab";
import AdminRevenueChart from "@/components/admin/dashboard/AdminRevenueChart";

const AdminDashboard: React.FC = () => {
  const { stats, recentBookings, monthlyData, loading, formatCurrency, formatDate } = useAdminDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
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
        className="p-6"
      >
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Welcome back, Admin. Here's what's happening today.</p>
          </div>
        </div>
        
        <AdminStatsCards stats={stats} formatCurrency={formatCurrency} />
        
        <AdminChartsSection stats={stats} monthlyData={monthlyData} />
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="!bg-white dark:!bg-navy-800 border border-gray-200 dark:border-navy-600 rounded-xl p-1 shadow-sm">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:!bg-brand-400 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-lg data-[state=active]:!bg-brand-400 data-[state=active]:text-white">Revenue</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-lg data-[state=active]:!bg-brand-400 data-[state=active]:text-white">Recent Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <AdminOverviewTab stats={stats} />
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-0">
            <AdminRevenueChart monthlyData={monthlyData} formatCurrency={formatCurrency} />
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-0">
            <AdminRecentBookings 
              bookings={recentBookings}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
