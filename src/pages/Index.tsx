
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, Star, Plane, Car, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";

interface Hotel {
  id: string;
  name: string;
  city: string;
  rating: number;
  price_per_night: number;
  distance_to_haram?: string;
  thumbnail?: string;
  description?: string;
}

interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_days: number;
  city?: string;
  thumbnail?: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
}

const Index = () => {
  const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
  const [featuredPackages, setFeaturedPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      // Fetch featured hotels (top rated and recently added)
      const { data: hotels, error: hotelsError } = await supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false })
        .limit(6);

      if (hotelsError) throw hotelsError;

      // Fetch featured packages
      const { data: packages, error: packagesError } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (packagesError) throw packagesError;

      setFeaturedHotels(hotels || []);
      setFeaturedPackages(packages || []);
    } catch (error) {
      console.error('Error fetching featured content:', error);
      toast({
        title: "Error",
        description: "Failed to load featured content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Journey to the Holy Land
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-brand-100">
              Discover sacred destinations with our comprehensive travel services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/packages">
                  <Package className="mr-2 h-5 w-5" />
                  View Packages
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-600" asChild>
                <Link to="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Search Hotels
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              What are you looking for?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link to="/search">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 text-brand-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Hotels</h3>
                    <p className="text-gray-600">Find the perfect accommodation for your stay</p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link to="/flights">
                  <CardContent className="p-6 text-center">
                    <Plane className="h-12 w-12 text-brand-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Flights</h3>
                    <p className="text-gray-600">Book flights to your desired destination</p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link to="/transport">
                  <CardContent className="p-6 text-center">
                    <Car className="h-12 w-12 text-brand-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Transport</h3>
                    <p className="text-gray-600">Reliable transport options for your journey</p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link to="/packages">
                  <CardContent className="p-6 text-center">
                    <Package className="h-12 w-12 text-brand-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Packages</h3>
                    <p className="text-gray-600">Complete travel packages for convenience</p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Hotels</h2>
              <Button variant="outline" asChild>
                <Link to="/search">View All</Link>
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : featuredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-brand-500 to-brand-700 relative">
                      {hotel.thumbnail ? (
                        <img 
                          src={hotel.thumbnail} 
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{hotel.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{hotel.city}</span>
                          {hotel.distance_to_haram && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{hotel.distance_to_haram} to Haram</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{Number(hotel.rating ?? 0).toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-brand-600">${Number(hotel.price_per_night).toFixed(0)}</div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                        <Button asChild>
                          <Link to={`/hotels/${hotel.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No hotels available at the moment.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Packages</h2>
              <Button variant="outline" asChild>
                <Link to="/packages">View All</Link>
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : featuredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPackages.map((pkg) => (
                  <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-brand-500 to-brand-700 relative">
                      {pkg.thumbnail ? (
                        <img 
                          src={pkg.thumbnail} 
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{pkg.description || 'A wonderful travel experience awaits you.'}</p>
                        
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{pkg.city || 'Multiple Cities'}</span>
                          <Calendar className="h-4 w-4 ml-4 mr-1" />
                          <span>{pkg.duration_days} days</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {pkg.includes_hotel && (
                            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                              Hotel
                            </div>
                          )}
                          {pkg.includes_flight && (
                            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              Flight
                            </div>
                          )}
                          {pkg.includes_transport && (
                            <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                              Transport
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-brand-600">${Number(pkg.price).toFixed(0)}</div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                        <Button asChild>
                          <Link to={`/packages/${pkg.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No packages available at the moment.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
