
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import AdminStatsCards from "@/components/admin/dashboard/AdminStatsCards";
import AdminRecentBookings from "@/components/admin/dashboard/AdminRecentBookings";

const AdminDashboard: React.FC = () => {
  const { stats, recentBookings, monthlyData, loading, formatCurrency, formatDate } = useAdminDashboard();

  const pieColors = ['#422AFB', '#7551FF'];
  
  const bookingsPieData = [
    { name: 'Paid Bookings', value: stats?.total_bookings ? stats.total_bookings - stats.pending_bookings : 0 },
    { name: 'Pending Bookings', value: stats?.pending_bookings || 0 },
  ];

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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 !bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
            <CardHeader className="!bg-gradient-to-br from-brand-400 to-brand-400 rounded-t-[20px] text-white">
              <CardTitle className="text-xl font-bold text-white">Monthly Bookings</CardTitle>
              <CardDescription className="text-white/80">Booking trends over time</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="adminBookingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#422AFB" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#422AFB" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)'
                      }}
                    />
                    <Bar 
                      dataKey="bookings" 
                      fill="url(#adminBookingsGradient)" 
                      radius={[8, 8, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
            <CardHeader className="!bg-gradient-to-br from-brand-400 to-brand-400 rounded-t-[20px] text-white">
              <CardTitle className="text-xl font-bold text-white">Booking Status</CardTitle>
              <CardDescription className="text-white/80">Distribution overview</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="paidGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#422AFB" />
                        <stop offset="100%" stopColor="#422AFB" />
                      </linearGradient>
                      <linearGradient id="pendingGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7551FF" />
                        <stop offset="100%" stopColor="#7551FF" />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={bookingsPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="url(#paidGradient)" />
                      <Cell fill="url(#pendingGradient)" />
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="!bg-white dark:!bg-navy-800 border border-gray-200 dark:border-navy-600 rounded-xl p-1 shadow-sm">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:!bg-brand-400 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-lg data-[state=active]:!bg-brand-400 data-[state=active]:text-white">Revenue</TabsTrigger>
            <TabsTrigger value="bookings" className="rounded-lg data-[state=active]:!bg-brand-400 data-[state=active]:text-white">Recent Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 !bg-gradient-to-br from-orange-400 to-orange-600 rounded-[20px] text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">{stats?.total_hotels || 0}</h3>
                    <p className="font-medium">Active Hotels</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 !bg-gradient-to-br from-green-400 to-green-600 rounded-[20px] text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">{stats?.total_packages || 0}</h3>
                    <p className="font-medium">Active Packages</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 !bg-gradient-to-br from-blue-400 to-blue-600 rounded-[20px] text-white">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">{stats?.total_users || 0}</h3>
                    <p className="font-medium">Registered Users</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-0">
            <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
              <CardHeader className="!bg-gradient-to-br from-green-400 to-green-600 rounded-t-[20px] text-white">
                <CardTitle className="text-xl font-bold text-white">Revenue Trends</CardTitle>
                <CardDescription className="text-white/80">Monthly performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="100%" stopColor="#10B981" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value as number), "Revenue"]} 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '16px',
                          boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10B981" 
                        strokeWidth={4}
                        dot={{ fill: '#10B981', strokeWidth: 3, r: 6 }}
                        activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2, fill: '#ffffff' }}
                        fill="url(#revenueAreaGradient)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
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
