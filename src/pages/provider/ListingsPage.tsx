
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Hotel, Package, Plus, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProviderListingsPage: React.FC = () => {
  const { t } = useLanguage();

  // Mock data for listings
  const hotels = [
    {
      id: "hotel-1",
      name: "Grand Makkah Hotel",
      location: "500m from Haram • Makkah",
      rooms_available: 3,
      thumbnail: "/placeholder.svg",
    },
    {
      id: "hotel-2",
      name: "Madinah Plaza Hotel",
      location: "800m from Haram • Madinah",
      rooms_available: 5,
      thumbnail: "/placeholder.svg",
    },
  ];

  const packages = [
    {
      id: "package-1",
      name: "Premium Umrah Package",
      details: "7 days • Hotel + Transport",
      price: 1200,
      thumbnail: "/placeholder.svg",
    },
    {
      id: "package-2",
      name: "Economy Hajj Package",
      details: "10 days • All-inclusive",
      price: 2500,
      thumbnail: "/placeholder.svg",
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
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground">Manage your hotels and packages</p>
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

        <Tabs defaultValue="hotels" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="hotels">
              <Hotel className="h-4 w-4 mr-2" />
              Hotels
            </TabsTrigger>
            <TabsTrigger value="packages">
              <Package className="h-4 w-4 mr-2" />
              Packages
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="hotels" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden">
                  <div className="h-40 bg-muted">
                    <img 
                      src={hotel.thumbnail} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-base">{hotel.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      {hotel.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">{hotel.rooms_available} rooms available</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/provider/listings/hotel-${hotel.id}`}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add New Hotel Card */}
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
              {packages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden">
                  <div className="h-40 bg-muted">
                    <img 
                      src={pkg.thumbnail} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-base">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      {pkg.details}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">${pkg.price} per person</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/provider/listings/package-${pkg.id}`}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                      </div>
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
      </motion.div>
    </div>
  );
};

export default ProviderListingsPage;
