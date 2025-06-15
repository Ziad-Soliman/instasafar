
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 space-y-8"
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Welcome back! Here's your travel overview</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Total Bookings</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.total_bookings || 0}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">+12%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/50 dark:bg-black/20">
                  <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Upcoming Trips</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.upcoming_bookings || 0}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">+5%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/50 dark:bg-black/20">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Total Spent</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(Number(stats?.total_spent || 0))}</h3>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">+18%</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/50 dark:bg-black/20">
                  <CreditCard className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Favorite City</p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stats?.favorite_city || 'N/A'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Most visited</p>
                </div>
                <div className="p-3 rounded-xl bg-white/50 dark:bg-black/20">
                  <MapPin className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Trips</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Your confirmed upcoming bookings</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
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
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Bookings</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">Your latest booking history</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {recentBookings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
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
