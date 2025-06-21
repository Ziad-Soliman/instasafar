
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Wifi, Car, Coffee, Utensils, Share2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import WishlistButton from '@/components/booking/WishlistButton';
import QuickBookingForm from '@/components/booking/QuickBookingForm';
import BookingProgress from '@/components/booking/BookingProgress';

const HotelDetailPage = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const bookingSteps = [
    {
      id: 'select',
      title: 'Select Dates & Room',
      description: 'Choose your preferred dates and room type',
      status: 'current' as const
    },
    {
      id: 'details',
      title: 'Guest Details',
      description: 'Provide guest information and preferences',
      status: 'upcoming' as const
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Secure payment processing',
      status: 'upcoming' as const
    },
    {
      id: 'confirmation',
      title: 'Confirmation',
      description: 'Booking confirmation and details',
      status: 'upcoming' as const
    }
  ];

  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setHotel(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load hotel details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, toast]);

  const handleBookingSubmit = (bookingData: any) => {
    console.log('Booking data:', bookingData);
    toast({
      title: "Booking Initiated",
      description: "Redirecting to secure checkout...",
    });
  };

  const handleShare = () => {
    navigator.share?.({
      title: hotel?.name,
      text: `Check out this amazing hotel: ${hotel?.name}`,
      url: window.location.href
    }) || navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link Copied",
      description: "Hotel link copied to clipboard"
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-muted rounded-lg"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
        <p className="text-muted-foreground">The hotel you're looking for doesn't exist.</p>
      </div>
    );
  }

  const images = [hotel.thumbnail, hotel.thumbnail, hotel.thumbnail]; // Mock multiple images
  const amenities = hotel.amenities || ['WiFi', 'Parking', 'Breakfast', 'Restaurant'];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden mb-4">
          <img
            src={images[selectedImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <WishlistButton itemId={hotel.id} itemType="hotel" />
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full h-10 w-10 p-0"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                selectedImageIndex === index ? 'border-saudi-green' : 'border-transparent'
              }`}
            >
              <img src={image} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hotel Details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-saudi-green/10 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-saudi-green text-saudi-green" />
                    <span className="font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {hotel.address}
              </div>
              
              <div className="flex gap-2 mb-4">
                <Badge variant="outline">{hotel.distance_to_haram} from Haram</Badge>
                <Badge variant="saudi">Featured Hotel</Badge>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">About this hotel</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {hotel.description || 'Experience luxury and comfort at this premium hotel located in the heart of Makkah. With modern amenities and traditional hospitality, your stay will be memorable and peaceful.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Hotel Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {amenity === 'WiFi' && <Wifi className="h-4 w-4" />}
                          {amenity === 'Parking' && <Car className="h-4 w-4" />}
                          {amenity === 'Breakfast' && <Coffee className="h-4 w-4" />}
                          {amenity === 'Restaurant' && <Utensils className="h-4 w-4" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="location" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Location & Nearby</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {hotel.distance_to_haram} walking distance to Haram
                      </p>
                      <p className="text-muted-foreground">
                        Located in the heart of Makkah with easy access to the Holy Mosque and other important religious sites.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Guest Reviews</h3>
                    <p className="text-muted-foreground">Reviews will be loaded here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QuickBookingForm
              itemType="hotel"
              itemName={hotel.name}
              basePrice={hotel.price_per_night}
              onSubmit={handleBookingSubmit}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <BookingProgress steps={bookingSteps} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
