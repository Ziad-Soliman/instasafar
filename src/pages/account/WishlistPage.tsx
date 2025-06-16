
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heart, Hotel, Package, Bus, Loader } from "lucide-react";
import WishlistEmptyState from "@/components/wishlist/WishlistEmptyState";
import WishlistTabContent from "@/components/wishlist/WishlistTabContent";
import { useWishlistData } from "@/hooks/useWishlistData";

const WishlistPage: React.FC = () => {
  const { items, isLoading, savedHotels, savedPackages, savedTransport } = useWishlistData();
  const [activeTab, setActiveTab] = useState("all");
  
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
    return <WishlistEmptyState />;
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
          
          <TabsContent value={activeTab} className="mt-6">
            <WishlistTabContent
              activeTab={activeTab}
              savedHotels={savedHotels}
              savedPackages={savedPackages}
              savedTransport={savedTransport}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default WishlistPage;
