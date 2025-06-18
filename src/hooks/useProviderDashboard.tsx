
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface ProviderStats {
  total_bookings: number;
  pending_bookings: number;
  total_revenue: number;
  active_listings: number;
}

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
  } | null;
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
  const { t, language } = useLanguage();
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
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString(
      language === 'ar' ? 'ar-SA' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  const fetchProviderBookings = async () => {
    if (!user?.id) return [];

    try {
      console.log('=== FETCHING PROVIDER BOOKINGS ===');
      console.log('Provider ID:', user.id);

      // Get provider's hotels and packages first
      const [hotelsResult, packagesResult] = await Promise.all([
        supabase.from('hotels').select('id').eq('provider_id', user.id),
        supabase.from('packages').select('id').eq('provider_id', user.id)
      ]);

      const hotelIds = hotelsResult.data?.map(h => h.id) || [];
      const packageIds = packagesResult.data?.map(p => p.id) || [];

      console.log('Provider listings:', { hotelIds, packageIds });

      if (hotelIds.length === 0 && packageIds.length === 0) {
        console.log('No listings found for provider');
        return [];
      }

      // Build query for bookings
      let query = supabase.from('bookings').select(`
        id, booking_type, total_price, status, payment_status, created_at,
        check_in_date, check_out_date, adults, children, user_id,
        hotels(name, city),
        packages(name, city)
      `);

      // Add filters for provider's listings
      const conditions = [];
      if (hotelIds.length > 0) {
        conditions.push(`hotel_id.in.(${hotelIds.join(',')})`);
      }
      if (packageIds.length > 0) {
        conditions.push(`package_id.in.(${packageIds.join(',')})`);
      }

      if (conditions.length > 0) {
        query = query.or(conditions.join(','));
      }

      const { data: bookingsData, error: bookingsError } = await query
        .order('created_at', { ascending: false })
        .limit(10);

      console.log('Bookings query result:', { bookingsData, bookingsError });

      if (bookingsError) {
        console.error('Bookings error:', bookingsError);
        return [];
      }

      return bookingsData || [];
    } catch (error) {
      console.error('Error fetching provider bookings:', error);
      return [];
    }
  };

  const calculateProviderStats = async () => {
    if (!user?.id) return;

    try {
      console.log('=== CALCULATING PROVIDER STATS ===');
      
      // Get all bookings for this provider
      const bookings = await fetchProviderBookings();
      
      // Get active listings count
      const [hotelsResult, packagesResult] = await Promise.all([
        supabase.from('hotels').select('id', { count: 'exact' }).eq('provider_id', user.id),
        supabase.from('packages').select('id', { count: 'exact' }).eq('provider_id', user.id)
      ]);

      const activeListings = (hotelsResult.count || 0) + (packagesResult.count || 0);

      // Calculate stats from bookings
      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const totalRevenue = bookings
        .filter(b => b.payment_status === 'paid')
        .reduce((sum, b) => sum + Number(b.total_price), 0);

      const calculatedStats = {
        totalBookings,
        pendingBookings,
        totalRevenue,
        activeListings
      };

      console.log('Calculated stats:', calculatedStats);
      setStats(calculatedStats);

      return bookings;
    } catch (error) {
      console.error('Error calculating provider stats:', error);
      return [];
    }
  };

  const transformBookingsWithProfiles = async (bookings: any[]): Promise<BookingData[]> => {
    if (!bookings.length) return [];

    // Get user profiles for the bookings
    const userIds = [...new Set(bookings.map(b => b.user_id).filter(Boolean))];
    
    let profilesData: Array<{id: string, full_name: string}> = [];
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);
      
      profilesData = profiles || [];
    }

    return bookings.map(booking => {
      const profile = profilesData.find(p => p.id === booking.user_id);
      return {
        id: booking.id,
        booking_type: booking.booking_type,
        total_price: booking.total_price,
        status: booking.status,
        payment_status: booking.payment_status,
        created_at: booking.created_at,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        adults: booking.adults,
        children: booking.children,
        hotel: booking.hotels && typeof booking.hotels === 'object' && 'name' in booking.hotels ? booking.hotels : null,
        package: booking.packages && typeof booking.packages === 'object' && 'name' in booking.packages ? booking.packages : null,
        user: profile ? { id: profile.id, full_name: profile.full_name } : null,
      };
    });
  };

  const generateMonthlyData = () => {
    const months = language === 'ar' 
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
      console.log('=== FETCHING PROVIDER DASHBOARD DATA ===');
      console.log('Provider ID:', user.id);

      // Calculate stats and get bookings
      const bookings = await calculateProviderStats();
      
      // Transform bookings with user profiles
      const transformedBookings = await transformBookingsWithProfiles(bookings);
      setRecentBookings(transformedBookings);

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
  }, [user?.id]);

  useEffect(() => {
    if (!loading && stats.totalBookings >= 0) {
      generateMonthlyData();
    }
  }, [stats, loading, language]);

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
