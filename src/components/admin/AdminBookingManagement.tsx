
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Edit2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BookingDetailsModal from "./BookingDetailsModal";

interface Booking {
  id: string;
  user_id: string;
  hotel_id?: string;
  package_id?: string;
  booking_type: string;
  check_in_date?: string;
  check_out_date?: string;
  adults: number;
  children: number;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
  hotels?: { name: string; city: string } | null;
  packages?: { name: string; city: string } | null;
  profiles?: { full_name: string } | null;
}

const AdminBookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    setLoading(true);
    console.log('=== FETCHING ADMIN BOOKINGS ===');
    
    try {
      // Fetch bookings with related data
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name, city),
          packages(name, city)
        `)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Bookings error:', bookingsError);
        throw bookingsError;
      }

      console.log('Raw bookings data:', bookingsData);

      if (!bookingsData) {
        setBookings([]);
        return;
      }

      // Get user profiles separately
      const userIds = bookingsData.map(booking => booking.user_id).filter(Boolean);
      console.log('User IDs to fetch:', userIds);

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Profiles error:', profilesError);
      }

      console.log('Profiles data:', profilesData);

      // Transform the data
      const transformedBookings: Booking[] = bookingsData.map(item => {
        const profile = profilesData?.find(p => p.id === item.user_id);
        
        return {
          id: item.id,
          user_id: item.user_id,
          hotel_id: item.hotel_id,
          package_id: item.package_id,
          booking_type: item.booking_type,
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
          profiles: profile ? { full_name: profile.full_name } : null
        };
      });

      console.log('Transformed bookings:', transformedBookings);
      setBookings(transformedBookings);
      
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: `Failed to fetch bookings: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string, paymentStatus?: string) => {
    try {
      const updates: any = { status };
      if (paymentStatus) {
        updates.payment_status = paymentStatus;
      }

      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking updated successfully",
      });

      await fetchBookings();
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: `Failed to update booking: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking deleted successfully",
      });

      await fetchBookings();
    } catch (error: any) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Error",
        description: `Failed to delete booking: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hotels?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.packages?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse">Loading bookings...</div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Management</CardTitle>
        <CardDescription>Manage all customer bookings and reservations</CardDescription>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredBookings.length === 0 ? (
          <div className="text-center p-6 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No bookings found</p>
          </div>
        ) : (
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
                  <th className="px-4 py-3 text-center">Payment</th>
                  <th className="px-4 py-3 text-left">Date</th>
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
                    <td className="px-4 py-3">{booking.profiles?.full_name || 'Anonymous'}</td>
                    <td className="px-4 py-3 capitalize">{booking.booking_type}</td>
                    <td className="px-4 py-3">
                      {booking.booking_type === 'hotel' 
                        ? booking.hotels?.name || 'Unknown Hotel'
                        : booking.packages?.name || 'Unknown Package'}
                    </td>
                    <td className="px-4 py-3 text-right">${booking.total_price}</td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getPaymentStatusColor(booking.payment_status)}>
                        {booking.payment_status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select onValueChange={(value) => updateBookingStatus(booking.id, value)}>
                          <SelectTrigger className="w-24 h-8">
                            <Edit2 className="h-4 w-4" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirm</SelectItem>
                            <SelectItem value="cancelled">Cancel</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={(open) => !open && setSelectedBooking(null)}
          onUpdate={updateBookingStatus}
        />
      )}
    </Card>
  );
};

export default AdminBookingManagement;
