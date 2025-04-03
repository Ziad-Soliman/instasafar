
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Hotel, Package, Bus, Loader } from "lucide-react";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import ExternalListingCard from "@/components/cards/ExternalListingCard";
import { featuredHotels, featuredPackages, externalListings } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const WishlistPage: React.FC = () => {
  const { items, isLoading } = useWishlist();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  // For demo purposes, we'll simulate fetching data based on wishlist IDs
  // In a real implementation, you would fetch the actual data from the API
  const savedHotels = items
    .filter(item => item.itemType === "hotel")
    .map(item => featuredHotels.find(hotel => hotel.id === item.id))
    .filter(Boolean);
    
  const savedPackages = items
    .filter(item => item.itemType === "package")
    .map(item => featuredPackages.find(pkg => pkg.id === item.id))
    .filter(Boolean);
    
  const savedTransport = items
    .filter(item => item.itemType === "transport")
    .map(item => externalListings.find(listing => 
      listing.id === item.id && listing.listing_type === "flight"))
    .filter(Boolean);
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your wishlist...</p>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg mx-auto"
        >
          <div className="bg-muted/50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Start saving your favorite hotels, packages, and transport options to plan your perfect journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => navigate("/search")}>
              Explore Hotels
            </Button>
            <Button variant="outline" onClick={() => navigate("/packages")}>
              View Packages
            </Button>
          </div>
        </motion.div>
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              Items you've saved for later
            </p>
          </div>
          <Heart className="h-6 w-6 text-red-500 fill-current" />
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all" className="flex items-center justify-center gap-2">
              <span>All</span>
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
                {items.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center justify-center gap-2">
              <Hotel size={14} />
              <span>Hotels</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center justify-center gap-2">
              <Package size={14} />
              <span>Packages</span>
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center justify-center gap-2">
              <Bus size={14} />
              <span>Transport</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {savedHotels.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Hotel size={18} className="mr-2" /> Hotels
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedHotels.map(hotel => (
                    hotel && <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </div>
            )}
            
            {savedPackages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Package size={18} className="mr-2" /> Packages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedPackages.map(pkg => (
                    pkg && <PackageCard key={pkg.id} package={pkg} />
                  ))}
                </div>
              </div>
            )}
            
            {savedTransport.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Bus size={18} className="mr-2" /> Transport
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedTransport.map(listing => (
                    listing && <ExternalListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hotels" className="mt-6">
            {savedHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedHotels.map(hotel => (
                  hotel && <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't saved any hotels yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/search")}>
                    Explore Hotels
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="packages" className="mt-6">
            {savedPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPackages.map(pkg => (
                  pkg && <PackageCard key={pkg.id} package={pkg} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't saved any packages yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/packages")}>
                    Explore Packages
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="transport" className="mt-6">
            {savedTransport.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTransport.map(listing => (
                  listing && <ExternalListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't saved any transport options yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/transport")}>
                    Explore Transport Options
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default WishlistPage;
