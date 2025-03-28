
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for the dashboard
const mockBookingStats = [
  { month: 'Jan', bookings: 30 },
  { month: 'Feb', bookings: 40 },
  { month: 'Mar', bookings: 45 },
  { month: 'Apr', bookings: 60 },
  { month: 'May', bookings: 75 },
  { month: 'Jun', bookings: 65 },
  { month: 'Jul', bookings: 90 },
  { month: 'Aug', bookings: 120 },
  { month: 'Sep', bookings: 80 },
  { month: 'Oct', bookings: 70 },
  { month: 'Nov', bookings: 50 },
  { month: 'Dec', bookings: 45 },
];

const mockRevenueStats = [
  { month: 'Jan', revenue: 3000 },
  { month: 'Feb', revenue: 4000 },
  { month: 'Mar', revenue: 4500 },
  { month: 'Apr', revenue: 6000 },
  { month: 'May', revenue: 7500 },
  { month: 'Jun', revenue: 6500 },
  { month: 'Jul', revenue: 9000 },
  { month: 'Aug', revenue: 12000 },
  { month: 'Sep', revenue: 8000 },
  { month: 'Oct', revenue: 7000 },
  { month: 'Nov', revenue: 5000 },
  { month: 'Dec', revenue: 4500 },
];

const mockChartData = [
  { name: 'Makkah', value: 65 },
  { name: 'Madinah', value: 35 },
];

const mockHotels = [
  {
    id: "hotel-1",
    name: "Grand Makkah Hotel",
    city: "Makkah",
    address: "King Abdul Aziz Road",
    description: "Luxury hotel with a view of Haram",
    rating: 4.7,
    price_per_night: 250,
    distance_to_haram: "500m",
    amenities: ["Free WiFi", "Breakfast", "Parking", "Prayer Room"],
    thumbnail: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?auto=format&fit=crop&w=800&q=80",
    is_internal: true
  }
];

const mockPackages = [
  {
    id: "package-1",
    name: "Premium Umrah Package",
    description: "10-day all-inclusive Umrah experience with 5-star accommodations",
    price: 1500,
    duration_days: 10,
    start_date: "2023-12-15",
    end_date: "2023-12-25",
    thumbnail: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Makkah",
    is_internal: true
  }
];

const mockRecentBookings = [
  {
    id: "booking-1",
    customer_name: "Mohammed Ahmed",
    item_name: "Grand Makkah Hotel",
    booking_date: "2023-11-05",
    check_in: "2023-12-15",
    check_out: "2023-12-20",
    amount: 1250,
    status: "confirmed"
  },
  {
    id: "booking-2",
    customer_name: "Sarah Khan",
    item_name: "Premium Umrah Package",
    booking_date: "2023-11-02",
    check_in: "2023-12-10",
    check_out: "2023-12-20",
    amount: 1500,
    status: "pending"
  },
  {
    id: "booking-3",
    customer_name: "Abdullah Ali",
    item_name: "Grand Makkah Hotel",
    booking_date: "2023-10-28",
    check_in: "2023-11-15",
    check_out: "2023-11-20",
    amount: 1250,
    status: "confirmed"
  },
  {
    id: "booking-4",
    customer_name: "Fatima Hassan",
    item_name: "Standard Umrah Package",
    booking_date: "2023-10-25",
    check_in: "2023-11-10",
    check_out: "2023-11-17",
    amount: 950,
    status: "confirmed"
  }
];

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Al-Haram Hotels & Services
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/provider/listings')}>Manage Listings</Button>
          <Button variant="outline" onClick={() => navigate('/provider/bookings')}>View Bookings</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Total Listings</span>
              <span className="text-3xl font-bold">8</span>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <span>+2 this month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Active Bookings</span>
              <span className="text-3xl font-bold">24</span>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <span>+5 since last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Monthly Revenue</span>
              <span className="text-3xl font-bold">$15,580</span>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <span>+12% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-1.5">
              <span className="text-muted-foreground text-sm">Average Rating</span>
              <span className="text-3xl font-bold">4.8/5</span>
              <div className="flex items-center text-xs text-amber-500 mt-1">
                <span>Based on 156 reviews</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Trends</CardTitle>
            <CardDescription>Monthly booking trends for the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockBookingStats}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="hsl(var(--primary))" 
                    fill="hsla(var(--primary), 0.1)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue (in USD) for the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockRevenueStats}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsla(var(--primary), 0.8)"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Your most recent booking requests and confirmations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Customer</th>
                  <th className="text-left p-2 font-medium">Item</th>
                  <th className="text-left p-2 font-medium">Date</th>
                  <th className="text-left p-2 font-medium">Amount</th>
                  <th className="text-left p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentBookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{booking.customer_name}</td>
                    <td className="p-2">{booking.item_name}</td>
                    <td className="p-2">{booking.check_in} to {booking.check_out}</td>
                    <td className="p-2">${booking.amount}</td>
                    <td className="p-2">
                      <Badge 
                        variant={
                          booking.status === "confirmed" ? "default" : 
                          booking.status === "pending" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={() => navigate('/provider/bookings')}>
              View All Bookings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Listings Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Your Listings</CardTitle>
          <CardDescription>A preview of your current offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hotels">
            <TabsList className="mb-4">
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>
            <TabsContent value="hotels" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockHotels.map(hotel => (
                  <motion.div key={hotel.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <HotelCard hotel={hotel} buttonText="View Details" />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="packages" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPackages.map(pkg => (
                  <motion.div key={pkg.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <PackageCard package={pkg} buttonText="View Details" />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => navigate('/provider/listings')}>
              Manage All Listings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
