import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowRight, CalendarIcon, Clock, Plane, Search, Users, Filter, MapPin, ArrowLeftRight } from "lucide-react";
import FlightCard from "@/components/cards/FlightCard";

// Mock data for flights
interface Flight {
  id: string;
  airline: string;
  airline_logo: string;
  departure_city: string;
  departure_airport: string;
  departure_time: string;
  arrival_city: string;
  arrival_airport: string;
  arrival_time: string;
  duration: string;
  price: number;
  stops: number;
  is_internal: boolean;
}

// Mock external flight booking provider
interface ExternalFlightProvider {
  id: string;
  name: string;
  logo: string;
  url: string;
  price_indication: string;
}

const FlightSearchPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for search form
  const [fromCity, setFromCity] = useState("Jeddah");
  const [toCity, setToCity] = useState("Riyadh");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [tripType, setTripType] = useState("one-way");
  const [passengers, setPassengers] = useState(1);
  
  // State for results
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [externalProviders, setExternalProviders] = useState<ExternalFlightProvider[]>([]);
  
  // State for filters
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAirline, setSelectedAirline] = useState<string>("all");
  const [maxStops, setMaxStops] = useState<number>(2);
  
  // Fetch flights on search
  const handleSearch = () => {
    setLoading(true);
    
    // Mock API call - would be replaced with Supabase query
    setTimeout(() => {
      // Mock flight data
      const mockFlights: Flight[] = [
        {
          id: "flight-1",
          airline: "Saudi Airlines",
          airline_logo: "/placeholder.svg",
          departure_city: "Jeddah",
          departure_airport: "JED",
          departure_time: "08:00",
          arrival_city: "Riyadh",
          arrival_airport: "RUH",
          arrival_time: "09:30",
          duration: "1h 30m",
          price: 250,
          stops: 0,
          is_internal: true
        },
        {
          id: "flight-2",
          airline: "Flynas",
          airline_logo: "/placeholder.svg",
          departure_city: "Jeddah",
          departure_airport: "JED",
          departure_time: "10:15",
          arrival_city: "Riyadh",
          arrival_airport: "RUH",
          arrival_time: "11:45",
          duration: "1h 30m",
          price: 180,
          stops: 0,
          is_internal: true
        },
        {
          id: "flight-3",
          airline: "Flyadeal",
          airline_logo: "/placeholder.svg",
          departure_city: "Jeddah",
          departure_airport: "JED",
          departure_time: "14:30",
          arrival_city: "Riyadh",
          arrival_airport: "RUH",
          arrival_time: "16:00",
          duration: "1h 30m",
          price: 160,
          stops: 0,
          is_internal: false
        },
        {
          id: "flight-4",
          airline: "Saudi Airlines",
          airline_logo: "/placeholder.svg",
          departure_city: "Jeddah",
          departure_airport: "JED",
          departure_time: "18:45",
          arrival_city: "Riyadh",
          arrival_airport: "RUH",
          arrival_time: "20:15",
          duration: "1h 30m",
          price: 280,
          stops: 0,
          is_internal: true
        },
      ];
      
      // Mock external providers
      const mockExternalProviders: ExternalFlightProvider[] = [
        {
          id: "provider-1",
          name: "Skyscanner",
          logo: "/placeholder.svg",
          url: "https://skyscanner.com",
          price_indication: "From $150"
        },
        {
          id: "provider-2",
          name: "Kayak",
          logo: "/placeholder.svg",
          url: "https://kayak.com",
          price_indication: "From $160"
        },
        {
          id: "provider-3",
          name: "Expedia",
          logo: "/placeholder.svg",
          url: "https://expedia.com",
          price_indication: "From $175"
        },
      ];
      
      setFlights(mockFlights);
      setExternalProviders(mockExternalProviders);
      setLoading(false);
    }, 1500);
  };
  
  // Run search on component mount
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Filter flights based on current filters
  const filteredFlights = flights.filter(flight => {
    const matchesPrice = flight.price >= priceRange[0] && flight.price <= priceRange[1];
    const matchesAirline = selectedAirline === "all" || flight.airline === selectedAirline;
    const matchesStops = flight.stops <= maxStops;
    
    return matchesPrice && matchesAirline && matchesStops;
  });
  
  // Handle view details/book now
  const handleViewDetails = (flight: Flight) => {
    // For internal flights, navigate to details page
    if (flight.is_internal) {
      navigate(`/flights/${flight.id}`);
    }
  };
  
  // Handle external provider click
  const handleExternalProviderClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  // Get unique airlines for filter
  const airlines = [...new Set(flights.map(flight => flight.airline))];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-saudi-green/5">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-8 md:py-12"
        >
          {/* Enhanced Page Header */}
          <div className="page-header text-center">
            <h1 className="page-title mb-4">Find Your Perfect Flight</h1>
            <p className="page-subtitle max-w-2xl mx-auto">
              Discover the best flight deals and book your journey across Saudi Arabia and beyond
            </p>
          </div>
          
          {/* Enhanced Flight Search Form */}
          <Card variant="elevated" className="mb-8 md:mb-12 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              {/* Trip Type Selection */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 block">Trip Type</Label>
                <RadioGroup 
                  defaultValue={tripType} 
                  onValueChange={setTripType}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="one-way" id="one-way" className="text-saudi-green" />
                    <Label htmlFor="one-way" className="font-medium">One way</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="round-trip" id="round-trip" className="text-saudi-green" />
                    <Label htmlFor="round-trip" className="font-medium">Round trip</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="form-group">
                  <Label htmlFor="from" className="form-label flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-saudi-green" />
                    From
                  </Label>
                  <Select defaultValue={fromCity} onValueChange={setFromCity}>
                    <SelectTrigger id="from" className="form-input">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jeddah">Jeddah (JED)</SelectItem>
                      <SelectItem value="Riyadh">Riyadh (RUH)</SelectItem>
                      <SelectItem value="Makkah">Makkah</SelectItem>
                      <SelectItem value="Madinah">Madinah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="form-group">
                  <Label htmlFor="to" className="form-label flex items-center gap-2">
                    <ArrowLeftRight className="w-4 h-4 text-saudi-green" />
                    To
                  </Label>
                  <Select defaultValue={toCity} onValueChange={setToCity}>
                    <SelectTrigger id="to" className="form-input">
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jeddah">Jeddah (JED)</SelectItem>
                      <SelectItem value="Riyadh">Riyadh (RUH)</SelectItem>
                      <SelectItem value="Makkah">Makkah</SelectItem>
                      <SelectItem value="Madinah">Madinah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="form-group">
                  <Label htmlFor="departure-date" className="form-label flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-saudi-green" />
                    Departure Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "form-input justify-start text-left font-normal h-12",
                          !departureDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white shadow-elevated" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        initialFocus
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {tripType === "round-trip" ? (
                  <div className="form-group">
                    <Label htmlFor="return-date" className="form-label flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-saudi-green" />
                      Return Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "form-input justify-start text-left font-normal h-12",
                            !returnDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white shadow-elevated" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          disabled={date => !departureDate || date < departureDate}
                          className="p-3"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <div className="form-group">
                    <Label htmlFor="passengers" className="form-label flex items-center gap-2">
                      <Users className="w-4 h-4 text-saudi-green" />
                      Passengers
                    </Label>
                    <Select defaultValue={passengers.toString()} onValueChange={(val) => setPassengers(parseInt(val))}>
                      <SelectTrigger id="passengers" className="form-input">
                        <SelectValue placeholder="Select passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'passenger' : 'passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              {/* Search Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleSearch} 
                  variant="saudi"
                  size="lg"
                  className="px-12 py-3 text-base font-semibold"
                  disabled={loading}
                >
                  <Search className="mr-2 h-5 w-5" /> 
                  {loading ? 'Searching...' : 'Search Flights'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Enhanced Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-saudi-green" />
                    Filters
                  </h2>
                  
                  <div className="space-y-8">
                    {/* Price Range Filter */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">Price Range</Label>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 1000]}
                          max={1000}
                          step={50}
                          onValueChange={(value) => setPriceRange(value)}
                          className="mb-4"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Airline Filter */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">Airline</Label>
                      <RadioGroup 
                        defaultValue={selectedAirline} 
                        onValueChange={setSelectedAirline}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="all" id="all-airlines" />
                          <Label htmlFor="all-airlines" className="font-medium">All Airlines</Label>
                        </div>
                        {airlines.map(airline => (
                          <div key={airline} className="flex items-center space-x-3">
                            <RadioGroupItem value={airline} id={airline} />
                            <Label htmlFor={airline}>{airline}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <Separator />
                    
                    {/* Stops Filter */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">Stops</Label>
                      <RadioGroup 
                        defaultValue={maxStops.toString()}
                        onValueChange={(value) => setMaxStops(parseInt(value))}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="0" id="non-stop" />
                          <Label htmlFor="non-stop">Non-stop only</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="1" id="max-1-stop" />
                          <Label htmlFor="max-1-stop">Max 1 stop</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="2" id="max-2-stops" />
                          <Label htmlFor="max-2-stops">Max 2 stops</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button 
                      variant="saudi"
                      className="w-full mt-6" 
                      onClick={handleSearch}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Enhanced Flight Results */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="flights" className="w-full">
                <TabsList className="mb-8 bg-white/80 backdrop-blur-sm">
                  <TabsTrigger value="flights" className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Flights ({filteredFlights.length})
                  </TabsTrigger>
                  <TabsTrigger value="external" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    External Providers ({externalProviders.length})
                  </TabsTrigger>
                </TabsList>
                
                {/* Enhanced Flights Tab */}
                <TabsContent value="flights" className="mt-0">
                  {loading ? (
                    <div className="space-y-6">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} variant="elevated">
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                              <div className="flex gap-4">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                  <Skeleton className="h-6 w-40" />
                                  <Skeleton className="h-4 w-24" />
                                </div>
                              </div>
                              <div className="flex-grow grid grid-cols-3 gap-4">
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                              </div>
                              <div className="space-y-2">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-10 w-32" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : filteredFlights.length === 0 ? (
                    <Card variant="elevated">
                      <CardContent className="p-12 text-center">
                        <div className="max-w-md mx-auto">
                          <div className="mb-4">
                            <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                          <p className="text-muted-foreground mb-6">
                            We couldn't find any flights matching your criteria. Try adjusting your filters or search parameters.
                          </p>
                          <Button onClick={handleSearch} variant="saudi">
                            Reset Filters
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <motion.div 
                      className="space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {filteredFlights.map((flight, index) => (
                        <motion.div
                          key={flight.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <FlightCard
                            flight={flight}
                            departureDate={departureDate}
                            passengers={passengers}
                            onViewDetails={handleViewDetails}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </TabsContent>
                
                {/* Enhanced External Providers Tab */}
                <TabsContent value="external" className="mt-0">
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} variant="elevated">
                          <CardContent className="p-6">
                            <Skeleton className="w-full h-16 mb-4" />
                            <div className="space-y-2">
                              <Skeleton className="h-6 w-40" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-10 w-full mt-4" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {externalProviders.map((provider, index) => (
                        <motion.div
                          key={provider.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card variant="interactive" className="h-full">
                            <CardContent className="p-6 text-center">
                              <div className="h-16 mb-6 bg-muted/50 flex items-center justify-center rounded-lg">
                                <img
                                  src={provider.logo}
                                  alt={provider.name}
                                  className="h-10 max-w-full object-contain"
                                />
                              </div>
                              
                              <h3 className="font-semibold text-lg mb-2">{provider.name}</h3>
                              <div className="text-muted-foreground mb-6 text-sm">
                                {provider.price_indication}
                              </div>
                              
                              <Button 
                                onClick={() => handleExternalProviderClick(provider.url)} 
                                variant="saudi-outline"
                                className="w-full"
                              >
                                Search on {provider.name}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FlightSearchPage;
