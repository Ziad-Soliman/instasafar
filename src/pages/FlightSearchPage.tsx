
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plane, Calendar, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import FlightCard from "@/components/flights/FlightCard";
import FlightLoadingSkeleton from "@/components/flights/FlightLoadingSkeleton";
import FlightEmptyState from "@/components/flights/FlightEmptyState";

interface Flight {
  id: string;
  airline_name: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  class: string;
  available_seats: number;
  total_seats: number;
  aircraft_type?: string;
}

const FlightSearchPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    passengers: "1",
    class: "economy"
  });
  const { toast } = useToast();

  const cities = ["Makkah", "Madinah", "Riyadh", "Jeddah", "Dammam", "Taif", "Dubai", "Doha", "Kuwait City", "Cairo", "Istanbul"];

  const fetchFlights = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('flights')
        .select('*')
        .order('departure_time', { ascending: true });

      if (searchFilters.origin) {
        query = query.eq('origin', searchFilters.origin);
      }
      if (searchFilters.destination) {
        query = query.eq('destination', searchFilters.destination);
      }
      if (searchFilters.class !== 'any') {
        query = query.eq('class', searchFilters.class);
      }

      const { data, error } = await query;

      if (error) throw error;
      setFlights(data || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast({
        title: "Error",
        description: "Failed to fetch flights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = () => {
    fetchFlights();
  };

  const handleFilterChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Flight</h1>
            <p className="text-xl text-gray-600">Search and book flights to your destination</p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <Select value={searchFilters.origin} onValueChange={(value) => handleFilterChange('origin', value)}>
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
                  <Select value={searchFilters.destination} onValueChange={(value) => handleFilterChange('destination', value)}>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                  <Input
                    type="date"
                    value={searchFilters.departureDate}
                    onChange={(e) => handleFilterChange('departureDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                  <Select value={searchFilters.class} onValueChange={(value) => handleFilterChange('class', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Class</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search Flights
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Flights</h2>
              <div className="text-sm text-gray-600">
                {!loading && `${flights.length} flights found`}
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <FlightLoadingSkeleton key={index} />
                ))}
              </div>
            ) : flights.length === 0 ? (
              <FlightEmptyState />
            ) : (
              <div className="space-y-4">
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
