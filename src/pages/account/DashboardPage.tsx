
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, CreditCard, TrendingUp, Clock } from "lucide-react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { useLanguage } from "@/contexts/LanguageContext";

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
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 !bg-gradient-to-br from-blue-400 to-blue-600 rounded-[20px] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">Total Bookings</p>
                  <h3 className="text-3xl font-bold text-white">{stats?.total_bookings || 0}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
                    <span className="text-sm text-green-200 font-medium">+12%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/20">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 !bg-gradient-to-br from-green-400 to-green-600 rounded-[20px] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">Upcoming Trips</p>
                  <h3 className="text-3xl font-bold text-white">{stats?.upcoming_bookings || 0}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
                    <span className="text-sm text-green-200 font-medium">+5%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/20">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 !bg-gradient-to-br from-purple-400 to-purple-600 rounded-[20px] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">Total Spent</p>
                  <h3 className="text-2xl font-bold text-white">{formatCurrency(Number(stats?.total_spent || 0))}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
                    <span className="text-sm text-green-200 font-medium">+18%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/20">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6 !bg-gradient-to-br from-orange-400 to-orange-600 rounded-[20px] text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-1">Favorite City</p>
                  <h3 className="text-lg font-bold text-white">{stats?.favorite_city || 'N/A'}</h3>
                  <p className="text-sm text-white/70 mt-1">Most visited</p>
                </div>
                <div className="p-3 rounded-xl bg-white/20">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] mb-6">
          <CardHeader className="!bg-gradient-to-br from-brand-400 to-brand-600 rounded-t-[20px] text-white">
            <CardTitle className="text-xl font-bold text-white">Upcoming Trips</CardTitle>
            <CardDescription className="text-white/80">Your confirmed upcoming bookings</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-navy-700 rounded-xl">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No upcoming trips</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Book your next adventure!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <motion.div 
                    key={booking.id} 
                    className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-300"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                          {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-gray-900 dark:text-white">{formatCurrency(Number(booking.total_price))}</p>
                      <Badge variant="secondary" className="mt-1">{booking.status}</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
          <CardHeader className="!bg-gradient-to-br from-green-400 to-green-600 rounded-t-[20px] text-white">
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
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
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
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
