
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, MapPin, CreditCard, Package } from "lucide-react";

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

interface BookingDetailsModalProps {
  booking: Booking;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (bookingId: string, status: string, paymentStatus?: string) => Promise<void>;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  open,
  onOpenChange,
  onUpdate
}) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Booking Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Booking ID</label>
              <p className="font-mono text-sm">{booking.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Booking Date</label>
              <p>{new Date(booking.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p>{booking.profiles?.full_name || 'Anonymous'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="font-mono text-sm">{booking.user_id}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <MapPin className="h-4 w-4" />
              Booking Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <p className="capitalize">{booking.booking_type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Item</label>
                <p>
                  {booking.booking_type === 'hotel' 
                    ? booking.hotels?.name || 'Unknown Hotel'
                    : booking.packages?.name || 'Unknown Package'}
                </p>
              </div>
            </div>
            
            {booking.booking_type === 'hotel' && booking.hotels && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p>{booking.hotels.city}</p>
              </div>
            )}

            {booking.check_in_date && booking.check_out_date && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check-in</label>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(booking.check_in_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check-out</label>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(booking.check_out_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Adults</label>
                <p>{booking.adults}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Children</label>
                <p>{booking.children}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <CreditCard className="h-4 w-4" />
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                <p className="text-lg font-semibold">${booking.total_price}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                <Badge className={getPaymentStatusColor(booking.payment_status)}>
                  {booking.payment_status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Status Management */}
          <div className="space-y-2">
            <h3 className="font-semibold">Status Management</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current Status</label>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Update Status</label>
                <Select onValueChange={(value) => onUpdate(booking.id, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
