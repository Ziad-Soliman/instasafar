
import React from "react";
import { motion } from "framer-motion";
import AdminBookingManagement from "@/components/admin/AdminBookingManagement";

const AdminBookingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy-700 dark:text-white mb-2">
            Booking Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage all customer bookings and reservations from one place
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 rounded-[20px] shadow-xl shadow-shadow-500 dark:shadow-none border-0">
          <AdminBookingManagement />
        </div>
      </motion.div>
    </div>
  );
};

export default AdminBookingsPage;
