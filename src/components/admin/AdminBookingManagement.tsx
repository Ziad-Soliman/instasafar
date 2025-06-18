
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Eye, RefreshCw } from "lucide-react";
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
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      console.log('=== FETCHING ADMIN BOOKINGS ===');
      
      // Fetch bookings with related data
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels(name, city),
          packages(name, city)
        `)
        .order('created_at', { ascending: false });

      console.log('Bookings query result:', { bookingsData, bookingsError });

      if (bookingsError) {
        console.error('Bookings fetch error:', bookingsError);
        throw bookingsError;
      }

      if (!bookingsData) {
        setBookings([]);
        return;
      }

      // Get user profiles separately to avoid RLS issues
      const userIds = [...new Set(bookingsData.map(b => b.user_id).filter(Boolean))];
      let profilesData: Array<{id: string, full_name: string}> = [];
      
      if (userIds.length > 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);

        if (profilesError) {
          console.error('Profiles fetch error:', profilesError);
        } else {
          profilesData = profiles || [];
        }
      }

      // Transform and combine the data
      const transformedBookings: Booking[] = bookingsData.map(booking => {
        const profile = profilesData.find(p => p.id === booking.user_id);
        
        return {
          id: booking.id,
          user_id: booking.user_id,
          hotel_id: booking.hotel_id,
          package_id: booking.package_id,
          booking_type: booking.booking_type,
          check_in_date: booking.check_in_date,
          check_out_date: booking.check_out_date,
          adults: booking.adults,
          children: booking.children,
          total_price: booking.total_price,
          status: booking.status,
          payment_status: booking.payment_status,
          created_at: booking.created_at,
          hotels: booking.hotels || null,
          packages: booking.packages || null,
          profiles: profile ? { full_name: profile.full_name } : null
        };
      });

      console.log('Transformed bookings:', transformedBookings);
      setBookings(transformedBookings);

    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string, paymentStatus?: string) => {
    setUpdating(bookingId);
    try {
      console.log('Updating booking:', { bookingId, status, paymentStatus });
      
      const updateData: any = { status };
      if (paymentStatus) {
        updateData.payment_status = paymentStatus;
      }

      const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId);

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Booking updated successfully.",
      });

      // Refresh bookings
      await fetchBookings();
      
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update booking.",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchLower) ||
      (booking.profiles?.full_name || '').toLowerCase().includes(searchLower) ||
      (booking.hotels?.name || '').toLowerCase().includes(searchLower) ||
      (booking.packages?.name || '').toLowerCase().includes(searchLower);
    
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saudi-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>
            Manage all customer bookings and reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchBookings} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      {searchTerm || statusFilter !== "all" 
                        ? "No bookings match your filters." 
                        : "No bookings found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-sm">
                        {booking.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>
                        {booking.profiles?.full_name || 'Anonymous'}
                      </TableCell>
                      <TableCell>
                        {booking.booking_type === 'hotel' 
                          ? booking.hotels?.name || 'Unknown Hotel'
                          : booking.packages?.name || 'Unknown Package'}
                      </TableCell>
                      <TableCell className="capitalize">
                        {booking.booking_type}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${booking.total_price}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(booking.payment_status)}>
                          {booking.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(booking.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Select
                            value=""
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                            disabled={updating === booking.id}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        </CardContent>
      </Card>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={(open) => !open && setSelectedBooking(null)}
          onUpdate={updateBookingStatus}
        />
      )}
    </div>
  );
};

export default AdminBookingManagement;
