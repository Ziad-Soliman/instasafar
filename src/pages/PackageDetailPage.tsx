import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Hotel, Plane, Bus, Users, ChevronLeft, Check } from "lucide-react";
import { format, differenceInDays, addDays, isValid, parseISO } from "date-fns";
import { packageDetails } from "@/data/packages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import ImageCarousel from "@/components/ImageCarousel";
import { useLanguage } from "@/contexts/LanguageContext";

interface Package {
  id: string;
  name: string;
  description: string;
  detailed_description?: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  thumbnail: string;
  images?: string[];
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  city: "Makkah" | "Madinah" | "Both";
  hotel_details?: {
    makkah?: {
      name: string;
      rating: number;
      nights: number;
      room_type: string;
    };
    madinah?: {
      name: string;
      rating: number;
      nights: number;
      room_type: string;
    };
  };
  flight_details?: {
    airline: string;
    departure_airport: string;
    arrival_airport: string;
    class: string;
  };
  transport_details?: {
    type: string;
    includes_airport_transfer: boolean;
    includes_city_transfer: boolean;
  };
  itinerary?: {
    day: number;
    title: string;
    description: string;
  }[];
  reviews?: {
    id: string;
    user_name: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

// Mock fetch package data function
const fetchPackage = (packageId: string): Promise<Package> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if the package exists in our detailed data
      if (packageDetails[packageId]) {
        resolve(packageDetails[packageId]);
        return;
      }

      // Fallback to generic data if not found
      resolve({
        id: packageId,
        name: "Standard Umrah Package",
        description: "A comprehensive 7-day Umrah package with accommodations and transportation",
        detailed_description: "Our standard Umrah package provides everything you need for a meaningful pilgrimage. Stay at comfortable hotels in both Makkah and Madinah with easy access to the holy sites. Includes guided tours of significant religious and historical locations.",
        price: 1500,
        duration_days: 7,
        start_date: "2023-12-01",
        end_date: "2023-12-07",
        thumbnail: "/placeholder.svg",
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        includes_hotel: true,
        includes_flight: false,
        includes_transport: true,
        city: "Both"
      });
    }, 1000);
  });
};

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [travelers, setTravelers] = useState(2);
  const [departureDate, setDepartureDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 30)));
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Fetch package data
  useEffect(() => {
    const getPackageData = async () => {
      if (!packageId) return;
      
      try {
        setLoading(true);
        const data = await fetchPackage(packageId);
        setPackageData(data);
        
        // If package has a specific start date, set it as default
        if (data.start_date) {
          const startDate = new Date(data.start_date);
          if (startDate > new Date()) {
            setDepartureDate(startDate);
          }
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getPackageData();
  }, [packageId]);
  
  // Handle booking initiation
  const handleBookNow = () => {
    if (!packageData) return;
    
    // Navigate to booking confirmation page with booking details
    navigate("/booking/confirm", {
      state: {
        bookingItem: {
          id: packageData.id,
          name: packageData.name,
          type: "package",
          image: packageData.thumbnail,
          price: packageData.price,
          duration: packageData.duration_days,
          start_date: departureDate,
          end_date: addDays(departureDate, packageData.duration_days),
          travelers: travelers,
        }
      }
    });
  };
  
  // Format start and end dates based on departure date
  const formatPackageDates = () => {
    if (!packageData) return "";
    
    const endDate = addDays(departureDate, packageData.duration_days);
    return `${format(departureDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
  };
  
  // Safe date formatting function
  const formatSafeDate = (dateString: string, formatString: string = "MMM d, yyyy") => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, formatString);
      }
      return "Date available upon booking";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date available upon booking";
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <div className="space-y-6">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              
              <div>
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // If package not found
  if (!packageData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Package Not Found</h2>
          <p className="text-muted-foreground mb-6">The package you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/packages">Back to Packages</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to="/packages">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Packages
            </Link>
          </Button>
          
          <div className="space-y-6">
            {/* Package Title */}
            <div>
              <h1 className="text-3xl font-bold mb-1">{packageData.name}</h1>
              <div className="flex items-center flex-wrap gap-2 text-muted-foreground">
                <div className="flex items-center mr-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{packageData.city}</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{packageData.duration_days} days</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>Available from {packageData.start_date ? formatSafeDate(packageData.start_date) : "Upon booking"}</span>
                </div>
              </div>
            </div>
            
            {/* Main Image Carousel */}
            <div className="rounded-lg overflow-hidden">
              <ImageCarousel 
                images={packageData.images || [packageData.thumbnail]}
                aspectRatio={16/9}
                allowFullscreen={true}
                caption={packageData.name}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Package Details */}
              <div className="md:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6 pt-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Description</h2>
                      <p className="text-muted-foreground">{packageData.detailed_description || packageData.description}</p>
                    </div>
                    
                    {packageData.hotel_details && (
                      <div>
                        <h2 className="text-xl font-semibold mb-3">Accommodation</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {packageData.hotel_details.makkah && (
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Makkah Hotel</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="font-medium">{packageData.hotel_details.makkah.name}</p>
                                <p className="text-sm text-muted-foreground">{packageData.hotel_details.makkah.room_type}</p>
                                <div className="flex items-center mt-1">
                                  <span className="text-sm mr-2">{packageData.hotel_details.makkah.nights} nights</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-sm ${i < packageData.hotel_details.makkah!.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                          
                          {packageData.hotel_details.madinah && (
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Madinah Hotel</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="font-medium">{packageData.hotel_details.madinah.name}</p>
                                <p className="text-sm text-muted-foreground">{packageData.hotel_details.madinah.room_type}</p>
                                <div className="flex items-center mt-1">
                                  <span className="text-sm mr-2">{packageData.hotel_details.madinah.nights} nights</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-sm ${i < packageData.hotel_details.madinah!.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {packageData.reviews && packageData.reviews.length > 0 && (
                      <div>
                        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
                        <div className="space-y-4">
                          {packageData.reviews.map((review) => (
                            <Card key={review.id}>
                              <CardContent className="pt-6">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="font-medium">{review.user_name}</p>
                                    <p className="text-sm text-muted-foreground">{format(new Date(review.date), "MMM d, yyyy")}</p>
                                  </div>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm">{review.comment}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Itinerary Tab */}
                  <TabsContent value="itinerary" className="pt-4">
                    {packageData.itinerary ? (
                      <div className="space-y-4">
                        {packageData.itinerary.map((day) => (
                          <Card key={day.day}>
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center font-medium">
                                  {day.day}
                                </div>
                                <div>
                                  <h3 className="font-medium">{day.title}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Detailed itinerary will be provided upon booking.</p>
                    )}
                  </TabsContent>
                  
                  {/* Inclusions Tab */}
                  <TabsContent value="inclusions" className="pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Hotel className="mr-2 h-5 w-5" />
                            Accommodation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={packageData.includes_hotel ? "text-primary flex items-center" : "text-muted-foreground flex items-center"}>
                            {packageData.includes_hotel ? <Check className="mr-2 h-4 w-4" /> : <span className="w-4 h-4 mr-2" />}
                            {packageData.includes_hotel 
                              ? "Hotel accommodations included in package price" 
                              : "Hotel accommodations not included in package price"}
                          </p>
                          {packageData.hotel_details && (
                            <div className="mt-2 text-sm">
                              {packageData.hotel_details.makkah && (
                                <p>• {packageData.hotel_details.makkah.nights} nights in Makkah at {packageData.hotel_details.makkah.name}</p>
                              )}
                              {packageData.hotel_details.madinah && (
                                <p>• {packageData.hotel_details.madinah.nights} nights in Madinah at {packageData.hotel_details.madinah.name}</p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Plane className="mr-2 h-5 w-5" />
                            Flights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={packageData.includes_flight ? "text-primary flex items-center" : "text-muted-foreground flex items-center"}>
                            {packageData.includes_flight ? <Check className="mr-2 h-4 w-4" /> : <span className="w-4 h-4 mr-2" />}
                            {packageData.includes_flight 
                              ? "Flights included in package price" 
                              : "Flights not included in package price"}
                          </p>
                          {packageData.flight_details && packageData.includes_flight && (
                            <div className="mt-2 text-sm">
                              <p>• Airline: {packageData.flight_details.airline}</p>
                              <p>• From: {packageData.flight_details.departure_airport}</p>
                              <p>• To: {packageData.flight_details.arrival_airport}</p>
                              <p>• Class: {packageData.flight_details.class}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Bus className="mr-2 h-5 w-5" />
                            Transportation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={packageData.includes_transport ? "text-primary flex items-center" : "text-muted-foreground flex items-center"}>
                            {packageData.includes_transport ? <Check className="mr-2 h-4 w-4" /> : <span className="w-4 h-4 mr-2" />}
                            {packageData.includes_transport 
                              ? "Transportation included in package price" 
                              : "Transportation not included in package price"}
                          </p>
                          {packageData.transport_details && packageData.includes_transport && (
                            <div className="mt-2 text-sm">
                              <p>• Transport type: {packageData.transport_details.type}</p>
                              <p className={packageData.transport_details.includes_airport_transfer ? "text-primary flex items-center" : "text-muted-foreground flex items-center"}>
                                {packageData.transport_details.includes_airport_transfer ? <Check className="mr-2 h-3 w-3" /> : <span className="w-3 h-3 mr-2" />}
                                Airport transfers
                              </p>
                              <p className={packageData.transport_details.includes_city_transfer ? "text-primary flex items-center" : "text-muted-foreground flex items-center"}>
                                {packageData.transport_details.includes_city_transfer ? <Check className="mr-2 h-3 w-3" /> : <span className="w-3 h-3 mr-2" />}
                                Intercity transfers (Makkah-Madinah)
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Booking Card */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Book This Package</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl font-bold">
                      ${packageData.price}
                      <span className="text-base font-normal text-muted-foreground ml-1">per person</span>
                    </div>
                    
                    <div>
                      <Label htmlFor="dates">Departure Date</Label>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal mt-1"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatPackageDates()}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="p-2">
                            <Calendar
                              mode="single"
                              selected={departureDate}
                              onSelect={(date) => date && setDepartureDate(date)}
                              disabled={(date) => {
                                const today = new Date();
                                if (date < today) return true;
                                
                                // Only apply date restrictions if we have valid start/end dates
                                if (packageData.start_date) {
                                  try {
                                    const startDate = parseISO(packageData.start_date);
                                    if (isValid(startDate) && startDate > today && date < startDate) {
                                      return true;
                                    }
                                  } catch (error) {
                                    console.error("Start date parsing error:", error);
                                  }
                                }
                                
                                if (packageData.end_date) {
                                  try {
                                    const endDate = parseISO(packageData.end_date);
                                    if (isValid(endDate) && date > endDate) {
                                      return true;
                                    }
                                  } catch (error) {
                                    console.error("End date parsing error:", error);
                                  }
                                }
                                
                                return false;
                              }}
                              className="p-3"
                            />
                            <div className="p-2 border-t">
                              <Button 
                                className="w-full" 
                                onClick={() => setCalendarOpen(false)}
                              >
                                Done
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <div className="text-sm text-muted-foreground mt-1">
                        {packageData.duration_days} days package
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="travelers"
                          type="number"
                          min="1"
                          max="20"
                          value={travelers}
                          onChange={(e) => setTravelers(Number(e.target.value))}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Package Price</span>
                        <span>${packageData.price} × {travelers} {travelers === 1 ? "person" : "people"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Taxes & Fees</span>
                        <span>Included</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span>${packageData.price * travelers}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      You won't be charged yet
                    </p>
                  </CardContent>
                </Card>
                
                <div className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Package Includes:</h3>
                      <ul className="space-y-1 text-sm">
                        {packageData.includes_hotel && (
                          <li className="flex items-center text-primary">
                            <Check className="h-3 w-3 mr-2" />
                            Hotel Accommodations
                          </li>
                        )}
                        {packageData.includes_flight && (
                          <li className="flex items-center text-primary">
                            <Check className="h-3 w-3 mr-2" />
                            Flight Tickets
                          </li>
                        )}
                        {packageData.includes_transport && (
                          <li className="flex items-center text-primary">
                            <Check className="h-3 w-3 mr-2" />
                            Transportation
                          </li>
                        )}
                        <li className="flex items-center text-primary">
                          <Check className="h-3 w-3 mr-2" />
                          Religious Guide
                        </li>
                        <li className="flex items-center text-primary">
                          <Check className="h-3 w-3 mr-2" />
                          24/7 Support
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PackageDetailPage;
