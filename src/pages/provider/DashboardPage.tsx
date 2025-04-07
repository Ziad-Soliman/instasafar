
// Import React and any necessary components or libraries needed for the Dashboard page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Hotel, Users, Building, Calendar, DollarSign, BookOpen, AreaChart, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define types for our booking data
interface BookingData {
  id: string;
  booking_type: string;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
  check_in_date?: string | null;
  check_out_date?: string | null;
  adults: number;
  children: number;
  hotel?: {
    name: string;
    city: string;
  } | null;
  package?: {
    name: string;
    city: string;
  } | null;
  user?: {
    id: string;
    full_name?: string | null;
    email?: string | null;
  } | null;
  user_id?: string;
}

interface ProviderStats {
  total_bookings: number;
  pending_bookings: number;
  total_revenue: number;
  active_listings: number;
}

// Monthly analytics data
interface MonthlyData {
  name: string;
  bookings: number;
  revenue: number;
}

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    activeListings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  
  // Function to format currency based on locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(
      language === 'ar' ? 'ar-SA' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  // Subscribe to real-time booking notifications
  const subscribeToBookings = () => {
    if (!user?.id) return;
    
    const channel = supabase
      .channel('booking-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
          filter: `provider_id=eq.${user.id}`,
        },
        (payload) => {
          // Show notification for new booking
          toast({
            title: "New booking received",
            description: `A new ${payload.new.booking_type} booking has been made`,
            variant: "default",
          });
          // Refresh data
          fetchData();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  };

  // Generate mock monthly data
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Create data for the last 6 months
    const data: MonthlyData[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      // Base the mock data somewhat on the actual total stats
      const multiplier = (5 - i) / 5; // Higher values for more recent months
      data.push({
        name: months[monthIndex],
        bookings: Math.round((stats.totalBookings / 6) * multiplier * (0.8 + Math.random() * 0.4)),
        revenue: Math.round((stats.totalRevenue / 6) * multiplier * (0.7 + Math.random() * 0.6)),
      });
    }
    
    setMonthlyData(data);
  };

  // Fetch recent bookings and dashboard stats
  const fetchData = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      // Fetch recent bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          id, booking_type, total_price, status, payment_status, created_at,
          check_in_date, check_out_date, adults, children,
          hotel (name, city),
          package (name, city),
          user_id,
          user:user_id (id, full_name, email)
        `)
        .eq('provider_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (bookingsError) {
        throw bookingsError;
      }

      // Cast bookingsData to BookingData[] with type assertion
      setRecentBookings(bookingsData as unknown as BookingData[]);

      // Fetch dashboard stats using the new database function
      const { data: statsData, error: statsError } = await supabase.rpc(
        'get_provider_dashboard_stats',
        { provider_id_arg: user.id }
      );

      if (statsError) {
        throw statsError;
      }

      // Check if statsData exists and update state
      if (statsData && statsData.length > 0) {
        const providerStats = statsData[0];
        setStats({
          totalBookings: providerStats.total_bookings || 0,
          pendingBookings: providerStats.pending_bookings || 0,
          totalRevenue: providerStats.total_revenue || 0,
          activeListings: providerStats.active_listings || 0,
        });
      }

    } catch (error) {
      console.error('Error fetching provider dashboard data:', error);
      toast({
        title: "Failed to fetch dashboard data",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = subscribeToBookings();
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.id]);

  // Generate monthly data when stats are loaded
  useEffect(() => {
    if (!loading && stats.totalBookings > 0) {
      generateMonthlyData();
    }
  }, [stats, loading]);

  // Create an array of stat cards to display
  const statCards: StatCard[] = [
    {
      title: t("dashboard.totalBookings"),
      value: stats.totalBookings,
      description: t("dashboard.totalBookingsDesc"),
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: t("dashboard.pendingBookings"),
      value: stats.pendingBookings,
      description: t("dashboard.pendingBookingsDesc"),
      icon: <Calendar className="h-5 w-5" />,
      color: "text-yellow-500",
    },
    {
      title: t("dashboard.totalRevenue"),
      value: formatCurrency(stats.totalRevenue),
      description: t("dashboard.totalRevenueDesc"),
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: t("dashboard.activeListings"),
      value: stats.activeListings,
      description: t("dashboard.activeListingsDesc"),
      icon: <Hotel className="h-5 w-5" />,
      color: "text-purple-500",
    },
  ];

  // Function to render the stat cards
  const renderStatCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-full bg-opacity-10 ${card.color.replace('text-', 'bg-')}`}>
                {card.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  // Filter bookings based on selected filter
  const filteredBookings = recentBookings.filter(booking => 
    bookingFilter === 'all' || booking.status === bookingFilter
  );

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Table for recent bookings
  const renderRecentBookingsTable = () => {
    if (filteredBookings.length === 0) {
      return (
        <div className="text-center p-6 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No recent bookings found</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-left">Check-in</th>
              <th className="px-4 py-3 text-left">Check-out</th>
              <th className="px-4 py-3 text-right">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <motion.tr 
                key={booking.id} 
                className="border-b hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 py-3 font-mono text-xs">{booking.id.substring(0, 8)}...</td>
                <td className="px-4 py-3">{booking.user?.full_name || 'Anonymous'}</td>
                <td className="px-4 py-3 capitalize">{booking.booking_type}</td>
                <td className="px-4 py-3">
                  {booking.booking_type === 'hotel' 
                    ? booking.hotel?.name || 'Unknown Hotel'
                    : booking.package?.name || 'Unknown Package'}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(booking.total_price)}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs inline-block text-center
                    ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {formatDate(booking.check_in_date)}
                </td>
                <td className="px-4 py-3">
                  {formatDate(booking.check_out_date)}
                </td>
                <td className="px-4 py-3 text-right">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/provider/bookings/${booking.id}`)}
                  >
                    View
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render charts for analytics
  const renderAnalyticsCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Bookings</CardTitle>
          <CardDescription>Number of bookings per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value, "Bookings"]} />
                <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue in SAR</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(value as number), "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
        <Button onClick={() => navigate("/provider/listings")}>
          {t("dashboard.manageListings")} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-muted-foreground animate-pulse">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {renderStatCards()}

          {renderAnalyticsCharts()}

          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("dashboard.recentBookings")}</CardTitle>
                <CardDescription>{t("dashboard.recentBookingsDesc")}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={bookingFilter}
                  onValueChange={(value) => setBookingFilter(value as any)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {renderRecentBookingsTable()}
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="link" onClick={() => navigate("/provider/bookings")}>
                {t("dashboard.viewAll")}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProviderDashboard;
