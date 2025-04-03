
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PackageCardProps {
  package: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration_days: number;
    start_date: string;
    end_date: string;
    thumbnail: string;
    includes_hotel: boolean;
    includes_flight: boolean;
    includes_transport: boolean;
    city: string;
    is_internal?: boolean;
    package_type?: "Hajj" | "Umrah" | "Custom";
  };
  onButtonClick?: () => void;
  buttonText?: string;
  className?: string; // Add className prop
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg, 
  onButtonClick,
  buttonText = "View Package",
  className
}) => {
  // Format dates
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("card-custom group h-full flex flex-col", className)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="h-40 bg-muted/50">
          <img
            src={pkg.thumbnail || "/placeholder.svg"}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-2 left-2">
            <div className="bg-white/90 dark:bg-slate-800/90 text-xs px-2 py-1 rounded font-medium flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {pkg.city}
            </div>
          </div>
          
          <div className="absolute bottom-2 right-2">
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {pkg.duration_days} days
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-sm line-clamp-1 mb-1">{pkg.name}</h3>
        
        <div className="text-xs text-muted-foreground mb-2 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(pkg.start_date)} - {formatDate(pkg.end_date)}
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {pkg.description}
        </p>
        
        <div className="grid grid-cols-3 gap-1 text-xs mb-3">
          <div className={`flex items-center ${pkg.includes_hotel ? 'text-primary' : 'text-muted-foreground'}`}>
            {pkg.includes_hotel ? <Check className="w-3 h-3 mr-1" /> : <span className="w-3 h-3 mr-1" />}
            Hotel
          </div>
          <div className={`flex items-center ${pkg.includes_flight ? 'text-primary' : 'text-muted-foreground'}`}>
            {pkg.includes_flight ? <Check className="w-3 h-3 mr-1" /> : <span className="w-3 h-3 mr-1" />}
            Flight
          </div>
          <div className={`flex items-center ${pkg.includes_transport ? 'text-primary' : 'text-muted-foreground'}`}>
            {pkg.includes_transport ? <Check className="w-3 h-3 mr-1" /> : <span className="w-3 h-3 mr-1" />}
            Transport
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-sm font-medium">${pkg.price}</div>
            <div className="text-xs text-muted-foreground">per person</div>
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

export default PackageCard;
