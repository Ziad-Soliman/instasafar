
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash, ExternalLink, MapPin } from "lucide-react";

const AdminExternalListings: React.FC = () => {
  // This would typically fetch external listing data from your API
  const externalListings = [
    {
      id: "1",
      listing_type: "hotel",
      name: "Makkah Hilton Hotel",
      description: "5-star hotel with excellent amenities near Haram",
      city: "Makkah",
      provider_name: "Booking.com",
      redirect_url: "https://booking.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $200/night",
      rating_indication: "4.7 (1,245 reviews)",
    },
    {
      id: "2",
      listing_type: "hotel",
      name: "Madinah Oberoi",
      description: "Luxury hotel with spacious rooms and great service",
      city: "Madinah",
      provider_name: "Agoda",
      redirect_url: "https://agoda.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $180/night",
      rating_indication: "4.5 (980 reviews)",
    },
    {
      id: "3",
      listing_type: "flight",
      name: "Jeddah to Makkah Flights",
      description: "Direct flights from major cities to Jeddah",
      city: "Jeddah",
      provider_name: "Skyscanner",
      redirect_url: "https://skyscanner.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $450",
      rating_indication: "Multiple airlines",
    },
    {
      id: "4",
      listing_type: "transport",
      name: "Makkah-Madinah Transport",
      description: "Comfortable transportation between holy cities",
      city: "Makkah & Madinah",
      provider_name: "GetYourGuide",
      redirect_url: "https://getyourguide.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $50",
      rating_indication: "4.6 (350 reviews)",
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
            <h1 className="text-3xl font-bold">External Listings</h1>
            <p className="text-muted-foreground">Manage redirections to external booking platforms</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" /> Add New Listing
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search external listings..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {externalListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="h-40 bg-muted">
                <img 
                  src={listing.image_url} 
                  alt={listing.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="capitalize">
                    {listing.listing_type}
                  </Badge>
                  <Button variant="ghost" size="icon" asChild>
                    <a 
                      href={listing.redirect_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{listing.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{listing.city}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {listing.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <div className="font-medium">{listing.price_indication}</div>
                    <div className="text-muted-foreground text-xs">{listing.rating_indication}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Via {listing.provider_name}</div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    <Trash className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
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

export default AdminExternalListings;
