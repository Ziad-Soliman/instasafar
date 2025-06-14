
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminStats {
  total_users: number;
  total_bookings: number;
  total_revenue: number;
  total_hotels: number;
  total_packages: number;
  pending_bookings: number;
}

interface Booking {
  id: string;
  user_id: string;
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
  hotels?: { name: string } | null;
  packages?: { name: string } | null;
  profiles?: { full_name: string } | null;
}

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_dashboard_stats');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics.",
        variant: "destructive",
      });
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name),
          packages(name),
          profiles(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData: Booking[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        hotel_id: item.hotel_id,
        package_id: item.package_id,
        check_in_date: item.check_in_date,
        check_out_date: item.check_out_date,
        adults: item.adults,
        children: item.children,
        total_price: item.total_price,
        status: item.status,
        payment_status: item.payment_status,
        created_at: item.created_at,
        hotels: item.hotels,
        packages: item.packages,
        profiles: item.profiles
      }));
      
      setRecentBookings(transformedData);
    } catch (error) {
      console.error('Error fetching recent bookings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recent bookings.",
        variant: "destructive",
      });
    }
  };

  const fetchMonthlyData = async () => {
    try {
      // Get monthly booking and revenue data for the last 12 months
      const { data, error } = await supabase
        .from('bookings')
        .select('created_at, total_price, payment_status')
        .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      // Process data into monthly aggregates
      const monthlyMap = new Map();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Initialize last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
        monthlyMap.set(monthKey, { name: months[date.getMonth()], bookings: 0, revenue: 0 });
      }

      // Aggregate data
      data?.forEach(booking => {
        const date = new Date(booking.created_at);
        const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
        
        if (monthlyMap.has(monthKey)) {
          const existing = monthlyMap.get(monthKey);
          existing.bookings += 1;
          if (booking.payment_status === 'paid') {
            existing.revenue += Number(booking.total_price);
          }
        }
      });

      setMonthlyData(Array.from(monthlyMap.values()));
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await Promise.all([
        fetchStats(),
        fetchRecentBookings(),
        fetchMonthlyData()
      ]);
      setLoading(false);
    };

    loadDashboard();
  }, []);

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
    monthlyData,
    loading,
    formatCurrency,
    formatDate,
    refetch: () => {
      fetchStats();
      fetchRecentBookings();
      fetchMonthlyData();
    }
  };
};
