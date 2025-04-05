
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CalendarIcon, Hotel, Package, MapPin, Users, CreditCard, Clock, TrendingUp, BedDouble, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
}

interface RecentBooking {
  id: string;
  user_name: string;
  booking_type: "hotel" | "package";
  item_name: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
}

interface DashboardData {
  totalHotels: number;
  totalPackages: number;
  bookingStats: BookingStats;
  recentBookings: RecentBooking[];
  monthlyBookings: { month: string; count: number }[];
  monthlyRevenue: { month: string; amount: number }[];
}

const mockMonthlyBookings = [
  { month: "Jan", count: 10 },
  { month: "Feb", count: 15 },
  { month: "Mar", count: 12 },
  { month: "Apr", count: 8 },
  { month: "May", count: 20 },
  { month: "Jun", count: 25 },
];

const mockMonthlyRevenue = [
  { month: "Jan", amount: 5000 },
  { month: "Feb", amount: 7500 },
  { month: "Mar", amount: 6000 },
  { month: "Apr", amount: 4000 },
  { month: "May", amount: 9000 },
  { month: "Jun", amount: 12000 },
];

const ProviderDashboard: React.FC = () => {
  const { t, locale, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalHotels: 0,
    totalPackages: 0,
    bookingStats: { total: 0, pending: 0, confirmed: 0, cancelled: 0, completed: 0 },
    recentBookings: [],
    monthlyBookings: mockMonthlyBookings,
    monthlyRevenue: mockMonthlyRevenue,
  });

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let variant: "outline" | "default" | "secondary" | "destructive" = "outline";
    
    switch (status) {
      case "confirmed":
        variant = "default";
        break;
      case "pending":
        variant = "secondary";
        break;
      case "cancelled":
        variant = "destructive";
        break;
      case "completed":
        variant = "outline";
        break;
    }
    
    return (
      <Badge variant={variant}>
        {t(`booking.status.${status}`)}
      </Badge>
    );
  };

  // Format date based on language
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "PPP", { locale: locale === 'ar' ? ar : enUS });
    } catch (error) {
      return dateStr;
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch hotels count
        const { count: hotelsCount, error: hotelsError } = await supabase
          .from('hotels')
          .select('*', { count: 'exact', head: true })
          .eq('provider_id', user.id);
        
        if (hotelsError) throw hotelsError;
        
        // Fetch packages count
        const { count: packagesCount, error: packagesError } = await supabase
          .from('packages')
          .select('*', { count: 'exact', head: true })
          .eq('provider_id', user.id);
        
        if (packagesError) throw packagesError;
        
        // Fetch bookings
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            id,
            booking_type,
            check_in_date,
            check_out_date,
            total_price,
            status,
            created_at,
            profiles!bookings_user_id_fkey(full_name),
            hotels!bookings_hotel_id_fkey(name),
            packages!bookings_package_id_fkey(name)
          `)
          .or(`hotels.provider_id.eq.${user.id},packages.provider_id.eq.${user.id}`)
          .order('created_at', { ascending: false });
        
        if (bookingsError) throw bookingsError;
        
        // Process bookings data
        const processedBookings = bookings?.map(booking => ({
          id: booking.id,
          user_name: booking.profiles?.full_name || 'Unknown User',
          booking_type: booking.booking_type as 'hotel' | 'package',
          item_name: (booking.booking_type === 'hotel' ? booking.hotels?.name : booking.packages?.name) || 'Unknown',
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          total_price: booking.total_price,
          status: booking.status as 'pending' | 'confirmed' | 'cancelled' | 'completed',
          created_at: booking.created_at,
        })) || [];
        
        // Calculate booking stats
        const stats = {
          total: processedBookings.length,
          pending: processedBookings.filter(b => b.status === 'pending').length,
          confirmed: processedBookings.filter(b => b.status === 'confirmed').length,
          cancelled: processedBookings.filter(b => b.status === 'cancelled').length,
          completed: processedBookings.filter(b => b.status === 'completed').length,
        };
        
        setDashboardData({
          totalHotels: hotelsCount || 0,
          totalPackages: packagesCount || 0,
          bookingStats: stats,
          recentBookings: processedBookings.slice(0, 5),
          monthlyBookings: mockMonthlyBookings, // TODO: Calculate from actual data
          monthlyRevenue: mockMonthlyRevenue, // TODO: Calculate from actual data
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("provider.dashboard.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("provider.dashboard.subtitle")}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button onClick={() => navigate("/provider/listings")} className="flex items-center gap-2">
              <Hotel className="h-4 w-4" />
              {t("provider.dashboard.manageListings")}
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{t("provider.dashboard.totalListings")}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">{dashboardData.totalHotels + dashboardData.totalPackages}</p>
                )}
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BedDouble className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{t("provider.dashboard.totalBookings")}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">{dashboardData.bookingStats.total}</p>
                )}
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{t("provider.dashboard.pendingBookings")}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">{dashboardData.bookingStats.pending}</p>
                )}
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{t("provider.dashboard.activeBookings")}</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-2xl font-bold">{dashboardData.bookingStats.confirmed}</p>
                )}
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t("provider.dashboard.bookingTrends")}</CardTitle>
              <CardDescription>{t("provider.dashboard.bookingTrendsDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <Skeleton className="h-64 w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={dashboardData.monthlyBookings}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [value, t("provider.dashboard.bookings")]}
                      labelFormatter={(label) => `${t("date.month."+label.toLowerCase())}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="count" name={t("provider.dashboard.bookings")} stroke="#6366f1" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("provider.dashboard.revenue")}</CardTitle>
              <CardDescription>{t("provider.dashboard.revenueDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <Skeleton className="h-64 w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={dashboardData.monthlyRevenue}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} ${t("currency.sar")}`, t("provider.dashboard.revenue")]}
                      labelFormatter={(label) => `${t("date.month."+label.toLowerCase())}`}
                    />
                    <Legend />
                    <Bar dataKey="amount" name={t("provider.dashboard.revenue")} fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("provider.dashboard.recentBookings")}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/provider/bookings")}>
                {t("provider.dashboard.viewAll")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : dashboardData.recentBookings.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">{t("provider.dashboard.noBookings")}</p>
              </div>
            ) : (
              <div className="divide-y">
                {dashboardData.recentBookings.map((booking) => (
                  <div key={booking.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{booking.user_name}</p>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        {booking.booking_type === 'hotel' ? (
                          <Hotel className="h-4 w-4 mr-1" />
                        ) : (
                          <Package className="h-4 w-4 mr-1" />
                        )}
                        <span>{booking.item_name}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(booking.check_in_date)}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm md:border-l md:border-r px-4">
                        <span className="font-medium">{booking.total_price} {t("currency.sar")}</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {t("booking.bookedOn")} {formatDate(booking.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4 text-center text-muted-foreground text-sm">
            {t("provider.dashboard.managedBy")}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProviderDashboard;
