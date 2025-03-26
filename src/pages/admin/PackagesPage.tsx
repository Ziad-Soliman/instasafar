
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash, Calendar, MapPin } from "lucide-react";

const AdminPackages: React.FC = () => {
  // This would typically fetch package data from your API
  const packages = [
    {
      id: "1",
      name: "Complete Umrah Package",
      description: "7-day comprehensive package including hotel, flights, and transportation",
      price: 1200,
      duration_days: 7,
      start_date: "2023-11-10",
      end_date: "2023-11-17",
      includes_hotel: true,
      includes_flight: true,
      includes_transport: true,
      city: "Makkah & Madinah",
      status: "active",
    },
    {
      id: "2",
      name: "Makkah Luxury Stay",
      description: "5-star accommodation near Haram with guided tours",
      price: 950,
      duration_days: 5,
      start_date: "2023-12-01",
      end_date: "2023-12-06",
      includes_hotel: true,
      includes_flight: false,
      includes_transport: true,
      city: "Makkah",
      status: "active",
    },
    {
      id: "3",
      name: "Madinah Experience",
      description: "Explore the holy city of Madinah with comfortable accommodations",
      price: 850,
      duration_days: 4,
      start_date: "2023-12-10",
      end_date: "2023-12-14",
      includes_hotel: true,
      includes_flight: false,
      includes_transport: true,
      city: "Madinah",
      status: "active",
    },
    {
      id: "4",
      name: "Premium Hajj Package",
      description: "Complete Hajj package with premium services and accommodations",
      price: 3500,
      duration_days: 14,
      start_date: "2024-06-15",
      end_date: "2024-06-29",
      includes_hotel: true,
      includes_flight: true,
      includes_transport: true,
      city: "Makkah & Madinah",
      status: "upcoming",
    },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Packages</h1>
            <p className="text-muted-foreground">Manage your travel packages</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" /> Add New Package
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search packages..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pkg.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {pkg.status === 'active' ? 'Active' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">{pkg.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                          <div className="text-sm">{pkg.duration_days} days</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <div>
                          <div className="text-xs text-muted-foreground">Location</div>
                          <div className="text-sm">{pkg.city}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Travel Dates</div>
                        <div className="text-sm">
                          {formatDate(pkg.start_date)} - {formatDate(pkg.end_date)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">${pkg.price}</div>
                    <div className="text-sm text-muted-foreground mb-4">per person</div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.includes_hotel && (
                    <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                      Hotel
                    </div>
                  )}
                  {pkg.includes_flight && (
                    <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                      Flight
                    </div>
                  )}
                  {pkg.includes_transport && (
                    <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                      Transport
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPackages;
