
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, User, Check, Hotel, Plane, Bus } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const PackageDetailPage: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  
  // This would typically fetch package data based on packageId
  const packageData = {
    id: packageId,
    name: "Complete Umrah Package",
    description: "Experience a seamless and spiritual Umrah journey with our comprehensive package that includes hotel accommodations, transportation, and guided tours.",
    price: 1200,
    duration_days: 7,
    start_date: "2023-11-10",
    end_date: "2023-11-17",
    includes_hotel: true,
    hotel_details: {
      name: "Al Safwah Royale Orchid Hotel",
      rating: 5,
      distance_to_haram: "200m",
      city: "Makkah",
    },
    includes_flight: true,
    flight_details: "Round-trip flights from major cities. Economy class with 23kg baggage allowance.",
    includes_transport: true,
    transport_details: "Airport transfers and transportation between Makkah and Madinah.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jeddah",
        description: "Arrival at King Abdulaziz International Airport. Transfer to hotel in Makkah."
      },
      {
        day: 2,
        title: "Umrah",
        description: "Perform Umrah with guidance from our experienced guides."
      },
      {
        day: 3,
        title: "Makkah Ziyarat",
        description: "Visit historical sites in and around Makkah, including Jabal Al-Noor and Jabal Thawr."
      },
      {
        day: 4,
        title: "Travel to Madinah",
        description: "Travel to Madinah by air-conditioned bus. Check-in at hotel."
      },
      {
        day: 5,
        title: "Madinah Ziyarat",
        description: "Visit Masjid Nabawi and historical sites in Madinah."
      },
      {
        day: 6,
        title: "Madinah Exploration",
        description: "Continue exploration of Madinah, including Mount Uhud and Masjid Quba."
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to airport for return flight."
      }
    ],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
            <h1 className="text-3xl font-bold">{packageData.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>{packageData.duration_days} days</span>
              {packageData.includes_hotel && (
                <>
                  <span className="mx-2">•</span>
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Makkah & Madinah</span>
                </>
              )}
            </div>
            <div className="flex items-center mt-2 space-x-4">
              {packageData.includes_hotel && (
                <div className="flex items-center text-muted-foreground">
                  <Hotel className="w-4 h-4 mr-1" />
                  <span>Hotel</span>
                </div>
              )}
              {packageData.includes_flight && (
                <div className="flex items-center text-muted-foreground">
                  <Plane className="w-4 h-4 mr-1" />
                  <span>Flights</span>
                </div>
              )}
              {packageData.includes_transport && (
                <div className="flex items-center text-muted-foreground">
                  <Bus className="w-4 h-4 mr-1" />
                  <span>Transport</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-2xl font-bold text-right">${packageData.price}</div>
            <div className="text-muted-foreground text-right">per person</div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 h-64 md:h-auto rounded-lg overflow-hidden">
            <img 
              src={packageData.images[0]} 
              alt={packageData.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-4">
            {packageData.images.slice(1, 5).map((image, index) => (
              <div key={index} className="h-32 md:h-40 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${packageData.name} ${index + 1}`} 
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
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-0">
                <div className="prose max-w-none">
                  <p className="text-base">{packageData.description}</p>
                  <p>Our experienced guides will assist you throughout your journey, ensuring that you fulfill your religious obligations while making the most of your time in the holy cities.</p>
                  <p>We take care of all the details, from airport transfers to hotel accommodations, allowing you to focus entirely on your spiritual experience.</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Package Highlights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span>Convenient 5-star hotel accommodations close to Haram</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span>Experienced guides to assist with Umrah rituals</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span>Comfortable transportation between cities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span>Ziyarat tours of historical sites in Makkah and Madinah</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <span>24/7 support throughout your journey</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="mt-0">
                <div className="space-y-6">
                  {packageData.itinerary.map((day, index) => (
                    <div key={index} className="relative pl-8 pb-6">
                      {index !== packageData.itinerary.length - 1 && (
                        <div className="absolute left-[15px] top-[28px] bottom-0 w-[1px] bg-border"></div>
                      )}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{day.title}</h3>
                        <p className="text-muted-foreground mt-1">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="inclusions" className="mt-0">
                <div className="space-y-6">
                  {packageData.includes_hotel && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Hotel className="w-5 h-5 text-primary mr-2" />
                        <h3 className="text-lg font-semibold">Hotel Accommodations</h3>
                      </div>
                      <div className="pl-7">
                        <p className="mb-2">Stay at the {packageData.hotel_details.name} in {packageData.hotel_details.city}, just {packageData.hotel_details.distance_to_haram} from the Haram.</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• {packageData.hotel_details.rating}-star accommodations</li>
                          <li>• Double occupancy rooms with private bathrooms</li>
                          <li>• Daily breakfast included</li>
                          <li>• Free WiFi and room service</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {packageData.includes_flight && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Plane className="w-5 h-5 text-primary mr-2" />
                        <h3 className="text-lg font-semibold">Flight Details</h3>
                      </div>
                      <div className="pl-7">
                        <p>{packageData.flight_details}</p>
                      </div>
                    </div>
                  )}
                  
                  {packageData.includes_transport && (
                    <div>
                      <div className="flex items-center mb-3">
                        <Bus className="w-5 h-5 text-primary mr-2" />
                        <h3 className="text-lg font-semibold">Transportation</h3>
                      </div>
                      <div className="pl-7">
                        <p>{packageData.transport_details}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Booking Card */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Book This Package</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">Travel Dates</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(packageData.start_date)} - {formatDate(packageData.end_date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{packageData.duration_days} days / {packageData.duration_days - 1} nights</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">Travelers</div>
                      <div className="text-sm text-muted-foreground">2 adults</div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="py-4">
                  <div className="flex justify-between mb-2">
                    <span>Package price per person</span>
                    <span>${packageData.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Number of travelers</span>
                    <span>x 2</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>$50</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(packageData.price * 2) + 50}</span>
                  </div>
                </div>
                
                <Button className="w-full">Book Package</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PackageDetailPage;
