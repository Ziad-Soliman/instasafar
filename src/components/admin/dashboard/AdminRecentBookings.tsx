
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  user_id: string;
  hotel_id?: string;
  package_id?: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
  hotels?: { name: string };
  packages?: { name: string };
  profiles?: { full_name: string };
}

interface AdminRecentBookingsProps {
  bookings: Booking[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const AdminRecentBookings: React.FC<AdminRecentBookingsProps> = ({ 
  bookings, 
  formatCurrency, 
  formatDate 
}) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No recent bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div 
                key={booking.id} 
                className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {booking.hotels?.name || booking.packages?.name || 'Unknown'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Customer: {booking.profiles?.full_name || 'Unknown'}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      {booking.adults} adults, {booking.children} children
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-gray-900 dark:text-white">{formatCurrency(Number(booking.total_price))}</p>
                  <div className="flex gap-2 mt-2 justify-end">
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                    <Badge variant={booking.payment_status === 'paid' ? 'default' : 'destructive'}>
                      {booking.payment_status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {formatDate(booking.created_at)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminRecentBookings;
