
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, CreditCard, Phone, Mail, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface BookingDetailsModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [editing, setEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState(booking);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          status: editedBooking.status,
          payment_status: editedBooking.payment_status,
          total_price: editedBooking.total_price,
          adults: editedBooking.adults,
          children: editedBooking.children,
          notes: editedBooking.notes
        })
        .eq('id', booking.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Booking updated successfully.",
      });

      setEditing(false);
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Booking Details</DialogTitle>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button size="sm" onClick={handleSave} disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditing(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Booking ID</label>
                <p className="font-mono text-sm">{booking.id}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <p className="capitalize">{booking.booking_type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Service</label>
                <p>{booking.hotels?.name || booking.packages?.name || 'Unknown'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check-in</label>
                  <p>{new Date(booking.check_in_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Check-out</label>
                  <p>{new Date(booking.check_out_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Adults</label>
                  {editing ? (
                    <input
                      type="number"
                      min="1"
                      value={editedBooking.adults}
                      onChange={(e) => setEditedBooking({...editedBooking, adults: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p>{booking.adults}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Children</label>
                  {editing ? (
                    <input
                      type="number"
                      min="0"
                      value={editedBooking.children}
                      onChange={(e) => setEditedBooking({...editedBooking, children: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p>{booking.children}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Price</label>
                {editing ? (
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editedBooking.total_price}
                    onChange={(e) => setEditedBooking({...editedBooking, total_price: parseFloat(e.target.value)})}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-xl font-bold">${Number(booking.total_price).toFixed(2)}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Created</label>
                <p>{new Date(booking.created_at).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer & Status Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Customer Name</label>
                <p>{booking.profiles?.full_name || 'Unknown Customer'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Booking Status</label>
                {editing ? (
                  <Select 
                    value={editedBooking.status} 
                    onValueChange={(value) => setEditedBooking({...editedBooking, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                {editing ? (
                  <Select 
                    value={editedBooking.payment_status} 
                    onValueChange={(value) => setEditedBooking({...editedBooking, payment_status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={getPaymentStatusColor(booking.payment_status)}>
                    {booking.payment_status}
                  </Badge>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Notes</label>
                {editing ? (
                  <textarea
                    value={editedBooking.notes || ''}
                    onChange={(e) => setEditedBooking({...editedBooking, notes: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Add notes..."
                  />
                ) : (
                  <p>{booking.notes || 'No notes'}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;
