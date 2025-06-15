
import React, { useState, useEffect, useCallback } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types must match backend
interface Transport {
  id: string;
  name?: string;
  name_ar?: string;
  provider_logo?: string;
  type: string;
  from_city: string;
  from_city_ar?: string;
  to_city: string;
  to_city_ar?: string;
  departure_time: string;
  duration_hours: number;
  price: number;
  capacity: number;
  available_seats: number;
  is_internal?: boolean;
  features?: string[];
}

interface ExternalTransportProvider {
  id: string;
  name: string;
  logo: string;
  url: string;
  price_indication: string;
}

const TransportSearchPage: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

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
  const [error, setError] = useState<string | null>(null);

  // Fetch transport options from Supabase
  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from("transport_options").select("*");
      
      if (transportType && transportType !== "all") {
        query = query.eq("type", transportType);
      }

      const { data, error } = await query;

      if (error) {
        setTransports([]);
        setError(t("transport.noTransport", "No transport options found"));
        toast({
          title: t("common.error", "Error"),
          description: t("transport.noTransportMessage", "Could not load transport options."),
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Transform the data to match component expectations
      const transportData: Transport[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        name_ar: item.name_ar,
        provider_logo: item.thumbnail,
        type: item.type,
        from_city: item.from_city,
        from_city_ar: item.from_city_ar,
        to_city: item.to_city,
        to_city_ar: item.to_city_ar,
        departure_time: item.departure_time || "08:00",
        duration_hours: item.duration_hours || 2,
        price: Number(item.price),
        capacity: item.capacity || 50,
        available_seats: item.available_seats || 30,
        features: []
      }));

      setTransports(transportData);

      // External providers - still mocked for now
      setExternalProviders([
        {
          id: "provider-1",
          name: "GetYourGuide",
          logo: "/placeholder.svg",
          url: "https://getyourguide.com",
          price_indication: t("transport.from", "From") + " $50"
        },
        {
          id: "provider-2",
          name: "Uber",
          logo: "/placeholder.svg",
          url: "https://uber.com",
          price_indication: t("transport.from", "From") + " $120"
        },
        {
          id: "provider-3",
          name: "Viator",
          logo: "/placeholder.svg",
          url: "https://viator.com",
          price_indication: t("transport.from", "From") + " $65"
        }
      ]);

      setLoading(false);
    } catch (err: any) {
      setError(t("common.error", "Unknown error fetching data"));
      setLoading(false);
      toast({
        title: t("common.error", "Error"),
        description: err?.message || t("common.tryAgain", "An error occurred."),
        variant: "destructive",
      });
    }
  }, [toast, transportType, t]);

  // Run search on mount and whenever filter changes
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const filteredTransports = transports;

  // Handle view details/book now
  const handleViewDetails = (transport: Transport) => {
    navigate(`/transport/${transport.id}`);
  };

  // Handle external provider click
  const handleExternalProviderClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Get icon based on transport type
  const getTransportIcon = (type: string) => {
    switch (type) {
      case "bus":
      case "intercity":
        return <Bus className="h-4 w-4" />;
      case "car":
      case "private_car":
        return <Car className="h-4 w-4" />;
      default:
        return <Bus className="h-4 w-4" />;
    }
  };

  // Get display name based on language
  const getDisplayName = (name: string, name_ar?: string) => {
    return language === 'ar' && name_ar ? name_ar : name;
  };

  // Get display city based on language
  const getDisplayCity = (city: string, city_ar?: string) => {
    return language === 'ar' && city_ar ? city_ar : city;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">{t("transport.title", "Transportation Services")}</h1>
        
        {/* Transport Search Form */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="from">{t("transport.from", "From")}</Label>
                <Select defaultValue={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger id="from">
                    <SelectValue placeholder={t("home.search.destinationPlaceholder", "Select city")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Makkah">{language === 'ar' ? 'مكة المكرمة' : 'Makkah'}</SelectItem>
                    <SelectItem value="Madinah">{language === 'ar' ? 'المدينة المنورة' : 'Madinah'}</SelectItem>
                    <SelectItem value="Jeddah">{language === 'ar' ? 'جدة' : 'Jeddah'}</SelectItem>
                    <SelectItem value="Riyadh">{language === 'ar' ? 'الرياض' : 'Riyadh'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="to">{t("transport.to", "To")}</Label>
                <Select defaultValue={toCity} onValueChange={setToCity}>
                  <SelectTrigger id="to">
                    <SelectValue placeholder={t("home.search.destinationPlaceholder", "Select city")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Makkah">{language === 'ar' ? 'مكة المكرمة' : 'Makkah'}</SelectItem>
                    <SelectItem value="Madinah">{language === 'ar' ? 'المدينة المنورة' : 'Madinah'}</SelectItem>
                    <SelectItem value="Jeddah">{language === 'ar' ? 'جدة' : 'Jeddah'}</SelectItem>
                    <SelectItem value="Riyadh">{language === 'ar' ? 'الرياض' : 'Riyadh'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="travel-date">{t("home.search.departureDate", "Travel Date")}</Label>
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
                      {travelDate ? format(travelDate, "PPP") : <span>{t("home.search.departurePlaceholder", "Pick a date")}</span>}
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
                <Label htmlFor="passengers">{t("common.passengers", "Passengers")}</Label>
                <Select defaultValue={passengers.toString()} onValueChange={(val) => setPassengers(parseInt(val))}>
                  <SelectTrigger id="passengers">
                    <SelectValue placeholder={t("common.passengers", "Select passengers")} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 6, 8, 10, 15, 20].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? t("common.passenger", "passenger") : t("common.passengers", "passengers")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-4">
              <Label>{t("transport.type", "Transport Type")}</Label>
              <RadioGroup 
                defaultValue={transportType} 
                onValueChange={setTransportType}
                className="flex mt-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-transport" />
                  <Label htmlFor="all-transport">{t("transport.allTypes", "All Types")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intercity" id="bus" />
                  <Label htmlFor="bus">{t("transport.intercity", "Bus")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="airport_transfer" id="shuttle" />
                  <Label htmlFor="shuttle">{t("transport.airportTransfer", "Airport Transfer")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private_car" id="car" />
                  <Label htmlFor="car">{t("transport.privateCar", "Private Car")}</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSearch} className="px-8">
                <Search className="mr-2 h-4 w-4" /> {t("search.searchButton", "Search Transport")}
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
                  {t("transport.options", "Transport Options")}
                </TabsTrigger>
                <TabsTrigger value="external">
                  <Search className="h-4 w-4 mr-2" />
                  {t("transport.externalProviders", "External Providers")}
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
                ) : error ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">{error}</p>
                      <Button onClick={handleSearch} className="mt-4">{t("common.tryAgain", "Retry")}</Button>
                    </CardContent>
                  </Card>
                ) : filteredTransports.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">{t("transport.noTransport", "No transport options found matching your criteria.")}</p>
                      <Button onClick={handleSearch} className="mt-4">{t("common.reset", "Reset Filters")}</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {filteredTransports.map(transport => (
                      <Card key={transport.id} className="relative overflow-hidden">
                        {transport.is_internal && (
                          <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
                            {t("transport.internal", "Internal")}
                          </Badge>
                        )}
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row justify-between gap-4">
                            <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
                                {transport.provider_logo ? (
                                  <img
                                    src={transport.provider_logo}
                                    alt={getDisplayName(transport.name || "", transport.name_ar)}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full text-xs text-muted-foreground">{t("common.noLogo", "No Logo")}</div>
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{getDisplayName(transport.name || "", transport.name_ar)}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  {getTransportIcon(transport.type)}
                                  <span className="ml-1 capitalize">{transport.type.replace('_', ' ')}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-center">
                              <div className="text-center">
                                <div className="font-semibold">{getDisplayCity(transport.from_city, transport.from_city_ar)}</div>
                                <div className="text-sm text-muted-foreground">{t("transport.from", "From")}</div>
                                <div className="text-xs">{transport.departure_time}</div>
                              </div>
                              <div className="text-center flex flex-col items-center">
                                <div className="text-xs text-muted-foreground">{transport.duration_hours}h</div>
                                <div className="w-full flex items-center">
                                  <div className="h-[1px] bg-border flex-grow"></div>
                                  {getTransportIcon(transport.type)}
                                  <div className="h-[1px] bg-border flex-grow"></div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-semibold">{getDisplayCity(transport.to_city, transport.to_city_ar)}</div>
                                <div className="text-sm text-muted-foreground">{t("transport.to", "To")}</div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <div className="text-xl font-bold">${transport.price}</div>
                              <div className="text-xs text-muted-foreground mb-2">{t("price.perPerson", "per person")}</div>
                              <Button onClick={() => handleViewDetails(transport)}>
                                {t("packages.viewDetails", "View Details")}
                              </Button>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-wrap gap-2">
                              {(transport.features || []).map((feature, index) => (
                                <Badge key={index} variant="outline">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              <span>{t("transport.capacity", "Capacity")}: {transport.capacity} {t("common.passengers", "passengers")}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
                            {t("transport.searchOn", "Search on")} {provider.name}
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
