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
import ExternalListingCard, { type ExternalListing } from "@/components/cards/ExternalListingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types for database entities
interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string | null;
  rating: number | null;
  price_per_night: number;
  distance_to_haram: string | null;
  thumbnail: string | null;
  provider_id: string | null;
  amenities?: string[];
  image: string;
  location: string;
  review_count: number;
  is_internal: boolean;
  is_featured?: boolean;
}

interface Package {
  id: string;
  name: string;
  title: string;
  description: string | null;
  price: number;
  duration_days: number;
  duration: string;
  start_date: string | null;
  end_date: string | null;
  thumbnail: string | null;
  image: string;
  includes_hotel: boolean | null;
  includes_flight: boolean | null;
  includes_transport: boolean | null;
  includes: string[];
  city: string | null;
  location: string;
  rating: number;
  review_count: number;
  type: 'hajj' | 'umrah' | 'custom';
  is_internal: boolean;
  is_featured?: boolean;
}

type ListingType = Hotel | Package | ExternalListing;

const SearchPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [externalListings, setExternalListings] = useState<ExternalListing[]>([]);
  
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCity, setSelectedCity] = useState<"makkah" | "madinah" | "all">("all");
  const [selectedRating, setSelectedRating] = useState<"5" | "4" | "3" | "any">("any");
  const [currentTab, setCurrentTab] = useState("all");

  // Helper function to ensure HotelCard props always get a hotel with required amenities array
  function getHotelCardProps(hotel: Hotel) {
    return {
      ...hotel,
      amenities: Array.isArray(hotel.amenities) ? hotel.amenities : [],
    };
  }

  // Fetch data from Supabase
  const fetchListings = async () => {
    try {
      setLoading(true);

      // Fetch hotels
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select(`
          *,
          hotel_amenities(name)
        `);

      if (hotelsError) {
        console.error('Error fetching hotels:', hotelsError);
        toast({
          title: "Error",
          description: "Failed to fetch hotels data",
          variant: "destructive",
        });
      }

      // Fetch packages  
      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*');

      if (packagesError) {
        console.error('Error fetching packages:', packagesError);
        toast({
          title: "Error",
          description: "Failed to fetch packages data",
          variant: "destructive",
        });
      }

      // Fetch external listings
      const { data: externalData, error: externalError } = await supabase
        .from('external_listings')
        .select('*');

      if (externalError) {
        console.error('Error fetching external listings:', externalError);
        toast({
          title: "Error",
          description: "Failed to fetch external listings data",
          variant: "destructive",
        });
      }

      // Transform hotels data
      const transformedHotels: Hotel[] = (hotelsData || []).map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        address: hotel.address,
        description: hotel.description,
        rating: hotel.rating || 0,
        price_per_night: hotel.price_per_night,
        distance_to_haram: hotel.distance_to_haram,
        thumbnail: hotel.thumbnail,
        provider_id: hotel.provider_id,
        amenities: hotel.hotel_amenities?.map((a: any) => a.name) || [],
        image: hotel.thumbnail || '',
        location: hotel.city,
        review_count: 0, // TODO: Calculate from reviews table
        is_internal: true,
        is_featured: false
      }));

      // Transform packages data
      const transformedPackages: Package[] = (packagesData || []).map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        title: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration_days: pkg.duration_days,
        duration: `${pkg.duration_days} days`,
        start_date: pkg.start_date,
        end_date: pkg.end_date,
        thumbnail: pkg.thumbnail,
        image: pkg.thumbnail || '',
        includes_hotel: pkg.includes_hotel || false,
        includes_flight: pkg.includes_flight || false,
        includes_transport: pkg.includes_transport || false,
        includes: [
          ...(pkg.includes_hotel ? ['Hotel'] : []),
          ...(pkg.includes_flight ? ['Flight'] : []),
          ...(pkg.includes_transport ? ['Transport'] : [])
        ],
        city: pkg.city,
        location: pkg.city || 'Multiple Cities',
        rating: 4.5, // TODO: Calculate from reviews
        review_count: 0, // TODO: Calculate from reviews table
        type: 'umrah' as const, // TODO: Add type field to packages table
        is_internal: true,
        is_featured: false
      }));

      // Transform external listings data
      const transformedExternals: ExternalListing[] = (externalData || []).map(listing => ({
        id: listing.id,
        title: listing.name,
        description: listing.description || '',
        image: listing.image_url || '',
        price: 0, // External listings don't have structured pricing
        currency: "SAR",
        rating: 0, // External listings don't have structured ratings
        reviewCount: 0,
        location: listing.city || '',
        provider: listing.provider_name,
        type: listing.listing_type as 'hotel' | 'flight' | 'package',
        url: listing.redirect_url
      }));

      setHotels(transformedHotels);
      setPackages(transformedPackages);
      setExternalListings(transformedExternals);

    } catch (error) {
      console.error('Error fetching listings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch listings data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to filter hotels based on filters
  const filterHotels = (hotel: Hotel) => {
    const matchesPrice = hotel.price_per_night >= priceRange[0] && hotel.price_per_night <= priceRange[1];
    const matchesCity = selectedCity === "all" || hotel.city.toLowerCase() === selectedCity;
    const matchesRating = selectedRating === "any" || 
                          (selectedRating === "5" && (hotel.rating || 0) >= 5) ||
                          (selectedRating === "4" && (hotel.rating || 0) >= 4) ||
                          (selectedRating === "3" && (hotel.rating || 0) >= 3);
    
    return matchesPrice && matchesCity && matchesRating;
  };

  // Fetch listings on component mount
  useEffect(() => {
    fetchListings();
    
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
                        (pkg.city && pkg.city.toLowerCase() === selectedCity) || 
                        pkg.city === "Both";
    return matchesPrice && matchesCity;
  });

  // Apply filters to external listings (simplified)
  const filteredExternalListings = externalListings.filter(listing => {
    const cityMatches = selectedCity === "all" || 
                        listing.location.toLowerCase().includes(selectedCity);
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
                            <HotelCard hotel={getHotelCardProps(hotel)} />
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
                            <PackageCard package={pkg} />
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
                            <HotelCard hotel={getHotelCardProps(hotel)} />
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
                            <PackageCard package={pkg} />
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
