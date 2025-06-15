
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";

interface Booking {
  id: string;
  hotels?: { name: string; city: string };
  packages?: { name: string; city: string };
  created_at: string;
  total_price: string | number;
  status: string;
  payment_status: string;
}

interface RecentBookingsCardProps {
  recentBookings: Booking[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
}

const RecentBookingsCard: React.FC<RecentBookingsCardProps> = ({
  recentBookings,
  formatCurrency,
  formatDate,
}) => {
  return (
    <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
      <CardHeader className="!bg-gradient-to-br from-saudi-green-500 to-saudi-green-700 rounded-t-[20px] text-white">
        <CardTitle className="text-xl font-bold text-white">Recent Bookings</CardTitle>
        <CardDescription className="text-white/80">Your latest booking history</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {recentBookings.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-navy-700 rounded-xl">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No bookings yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start exploring amazing destinations!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <motion.div 
                key={booking.id} 
                className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saudi-green-500 to-saudi-green-700 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {booking.hotels?.name || booking.packages?.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {booking.hotels?.city || booking.packages?.city}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Booked on {formatDate(booking.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-gray-900 dark:text-white">{formatCurrency(Number(booking.total_price))}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                    <Badge variant={booking.payment_status === 'paid' ? 'default' : 'destructive'}>
                      {booking.payment_status}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentBookingsCard;
