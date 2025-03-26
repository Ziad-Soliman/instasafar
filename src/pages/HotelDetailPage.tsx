
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Users, Calendar, Wifi, Coffee, Utensils } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HotelDetailPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  
  // This would typically fetch hotel data based on hotelId
  const hotel = {
    id: hotelId,
    name: "Grand Makkah Hotel",
    description: "Experience luxury and comfort just steps away from the Holy Mosque. Our hotel offers spacious rooms, excellent service, and a prime location for your spiritual journey.",
    address: "123 King Fahd Rd, Makkah",
    city: "Makkah",
    rating: 4.8,
    reviews_count: 245,
    distance_to_haram: "300m",
    price_per_night: 240,
    amenities: ["Free WiFi", "Room Service", "Restaurant", "Prayer Room", "Laundry Service", "Airport Shuttle"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hotel.address}</span>
              <span className="mx-2">•</span>
              <span>{hotel.distance_to_haram} from Haram</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-medium">{hotel.rating}</span>
              </div>
              <span className="text-muted-foreground ml-2">({hotel.reviews_count} reviews)</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-2xl font-bold text-right">${hotel.price_per_night}</div>
            <div className="text-muted-foreground text-right">per night</div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 h-64 md:h-auto rounded-lg overflow-hidden">
            <img 
              src={hotel.images[0]} 
              alt={hotel.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-4">
            {hotel.images.slice(1, 5).map((image, index) => (
              <div key={index} className="h-32 md:h-40 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${hotel.name} ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <div className="prose max-w-none">
                  <p className="text-base">{hotel.description}</p>
                  <p>Located in the heart of Makkah, our hotel provides the perfect base for worship and exploration. With the Holy Mosque just a short walk away, you can focus on your spiritual journey without worrying about transportation.</p>
                  <p>Our rooms are designed with your comfort in mind, featuring modern amenities and traditional touches that create a peaceful atmosphere for prayer and rest.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity === "Free WiFi" ? (
                        <Wifi className="w-5 h-5 mr-2 text-primary" />
                      ) : amenity === "Room Service" ? (
                        <Users className="w-5 h-5 mr-2 text-primary" />
                      ) : amenity === "Restaurant" ? (
                        <Utensils className="w-5 h-5 mr-2 text-primary" />
                      ) : (
                        <Coffee className="w-5 h-5 mr-2 text-primary" />
                      )}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                        A
                      </div>
                      <div>
                        <div className="font-medium">Ahmed M.</div>
                        <div className="text-sm text-muted-foreground">May 2023</div>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span className="ml-1">5.0</span>
                      </div>
                    </div>
                    <p className="text-sm">The location is perfect, just a short walk to the Haram. Staff was very helpful and the room was clean and comfortable.</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                        F
                      </div>
                      <div>
                        <div className="font-medium">Fatima K.</div>
                        <div className="text-sm text-muted-foreground">April 2023</div>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span className="ml-1">4.5</span>
                      </div>
                    </div>
                    <p className="text-sm">Excellent service and the prayer room in the hotel was very convenient. Would definitely stay here again.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="mt-0">
                <div className="h-80 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map View Coming Soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Card */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Book Your Stay</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    <span>Select dates to see availability</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    <span>2 guests, 1 room</span>
                  </div>
                </div>
                
                <div className="border-t border-b py-4 my-4">
                  <div className="flex justify-between mb-2">
                    <span>${hotel.price_per_night} x 3 nights</span>
                    <span>${hotel.price_per_night * 3}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>$30</span>
                  </div>
                  <div className="flex justify-between font-bold mt-4">
                    <span>Total</span>
                    <span>${(hotel.price_per_night * 3) + 30}</span>
                  </div>
                </div>
                
                <Button className="w-full">Book Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HotelDetailPage;
