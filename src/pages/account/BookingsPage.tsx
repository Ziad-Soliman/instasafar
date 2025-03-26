
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, HotelIcon, CheckCircle, XCircle, ClockIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  type: "hotel" | "package";
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  bookingRef: string;
}

const BookingsPage: React.FC = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      type: "hotel",
      name: "Grand Makkah Hotel",
      location: "Makkah",
      checkIn: "2023-11-10",
      checkOut: "2023-11-13",
      guests: 2,
      totalAmount: 750,
      status: "confirmed",
      bookingRef: "INST-123456",
    },
    {
      id: "2",
      type: "package",
      name: "Complete Umrah Package",
      location: "Makkah & Madinah",
      checkIn: "2023-12-15",
      checkOut: "2023-12-22",
      guests: 1,
      totalAmount: 1200,
      status: "pending",
      bookingRef: "INST-654321",
    },
    {
      id: "3",
      type: "hotel",
      name: "Madinah Luxury Hotel",
      location: "Madinah",
      checkIn: "2023-10-05",
      checkOut: "2023-10-08",
      guests: 2,
      totalAmount: 600,
      status: "cancelled",
      bookingRef: "INST-987654",
    },
  ]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const cancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "cancelled" } 
        : booking
    ));
    
    toast({
      title: "Booking cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };
  
  const getActiveBookings = () => bookings.filter(booking => booking.status !== "cancelled");
  const getPastBookings = () => bookings.filter(booking => 
    new Date(booking.checkOut) < new Date() && booking.status !== "cancelled"
  );
  const getCancelledBookings = () => bookings.filter(booking => booking.status === "cancelled");
  
  const getStatusBadge = (status: string) => {
    if (status === "confirmed") {
      return <span className="flex items-center text-green-600"><CheckCircle className="w-4 h-4 mr-1" /> Confirmed</span>;
    } else if (status === "pending") {
      return <span className="flex items-center text-amber-600"><ClockIcon className="w-4 h-4 mr-1" /> Pending</span>;
    } else {
      return <span className="flex items-center text-red-600"><XCircle className="w-4 h-4 mr-1" /> Cancelled</span>;
    }
  };
  
  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                {booking.type === "hotel" ? (
                  <HotelIcon className="w-5 h-5 text-primary" />
                ) : (
                  <Calendar className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{booking.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{booking.location}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-6 mt-4">
                  <div className="mb-2 sm:mb-0">
                    <div className="text-sm text-muted-foreground">Check-in</div>
                    <div>{formatDate(booking.checkIn)}</div>
                  </div>
                  <div className="mb-2 sm:mb-0">
                    <div className="text-sm text-muted-foreground">Check-out</div>
                    <div>{formatDate(booking.checkOut)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Guests</div>
                    <div>{booking.guests}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:text-right mt-4 md:mt-0">
            <div className="mb-2">{getStatusBadge(booking.status)}</div>
            <div className="text-sm text-muted-foreground">Booking ref: {booking.bookingRef}</div>
            <div className="font-bold mt-2">${booking.totalAmount}</div>
            
            <div className="mt-4 flex md:justify-end space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/booking/${booking.id}`}>
                  <Eye className="w-4 h-4 mr-1" /> Details
                </Link>
              </Button>
              
              {booking.status === "pending" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">Cancel</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Booking</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel this booking? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => document.getElementById('closeDialog')?.click()}>
                        No, Keep Booking
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          cancelBooking(booking.id);
                          document.getElementById('closeDialog')?.click();
                        }}
                      >
                        Yes, Cancel Booking
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        <Tabs defaultValue="active">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            {getActiveBookings().length > 0 ? (
              getActiveBookings().map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No active bookings</h3>
                <p className="text-muted-foreground mb-6">You don't have any active bookings at the moment.</p>
                <Button asChild>
                  <Link to="/search">Find a Hotel</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            {getPastBookings().length > 0 ? (
              getPastBookings().map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No past bookings</h3>
                <p className="text-muted-foreground mb-6">You don't have any past bookings.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            {getCancelledBookings().length > 0 ? (
              getCancelledBookings().map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No cancelled bookings</h3>
                <p className="text-muted-foreground">You don't have any cancelled bookings.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default BookingsPage;
