
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle, ClockIcon, Calendar, Users, Hotel, Package } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Booking {
  id: string;
  type: "hotel" | "package";
  name: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  bookingRef: string;
  created_at: string;
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      type: "hotel",
      name: "Grand Makkah Hotel",
      guest_name: "Mohammed Ali",
      guest_email: "mohammed@example.com",
      guest_phone: "+966 51 234 5678",
      location: "Makkah",
      checkIn: "2023-11-10",
      checkOut: "2023-11-13",
      guests: 2,
      totalAmount: 750,
      status: "confirmed",
      bookingRef: "INST-123456",
      created_at: "2023-10-25",
    },
    {
      id: "2",
      type: "package",
      name: "Complete Umrah Package",
      guest_name: "Fatima Khan",
      guest_email: "fatima@example.com",
      guest_phone: "+966 50 987 6543",
      location: "Makkah & Madinah",
      checkIn: "2023-12-15",
      checkOut: "2023-12-22",
      guests: 1,
      totalAmount: 1200,
      status: "pending",
      bookingRef: "INST-654321",
      created_at: "2023-10-28",
    },
    {
      id: "3",
      type: "hotel",
      name: "Madinah Luxury Hotel",
      guest_name: "Ahmed Hassan",
      guest_email: "ahmed@example.com",
      guest_phone: "+966 55 123 4567",
      location: "Madinah",
      checkIn: "2023-10-05",
      checkOut: "2023-10-08",
      guests: 2,
      totalAmount: 600,
      status: "cancelled",
      bookingRef: "INST-987654",
      created_at: "2023-09-20",
    },
    {
      id: "4",
      type: "package",
      name: "Makkah Luxury Stay",
      guest_name: "Zainab Omar",
      guest_email: "zainab@example.com",
      guest_phone: "+966 50 111 2222",
      location: "Makkah",
      checkIn: "2023-11-20",
      checkOut: "2023-11-25",
      guests: 2,
      totalAmount: 1900,
      status: "pending",
      bookingRef: "INST-456789",
      created_at: "2023-10-30",
    },
  ]);
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const updateBookingStatus = (bookingId: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus } 
        : booking
    ));
    
    setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
  };
  
  const getStatusBadge = (status: string) => {
    if (status === "confirmed") {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>;
    } else if (status === "pending") {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
    }
  };
  
  const getPendingBookings = () => bookings.filter(booking => booking.status === "pending");
  const getConfirmedBookings = () => bookings.filter(booking => booking.status === "confirmed");
  const getCancelledBookings = () => bookings.filter(booking => booking.status === "cancelled");
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Bookings</h1>
            <p className="text-muted-foreground">Manage customer bookings</p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search bookings by name, email, or reference..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="package">Package</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending ({getPendingBookings().length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({getConfirmedBookings().length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({getCancelledBookings().length})</TabsTrigger>
          </TabsList>
          
          {["all", "pending", "confirmed", "cancelled"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="bg-card rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium">Booking Ref</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Guest</th>
                        <th className="text-left py-3 px-4 font-medium">Stay Details</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-center py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {bookings
                        .filter(booking => tab === "all" ? true : booking.status === tab)
                        .map((booking) => (
                        <tr key={booking.id}>
                          <td className="py-3 px-4">
                            <div className="font-medium">{booking.bookingRef}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {booking.type === "hotel" ? (
                                <Hotel className="h-4 w-4 mr-1 text-primary" />
                              ) : (
                                <Package className="h-4 w-4 mr-1 text-primary" />
                              )}
                              <span className="capitalize">{booking.type}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">{booking.guest_name}</div>
                            <div className="text-sm text-muted-foreground">{booking.guest_email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div>{booking.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium">${booking.totalAmount}</div>
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(booking.status)}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="text-sm">{formatDate(booking.created_at)}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => setSelectedBooking(booking)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                {selectedBooking && (
                                  <DialogContent className="max-w-3xl">
                                    <DialogHeader>
                                      <DialogTitle>Booking Details</DialogTitle>
                                    </DialogHeader>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                      <div>
                                        <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
                                        <div className="space-y-3">
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Full Name</Label>
                                            <div>{selectedBooking.guest_name}</div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Email</Label>
                                            <div>{selectedBooking.guest_email}</div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Phone</Label>
                                            <div>{selectedBooking.guest_phone}</div>
                                          </div>
                                        </div>
                                        
                                        <h3 className="text-lg font-semibold mt-6 mb-4">Booking Information</h3>
                                        <div className="space-y-3">
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Booking Reference</Label>
                                            <div>{selectedBooking.bookingRef}</div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Booking Date</Label>
                                            <div>{formatDate(selectedBooking.created_at)}</div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Status</Label>
                                            <div>{getStatusBadge(selectedBooking.status)}</div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
                                        <div className="space-y-3">
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Type</Label>
                                            <div className="flex items-center">
                                              {selectedBooking.type === "hotel" ? (
                                                <Hotel className="h-4 w-4 mr-1 text-primary" />
                                              ) : (
                                                <Package className="h-4 w-4 mr-1 text-primary" />
                                              )}
                                              <span className="capitalize">{selectedBooking.type}</span>
                                            </div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Name</Label>
                                            <div>{selectedBooking.name}</div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Location</Label>
                                            <div>{selectedBooking.location}</div>
                                          </div>
                                          <div className="flex gap-4">
                                            <div>
                                              <Label className="text-muted-foreground text-sm">Check-in</Label>
                                              <div>{formatDate(selectedBooking.checkIn)}</div>
                                            </div>
                                            <div>
                                              <Label className="text-muted-foreground text-sm">Check-out</Label>
                                              <div>{formatDate(selectedBooking.checkOut)}</div>
                                            </div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Guests</Label>
                                            <div className="flex items-center">
                                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                              <span>{selectedBooking.guests}</span>
                                            </div>
                                          </div>
                                          <div>
                                            <Label className="text-muted-foreground text-sm">Total Amount</Label>
                                            <div className="font-bold">${selectedBooking.totalAmount}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <DialogFooter className="mt-6">
                                      {selectedBooking.status === "pending" && (
                                        <>
                                          <Button 
                                            variant="destructive" 
                                            onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                                          >
                                            <XCircle className="h-4 w-4 mr-2" /> Cancel Booking
                                          </Button>
                                          <Button 
                                            onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                                          >
                                            <CheckCircle className="h-4 w-4 mr-2" /> Confirm Booking
                                          </Button>
                                        </>
                                      )}
                                      {selectedBooking.status === "confirmed" && (
                                        <Button 
                                          variant="destructive" 
                                          onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                                        >
                                          <XCircle className="h-4 w-4 mr-2" /> Cancel Booking
                                        </Button>
                                      )}
                                      {selectedBooking.status === "cancelled" && (
                                        <Button 
                                          onClick={() => updateBookingStatus(selectedBooking.id, "confirmed")}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" /> Restore Booking
                                        </Button>
                                      )}
                                    </DialogFooter>
                                  </DialogContent>
                                )}
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="py-4 px-6 bg-muted/50 border-t flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminBookings;
