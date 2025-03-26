
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBar from "@/components/SearchBar";

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentTab, setCurrentTab] = useState("all");

  // This would typically fetch data based on search params
  // For now it's just a placeholder
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base">Price Range</Label>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={5000}
                      step={100}
                      onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base">Location</Label>
                  <RadioGroup defaultValue="all" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="makkah" id="makkah" />
                      <Label htmlFor="makkah">Makkah</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="madinah" id="madinah" />
                      <Label htmlFor="madinah">Madinah</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all-locations" />
                      <Label htmlFor="all-locations">All Locations</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label className="text-base">Rating</Label>
                  <RadioGroup defaultValue="any" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="5-stars" />
                      <Label htmlFor="5-stars">5 Stars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="4-stars" />
                      <Label htmlFor="4-stars">4+ Stars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3-stars" />
                      <Label htmlFor="3-stars">3+ Stars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any-stars" />
                      <Label htmlFor="any-stars">Any Rating</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Search Results */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" onValueChange={setCurrentTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="hotels">Hotels</TabsTrigger>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="external">External Sites</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted">
                      <img 
                        src="/placeholder.svg" 
                        alt="Hotel" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">Grand Makkah Hotel</h3>
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">$240/night</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">500m from Haram • Makkah</p>
                      <Button className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted">
                      <img 
                        src="/placeholder.svg" 
                        alt="Package" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">Complete Umrah Package</h3>
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">$1,200</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">7 days • Hotel + Transport</p>
                      <Button className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="h-48 bg-muted">
                      <img 
                        src="/placeholder.svg" 
                        alt="External Listing" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">Madinah Luxury Suites</h3>
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm">From $180</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Via Booking.com • Madinah</p>
                      <Button variant="outline" className="w-full">View on Booking.com</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="hotels" className="mt-0">
                <p>Hotels content</p>
              </TabsContent>
              
              <TabsContent value="packages" className="mt-0">
                <p>Packages content</p>
              </TabsContent>
              
              <TabsContent value="external" className="mt-0">
                <p>External sites content</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchPage;
