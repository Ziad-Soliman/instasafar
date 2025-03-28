
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { HotelCard } from "@/components/cards/HotelCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Hotel, 
  Package, 
  TrendingUp, 
  Calendar, 
  Users, 
  Star, 
  DollarSign, 
  Plus,
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarRange,
  Wallet
} from "lucide-react";

// Mock data for dashboard
// Recent bookings
const recentBookings = [
  {
    id: "booking-1",
    reference: "INS-12345",
    created_at: "2023-10-15T12:30:00Z",
    status: "confirmed",
    total_price: 750,
    item_name: "Al Safwah Royale Orchid Hotel",
    customer_name: "Ahmed Ali",
    check_in: "2023-11-10",
    check_out: "2023-11-15",
    type: "hotel"
  },
  {
    id: "booking-2",
    reference: "INS-12346",
    created_at: "2023-10-16T15:45:00Z",
    status: "pending",
    total_price: 1200,
    item_name: "Premium Umrah Package - 7 Days",
    customer_name: "Fatima Hassan",
    check_in: "2023-11-20",
    check_out: "2023-11-27",
    type: "package"
  },
  {
    id: "booking-3",
    reference: "INS-12347",
    created_at: "2023-10-18T09:15:00Z",
    status: "confirmed",
    total_price: 450,
    item_name: "Elaf Ajyad Hotel",
    customer_name: "Mohammad Sayed",
    check_in: "2023-12-05",
    check_out: "2023-12-10",
    type: "hotel"
  }
];

// Featured listings
const featuredHotel = {
  id: "hotel-1",
  name: "Al Safwah Royale Orchid Hotel",
  city: "Makkah",
  address: "Ajyad Street, Near Haram",
  description: "Luxurious 5-star hotel with direct views of the Holy Masjid Al Haram, offering elegant rooms and suites with modern amenities and exceptional service.",
  rating: 4.7,
  price_per_night: 350,
  distance_to_haram: "250 meters",
  amenities: ["Free WiFi", "24/7 Room Service", "Prayer Room", "Restaurant", "Concierge"],
  thumbnail: "/placeholder.svg",
  is_internal: true
};

const featuredPackage = {
  id: "package-1",
  name: "Premium Umrah Package - 7 Days",
  description: "All-inclusive 7-day Umrah package with 5-star accommodations in Makkah and Madinah, private transportation, guided tours, and all necessary arrangements.",
  price: 1500,
  duration_days: 7,
  start_date: "2023-11-15",
  end_date: "2023-11-22",
  thumbnail: "/placeholder.svg",
  includes_hotel: true,
  includes_flight: true,
  includes_transport: true,
  city: "Makkah & Madinah",
  is_internal: true
};

// Notifications
const notifications = [
  {
    id: "notif-1",
    message: "New booking received for Al Safwah Royale Orchid Hotel",
    time: "2 hours ago",
    read: false
  },
  {
    id: "notif-2",
    message: "Your listing 'Premium Umrah Package' has been approved",
    time: "1 day ago",
    read: false
  },
  {
    id: "notif-3",
    message: "Booking #INS-12345 has been confirmed by admin",
    time: "2 days ago",
    read: true
  },
  {
    id: "notif-4",
    message: "Your profile information has been updated successfully",
    time: "3 days ago",
    read: true
  }
];

// Chart data
const bookingChartData = [
  { name: 'Jan', bookings: 4 },
  { name: 'Feb', bookings: 6 },
  { name: 'Mar', bookings: 8 },
  { name: 'Apr', bookings: 10 },
  { name: 'May', bookings: 12 },
  { name: 'Jun', bookings: 8 },
  { name: 'Jul', bookings: 14 },
  { name: 'Aug', bookings: 18 },
  { name: 'Sep', bookings: 20 },
  { name: 'Oct', bookings: 15 },
  { name: 'Nov', bookings: 22 },
  { name: 'Dec', bookings: 25 }
];

const revenueData = [
  { name: 'Hotels', value: 65000 },
  { name: 'Packages', value: 45000 },
  { name: 'Transport', value: 25000 }
];

// Stats data
const stats = {
  total_listings: 15,
  total_bookings: 187,
  completed_bookings: 152,
  total_revenue: 75680,
  avg_rating: 4.8
};

const ProviderDashboardPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
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
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your InstaSafar provider portal.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/provider/listings')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Listing
          </Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Listings</p>
              <h3 className="text-2xl font-bold">{stats.total_listings}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Hotel className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <h3 className="text-2xl font-bold">{stats.total_bookings}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-bold">{stats.completed_bookings}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">${Math.floor(stats.total_revenue/1000)}k</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
              <h3 className="text-2xl font-bold">{stats.avg_rating}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Charts Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Analytics</CardTitle>
            <CardDescription>Overview of your booking performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bookings">
              <TabsList className="mb-4">
                <TabsTrigger value="bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="revenue">
                  <Wallet className="mr-2 h-4 w-4" />
                  Revenue
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={bookingChartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#9b87f5" 
                        fillOpacity={1} 
                        fill="url(#colorBookings)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="revenue">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${formatCurrency(Number(value))}`, 'Revenue']}
                      />
                      <Bar dataKey="value" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent updates and alerts</CardDescription>
            </div>
            <Badge className="bg-primary">{notifications.filter(n => !n.read).length} New</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex gap-4 p-3 rounded-lg ${notification.read ? 'bg-muted/30' : 'bg-primary/5'}`}
                >
                  <div className={`mt-1 h-2 w-2 rounded-full ${notification.read ? 'bg-muted-foreground' : 'bg-primary'}`}></div>
                  <div>
                    <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activity for your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex flex-col sm:flex-row justify-between p-4 border rounded-lg">
                  <div className="flex gap-4 mb-4 sm:mb-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/60">
                      {booking.type === 'hotel' ? (
                        <Hotel className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">#{booking.reference}</span>
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="text-sm">{booking.item_name}</p>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        {booking.customer_name}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end">
                    <div className="font-medium">{formatCurrency(booking.total_price)}</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <CalendarRange className="h-3 w-3 mr-1" />
                      {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Booked {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/provider/bookings')}>
              View All Bookings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Featured Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Listings</CardTitle>
            <CardDescription>Your top performing listings</CardDescription>
          </CardHeader>
          <CardContent className="px-3">
            <Tabs defaultValue="hotel">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="hotel">
                  <Hotel className="mr-2 h-4 w-4" />
                  Hotel
                </TabsTrigger>
                <TabsTrigger value="package">
                  <Package className="mr-2 h-4 w-4" />
                  Package
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="hotel" className="m-0">
                <HotelCard hotel={featuredHotel} buttonText="View Details" />
              </TabsContent>
              
              <TabsContent value="package" className="m-0">
                <PackageCard package={featuredPackage} buttonText="View Details" />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/provider/listings')}>
              Manage All Listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProviderDashboardPage;
