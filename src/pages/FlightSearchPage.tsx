
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
import { ArrowRight, CalendarIcon, Clock, Plane, Search, Users } from "lucide-react";

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
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Find Flights</h1>
        
        {/* Flight Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="mb-4">
              <RadioGroup 
                defaultValue={tripType} 
                onValueChange={setTripType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-way" id="one-way" />
                  <Label htmlFor="one-way">One way</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round-trip" id="round-trip" />
                  <Label htmlFor="round-trip">Round trip</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Select defaultValue={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger id="from">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                    <SelectItem value="Makkah">Makkah</SelectItem>
                    <SelectItem value="Madinah">Madinah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="to">To</Label>
                <Select defaultValue={toCity} onValueChange={setToCity}>
                  <SelectTrigger id="to">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                    <SelectItem value="Makkah">Makkah</SelectItem>
                    <SelectItem value="Madinah">Madinah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="departure-date">Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {tripType === "round-trip" && (
                <div>
                  <Label htmlFor="return-date">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !returnDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        disabled={date => !departureDate || date < departureDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {tripType === "one-way" && (
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select defaultValue={passengers.toString()} onValueChange={(val) => setPassengers(parseInt(val))}>
                    <SelectTrigger id="passengers">
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
            
            <div className="flex justify-end">
              <Button onClick={handleSearch} className="px-8">
                <Search className="mr-2 h-4 w-4" /> Search Flights
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
                      max={1000}
                      step={50}
                      onValueChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base">Airline</Label>
                  <RadioGroup 
                    defaultValue={selectedAirline} 
                    onValueChange={setSelectedAirline}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all-airlines" />
                      <Label htmlFor="all-airlines">All Airlines</Label>
                    </div>
                    {airlines.map(airline => (
                      <div key={airline} className="flex items-center space-x-2">
                        <RadioGroupItem value={airline} id={airline} />
                        <Label htmlFor={airline}>{airline}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <Label className="text-base">Stops</Label>
                  <RadioGroup 
                    defaultValue={maxStops.toString()}
                    onValueChange={(value) => setMaxStops(parseInt(value))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="non-stop" />
                      <Label htmlFor="non-stop">Non-stop only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="max-1-stop" />
                      <Label htmlFor="max-1-stop">Max 1 stop</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="max-2-stops" />
                      <Label htmlFor="max-2-stops">Max 2 stops</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button className="w-full" onClick={handleSearch}>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Flight Results */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="flights">
              <TabsList className="mb-6">
                <TabsTrigger value="flights">
                  <Plane className="h-4 w-4 mr-2" />
                  Flights
                </TabsTrigger>
                <TabsTrigger value="external">
                  <Search className="h-4 w-4 mr-2" />
                  External Providers
                </TabsTrigger>
              </TabsList>
              
              {/* Flights Tab */}
              <TabsContent value="flights" className="mt-0">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex gap-4 mb-4 sm:mb-0">
                              <Skeleton className="w-12 h-12 rounded-full" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-6 w-32" />
                            </div>
                          </div>
                          <Skeleton className="h-8 w-full mt-4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredFlights.length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-muted-foreground">No flights found matching your criteria.</p>
                          <Button onClick={handleSearch} className="mt-4">Reset Filters</Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {filteredFlights.map(flight => (
                          <Card key={flight.id} className="relative overflow-hidden">
                            {flight.is_internal && (
                              <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                                Internal
                              </Badge>
                            )}
                            <CardContent className="p-6">
                              <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="flex gap-4 items-center">
                                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
                                    <img 
                                      src={flight.airline_logo} 
                                      alt={flight.airline} 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{flight.airline}</h3>
                                    <div className="text-sm text-muted-foreground">
                                      Flight #{flight.id.replace('flight-', '')}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-center">
                                  <div className="text-center">
                                    <div className="font-semibold text-lg">{flight.departure_time}</div>
                                    <div className="text-sm">{flight.departure_airport}</div>
                                    <div className="text-xs text-muted-foreground">{flight.departure_city}</div>
                                  </div>
                                  
                                  <div className="text-center flex flex-col items-center">
                                    <div className="text-xs text-muted-foreground">{flight.duration}</div>
                                    <div className="w-full flex items-center">
                                      <div className="h-[1px] bg-border flex-grow"></div>
                                      <Plane className="mx-2 h-3 w-3 text-muted-foreground" />
                                      <div className="h-[1px] bg-border flex-grow"></div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {flight.stops === 0 ? 'Non-stop' : 
                                       flight.stops === 1 ? '1 stop' : 
                                       `${flight.stops} stops`}
                                    </div>
                                  </div>
                                  
                                  <div className="text-center">
                                    <div className="font-semibold text-lg">{flight.arrival_time}</div>
                                    <div className="text-sm">{flight.arrival_airport}</div>
                                    <div className="text-xs text-muted-foreground">{flight.arrival_city}</div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end justify-between">
                                  <div className="text-xl font-bold">${flight.price}</div>
                                  <div className="text-xs text-muted-foreground mb-2">per person</div>
                                  <Button onClick={() => handleViewDetails(flight)}>
                                    {flight.is_internal ? 'Book Now' : 'View Details'}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>Departure: {departureDate ? format(departureDate, 'dd MMM yyyy') : 'Not selected'}</span>
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Users className="w-3 h-3 mr-1" />
                                  <span>{passengers} {passengers === 1 ? 'passenger' : 'passengers'}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              {/* External Providers Tab */}
              <TabsContent value="external" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <Skeleton className="w-full h-12 mb-4" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-8 w-full mt-4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {externalProviders.map(provider => (
                      <Card key={provider.id} className="relative overflow-hidden">
                        <CardContent className="p-6">
                          <div className="h-12 mb-4 bg-muted flex items-center justify-center rounded">
                            <img
                              src={provider.logo}
                              alt={provider.name}
                              className="h-8 max-w-full object-contain"
                            />
                          </div>
                          
                          <h3 className="font-semibold text-center">{provider.name}</h3>
                          <div className="text-center text-sm mb-4">
                            {provider.price_indication}
                          </div>
                          
                          <Button 
                            onClick={() => handleExternalProviderClick(provider.url)} 
                            className="w-full"
                            variant="outline"
                          >
                            Search on {provider.name}
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlightSearchPage;
