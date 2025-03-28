
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Calendar, Users, ChevronRight, Package, Hotel } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Define the booking interface
interface Booking {
  id: string;
  booking_ref: string;
  user_id: string;
  item_id: string;
  item_name: string;
  item_type: "hotel" | "package";
  thumbnail: string;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

// Mock fetch bookings function
const fetchUserBookings = (userId: string): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "booking-1",
          booking_ref: "INS-12345678",
          user_id: userId,
          item_id: "hotel-1",
          item_name: "Grand Makkah Hotel - Deluxe Room",
          item_type: "hotel",
          thumbnail: "/placeholder.svg",
          start_date: "2023-11-15",
          end_date: "2023-11-20",
          guests: 2,
          total_price: 1200,
          status: "confirmed",
          created_at: "2023-10-20T14:23:54Z"
        },
        {
          id: "booking-2",
          booking_ref: "INS-87654321",
          user_id: userId,
          item_id: "package-1",
          item_name: "Complete Umrah Package",
          item_type: "package",
          thumbnail: "/placeholder.svg",
          start_date: "2024-01-10",
          end_date: "2024-01-17",
          guests: 1,
          total_price: 1200,
          status: "pending",
          created_at: "2023-10-25T09:15:32Z"
        },
        {
          id: "booking-3",
          booking_ref: "INS-24681357",
          user_id: userId,
          item_id: "hotel-2",
          item_name: "Madinah Plaza Hotel - Standard Room",
          item_type: "hotel",
          thumbnail: "/placeholder.svg",
          start_date: "2023-09-05",
          end_date: "2023-09-10",
          guests: 3,
          total_price: 900,
          status: "cancelled",
          created_at: "2023-08-15T11:42:18Z"
        }
      ]);
    }, 1500);
  });
};

// Status badge component
const StatusBadge: React.FC<{ status: Booking['status'] }> = ({ status }) => {
  const { t } = useLanguage();
  
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          {t("booking.status.confirmed")}
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          {t("booking.status.pending")}
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="outline" className="text-red-500 border-red-500">
          {t("booking.status.cancelled")}
        </Badge>
      );
    default:
      return null;
  }
};

const BookingsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Fetch user bookings
  useEffect(() => {
    const getBookings = async () => {
      if (!user) return;
      
      try {
        setLoadingBookings(true);
        const bookingsData = await fetchUserBookings(user.id);
        setBookings(bookingsData);
        setFilteredBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoadingBookings(false);
      }
    };
    
    if (user) {
      getBookings();
    }
  }, [user]);
  
  // Filter bookings based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === activeTab));
    }
  }, [activeTab, bookings]);
  
  // Show loading state if auth is still loading
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse text-center">{t("loading")}...</div>
        </div>
      </div>
    );
  }
  
  // Helper to format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  // Get icon based on item type
  const getItemIcon = (itemType: "hotel" | "package") => {
    return itemType === "hotel" ? (
      <Hotel className="h-4 w-4" />
    ) : (
      <Package className="h-4 w-4" />
    );
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t("account.bookings.title")}</h1>
          <p className="text-muted-foreground mb-6">{t("account.bookings.subtitle")}</p>
          
          <Tabs 
            defaultValue="all"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {loadingBookings ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <Skeleton className="h-36 w-full rounded-l-lg" />
                          </div>
                          <div className="p-4 md:col-span-2 space-y-4">
                            <div className="flex justify-between">
                              <Skeleton className="h-6 w-1/3" />
                              <Skeleton className="h-6 w-24" />
                            </div>
                            <Skeleton className="h-4 w-1/2" />
                            <div className="grid grid-cols-2 gap-2">
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-4 w-full" />
                            </div>
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-10 w-32" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                      <p className="text-muted-foreground mb-6">
                        {activeTab === "all" 
                          ? t("account.bookings.noBookings")
                          : `You don't have any ${activeTab} bookings.`
                        }
                      </p>
                      <Button asChild>
                        <Link to="/search">Browse Options</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredBookings.map((booking) => (
                        <Card key={booking.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="md:col-span-1">
                                <div className="h-full bg-muted">
                                  <img
                                    src={booking.thumbnail}
                                    alt={booking.item_name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              
                              <div className="p-6 md:col-span-2">
                                <div className="flex flex-wrap justify-between gap-2 mb-2">
                                  <h3 className="font-semibold">
                                    <div className="flex items-center">
                                      {getItemIcon(booking.item_type)}
                                      <span className="ml-2">{booking.item_name}</span>
                                    </div>
                                  </h3>
                                  <StatusBadge status={booking.status} />
                                </div>
                                
                                <p className="text-sm text-muted-foreground mb-4">
                                  Booking Reference: <span className="font-mono font-medium">{booking.booking_ref}</span>
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>
                                      {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{booking.guests} guests</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="font-medium">
                                    Total: ${booking.total_price}
                                  </div>
                                  
                                  <Button variant="outline" size="sm" asChild>
                                    <Link to={`/account/bookings/${booking.id}`}>
                                      {t("account.bookings.viewDetails")}
                                      <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingsPage;
