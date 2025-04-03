
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search, FilterX, Package } from "lucide-react";
import PackageCard from "@/components/cards/PackageCard";
import { featuredPackages } from "@/data/mockData";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import WishlistButton from "@/components/WishlistButton";

// Define package type 
interface PackageType {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  thumbnail: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  city: "Makkah" | "Madinah" | "Both";
  is_internal: boolean;
  package_type?: "Hajj" | "Umrah" | "Custom";
}

const PackagesPage: React.FC = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<PackageType[]>([]);
  const [currentTab, setCurrentTab] = useState("all");
  
  // Filters
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [durationRange, setDurationRange] = useState([0, 30]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [filters, setFilters] = useState({
    hajj: true,
    umrah: true,
    includesHotel: false,
    includesFlight: false,
    includesTransport: false,
  });
  
  // Fetch packages
  useEffect(() => {
    // Simulate API call
    const fetchPackages = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Add package_type to mock data
        const packagesWithType = featuredPackages.map(pkg => {
          const randomType = Math.random() > 0.5 ? "Hajj" : "Umrah";
          return { ...pkg, package_type: randomType as "Hajj" | "Umrah" | "Custom" };
        });
        
        setPackages(packagesWithType);
        setFilteredPackages(packagesWithType);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  // Apply filters
  useEffect(() => {
    let results = [...packages];
    
    // Filter by tab
    if (currentTab === "hajj") {
      results = results.filter(pkg => pkg.package_type === "Hajj");
    } else if (currentTab === "umrah") {
      results = results.filter(pkg => pkg.package_type === "Umrah");
    }
    
    // Filter by price
    results = results.filter(pkg => 
      pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
    );
    
    // Filter by duration
    results = results.filter(pkg => 
      pkg.duration_days >= durationRange[0] && pkg.duration_days <= durationRange[1]
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(pkg => 
        pkg.name.toLowerCase().includes(query) || 
        pkg.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by date
    if (date) {
      const selectedDate = format(date, "yyyy-MM-dd");
      results = results.filter(pkg => 
        pkg.start_date <= selectedDate && pkg.end_date >= selectedDate
      );
    }
    
    // Filter by inclusions
    if (filters.includesHotel) {
      results = results.filter(pkg => pkg.includes_hotel);
    }
    if (filters.includesFlight) {
      results = results.filter(pkg => pkg.includes_flight);
    }
    if (filters.includesTransport) {
      results = results.filter(pkg => pkg.includes_transport);
    }
    
    setFilteredPackages(results);
  }, [packages, currentTab, priceRange, durationRange, searchQuery, date, filters]);
  
  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setDurationRange([0, 30]);
    setSearchQuery("");
    setDate(undefined);
    setFilters({
      hajj: true,
      umrah: true,
      includesHotel: false,
      includesFlight: false,
      includesTransport: false,
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              Hajj & Umrah Packages
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover complete packages for your spiritual journey
            </p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={resetFilters}
              title="Reset filters"
            >
              <FilterX className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <Card className="lg:sticky top-24 h-fit">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Package Type</h3>
                <Tabs defaultValue={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="hajj">Hajj</TabsTrigger>
                    <TabsTrigger value="umrah">Umrah</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="pt-2 px-2">
                  <Slider
                    defaultValue={priceRange}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Duration (days)</h3>
                <div className="pt-2 px-2">
                  <Slider
                    defaultValue={durationRange}
                    max={30}
                    step={1}
                    value={durationRange}
                    onValueChange={setDurationRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{durationRange[0]} days</span>
                    <span>{durationRange[1]} days</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Travel Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {date && (
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 text-xs"
                    onClick={() => setDate(undefined)}
                  >
                    Clear Date
                  </Button>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Inclusions</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includesHotel"
                      checked={filters.includesHotel}
                      onCheckedChange={(checked) => 
                        setFilters({...filters, includesHotel: checked === true})
                      }
                    />
                    <Label htmlFor="includesHotel">Includes Hotel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includesFlight"
                      checked={filters.includesFlight}
                      onCheckedChange={(checked) => 
                        setFilters({...filters, includesFlight: checked === true})
                      }
                    />
                    <Label htmlFor="includesFlight">Includes Flight</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includesTransport"
                      checked={filters.includesTransport}
                      onCheckedChange={(checked) => 
                        setFilters({...filters, includesTransport: checked === true})
                      }
                    />
                    <Label htmlFor="includesTransport">Includes Transport</Label>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={resetFilters}
              >
                Reset All Filters
              </Button>
            </CardContent>
          </Card>
          
          {/* Packages List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {filteredPackages.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No packages match your filters</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search criteria to find the perfect package</p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-muted-foreground">
                        Showing <span className="font-medium">{filteredPackages.length}</span> packages
                      </p>
                      <div className="flex gap-2">
                        {currentTab !== "all" && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            {currentTab === "hajj" ? "Hajj" : "Umrah"}
                          </Badge>
                        )}
                        {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                          <Badge variant="outline">
                            ${priceRange[0]} - ${priceRange[1]}
                          </Badge>
                        )}
                        {(durationRange[0] > 0 || durationRange[1] < 30) && (
                          <Badge variant="outline">
                            {durationRange[0]}-{durationRange[1]} days
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredPackages.map((pkg) => (
                        <div key={pkg.id} className="relative group">
                          <PackageCard 
                            package={pkg}
                            className="h-full transition-all duration-300 hover:shadow-lg"
                          />
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <WishlistButton 
                              itemId={pkg.id} 
                              itemType="package"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PackagesPage;
