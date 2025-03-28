
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowRight, Bus, CalendarIcon, Car, MapPin, Search, Users } from "lucide-react";

// Mock data for transport options
interface Transport {
  id: string;
  provider: string;
  provider_logo: string;
  transport_type: "bus" | "car" | "shuttle";
  from_city: string;
  to_city: string;
  departure_time: string;
  duration: string;
  price: number;
  capacity: number;
  is_internal: boolean;
  features: string[];
}

// Mock external transport provider
interface ExternalTransportProvider {
  id: string;
  name: string;
  logo: string;
  url: string;
  price_indication: string;
}

const TransportSearchPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for search form
  const [fromCity, setFromCity] = useState("Makkah");
  const [toCity, setToCity] = useState("Madinah");
  const [travelDate, setTravelDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState(1);
  const [transportType, setTransportType] = useState<string>("all");
  
  // State for results
  const [loading, setLoading] = useState(false);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [externalProviders, setExternalProviders] = useState<ExternalTransportProvider[]>([]);
  
  // Fetch transport options on search
  const handleSearch = () => {
    setLoading(true);
    
    // Mock API call - would be replaced with Supabase query
    setTimeout(() => {
      // Mock transport data
      const mockTransports: Transport[] = [
        {
          id: "transport-1",
          provider: "SAPTCO",
          provider_logo: "/placeholder.svg",
          transport_type: "bus",
          from_city: "Makkah",
          to_city: "Madinah",
          departure_time: "08:00",
          duration: "4h 30m",
          price: 70,
          capacity: 40,
          is_internal: true,
          features: ["Air Conditioned", "WiFi", "Refreshments", "Prayer Break"]
        },
        {
          id: "transport-2",
          provider: "Al Makkah Trans",
          provider_logo: "/placeholder.svg",
          transport_type: "shuttle",
          from_city: "Makkah",
          to_city: "Madinah",
          departure_time: "09:30",
          duration: "4h",
          price: 85,
          capacity: 16,
          is_internal: true,
          features: ["Air Conditioned", "WiFi", "Water", "Prayer Break"]
        },
        {
          id: "transport-3",
          provider: "Careem",
          provider_logo: "/placeholder.svg",
          transport_type: "car",
          from_city: "Makkah",
          to_city: "Madinah",
          departure_time: "Flexible",
          duration: "3h 45m",
          price: 150,
          capacity: 4,
          is_internal: false,
          features: ["Private", "Air Conditioned", "Water", "Flexible Timing"]
        },
        {
          id: "transport-4",
          provider: "Haramain Train",
          provider_logo: "/placeholder.svg",
          transport_type: "shuttle",
          from_city: "Makkah",
          to_city: "Madinah",
          departure_time: "12:00",
          duration: "2h 30m",
          price: 90,
          capacity: 100,
          is_internal: true,
          features: ["High Speed", "Air Conditioned", "Food Service", "Comfortable Seating"]
        },
      ];
      
      // Mock external providers
      const mockExternalProviders: ExternalTransportProvider[] = [
        {
          id: "provider-1",
          name: "GetYourGuide",
          logo: "/placeholder.svg",
          url: "https://getyourguide.com",
          price_indication: "From $50"
        },
        {
          id: "provider-2",
          name: "Uber",
          logo: "/placeholder.svg",
          url: "https://uber.com",
          price_indication: "From $120"
        },
        {
          id: "provider-3",
          name: "Viator",
          logo: "/placeholder.svg",
          url: "https://viator.com",
          price_indication: "From $65"
        },
      ];
      
      setTransports(mockTransports);
      setExternalProviders(mockExternalProviders);
      setLoading(false);
    }, 1500);
  };
  
  // Run search on component mount
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Filter transports based on current filters
  const filteredTransports = transports.filter(transport => {
    const matchesType = transportType === "all" || transport.transport_type === transportType;
    const hasCapacity = transport.capacity >= passengers;
    
    return matchesType && hasCapacity;
  });
  
  // Handle view details/book now
  const handleViewDetails = (transport: Transport) => {
    // For internal transports, navigate to details page
    if (transport.is_internal) {
      navigate(`/transport/${transport.id}`);
    }
  };
  
  // Handle external provider click
  const handleExternalProviderClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  // Get icon based on transport type
  const getTransportIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Bus className="h-4 w-4" />;
      case "car":
        return <Car className="h-4 w-4" />;
      default:
        return <Bus className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Find Transport</h1>
        
        {/* Transport Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Select defaultValue={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger id="from">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Makkah">Makkah</SelectItem>
                    <SelectItem value="Madinah">Madinah</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
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
                    <SelectItem value="Makkah">Makkah</SelectItem>
                    <SelectItem value="Madinah">Madinah</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="travel-date">Travel Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !travelDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {travelDate ? format(travelDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={travelDate}
                      onSelect={setTravelDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Select defaultValue={passengers.toString()} onValueChange={(val) => setPassengers(parseInt(val))}>
                  <SelectTrigger id="passengers">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 6, 8, 10, 15, 20].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'passenger' : 'passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-4">
              <Label>Transport Type</Label>
              <RadioGroup 
                defaultValue={transportType} 
                onValueChange={setTransportType}
                className="flex mt-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-transport" />
                  <Label htmlFor="all-transport">All Types</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bus" id="bus" />
                  <Label htmlFor="bus">Bus</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shuttle" id="shuttle" />
                  <Label htmlFor="shuttle">Shuttle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="car" id="car" />
                  <Label htmlFor="car">Car</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSearch} className="px-8">
                <Search className="mr-2 h-4 w-4" /> Search Transport
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Transport Results */}
          <div>
            <Tabs defaultValue="transport">
              <TabsList className="mb-6">
                <TabsTrigger value="transport">
                  <Bus className="h-4 w-4 mr-2" />
                  Transport Options
                </TabsTrigger>
                <TabsTrigger value="external">
                  <Search className="h-4 w-4 mr-2" />
                  External Providers
                </TabsTrigger>
              </TabsList>
              
              {/* Transport Tab */}
              <TabsContent value="transport" className="mt-0">
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
                    {filteredTransports.length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-muted-foreground">No transport options found matching your criteria.</p>
                          <Button onClick={handleSearch} className="mt-4">Reset Filters</Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {filteredTransports.map(transport => (
                          <Card key={transport.id} className="relative overflow-hidden">
                            {transport.is_internal && (
                              <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                                Internal
                              </Badge>
                            )}
                            <CardContent className="p-6">
                              <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="flex gap-4 items-center">
                                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
                                    <img 
                                      src={transport.provider_logo} 
                                      alt={transport.provider} 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{transport.provider}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      {getTransportIcon(transport.transport_type)}
                                      <span className="ml-1 capitalize">{transport.transport_type}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-center">
                                  <div className="text-center">
                                    <div className="font-semibold">{transport.from_city}</div>
                                    <div className="text-sm text-muted-foreground">From</div>
                                    <div className="text-xs">{transport.departure_time}</div>
                                  </div>
                                  
                                  <div className="text-center flex flex-col items-center">
                                    <div className="text-xs text-muted-foreground">{transport.duration}</div>
                                    <div className="w-full flex items-center">
                                      <div className="h-[1px] bg-border flex-grow"></div>
                                      {getTransportIcon(transport.transport_type)}
                                      <div className="h-[1px] bg-border flex-grow"></div>
                                    </div>
                                  </div>
                                  
                                  <div className="text-center">
                                    <div className="font-semibold">{transport.to_city}</div>
                                    <div className="text-sm text-muted-foreground">To</div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end justify-between">
                                  <div className="text-xl font-bold">${transport.price}</div>
                                  <div className="text-xs text-muted-foreground mb-2">per person</div>
                                  <Button onClick={() => handleViewDetails(transport)}>
                                    {transport.is_internal ? 'Book Now' : 'View Details'}
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t">
                                <div className="flex flex-wrap gap-2">
                                  {transport.features.map((feature, index) => (
                                    <Badge key={index} variant="outline">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  <span>Capacity: {transport.capacity} passengers</span>
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

export default TransportSearchPage;
