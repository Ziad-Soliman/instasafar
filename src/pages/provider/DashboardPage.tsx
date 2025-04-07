
// Import React and any necessary components or libraries needed for the Dashboard page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Hotel, Users, Building, Calendar, DollarSign, BookOpen, AreaChart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
  
  // Function to format currency based on locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
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
        .limit(5);

      if (bookingsError) {
        throw bookingsError;
      }

      // Cast bookingsData to unknown first, then to BookingData[]
      setRecentBookings(bookingsData as unknown as BookingData[]);

      // Fetch dashboard stats
      const { data: statsData, error: statsError } = await supabase.rpc('get_provider_dashboard_stats', {
        provider_id_arg: user.id
      });

      if (statsError) {
        throw statsError;
      }

      setStats({
        totalBookings: statsData?.total_bookings || 0,
        pendingBookings: statsData?.pending_bookings || 0,
        totalRevenue: statsData?.total_revenue || 0,
        activeListings: statsData?.active_listings || 0,
      });

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
  }, [user?.id]);

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
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-sm text-muted-foreground">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Table for recent bookings
  const renderRecentBookingsTable = () => {
    if (recentBookings.length === 0) {
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
              <th className="px-4 py-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-muted/50 transition-colors">
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
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {new Date(booking.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t("dashboard.recentBookings")}</CardTitle>
              <CardDescription>{t("dashboard.recentBookingsDesc")}</CardDescription>
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
