
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  hotels?: { name: string };
  packages?: { name: string };
  profiles?: { full_name: string };
}

interface AdminRecentBookingsProps {
  bookings: Booking[];
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const AdminRecentBookings: React.FC<AdminRecentBookingsProps> = ({ 
  bookings, 
  formatCurrency, 
  formatDate 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No recent bookings</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {booking.hotels?.name || booking.packages?.name || 'Unknown'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Customer: {booking.profiles?.full_name || 'Unknown'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(booking.check_in_date)} - {formatDate(booking.check_out_date)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {booking.adults} adults, {booking.children} children
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(Number(booking.total_price))}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                    <Badge variant={booking.payment_status === 'paid' ? 'default' : 'destructive'}>
                      {booking.payment_status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(booking.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminRecentBookings;
