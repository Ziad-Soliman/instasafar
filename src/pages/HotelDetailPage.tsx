
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  MapPin, 
  Star, 
  Wifi, 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  ChevronLeft, 
  CameraIcon
} from "lucide-react";
import { format, addDays, differenceInDays } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import ImageCarousel from "@/components/ImageCarousel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define interfaces
interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string | null;
  detailed_description?: string;
  rating: number | null;
  price_per_night: number;
  discount_price?: number;
  distance_to_haram: string | null;
  amenities?: string[];
  thumbnail: string | null;
  images?: string[];
  map_coordinates?: {
    lat: number;
    lng: number;
  };
  is_internal: boolean;
}

interface Room {
  id: string;
  room_type: string;
  price_per_night: number;
  capacity: number;
  description: string;
  amenities: string[];
  images: string[];
}

const HotelDetailPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { toast } = useToast();
  
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(addDays(new Date(), 3));
  const [guests, setGuests] = useState(2);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Fetch hotel and rooms data
  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("hotels")
          .select("*")
          .eq("id", hotelId)
          .maybeSingle();
        
        if (error) {
          toast({
            title: "Error",
            description: "Could not fetch hotel.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Transform the data to match our interface
        if (data) {
          const hotelData: Hotel = {
            ...data,
            is_internal: true,
            amenities: ["Free WiFi", "Breakfast Included", "Prayer Room", "Shuttle Service", "Room Service", "Air Conditioning", "Concierge", "24/7 Front Desk"],
            images: data.thumbnail ? [
              data.thumbnail,
              "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ] : [
              "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
          };
          setHotel(hotelData);
          
          // Mock rooms data with proper images
          const roomsData: Room[] = [
            {
              id: "room-1",
              room_type: "Standard Room",
              price_per_night: data.price_per_night,
              capacity: 2,
              description: "Comfortable standard room with two single beds",
              amenities: ["Free WiFi", "Air Conditioning", "TV", "Private Bathroom"],
              images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
            },
            {
              id: "room-2",
              room_type: "Deluxe Room",
              price_per_night: Math.round(data.price_per_night * 1.3),
              capacity: 3,
              description: "Spacious deluxe room with Haram view, king bed and additional single bed",
              amenities: ["Free WiFi", "Air Conditioning", "TV", "Mini Fridge", "Safe", "Haram View"],
              images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]
            }
          ];
          setRooms(roomsData);
        }
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        toast({
          title: "Error",
          description: "Failed to load hotel details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotel();
  }, [hotelId, toast]);
  
  // Calculate number of nights
  const nights = differenceInDays(checkOut, checkIn);
  
  // Handle room selection
  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
  };
  
  // Handle booking initiation
  const handleBookNow = () => {
    if (!hotel) return;
    
    const roomToBook = selectedRoom || rooms[0];
    
    // Navigate to booking confirmation page with booking details
    navigate("/booking/confirm", {
      state: {
        bookingItem: {
          id: roomToBook.id,
          name: `${hotel.name} - ${roomToBook.room_type}`,
          type: "hotel",
          image: roomToBook.images[0] || hotel.thumbnail,
          price: roomToBook.price_per_night,
          nights: nights,
          start_date: checkIn,
          end_date: checkOut,
          guests: guests,
        }
      }
    });
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Search
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
                
                <div className="pt-4">
                  <Skeleton className="h-6 w-1/3" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                </div>
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
  
  // If hotel not found
  if (!hotel) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Hotel Not Found</h2>
          <p className="text-muted-foreground mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/search">Back to Search</Link>
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
            <Link to="/search">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Search
            </Link>
          </Button>
          
          <div className="space-y-6">
            {/* Hotel Title and Badge */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-1">{hotel.name}</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.address}, {hotel.city}</span>
                </div>
              </div>
              {hotel.is_internal && (
                <Badge className="bg-primary" variant="secondary">
                  {t("listing.internal")}
                </Badge>
              )}
            </div>
            
            {/* Main Image Carousel */}
            <div className="rounded-lg overflow-hidden">
              <ImageCarousel 
                images={hotel.images || [hotel.thumbnail || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]}
                aspectRatio={16/9}
                allowFullscreen={true}
                caption={`${hotel.name} - ${hotel.city}`}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Hotel Details */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  {/* Rating and Distance */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{(hotel.rating || 0).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 mr-1" />
                      <span>{hotel.distance_to_haram || "N/A"} {t("distance.from")} {t("distance.haram")}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground">{hotel.detailed_description || hotel.description}</p>
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                      {hotel.amenities?.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <Wifi className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rooms */}
                  <div className="pt-4">
                    <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
                    
                    {rooms.length === 0 ? (
                      <p className="text-muted-foreground">No rooms available for the selected dates.</p>
                    ) : (
                      <div className="space-y-4">
                        {rooms.map((room) => (
                          <Card 
                            key={room.id} 
                            className={`overflow-hidden transition-all ${selectedRoom?.id === room.id ? 'border-primary ring-1 ring-primary' : ''}`}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-4">
                              <div className="md:col-span-1">
                                <div className="h-full bg-muted">
                                  <img 
                                    src={room.images[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                                    alt={room.room_type} 
                                    className="w-full h-full object-cover aspect-square md:aspect-auto" 
                                  />
                                </div>
                              </div>
                              <div className="md:col-span-3 p-4">
                                <div className="flex flex-wrap justify-between gap-2">
                                  <div>
                                    <h3 className="font-semibold">{room.room_type}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {room.amenities.slice(0, 4).map((amenity, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {amenity}
                                        </Badge>
                                      ))}
                                      {room.amenities.length > 4 && (
                                        <Badge variant="outline" className="text-xs">
                                          +{room.amenities.length - 4} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="text-right">
                                    <div className="text-lg font-semibold">${room.price_per_night}</div>
                                    <div className="text-sm text-muted-foreground mb-2">per night</div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 mt-auto">
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Max {room.capacity} guests</span>
                                  </div>
                                  
                                  <div className="ml-auto">
                                    <Button 
                                      onClick={() => handleRoomSelect(room)}
                                      variant={selectedRoom?.id === room.id ? "default" : "outline"}
                                    >
                                      {selectedRoom?.id === room.id ? "Selected" : "Select Room"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Booking Card */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Book Your Stay</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="dates">Dates</Label>
                      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-left font-normal mt-1"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(checkIn, "MMM d")} - {format(checkOut, "MMM d, yyyy")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="flex flex-col sm:flex-row p-2 gap-2">
                            <div>
                              <p className="text-sm mb-2 font-medium">Check-in</p>
                              <Calendar
                                mode="single"
                                selected={checkIn}
                                onSelect={(date) => date && setCheckIn(date)}
                                disabled={(date) => date < new Date()}
                                className="p-3 pointer-events-auto"
                              />
                            </div>
                            <div>
                              <p className="text-sm mb-2 font-medium">Check-out</p>
                              <Calendar
                                mode="single"
                                selected={checkOut}
                                onSelect={(date) => date && setCheckOut(date)}
                                disabled={(date) => date <= checkIn}
                                className="p-3 pointer-events-auto"
                              />
                            </div>
                          </div>
                          <div className="p-2 border-t">
                            <Button 
                              className="w-full" 
                              onClick={() => setCalendarOpen(false)}
                            >
                              Done
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      
                      <div className="text-sm text-muted-foreground mt-1">
                        {nights} {nights === 1 ? "night" : "nights"}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="guests">Guests</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max="10"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Room Price</span>
                        <span>${selectedRoom?.price_per_night || (rooms[0]?.price_per_night || hotel.price_per_night)} × {nights} nights</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Taxes & Fees</span>
                        <span>Included</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span>${(selectedRoom?.price_per_night || (rooms[0]?.price_per_night || hotel.price_per_night)) * nights}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      onClick={handleBookNow}
                      disabled={rooms.length === 0}
                    >
                      Book Now
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      You won't be charged yet
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelDetailPage;
