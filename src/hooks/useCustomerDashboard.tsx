
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface CustomerStats {
  total_bookings: number;
  upcoming_bookings: number;
  total_spent: number;
  favorite_city: string;
}

interface Booking {
  id: string;
  hotel_id?: string;
  package_id?: string;
  check_in_date: string;
  check_out_date: string;
  adults: number;
  children: number;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
  booking_type: string;
  hotels?: { name: string; city: string };
  packages?: { name: string; city: string };
}

export const useCustomerDashboard = () => {
  const [stats, setStats] = useState<CustomerStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const calculateStats = async () => {
    if (!user?.id) return;

    try {
      console.log('=== CALCULATING CUSTOMER STATS ===');
      console.log('Customer ID:', user.id);

      // Get all customer bookings
      const { data: allBookings, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name, city),
          packages(name, city)
        `)
        .eq('user_id', user.id);

      console.log('Customer bookings result:', { allBookings, error });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      if (!allBookings) {
        setStats({
          total_bookings: 0,
          upcoming_bookings: 0,
          total_spent: 0,
          favorite_city: 'N/A'
        });
        return;
      }

      // Calculate stats
      const totalBookings = allBookings.length;
      const upcomingCount = allBookings.filter(b => 
        b.check_in_date && 
        new Date(b.check_in_date) > new Date() && 
        b.status === 'confirmed'
      ).length;
      
      const totalSpent = allBookings
        .filter(b => b.payment_status === 'paid')
        .reduce((sum, b) => sum + Number(b.total_price), 0);

      // Find favorite city
      const cityCount = new Map<string, number>();
      allBookings.forEach(booking => {
        const city = booking.hotels?.city || booking.packages?.city;
        if (city) {
          cityCount.set(city, (cityCount.get(city) || 0) + 1);
        }
      });

      const favoriteCity = cityCount.size > 0 
        ? Array.from(cityCount.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        : 'N/A';

      const calculatedStats = {
        total_bookings: totalBookings,
        upcoming_bookings: upcomingCount,
        total_spent: totalSpent,
        favorite_city: favoriteCity
      };

      console.log('Calculated customer stats:', calculatedStats);
      setStats(calculatedStats);

    } catch (error) {
      console.error('Error calculating customer stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics.",
        variant: "destructive",
      });
      
      // Set fallback stats
      setStats({
        total_bookings: 0,
        upcoming_bookings: 0,
        total_spent: 0,
        favorite_city: 'N/A'
      });
    }
  };

  const fetchBookings = async () => {
    if (!user?.id) return;

    try {
      console.log('=== FETCHING CUSTOMER BOOKINGS ===');

      // Fetch recent bookings
      const { data: recentData, error: recentError } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name, city),
          packages(name, city)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      console.log('Recent bookings result:', { recentData, recentError });

      if (recentError) {
        console.error('Recent bookings error:', recentError);
        setRecentBookings([]);
      } else {
        setRecentBookings(recentData || []);
      }

      // Fetch upcoming bookings
      const today = new Date().toISOString().split('T')[0];
      const { data: upcomingData, error: upcomingError } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name, city),
          packages(name, city)
        `)
        .eq('user_id', user.id)
        .gt('check_in_date', today)
        .eq('status', 'confirmed')
        .order('check_in_date', { ascending: true });

      console.log('Upcoming bookings result:', { upcomingData, upcomingError });

      if (upcomingError) {
        console.error('Upcoming bookings error:', upcomingError);
        setUpcomingBookings([]);
      } else {
        setUpcomingBookings(upcomingData || []);
      }

    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      console.log('=== LOADING CUSTOMER DASHBOARD ===');
      
      await Promise.all([
        calculateStats(),
        fetchBookings()
      ]);
      
      setLoading(false);
    };

    loadDashboard();
  }, [user?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return {
    stats,
    recentBookings,
    upcomingBookings,
    loading,
    formatCurrency,
    formatDate,
    refetch: () => {
      calculateStats();
      fetchBookings();
    }
  };
};
