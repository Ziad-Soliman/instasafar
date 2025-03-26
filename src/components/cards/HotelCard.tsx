
import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Hotel {
  id: string;
  name: string;
  city: "Makkah" | "Madinah";
  address: string;
  description: string;
  rating: number;
  price_per_night: number;
  distance_to_haram: string;
  amenities: string[];
  thumbnail: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-custom group h-full flex flex-col"
    >
      <Link to={`/hotels/${hotel.id}`} className="block relative overflow-hidden rounded-t-lg">
        <div className="relative h-48 overflow-hidden">
          <img
            src={hotel.thumbnail}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          
          <div className="absolute bottom-3 left-3 flex flex-col gap-1">
            <Badge className="self-start bg-primary">
              ${hotel.price_per_night} / night
            </Badge>
            <Badge variant="outline" className="self-start bg-black/40 text-white border-none">
              <MapPin className="mr-1 h-3 w-3" />
              {hotel.distance_to_haram} to Haram
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{hotel.name}</h3>
          <div className="flex items-center bg-primary/10 text-primary px-2 py-0.5 rounded">
            <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
            <span className="text-sm font-medium">{hotel.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{hotel.address}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {hotel.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <Badge variant="secondary" key={index} className="font-normal text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 3 && (
            <Badge variant="secondary" className="font-normal text-xs">
              +{hotel.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link to={`/hotels/${hotel.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
