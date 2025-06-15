
import React from "react";
import { motion } from "framer-motion";
import AdminBookingManagement from "@/components/admin/AdminBookingManagement";

const AdminBookingsPage: React.FC = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground">Manage all customer bookings and reservations</p>
        </div>
        
        <AdminBookingManagement />
      </motion.div>
    </div>
  );
};

export default AdminBookingsPage;
