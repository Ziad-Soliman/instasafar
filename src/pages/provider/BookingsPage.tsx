
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Search, User, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProviderBookingsPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for bookings
  const bookings = [
    {
      id: "booking-1",
      guest_name: "Ahmed Mohamed",
      guest_email: "ahmed@example.com",
      listing_name: "Deluxe Room - Grand Makkah Hotel",
      listing_type: "hotel",
      dates: "Nov 15 - Nov 20, 2023",
      guests: 2,
      total_amount: 1200,
      status: "confirmed",
      created_at: "2023-10-25T14:30:00Z",
    },
    {
      id: "booking-2",
      guest_name: "Sarah Johnson",
      guest_email: "sarah@example.com",
      listing_name: "Family Suite - Madinah View Hotel",
      listing_type: "hotel",
      dates: "Dec 5 - Dec 10, 2023",
      guests: 4,
      total_amount: 2400,
      status: "pending",
      created_at: "2023-11-01T09:15:00Z",
    },
    {
      id: "booking-3",
      guest_name: "Mohammed Rahman",
      guest_email: "mohammed@example.com",
      listing_name: "Premium Umrah Package",
      listing_type: "package",
      dates: "Dec 20 - Dec 27, 2023",
      guests: 2,
      total_amount: 2400,
      status: "confirmed",
      created_at: "2023-11-05T16:45:00Z",
    },
    {
      id: "booking-4",
      guest_name: "Fatima Ali",
      guest_email: "fatima@example.com",
      listing_name: "Standard Room - Makkah Plaza",
      listing_type: "hotel",
      dates: "Jan 10 - Jan 15, 2024",
      guests: 1,
      total_amount: 900,
      status: "pending",
      created_at: "2023-11-10T11:20:00Z",
    },
  ];

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking => 
    booking.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.listing_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <p className="text-muted-foreground">Manage bookings for your listings</p>
          </div>
          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">
              <AlertCircle className="h-4 w-4 mr-2" />
              Pending
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <h3 className="font-semibold">{booking.listing_name}</h3>
                            <Badge className={`ml-2 ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500' 
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-500'
                            }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{booking.dates}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-3.5 w-3.5 mr-1" />
                            <span>{booking.guest_name} • {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Booked on {new Date(booking.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-lg font-semibold">${booking.total_amount}</div>
                          <div className="text-sm text-muted-foreground">Total Amount</div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {filteredBookings.filter(b => b.status === 'pending').length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No pending bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings
                  .filter(booking => booking.status === 'pending')
                  .map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <h3 className="font-semibold">{booking.listing_name}</h3>
                              <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-500">
                                Pending
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{booking.dates}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{booking.guest_name} • {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>Booked on {new Date(booking.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-lg font-semibold">${booking.total_amount}</div>
                            <div className="text-sm text-muted-foreground">Total Amount</div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="confirmed" className="space-y-4">
            {filteredBookings.filter(b => b.status === 'confirmed').length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No confirmed bookings found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings
                  .filter(booking => booking.status === 'confirmed')
                  .map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <h3 className="font-semibold">{booking.listing_name}</h3>
                              <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500">
                                Confirmed
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{booking.dates}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="h-3.5 w-3.5 mr-1" />
                              <span>{booking.guest_name} • {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>Booked on {new Date(booking.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-lg font-semibold">${booking.total_amount}</div>
                            <div className="text-sm text-muted-foreground">Total Amount</div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProviderBookingsPage;
