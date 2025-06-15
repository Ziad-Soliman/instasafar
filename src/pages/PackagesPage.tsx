
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, Users, Plane, Hotel, Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PackageCard from "@/components/cards/PackageCard";

interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_days: number;
  start_date?: string;
  end_date?: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  city?: string;
  thumbnail?: string;
}

const PackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    duration: "",
    searchTerm: ""
  });
  const { toast } = useToast();

  const cities = ["Makkah", "Madinah", "Riyadh", "Jeddah", "Dammam", "Taif"];

  const fetchPackages = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchFilters.city) {
        query = query.eq('city', searchFilters.city);
      }
      if (searchFilters.minPrice) {
        query = query.gte('price', parseFloat(searchFilters.minPrice));
      }
      if (searchFilters.maxPrice) {
        query = query.lte('price', parseFloat(searchFilters.maxPrice));
      }
      if (searchFilters.duration) {
        query = query.eq('duration_days', parseInt(searchFilters.duration));
      }

      const { data, error } = await query;

      if (error) throw error;

      let filteredData = data || [];

      // Apply text search filter
      if (searchFilters.searchTerm) {
        filteredData = filteredData.filter(pkg =>
          pkg.name.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
          (pkg.description && pkg.description.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()))
        );
      }

      setPackages(filteredData);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch packages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSearch = () => {
    fetchPackages();
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      city: "",
      minPrice: "",
      maxPrice: "",
      duration: "",
      searchTerm: ""
    });
    // Fetch all packages after clearing filters
    setTimeout(() => {
      fetchPackages();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Packages</h1>
            <p className="text-xl text-gray-600">Discover amazing travel packages for your perfect journey</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search packages..."
                      value={searchFilters.searchTerm}
                      onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={handleSearch} className="md:w-auto">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <Select value={searchFilters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Cities</SelectItem>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price ($)</label>
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={searchFilters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($)</label>
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={searchFilters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                    <Select value={searchFilters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Duration</SelectItem>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="5">5 Days</SelectItem>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="10">10 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Packages</h2>
              <div className="text-sm text-gray-600">
                {!loading && `${packages.length} packages found`}
              </div>
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
            ) : packages.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No packages found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or check back later for new packages.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
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
                          <MapPin className="h-12 w-12 text-white" />
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
                            <div className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                              <Hotel className="h-3 w-3 mr-1" />
                              Hotel
                            </div>
                          )}
                          {pkg.includes_flight && (
                            <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              <Plane className="h-3 w-3 mr-1" />
                              Flight
                            </div>
                          )}
                          {pkg.includes_transport && (
                            <div className="flex items-center bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                              <Car className="h-3 w-3 mr-1" />
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
                        <Button>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackagesPage;
