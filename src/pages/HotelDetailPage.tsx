
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Car, Coffee, Utensils, Phone, Mail, Calendar, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ImageCarousel from '@/components/ImageCarousel';
import ReviewsSection from '@/components/ReviewsSection';
import HotelBookingModal from '@/components/hotel/HotelBookingModal';
import { supabase } from '@/integrations/supabase/client';

interface Hotel {
  id: string;
  name: string;
  name_ar?: string;
  city: string;
  city_ar?: string;
  address: string;
  address_ar?: string;
  description?: string;
  description_ar?: string;
  rating: number;
  price_per_night: number;
  distance_to_haram?: string;
  thumbnail?: string;
}

interface HotelAmenity {
  id: string;
  name: string;
}

const HotelDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [amenities, setAmenities] = useState<HotelAmenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!id) {
        setError('Hotel ID not provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch hotel details
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', id)
          .single();

        if (hotelError) {
          if (hotelError.code === 'PGRST116') {
            setError('Hotel not found');
          } else {
            console.error('Error fetching hotel:', hotelError);
            setError('Failed to load hotel details');
          }
          setLoading(false);
          return;
        }

        setHotel(hotelData);

        // Fetch hotel amenities
        const { data: amenitiesData, error: amenitiesError } = await supabase
          .from('hotel_amenities')
          .select('*')
          .eq('hotel_id', id);

        if (amenitiesError) {
          console.error('Error fetching amenities:', amenitiesError);
        } else {
          setAmenities(amenitiesData || []);
        }

      } catch (error) {
        console.error('Error fetching hotel data:', error);
        setError('Failed to load hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [id]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-lg mb-8"></div>
            <div className="h-8 bg-muted rounded w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-32 bg-muted rounded mb-4"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Hotel Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || 'The hotel you are looking for does not exist.'}
          </p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  const images = hotel.thumbnail ? [hotel.thumbnail] : [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
  ];

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl")}>
      <div className="container mx-auto px-4 py-8">
        {/* Hotel Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <ImageCarousel images={images} alt={hotel.name} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Hotel Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {isRTL && hotel.name_ar ? hotel.name_ar : hotel.name}
                    </h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>
                        {isRTL && hotel.city_ar ? hotel.city_ar : hotel.city} • {hotel.distance_to_haram || '1.2 km'} {t("hotels.fromHaram", "from Haram")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{Number(hotel.rating).toFixed(1)}</span>
                      </div>
                      <Badge variant="secondary">
                        {t("hotels.featured", "Featured")}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <p className="text-muted-foreground">
                  {isRTL && hotel.address_ar ? hotel.address_ar : hotel.address}
                </p>
              </div>

              {/* Description */}
              {hotel.description && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {t("hotels.about", "About This Hotel")}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {isRTL && hotel.description_ar ? hotel.description_ar : hotel.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Amenities */}
              {amenities.length > 0 && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {t("hotels.amenities", "Amenities")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          {getAmenityIcon(amenity.name)}
                          <span className="text-sm">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-8"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-saudi-green mb-1">
                      ${Number(hotel.price_per_night).toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t("common.perNight", "per night")}
                    </div>
                  </div>

                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {t("hotels.bookNow", "Book Now")}
                  </Button>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("hotels.rating", "Rating")}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span>{Number(hotel.rating).toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("hotels.distance", "Distance to Haram")}</span>
                      <span>{hotel.distance_to_haram || '1.2 km'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <ReviewsSection hotelId={hotel.id} />
        </motion.div>
      </div>

      {/* Booking Modal */}
      <HotelBookingModal
        hotel={{
          id: hotel.id,
          name: hotel.name,
          price_per_night: hotel.price_per_night,
          image: hotel.thumbnail || '',
          location: hotel.city
        }}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
};

export default HotelDetailPage;
