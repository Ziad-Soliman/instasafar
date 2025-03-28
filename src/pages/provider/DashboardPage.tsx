
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Calendar, Hotel, Package, Plus, User, Users } from "lucide-react";

const ProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Mock statistics
  const stats = [
    {
      title: "Total Listings",
      value: "5",
      description: "Active properties",
      icon: <Building className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Active Bookings",
      value: "12",
      description: "For upcoming dates",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Total Guests",
      value: "54",
      description: "This month",
      icon: <Users className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Inquiries",
      value: "3",
      description: "Pending responses",
      icon: <User className="h-5 w-5 text-purple-500" />,
    },
  ];

  // Mock recent bookings
  const recentBookings = [
    {
      id: "b1",
      guest: "Ahmed Mohamed",
      property: "Deluxe Room - Grand Makkah Hotel",
      dates: "Nov 15 - Nov 20, 2023",
      status: "confirmed",
    },
    {
      id: "b2",
      guest: "Sarah Johnson",
      property: "Family Suite - Madinah View Hotel",
      dates: "Dec 5 - Dec 10, 2023",
      status: "pending",
    },
    {
      id: "b3",
      guest: "Mohammed Rahman",
      property: "Standard Room - Makkah Plaza",
      dates: "Dec 20 - Dec 25, 2023",
      status: "confirmed",
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Provider Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.full_name}</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button asChild>
              <Link to="/provider/listings/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Listing
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Recent booking activity for your properties</CardDescription>
            </CardHeader>
            <CardContent>
              {recentBookings.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No recent bookings found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{booking.guest}</p>
                        <p className="text-sm text-muted-foreground">{booking.property}</p>
                        <p className="text-sm">{booking.dates}</p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-800/20 dark:text-green-500' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-800/20 dark:text-amber-500'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link to="/provider/bookings">
                    View All Bookings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/provider/listings">
                  <Hotel className="mr-2 h-4 w-4" />
                  Manage Hotels
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/provider/listings?type=package">
                  <Package className="mr-2 h-4 w-4" />
                  Manage Packages
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/provider/bookings?status=pending">
                  <Calendar className="mr-2 h-4 w-4" />
                  Review Pending Bookings
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/provider/profile">
                  <User className="mr-2 h-4 w-4" />
                  Update Provider Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Listing Tab Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Listings Overview</h2>
          <Tabs defaultValue="hotels">
            <TabsList className="mb-4">
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>
            <TabsContent value="hotels" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-muted">
                      <img 
                        src="/placeholder.svg" 
                        alt="Hotel thumbnail" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-base">Grand Makkah Hotel</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        500m from Haram • Makkah
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">3 rooms available</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/provider/listings/hotel-${i}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add New Listing Card */}
                <Card className="overflow-hidden border-dashed">
                  <div className="h-full p-4 flex flex-col items-center justify-center min-h-[200px]">
                    <Plus className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-center font-medium mb-2">Add New Hotel</h3>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      List a new property on InstaSafar
                    </p>
                    <Button asChild>
                      <Link to="/provider/listings/new?type=hotel">
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="packages" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-40 bg-muted">
                      <img 
                        src="/placeholder.svg" 
                        alt="Package thumbnail" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-base">Premium Umrah Package</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        7 days • Hotel + Transport
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">$1,200 per person</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/provider/listings/package-${i}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add New Package Card */}
                <Card className="overflow-hidden border-dashed">
                  <div className="h-full p-4 flex flex-col items-center justify-center min-h-[200px]">
                    <Plus className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-center font-medium mb-2">Add New Package</h3>
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Create a new Hajj or Umrah package
                    </p>
                    <Button asChild>
                      <Link to="/provider/listings/new?type=package">
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default ProviderDashboard;
