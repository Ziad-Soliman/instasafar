
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import ExternalListingCard from "@/components/cards/ExternalListingCard";
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface Hotel {
  id: string;
  name: string;
  city: "Makkah" | "Madinah";
  address: string;
  description: string;
  rating: number;
  price_per_night: number;
  distance_to_haram: string;
  amenities: string[];
  thumbnail: string;
  is_internal: boolean;
}

interface Package {
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
}

// Import the ExternalListing type from ExternalListingCard to ensure consistency
import type { ExternalListing } from "@/components/cards/ExternalListingCard";

type ListingType = Hotel | Package | ExternalListing;

// Mock data retrieval function - would be replaced with Supabase queries
const fetchListings = () => {
  // This is just mock data - would be replaced with actual Supabase queries
  return new Promise<{ hotels: Hotel[], packages: Package[], externalListings: ExternalListing[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        hotels: [
          {
            id: "hotel-1",
            name: "Grand Makkah Hotel",
            city: "Makkah",
            address: "King Fahd Road, Makkah",
            description: "Luxury hotel with excellent amenities near Haram",
            rating: 4.7,
            price_per_night: 750,
            distance_to_haram: "500m",
            amenities: ["Free WiFi", "Breakfast", "Prayer Room", "Shuttle"],
            thumbnail: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            is_internal: true
          },
          {
            id: "hotel-2",
            name: "Madinah Plaza Hotel",
            city: "Madinah",
            address: "Central Area, Madinah",
            description: "Modern hotel with top-notch facilities",
            rating: 4.5,
            price_per_night: 680,
            distance_to_haram: "800m",
            amenities: ["Free WiFi", "Restaurant", "Prayer Room"],
            thumbnail: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            is_internal: true
          },
          {
            id: "hotel-3",
            name: "Al Shohada Hotel",
            city: "Makkah",
            address: "Al Shohada District, Makkah",
            description: "Comfortable stay with great views",
            rating: 4.2,
            price_per_night: 560,
            distance_to_haram: "1.2km",
            amenities: ["Free WiFi", "Breakfast", "Laundry"],
            thumbnail: "https://images.unsplash.com/photo-1519449556851-5720b33024e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            is_internal: false
          }
        ],
        packages: [
          {
            id: "package-1",
            name: "Complete Umrah Package",
            description: "7-day Umrah package including hotel, flights, and guided tours",
            price: 4500,
            duration_days: 7,
            start_date: "2023-11-15",
            end_date: "2023-11-22",
            thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            includes_hotel: true,
            includes_flight: true,
            includes_transport: true,
            city: "Both",
            is_internal: true
          },
          {
            id: "package-2",
            name: "Economy Hajj Package",
            description: "10-day Hajj package with all essentials covered",
            price: 9500,
            duration_days: 10,
            start_date: "2024-06-10",
            end_date: "2024-06-20",
            thumbnail: "https://images.unsplash.com/photo-1604331465963-e4b8812eba2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            includes_hotel: true,
            includes_flight: true,
            includes_transport: true,
            city: "Both",
            is_internal: true
          }
        ],
        externalListings: [
          {
            id: "ext-1",
            listing_type: "hotel",
            name: "Makkah Hilton Hotel",
            description: "5-star hotel with excellent amenities near Haram",
            city: "Makkah",
            provider_name: "Booking.com",
            redirect_url: "https://booking.com/example",
            image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            price_indication: "من 750 ﷼",
            rating_indication: "4.7 (1,245 reviews)"
          },
          {
            id: "ext-2",
            listing_type: "flight",
            name: "رحلات إلى مكة",
            description: "رحلات مباشرة من المدن الرئيسية إلى جدة",
            city: "Jeddah",
            provider_name: "Skyscanner",
            redirect_url: "https://skyscanner.com/example",
            image_url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            price_indication: "من 2250 ﷼"
          }
        ]
      });
    }, 1000); // Simulate API delay
  });
};

const SearchPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [externalListings, setExternalListings] = useState<ExternalListing[]>([]);
  
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCity, setSelectedCity] = useState<"makkah" | "madinah" | "all">("all");
  const [selectedRating, setSelectedRating] = useState<"5" | "4" | "3" | "any">("any");
  const [currentTab, setCurrentTab] = useState("all");

  // Helper function to filter hotels based on filters
  const filterHotels = (hotel: Hotel) => {
    const matchesPrice = hotel.price_per_night >= priceRange[0] && hotel.price_per_night <= priceRange[1];
    const matchesCity = selectedCity === "all" || hotel.city.toLowerCase() === selectedCity;
    const matchesRating = selectedRating === "any" || 
                          (selectedRating === "5" && hotel.rating >= 5) ||
                          (selectedRating === "4" && hotel.rating >= 4) ||
                          (selectedRating === "3" && hotel.rating >= 3);
    
    return matchesPrice && matchesCity && matchesRating;
  };

  // Fetch listings on component mount
  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const { hotels, packages, externalListings } = await fetchListings();
        setHotels(hotels);
        setPackages(packages);
        setExternalListings(externalListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    getListings();
    
    // Parse query params if any
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("destination");
    if (cityParam === "makkah" || cityParam === "madinah") {
      setSelectedCity(cityParam);
    }
  }, [location.search]);

  // Filter hotels based on current filters
  const filteredHotels = hotels.filter(filterHotels);
  
  // Apply filters to packages (simplified)
  const filteredPackages = packages.filter(pkg => {
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesCity = selectedCity === "all" || 
                        pkg.city.toLowerCase() === selectedCity || 
                        pkg.city === "Both";
    return matchesPrice && matchesCity;
  });

  // Apply filters to external listings (simplified)
  const filteredExternalListings = externalListings.filter(listing => {
    const cityMatches = selectedCity === "all" || 
                        listing.city.toLowerCase().includes(selectedCity);
    return cityMatches;
  });

  // Handle view details/book now for internal listings
  const handleViewDetails = (item: Hotel | Package) => {
    if ('price_per_night' in item) {
      // It's a hotel
      navigate(`/hotels/${item.id}`);
    } else {
      // It's a package
      navigate(`/packages/${item.id}`);
    }
  };

  // Handle apply filters button
  const applyFilters = () => {
    // This would typically update URL params or trigger a new search
    console.log("Applying filters:", { priceRange, selectedCity, selectedRating });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">{t("search.title")}</h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t("search.filters")}</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base">{t("search.price")}</Label>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[0, 10000]}
                      max={10000}
                      step={100}
                      onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{priceRange[0]} ﷼</span>
                      <span>{priceRange[1]} ﷼</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base">{t("search.location")}</Label>
                  <RadioGroup 
                    defaultValue={selectedCity} 
                    onValueChange={(value) => setSelectedCity(value as "makkah" | "madinah" | "all")}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="makkah" id="makkah" />
                      <Label htmlFor="makkah">{t("search.location.makkah")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="madinah" id="madinah" />
                      <Label htmlFor="madinah">{t("search.location.madinah")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all-locations" />
                      <Label htmlFor="all-locations">{t("search.location.all")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label className="text-base">{t("search.rating")}</Label>
                  <RadioGroup 
                    defaultValue={selectedRating}
                    onValueChange={(value) => setSelectedRating(value as "5" | "4" | "3" | "any")}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="5-stars" />
                      <Label htmlFor="5-stars">5 {t("stars")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="4-stars" />
                      <Label htmlFor="4-stars">4+ {t("stars")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3-stars" />
                      <Label htmlFor="3-stars">3+ {t("stars")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="any-stars" />
                      <Label htmlFor="any-stars">{t("any")} {t("rating")}</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button className="w-full" onClick={applyFilters}>{t("search.applyFilters")}</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Search Results */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" onValueChange={setCurrentTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">{t("search.tab.all")}</TabsTrigger>
                <TabsTrigger value="hotels">{t("search.tab.hotels")}</TabsTrigger>
                <TabsTrigger value="packages">{t("search.tab.packages")}</TabsTrigger>
                <TabsTrigger value="external">{t("search.tab.external")}</TabsTrigger>
              </TabsList>
              
              {/* All Results Tab */}
              <TabsContent value="all" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-4" />
                          <Skeleton className="h-8 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredHotels.length === 0 && filteredPackages.length === 0 && filteredExternalListings.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">{t("search.noResults")}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Internal Hotels */}
                        {filteredHotels.map(hotel => (
                          <div key={hotel.id} className="relative">
                            {hotel.is_internal && (
                              <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                                {t("listing.internal")}
                              </Badge>
                            )}
                            <HotelCard 
                              hotel={hotel} 
                              onButtonClick={() => handleViewDetails(hotel)}
                              buttonText={hotel.is_internal ? t("listing.bookNow") : t("listing.viewDetails")}
                            />
                          </div>
                        ))}
                        
                        {/* Packages */}
                        {filteredPackages.map(pkg => (
                          <div key={pkg.id} className="relative">
                            {pkg.is_internal && (
                              <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                                {t("listing.internal")}
                              </Badge>
                            )}
                            <PackageCard 
                              package={pkg}
                              onButtonClick={() => handleViewDetails(pkg)}
                              buttonText={pkg.is_internal ? t("listing.bookNow") : t("listing.viewDetails")}
                            />
                          </div>
                        ))}
                        
                        {/* External Listings */}
                        {filteredExternalListings.map(listing => (
                          <div key={listing.id} className="relative">
                            <Badge className="absolute top-2 right-2 z-10 bg-secondary" variant="outline">
                              {t("listing.external")}
                            </Badge>
                            <ExternalListingCard listing={listing} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              {/* Hotels Tab */}
              <TabsContent value="hotels" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-4" />
                          <Skeleton className="h-8 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredHotels.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">{t("search.noResults")}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredHotels.map(hotel => (
                          <div key={hotel.id} className="relative">
                            {hotel.is_internal && (
                              <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                                {t("listing.internal")}
                              </Badge>
                            )}
                            <HotelCard 
                              hotel={hotel} 
                              onButtonClick={() => handleViewDetails(hotel)}
                              buttonText={hotel.is_internal ? t("listing.bookNow") : t("listing.viewDetails")}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              {/* Packages Tab */}
              <TabsContent value="packages" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-4" />
                          <Skeleton className="h-8 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredPackages.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">{t("search.noResults")}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPackages.map(pkg => (
                          <div key={pkg.id} className="relative">
                            {pkg.is_internal && (
                              <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                                {t("listing.internal")}
                              </Badge>
                            )}
                            <PackageCard 
                              package={pkg}
                              onButtonClick={() => handleViewDetails(pkg)}
                              buttonText={pkg.is_internal ? t("listing.bookNow") : t("listing.viewDetails")}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              {/* External Tab */}
              <TabsContent value="external" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2 mb-4" />
                          <Skeleton className="h-8 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredExternalListings.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">{t("search.noResults")}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredExternalListings.map(listing => (
                          <ExternalListingCard key={listing.id} listing={listing} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchPage;
