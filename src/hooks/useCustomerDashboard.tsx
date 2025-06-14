
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
      const { data, error } = await supabase.rpc('get_customer_dashboard_stats', {
        customer_id_arg: user.id
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error) {
      console.error('Error fetching customer stats:', error);
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

      if (recentError) throw recentError;
      setRecentBookings(recentData || []);

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

      if (upcomingError) throw upcomingError;
      setUpcomingBookings(upcomingData || []);
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
