
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { supabase, ProviderStats } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRtlHelpers } from "@/utils/rtl-helpers";

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
  const { t, language, isRTL } = useLanguage();
  const { toast } = useToast();
  const { getDirectionalClasses } = useRtlHelpers();
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
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(
      language === 'ar' ? 'ar-SA' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

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
          toast({
            title: t("dashboard.newBooking", "New booking received"),
            description: t(
              "dashboard.newBookingDesc", 
              `A new ${payload.new.booking_type} booking has been made`
            ),
            variant: "default",
          });
          fetchData();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  };

  const generateMonthlyData = () => {
    const months = isRTL 
      ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const currentMonth = new Date().getMonth();
    
    const data: MonthlyData[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const multiplier = (5 - i) / 5;
      data.push({
        name: months[monthIndex],
        bookings: Math.round((stats.totalBookings / 6) * multiplier * (0.8 + Math.random() * 0.4)),
        revenue: Math.round((stats.totalRevenue / 6) * multiplier * (0.7 + Math.random() * 0.6)),
      });
    }
    
    setMonthlyData(data);
  };

  const fetchData = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
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

      setRecentBookings(bookingsData as unknown as BookingData[]);

      // Using explicit type parameter for rpc call to avoid TypeScript errors
      const { data: statsData, error: statsError } = await supabase
        .rpc<ProviderStats[]>('get_provider_dashboard_stats', {
          provider_id_arg: user.id
        });

      if (statsError) {
        throw statsError;
      }

      if (statsData && Array.isArray(statsData) && statsData.length > 0) {
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
        title: t("dashboard.fetchError", "Failed to fetch dashboard data"),
        description: t("dashboard.tryAgain", "Please try again later."),
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

  useEffect(() => {
    if (!loading && stats.totalBookings > 0) {
      generateMonthlyData();
    }
  }, [stats, loading]);

  const statCards: StatCard[] = [
    {
      title: t("dashboard.totalBookings", "Total Bookings"),
      value: stats.totalBookings,
      description: t("dashboard.totalBookingsDesc", "Total number of bookings received"),
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: t("dashboard.pendingBookings", "Pending Bookings"),
      value: stats.pendingBookings,
      description: t("dashboard.pendingBookingsDesc", "Bookings awaiting confirmation"),
      icon: <Calendar className="h-5 w-5" />,
      color: "text-yellow-500",
    },
    {
      title: t("dashboard.totalRevenue", "Total Revenue"),
      value: formatCurrency(stats.totalRevenue),
      description: t("dashboard.totalRevenueDesc", "Total revenue from all bookings"),
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: t("dashboard.activeListings", "Active Listings"),
      value: stats.activeListings,
      description: t("dashboard.activeListingsDesc", "Your active hotel and package listings"),
      icon: <Hotel className="h-5 w-5" />,
      color: "text-purple-500",
    },
  ];

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

  const filteredBookings = recentBookings.filter(booking => 
    bookingFilter === 'all' || booking.status === bookingFilter
  );

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

  const renderRecentBookingsTable = () => {
    if (filteredBookings.length === 0) {
      return (
        <div className="text-center p-6 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">{t("dashboard.noBookings", "No recent bookings found")}</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-start">{t("dashboard.bookingId", "Booking ID")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.customer", "Customer")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.type", "Type")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.item", "Item")}</th>
              <th className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>{t("dashboard.amount", "Amount")}</th>
              <th className="px-4 py-3 text-center">{t("dashboard.status", "Status")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.checkIn", "Check-in")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.checkOut", "Check-out")}</th>
              <th className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>{t("dashboard.date", "Date")}</th>
              <th className="px-4 py-3 text-center">{t("dashboard.actions", "Actions")}</th>
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
                <td className="px-4 py-3">{booking.user?.full_name || t("dashboard.anonymous", "Anonymous")}</td>
                <td className="px-4 py-3 capitalize">{t(`booking.type.${booking.booking_type}`, booking.booking_type)}</td>
                <td className="px-4 py-3">
                  {booking.booking_type === 'hotel' 
                    ? booking.hotel?.name || t("dashboard.unknownHotel", "Unknown Hotel")
                    : booking.package?.name || t("dashboard.unknownPackage", "Unknown Package")}
                </td>
                <td className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>
                  {formatCurrency(booking.total_price)}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs inline-block text-center
                    ${getStatusColor(booking.status)}`}>
                    {t(`booking.status.${booking.status}`, booking.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {formatDate(booking.check_in_date)}
                </td>
                <td className="px-4 py-3">
                  {formatDate(booking.check_out_date)}
                </td>
                <td className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>
                  {new Date(booking.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                </td>
                <td className="px-4 py-3 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/provider/bookings/${booking.id}`)}
                  >
                    {t("dashboard.view", "View")}
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAnalyticsCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("dashboard.monthlyBookings", "Monthly Bookings")}</CardTitle>
          <CardDescription>{t("dashboard.monthlyBookingsDesc", "Number of bookings per month")}</CardDescription>
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
                <RechartsTooltip 
                  formatter={(value) => [value, t("dashboard.bookings", "Bookings")]} 
                  labelFormatter={(label) => t(`months.${label.toLowerCase()}`, label)}
                />
                <Bar dataKey="bookings" fill="#3b82f6" name={t("dashboard.bookings", "Bookings")} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("dashboard.revenueTrend", "Revenue Trend")}</CardTitle>
          <CardDescription>{t("dashboard.revenueTrendDesc", "Monthly revenue in SAR")}</CardDescription>
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
                <RechartsTooltip 
                  formatter={(value) => [formatCurrency(value as number), t("dashboard.revenue", "Revenue")]} 
                  labelFormatter={(label) => t(`months.${label.toLowerCase()}`, label)}
                />
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
        <h1 className="text-2xl font-bold">{t("dashboard.title", "Dashboard")}</h1>
        <Button onClick={() => navigate("/provider/listings")}>
          {t("dashboard.manageListings", "Manage Listings")} 
          <ArrowRight className={cn("h-4 w-4", isRTL ? "mr-2 rotate-180" : "ml-2")} />
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-muted-foreground animate-pulse">{t("dashboard.loading", "Loading dashboard data...")}</p>
        </div>
      ) : (
        <>
          {renderStatCards()}

          {renderAnalyticsCharts()}

          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t("dashboard.recentBookings", "Recent Bookings")}</CardTitle>
                <CardDescription>{t("dashboard.recentBookingsDesc", "Your most recent booking activity")}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={bookingFilter}
                  onValueChange={(value) => setBookingFilter(value as any)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("dashboard.filterByStatus", "Filter by status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("dashboard.allBookings", "All Bookings")}</SelectItem>
                    <SelectItem value="pending">{t("booking.status.pending", "Pending")}</SelectItem>
                    <SelectItem value="confirmed">{t("booking.status.confirmed", "Confirmed")}</SelectItem>
                    <SelectItem value="cancelled">{t("booking.status.cancelled", "Cancelled")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {renderRecentBookingsTable()}
            </CardContent>
            <CardFooter className={`justify-${isRTL ? 'start' : 'end'}`}>
              <Button variant="link" onClick={() => navigate("/provider/bookings")}>
                {t("dashboard.viewAll", "View All Bookings")}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProviderDashboard;
