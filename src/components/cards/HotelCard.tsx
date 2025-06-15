
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    image: string;
    location: string;
    distance_to_haram: string;
    rating: number;
    review_count: number;
    price_per_night: number;
    amenities: string[];
    is_featured?: boolean;
  };
  className?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, className }) => {
  const { t } = useLanguage();
  
  // Ensure amenities is always an array
  const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];
  
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

  return (
    <Card variant="interactive" className={`group overflow-hidden ${className || ''}`}>
      {hotel.is_featured && (
        <Badge className="absolute top-4 left-4 z-10 bg-saudi-green text-white" variant="saudi">
          {t("hotels.featured", "Featured")}
        </Badge>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-saudi-green transition-colors duration-200">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1 bg-saudi-green/10 px-2 py-1 rounded-md">
                <Star className="h-4 w-4 fill-saudi-green text-saudi-green" />
                <span className="text-sm font-medium text-saudi-green">{hotel.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              {hotel.location}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {hotel.distance_to_haram} {t("hotels.fromHaram", "from Haram")} • {hotel.review_count} {t("common.reviews", "reviews")}
            </p>
          </div>
          
          {/* Amenities */}
          <div className="flex items-center gap-3">
            {amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-muted-foreground">
                {getAmenityIcon(amenity)}
                <span className="text-xs">{amenity}</span>
              </div>
            ))}
          </div>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {t("common.currency", "SAR")} {hotel.price_per_night}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("common.perNight", "per night")}
              </div>
            </div>
            
            <Button asChild variant="saudi" size="sm">
              <Link to={`/hotels/${hotel.id}`}>
                {t("common.view", "View")} {t("common.details", "Details")}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
