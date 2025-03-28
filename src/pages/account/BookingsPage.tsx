
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, Hotel, MapPin, Package, Search, User } from "lucide-react";

// Define booking type
interface Booking {
  id: string;
  booking_ref: string;
  user_id: string;
  item_type: "hotel" | "package";
  item_id: string;
  item_name: string;
  item_image: string;
  check_in: string;
  check_out: string;
  guests: {
    adults: number;
    children: number;
  };
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  city: string;
}

const BookingsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate number of nights
  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real implementation, we would fetch bookings from Supabase
        // Mock API call - would be replaced with Supabase query
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock bookings data
        const mockBookings: Booking[] = [
          {
            id: "1",
            booking_ref: "BK1234",
            user_id: user.id,
            item_type: "hotel",
            item_id: "hotel-1",
            item_name: "Grand Makkah Hotel",
            item_image: "/placeholder.svg",
            check_in: "2023-12-10",
            check_out: "2023-12-15",
            guests: {
              adults: 2,
              children: 1,
            },
            total_price: 1380,
            status: "confirmed",
            created_at: "2023-11-05T10:30:00Z",
            city: "Makkah",
          },
          {
            id: "2",
            booking_ref: "BK5678",
            user_id: user.id,
            item_type: "package",
            item_id: "package-1",
            item_name: "Complete Umrah Package",
            item_image: "/placeholder.svg",
            check_in: "2024-01-20",
            check_out: "2024-01-27",
            guests: {
              adults: 2,
              children: 0,
            },
            total_price: 2450,
            status: "pending",
            created_at: "2023-11-10T15:45:00Z",
            city: "Makkah & Madinah",
          },
          {
            id: "3",
            booking_ref: "BK9012",
            user_id: user.id,
            item_type: "hotel",
            item_id: "hotel-2",
            item_name: "Madinah Plaza Hotel",
            item_image: "/placeholder.svg",
            check_in: "2023-10-05",
            check_out: "2023-10-10",
            guests: {
              adults: 1,
              children: 0,
            },
            total_price: 950,
            status: "cancelled",
            created_at: "2023-09-20T09:15:00Z",
            city: "Madinah",
          },
        ];
        
        setBookings(mockBookings);
        setFilteredBookings(mockBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Error",
          description: "Failed to load your bookings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [user, toast]);
  
  // Filter bookings based on search query and status filter
  useEffect(() => {
    let filtered = [...bookings];
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        booking =>
          booking.booking_ref.toLowerCase().includes(query) ||
          booking.item_name.toLowerCase().includes(query) ||
          booking.city.toLowerCase().includes(query)
      );
    }
    
    setFilteredBookings(filtered);
  }, [searchQuery, statusFilter, bookings]);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-8">View and manage your travel bookings</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by booking reference, hotel name, or destination"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="pt-10 pb-10 text-center">
              <div className="mb-4">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "No bookings match your search or filter criteria."
                  : "You haven't made any bookings yet."}
              </p>
              <Button asChild>
                <Link to="/search">Find Hotels & Packages</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <div className="lg:flex">
                  <div className="w-full lg:w-1/4 h-40 lg:h-auto bg-muted relative">
                    <img
                      src={booking.item_image}
                      alt={booking.item_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {booking.item_type === "hotel" ? (
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium flex items-center">
                          <Hotel className="w-3 h-3 mr-1" />
                          <span>Hotel</span>
                        </div>
                      ) : (
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium flex items-center">
                          <Package className="w-3 h-3 mr-1" />
                          <span>Package</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.item_name}</h3>
                        <div className="flex items-center text-muted-foreground text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{booking.city}</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 md:text-right">
                        <div className="text-sm font-medium">Booking Ref:</div>
                        <div className="text-sm font-mono">{booking.booking_ref}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium">Dates</div>
                        <div className="text-sm flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {calculateNights(booking.check_in, booking.check_out)} nights
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Guests</div>
                        <div className="text-sm flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {booking.guests.adults} {booking.guests.adults === 1 ? 'adult' : 'adults'}
                          {booking.guests.children > 0 && `, ${booking.guests.children} ${booking.guests.children === 1 ? 'child' : 'children'}`}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium">Booked on</div>
                        <div className="text-sm flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(booking.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <div className="text-sm font-medium">Total Price</div>
                        <div className="font-bold">${booking.total_price}</div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="self-start sm:self-auto">
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/account/bookings/${booking.id}`}>
                            View Details
                          </Link>
                        </Button>
                        
                        {booking.status === "confirmed" && (
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingsPage;
