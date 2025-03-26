
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash, Star } from "lucide-react";

const AdminHotels: React.FC = () => {
  // This would typically fetch hotel data from your API
  const hotels = [
    {
      id: "1",
      name: "Grand Makkah Hotel",
      city: "Makkah",
      distance_to_haram: "300m",
      rating: 4.8,
      price_per_night: 240,
      status: "active",
    },
    {
      id: "2",
      name: "Madinah Luxury Suites",
      city: "Madinah",
      distance_to_haram: "500m",
      rating: 4.5,
      price_per_night: 180,
      status: "active",
    },
    {
      id: "3",
      name: "Al Safwah Royal Orchid",
      city: "Makkah",
      distance_to_haram: "200m",
      rating: 4.9,
      price_per_night: 280,
      status: "active",
    },
    {
      id: "4",
      name: "Dar Al Taqwa Hotel",
      city: "Madinah",
      distance_to_haram: "450m",
      rating: 4.6,
      price_per_night: 195,
      status: "inactive",
    },
    {
      id: "5",
      name: "Hilton Makkah Convention",
      city: "Makkah",
      distance_to_haram: "350m",
      rating: 4.7,
      price_per_night: 260,
      status: "active",
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
            <h1 className="text-3xl font-bold">Hotels</h1>
            <p className="text-muted-foreground">Manage your hotel listings</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" /> Add New Hotel
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search hotels..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Hotel Name</th>
                  <th className="text-left py-3 px-4 font-medium">City</th>
                  <th className="text-left py-3 px-4 font-medium">Distance to Haram</th>
                  <th className="text-left py-3 px-4 font-medium">Rating</th>
                  <th className="text-left py-3 px-4 font-medium">Price/Night</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {hotels.map((hotel) => (
                  <tr key={hotel.id}>
                    <td className="py-3 px-4">
                      <div className="font-medium">{hotel.name}</div>
                    </td>
                    <td className="py-3 px-4">{hotel.city}</td>
                    <td className="py-3 px-4">{hotel.distance_to_haram}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>{hotel.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">${hotel.price_per_night}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        hotel.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {hotel.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="py-4 px-6 bg-muted/50 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHotels;
