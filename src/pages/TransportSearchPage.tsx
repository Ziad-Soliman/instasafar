
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Car, Clock, ArrowRight, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Transport {
  id: string;
  name: string;
  description?: string;
  type: string;
  from_city: string;
  to_city: string;
  price: number;
  duration_hours?: number;
  departure_time?: string;
  arrival_time?: string;
  capacity?: number;
  available_seats?: number;
  thumbnail?: string;
}

const TransportSearchPage: React.FC = () => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    from_city: "",
    to_city: "",
    type: "",
    date: ""
  });
  const { toast } = useToast();

  const cities = ["Makkah", "Madinah", "Riyadh", "Jeddah", "Dammam", "Taif"];
  const transportTypes = ["Bus", "Car", "Van", "Train", "Shuttle"];

  const fetchTransports = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('transport_options')
        .select('*')
        .order('departure_time', { ascending: true });

      if (searchFilters.from_city) {
        query = query.eq('from_city', searchFilters.from_city);
      }
      if (searchFilters.to_city) {
        query = query.eq('to_city', searchFilters.to_city);
      }
      if (searchFilters.type) {
        query = query.eq('type', searchFilters.type);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransports(data || []);
    } catch (error) {
      console.error('Error fetching transport:', error);
      toast({
        title: "Error",
        description: "Failed to fetch transport options. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleSearch = () => {
    fetchTransports();
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Not specified';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Transport Options</h1>
            <p className="text-xl text-gray-600">Book reliable transport for your journey</p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <Select value={searchFilters.from_city} onValueChange={(value) => handleFilterChange('from_city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <Select value={searchFilters.to_city} onValueChange={(value) => handleFilterChange('to_city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transport Type</label>
                  <Select value={searchFilters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {transportTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                  <Input
                    type="date"
                    value={searchFilters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search Transport
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Transport</h2>
              <div className="text-sm text-gray-600">
                {!loading && `${transports.length} options found`}
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : transports.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Car className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No transport options found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {transports.map((transport) => (
                  <Card key={transport.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center mb-2">
                            <Car className="h-5 w-5 text-brand-600 mr-2" />
                            <h3 className="text-lg font-semibold">{transport.name}</h3>
                            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                              {transport.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 mb-2">
                            <span>{transport.from_city}</span>
                            <ArrowRight className="h-4 w-4 mx-2" />
                            <span>{transport.to_city}</span>
                          </div>

                          {transport.description && (
                            <p className="text-gray-600 text-sm mb-2">{transport.description}</p>
                          )}

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {transport.duration_hours && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{transport.duration_hours}h</span>
                              </div>
                            )}
                            {transport.departure_time && (
                              <span>Departs: {formatTime(transport.departure_time)}</span>
                            )}
                            {transport.available_seats && transport.capacity && (
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{transport.available_seats}/{transport.capacity} seats</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="text-2xl font-bold text-brand-600 mb-2">
                            ${Number(transport.price).toFixed(0)}
                          </div>
                          <Button>
                            Book Now
                          </Button>
                        </div>
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

export default TransportSearchPage;
