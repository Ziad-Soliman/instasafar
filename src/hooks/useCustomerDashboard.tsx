
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

  const fetchStats = async () => {
    if (!user?.id) return;

    try {
      console.log('=== FETCHING CUSTOMER STATS ===');
      console.log('Customer ID:', user.id);

      const { data, error } = await supabase.rpc('get_customer_dashboard_stats', {
        customer_id_arg: user.id
      });
      
      console.log('Customer stats RPC result:', { data, error });
      
      if (error) {
        console.error('Stats RPC error:', error);
        // Fallback to manual calculation
        await calculateFallbackStats();
      } else if (data && data.length > 0) {
        setStats(data[0]);
      } else {
        await calculateFallbackStats();
      }
    } catch (error) {
      console.error('Error fetching customer stats:', error);
      await calculateFallbackStats();
    }
  };

  const calculateFallbackStats = async () => {
    if (!user?.id) return;

    try {
      // Manual calculation as fallback
      const { data: allBookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id);

      if (allBookings) {
        const totalBookings = allBookings.length;
        const upcomingCount = allBookings.filter(b => 
          b.check_in_date && new Date(b.check_in_date) > new Date() && b.status === 'confirmed'
        ).length;
        const totalSpent = allBookings
          .filter(b => b.payment_status === 'paid')
          .reduce((sum, b) => sum + b.total_price, 0);

        setStats({
          total_bookings: totalBookings,
          upcoming_bookings: upcomingCount,
          total_spent: totalSpent,
          favorite_city: 'Makkah' // Default fallback
        });
      }
    } catch (error) {
      console.error('Error calculating fallback stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics.",
        variant: "destructive",
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
      const { data: upcomingData, error: upcomingError } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name, city),
          packages(name, city)
        `)
        .eq('user_id', user.id)
        .gt('check_in_date', new Date().toISOString().split('T')[0])
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
        fetchStats(),
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
      fetchStats();
      fetchBookings();
    }
  };
};
