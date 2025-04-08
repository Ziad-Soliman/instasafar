
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase, ProviderStats } from "@/integrations/supabase/client";

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

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  activeListings: number;
}

export const useProviderDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language, isRTL } = useLanguage();
  const [recentBookings, setRecentBookings] = useState<BookingData[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
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
      // First query: Get recent bookings
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

      // Cast as unknown first to work around type error
      setRecentBookings(bookingsData as unknown as BookingData[]);

      // Second query: Get provider stats using properly typed RPC call
      const { data: statsData, error: statsError } = await supabase
        .rpc<ProviderStats>('get_provider_dashboard_stats', {
          provider_id_arg: user.id
        });

      if (statsError) {
        throw statsError;
      }

      if (statsData && statsData.length > 0) {
        // Access the first element since the function returns an array with one item
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

  return {
    recentBookings,
    stats,
    loading,
    bookingFilter,
    setBookingFilter,
    monthlyData,
    formatCurrency,
    formatDate
  };
};
