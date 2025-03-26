
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, Hotel, Package, Wallet, TrendingUp, Calendar, 
  ArrowUpRight, ArrowDownRight 
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard
  const bookingsData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 61 },
    { month: 'Apr', value: 58 },
    { month: 'May', value: 75 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 108 },
    { month: 'Aug', value: 120 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 73 },
    { month: 'Nov', value: 65 },
    { month: 'Dec', value: 82 },
  ];
  
  const revenueData = [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 14500 },
    { month: 'Mar', value: 18200 },
    { month: 'Apr', value: 16800 },
    { month: 'May', value: 21000 },
    { month: 'Jun', value: 25400 },
    { month: 'Jul', value: 30200 },
    { month: 'Aug', value: 32500 },
    { month: 'Sep', value: 24100 },
    { month: 'Oct', value: 20500 },
    { month: 'Nov', value: 18600 },
    { month: 'Dec', value: 23400 },
  ];
  
  const bookingsPieData = [
    { name: 'Makkah Hotels', value: 65 },
    { name: 'Madinah Hotels', value: 35 },
  ];
  
  const pieColors = ['#4f46e5', '#8b5cf6'];
  
  const statsCards = [
    {
      title: "Total Bookings",
      value: "842",
      change: "+12.5%",
      trend: "up",
      icon: Calendar,
      description: "vs. last month"
    },
    {
      title: "Active Users",
      value: "2,841",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      description: "vs. last month"
    },
    {
      title: "Total Revenue",
      value: "$258,400",
      change: "+5.7%",
      trend: "up",
      icon: Wallet,
      description: "vs. last month"
    },
    {
      title: "Conversion Rate",
      value: "12.8%",
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp,
      description: "vs. last month"
    },
  ];
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {card.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={card.trend === "up" ? "text-green-500 text-sm font-medium" : "text-red-500 text-sm font-medium"}>
                    {card.change}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">{card.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Booking Overview</CardTitle>
              <CardDescription>Number of bookings per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bookingsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Booking Distribution</CardTitle>
              <CardDescription>Hotels by city</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bookingsPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {bookingsPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="popular">Popular Hotels</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
                <CardDescription>Summary of your business performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Hotel className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Hotels</h3>
                    </div>
                    <div className="text-2xl font-bold">28</div>
                    <div className="text-sm text-muted-foreground mt-1">Active listings</div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Package className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Packages</h3>
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground mt-1">Active packages</div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Users</h3>
                    </div>
                    <div className="text-2xl font-bold">2,841</div>
                    <div className="text-sm text-muted-foreground mt-1">Registered users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue in USD</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4f46e5" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Popular Hotels</CardTitle>
                <CardDescription>Most booked hotels this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Grand Makkah Hotel", location: "Makkah", bookings: 124, revenue: 32600 },
                    { name: "Madinah Luxury Suites", location: "Madinah", bookings: 98, revenue: 25400 },
                    { name: "Al Safwah Royal Orchid", location: "Makkah", bookings: 86, revenue: 22500 },
                    { name: "Dar Al Taqwa Hotel", location: "Madinah", bookings: 72, revenue: 18200 },
                    { name: "Hilton Makkah Convention", location: "Makkah", bookings: 65, revenue: 17800 },
                  ].map((hotel, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary mr-4">
                          <Hotel className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{hotel.name}</h4>
                          <p className="text-sm text-muted-foreground">{hotel.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{hotel.bookings} bookings</div>
                        <div className="text-sm text-muted-foreground">${hotel.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
