
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
      <CardHeader className="border-b border-gray-200 dark:border-navy-600 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-navy-700 dark:text-white">Recent Bookings</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track your latest customer bookings</p>
          </div>
          <Button variant="outline" size="sm" className="border-gray-300 dark:border-navy-600">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-navy-700 rounded-2xl">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No recent bookings</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">New bookings will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking, index) => (
              <motion.div 
                key={booking.id} 
                className="flex items-center justify-between p-5 bg-gray-50 dark:bg-navy-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-navy-600 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-navy-700 dark:text-white text-lg">
                      {booking.hotels?.name || booking.packages?.name || 'Unknown Booking'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Customer: <span className="font-medium">{booking.profiles?.full_name || 'Unknown'}</span>
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {booking.adults} adults, {booking.children} children
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-navy-700 dark:text-white mb-2">
                    {formatCurrency(Number(booking.total_price))}
                  </p>
                  <div className="flex gap-2 justify-end mb-2">
                    <Badge 
                      variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                      className={booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 border-0' 
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0'
                      }
                    >
                      {booking.status}
                    </Badge>
                    <Badge 
                      variant={booking.payment_status === 'paid' ? 'default' : 'destructive'}
                      className={booking.payment_status === 'paid' 
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-0' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200 border-0'
                      }
                    >
                      {booking.payment_status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
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
