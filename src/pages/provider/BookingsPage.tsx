
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, 
  Clock, 
  Hotel, 
  Package, 
  Search,
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  CreditCard,
  CheckCircle2,
  HelpCircle,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";

// Types
interface Booking {
  id: string;
  reference: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  total_price: number;
  booking_type: 'hotel' | 'package';
  check_in?: string;
  check_out?: string;
  guests: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  item: {
    id: string;
    name: string;
    thumbnail: string;
    location?: string;
  };
}

const ProviderBookingsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  // State for bookings
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  
  // Fetch bookings (mock)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBookings: Booking[] = [
        {
          id: "booking-1",
          reference: "INS-12345",
          created_at: "2023-10-15T12:30:00Z",
          status: "confirmed",
          total_price: 750,
          booking_type: "hotel",
          check_in: "2023-11-10",
          check_out: "2023-11-15",
          guests: 2,
          customer: {
            name: "Ahmed Ali",
            email: "ahmed.ali@example.com",
            phone: "+966 50 123 4567"
          },
          item: {
            id: "hotel-1",
            name: "Al Safwah Royale Orchid Hotel",
            thumbnail: "/placeholder.svg",
            location: "Makkah, 250m from Haram"
          }
        },
        {
          id: "booking-2",
          reference: "INS-12346",
          created_at: "2023-10-16T15:45:00Z",
          status: "pending",
          total_price: 1200,
          booking_type: "package",
          check_in: "2023-11-20",
          check_out: "2023-11-27",
          guests: 1,
          customer: {
            name: "Fatima Hassan",
            email: "fatima.h@example.com",
            phone: "+966 55 987 6543"
          },
          item: {
            id: "package-1",
            name: "Premium Umrah Package - 7 Days",
            thumbnail: "/placeholder.svg",
            location: "Makkah & Madinah"
          }
        },
        {
          id: "booking-3",
          reference: "INS-12347",
          created_at: "2023-10-18T09:15:00Z",
          status: "cancelled",
          total_price: 450,
          booking_type: "hotel",
          check_in: "2023-12-05",
          check_out: "2023-12-10",
          guests: 3,
          customer: {
            name: "Mohammad Sayed",
            email: "mohammad.s@example.com",
            phone: "+966 55 111 2222"
          },
          item: {
            id: "hotel-2",
            name: "Elaf Ajyad Hotel",
            thumbnail: "/placeholder.svg",
            location: "Makkah, 450m from Haram"
          }
        },
        {
          id: "booking-4",
          reference: "INS-12348",
          created_at: "2023-10-20T14:10:00Z",
          status: "confirmed",
          total_price: 1500,
          booking_type: "package",
          check_in: "2023-12-15",
          check_out: "2023-12-25",
          guests: 2,
          customer: {
            name: "Aisha Mahmoud",
            email: "aisha.m@example.com",
            phone: "+966 50 444 5555"
          },
          item: {
            id: "package-2",
            name: "Standard Umrah Package - 10 Days",
            thumbnail: "/placeholder.svg",
            location: "Makkah & Madinah"
          }
        }
      ];
      
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 1500);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = bookings;
    
    // Apply search term
    if (searchTerm.trim()) {
      result = result.filter(booking => 
        booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter(booking => booking.booking_type === typeFilter);
    }
    
    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
      
      switch (dateFilter) {
        case "30days":
          result = result.filter(booking => new Date(booking.created_at) >= thirtyDaysAgo);
          break;
        case "90days":
          result = result.filter(booking => new Date(booking.created_at) >= ninetyDaysAgo);
          break;
        // Additional date filters could be added here
      }
    }
    
    setFilteredBookings(result);
  }, [searchTerm, statusFilter, typeFilter, dateFilter, bookings]);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/90">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/90">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/90">Cancelled</Badge>;
      default:
        return <Badge className="bg-slate-500/90">Unknown</Badge>;
    }
  };
  
  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Hotel className="h-4 w-4" />;
      case "package":
        return <Package className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bookings Management</h1>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search" className="text-sm">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search by reference, name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status" className="text-sm">Status</Label>
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="type" className="text-sm">Type</Label>
              <Select defaultValue={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hotel">Hotels</SelectItem>
                  <SelectItem value="package">Packages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date" className="text-sm">Date Range</Label>
              <Select defaultValue={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger id="date">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex gap-4 mb-4 md:mb-0">
                      <Skeleton className="w-16 h-16 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-10">
                  <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Bookings Found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    There are no bookings matching your current filters. Try adjusting your search criteria.
                  </p>
                  <Button onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                    setDateFilter("all");
                  }}>
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <Tabs defaultValue="summary">
                      <div className="bg-muted/30 p-4 border-b">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                              <img 
                                src={booking.item.thumbnail} 
                                alt={booking.item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {getTypeIcon(booking.booking_type)}
                                  <span className="ml-1 capitalize">{booking.booking_type}</span>
                                </span>
                                {getStatusBadge(booking.status)}
                              </div>
                              <h3 className="font-medium">{booking.item.name}</h3>
                              <div className="text-xs text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" /> 
                                {booking.item.location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium">#{booking.reference}</div>
                            <div className="text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {formatDate(booking.created_at)}
                            </div>
                            <div className="text-sm font-semibold mt-1">
                              Total: ${booking.total_price}
                            </div>
                          </div>
                        </div>
                        
                        <TabsList className="mt-4">
                          <TabsTrigger value="summary">
                            Summary
                          </TabsTrigger>
                          <TabsTrigger value="customer">
                            Customer Details
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <CardContent className="p-6">
                        <TabsContent value="summary" className="m-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Booking Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Booking Date:</span>
                                  <span>{formatDate(booking.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Reference:</span>
                                  <span className="font-mono">{booking.reference}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status:</span>
                                  <span>{getStatusBadge(booking.status)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Stay Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Check-in:</span>
                                  <span>{booking.check_in ? formatDate(booking.check_in) : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Check-out:</span>
                                  <span>{booking.check_out ? formatDate(booking.check_out) : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Guests:</span>
                                  <span>{booking.guests}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Total Amount:</span>
                                  <span className="font-bold">${booking.total_price}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Payment Status:</span>
                                  <span>
                                    {booking.status === 'confirmed' ? (
                                      <Badge className="bg-green-500/90">Paid</Badge>
                                    ) : booking.status === 'pending' ? (
                                      <Badge className="bg-amber-500/90">Pending</Badge>
                                    ) : (
                                      <Badge className="bg-red-500/90">Cancelled</Badge>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex justify-end gap-2">
                            {booking.status === 'pending' && (
                              <div className="text-xs text-muted-foreground flex items-center mr-auto">
                                <HelpCircle className="h-3 w-3 mr-1" />
                                This booking is awaiting confirmation by the admin team
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="customer" className="m-0">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-1 md:col-span-2">
                              <h4 className="text-sm font-medium mb-2">Customer Information</h4>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                  <div>
                                    <div className="font-medium">{booking.customer.name}</div>
                                    <div className="text-xs text-muted-foreground">Primary Guest</div>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Mail className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                  <div>
                                    <div>{booking.customer.email}</div>
                                    <div className="text-xs text-muted-foreground">Email Address</div>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Phone className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                                  <div>
                                    <div>{booking.customer.phone}</div>
                                    <div className="text-xs text-muted-foreground">Phone Number</div>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <h4 className="text-sm font-medium mb-2">Guest Details</h4>
                              <div className="bg-muted/30 p-3 rounded-md">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {booking.status === 'pending' ? 
                                    'Additional guest details will be available after confirmation' : 
                                    'View the full booking confirmation for detailed guest information'}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Booking Status</h4>
                              <div className="space-y-4">
                                <div className={`flex items-center ${booking.status === 'confirmed' || booking.status === 'pending' || booking.status === 'cancelled' ? 'text-green-500' : 'text-muted-foreground'}`}>
                                  <CheckCircle2 className="h-5 w-5 mr-2" />
                                  <div>
                                    <div className="font-medium">Booking Received</div>
                                    <div className="text-xs text-muted-foreground">
                                      {formatDate(booking.created_at)}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className={`flex items-center ${booking.status === 'confirmed' ? 'text-green-500' : booking.status === 'pending' ? 'text-amber-500' : 'text-muted-foreground'}`}>
                                  {booking.status === 'confirmed' ? (
                                    <CheckCircle2 className="h-5 w-5 mr-2" />
                                  ) : booking.status === 'pending' ? (
                                    <HelpCircle className="h-5 w-5 mr-2" />
                                  ) : (
                                    <XCircle className="h-5 w-5 mr-2" />
                                  )}
                                  <div>
                                    <div className="font-medium">
                                      {booking.status === 'confirmed' ? 'Booking Confirmed' : 
                                       booking.status === 'pending' ? 'Awaiting Confirmation' : 
                                       'Booking Cancelled'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {booking.status === 'pending' ? 
                                        'The booking is being processed' : 
                                        'Status updated by admin'}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className={`flex items-center ${booking.status === 'confirmed' ? 'text-green-500' : 'text-muted-foreground'}`}>
                                  {booking.status === 'confirmed' ? (
                                    <CheckCircle2 className="h-5 w-5 mr-2" />
                                  ) : (
                                    <CreditCard className="h-5 w-5 mr-2" />
                                  )}
                                  <div>
                                    <div className="font-medium">Payment {booking.status === 'confirmed' ? 'Completed' : 'Pending'}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {booking.status === 'confirmed' ? 
                                        'Payment has been processed' : 
                                        'Awaiting payment processing'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </CardContent>
                    </Tabs>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProviderBookingsPage;
