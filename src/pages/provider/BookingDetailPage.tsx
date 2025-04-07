
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  MapPin,
  MessageSquare,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

interface BookingDetail {
  id: string;
  booking_type: string;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
  notes: string | null;
  check_in_date: string | null;
  check_out_date: string | null;
  adults: number;
  children: number;
  hotel: {
    id: string;
    name: string;
    city: string;
    address: string;
    thumbnail: string | null;
  } | null;
  package: {
    id: string;
    name: string;
    city: string;
    duration_days: number;
    thumbnail: string | null;
  } | null;
  user: {
    id: string;
    full_name: string | null;
    email: string | null;
    phone_number: string | null;
  } | null;
}

const BookingDetailPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Function to format currency based on locale
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString(
      language === 'ar' ? 'ar-SA' : 'en-US', 
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  // Fetch booking details
  const fetchBookingDetails = async () => {
    if (!bookingId || !user?.id) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, booking_type, total_price, status, payment_status, created_at, notes,
          check_in_date, check_out_date, adults, children,
          hotel (id, name, city, address, thumbnail),
          package (id, name, city, duration_days, thumbnail),
          user:user_id (id, full_name, email, phone_number)
        `)
        .eq('id', bookingId)
        .eq('provider_id', user.id)
        .single();

      if (error) {
        throw error;
      }

      setBooking(data as unknown as BookingDetail);
      
    } catch (error) {
      console.error('Error fetching booking details:', error);
      toast({
        title: "Failed to fetch booking details",
        description: "Please try again later.",
        variant: "destructive",
      });
      navigate('/provider/bookings');
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (newStatus: string) => {
    if (!bookingId || !user?.id) return;
    setUpdateLoading(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: newStatus,
          notes: booking?.notes ? `${booking.notes}\n\n${additionalNotes}` : additionalNotes || null
        })
        .eq('id', bookingId)
        .eq('provider_id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Booking updated",
        description: `Booking status has been updated to ${newStatus}`,
        variant: "default",
      });

      // Refresh booking details
      fetchBookingDetails();
      setAdditionalNotes("");
      
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Failed to update booking",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  // Load booking details on initial render
  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId, user?.id]);

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Payment status badge color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground animate-pulse">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Booking not found</AlertTitle>
          <AlertDescription>
            The booking you're looking for does not exist or you don't have permission to view it.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => navigate('/provider/bookings')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate('/provider/bookings')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          {booking.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                className="border-red-200 hover:bg-red-50 text-red-600"
                onClick={() => updateBookingStatus('cancelled')}
                disabled={updateLoading}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => updateBookingStatus('confirmed')}
                disabled={updateLoading}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm
              </Button>
            </>
          )}
          {booking.status === 'confirmed' && (
            <Button 
              variant="outline" 
              className="border-red-200 hover:bg-red-50 text-red-600"
              onClick={() => updateBookingStatus('cancelled')}
              disabled={updateLoading}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
          {booking.status === 'cancelled' && booking.payment_status !== 'refunded' && (
            <Button 
              variant="outline"
              onClick={() => {/* Implement refund logic here */}}
            >
              Mark as Refunded
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Information</CardTitle>
            <CardDescription>Details about this booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Booking ID</p>
                <p className="font-mono">{booking.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Created On</p>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{new Date(booking.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Booking Type</p>
                <p className="capitalize">{booking.booking_type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                <Badge className={getPaymentStatusColor(booking.payment_status)}>
                  {booking.payment_status}
                </Badge>
              </div>
            </div>
            
            {booking.booking_type === 'hotel' && booking.hotel && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  {booking.hotel.thumbnail && (
                    <img 
                      src={booking.hotel.thumbnail} 
                      alt={booking.hotel.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{booking.hotel.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" /> 
                      {booking.hotel.city}, {booking.hotel.address}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {booking.booking_type === 'package' && booking.package && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  {booking.package.thumbnail && (
                    <img 
                      src={booking.package.thumbnail} 
                      alt={booking.package.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{booking.package.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" /> 
                      {booking.package.city}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {booking.package.duration_days} days
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Check-in Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{formatDate(booking.check_in_date)}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Check-out Date</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{formatDate(booking.check_out_date)}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Guests</p>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{booking.adults} adults, {booking.children} children</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Price</p>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="font-semibold text-lg">{formatCurrency(booking.total_price)}</p>
                </div>
              </div>
            </div>
            
            {booking.notes && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <div className="bg-muted/30 p-3 rounded whitespace-pre-line">
                  {booking.notes}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Details about the booking customer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-semibold">{booking.user?.full_name || 'Anonymous'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{booking.user?.email || 'Not provided'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{booking.user?.phone_number || 'Not provided'}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Additional Notes</p>
              <Textarea
                placeholder="Add notes about this booking..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => updateBookingStatus(booking.status)}
                disabled={!additionalNotes.trim() || updateLoading}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingDetailPage;
