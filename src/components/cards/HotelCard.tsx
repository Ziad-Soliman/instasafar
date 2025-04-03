
import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    city: string;
    address: string;
    description: string;
    rating: number;
    price_per_night: number;
    distance_to_haram: string;
    amenities: string[];
    thumbnail: string;
    is_internal?: boolean;
  };
  onButtonClick?: () => void;
  buttonText?: string;
  className?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  hotel, 
  onButtonClick,
  buttonText = "View Details",
  className 
}) => {
  const { t, isRTL, locale } = useLanguage();
  
  // Format price to SAR
  const formatPrice = (price: number): string => {
    if (isRTL) {
      // Arabic format
      return `${price} ${t("currency.sar")}`;
    } else {
      // English format
      return `${price} ${t("currency.sar")}`;
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("card-custom group h-full flex flex-col rounded-lg overflow-hidden border border-border shadow-sm", className)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="h-48 bg-muted/50">
          <img
            src={hotel.thumbnail || "/placeholder.svg"}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute top-2 left-2">
            <div className="bg-white/90 dark:bg-slate-800/90 text-xs px-2 py-1 rounded font-medium flex items-center shadow-sm">
              <MapPin className="w-3 h-3 mr-1" />
              {locale === 'ar' ? t(`location.${hotel.city.toLowerCase()}`) : hotel.city}
            </div>
          </div>
          
          <div className="absolute bottom-2 right-2">
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium flex items-center shadow-sm backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1 fill-primary" />
              {hotel.rating}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-base line-clamp-1 mb-1">{hotel.name}</h3>
        
        <div className="text-xs text-muted-foreground mb-2">
          {hotel.distance_to_haram} {t("distance.from")} {t("distance.haram")}
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {hotel.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-muted px-2 py-0.5 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
              +{hotel.amenities.length - 3} {t("more")}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm font-medium rtl:font-arabic">{formatPrice(hotel.price_per_night)}</div>
            <div className="text-xs text-muted-foreground">{t("listing.perNight")}</div>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            onClick={onButtonClick}
            className="w-full"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
