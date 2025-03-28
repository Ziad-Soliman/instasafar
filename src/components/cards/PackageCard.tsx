
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Hotel, Plane, Bus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Package {
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
  city: "Makkah" | "Madinah" | "Both";
}

interface PackageCardProps {
  package: Package;
  onButtonClick?: () => void;
  buttonText?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, onButtonClick, buttonText = "View Package" }) => {
  const startDate = new Date(pkg.start_date);
  const endDate = new Date(pkg.end_date);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-custom group flex flex-col"
    >
      <Link to={`/packages/${pkg.id}`} className="block relative overflow-hidden rounded-t-lg">
        <div className="relative h-60 md:h-72 overflow-hidden">
          <img
            src={pkg.thumbnail}
            alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-3 left-3 flex items-start gap-2 flex-col">
            <Badge className="bg-primary">
              ${pkg.price} / person
            </Badge>
            <Badge variant="outline" className="bg-black/40 text-white border-none">
              <Calendar className="mr-1 h-3 w-3" />
              {pkg.duration_days} Days
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-1 mb-3">
          {pkg.includes_hotel && (
            <Badge variant="outline" className="text-xs">
              <Hotel className="mr-1 h-3 w-3" />
              Hotel
            </Badge>
          )}
          {pkg.includes_flight && (
            <Badge variant="outline" className="text-xs">
              <Plane className="mr-1 h-3 w-3" />
              Flight
            </Badge>
          )}
          {pkg.includes_transport && (
            <Badge variant="outline" className="text-xs">
              <Bus className="mr-1 h-3 w-3" />
              Transport
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-xl mb-2">{pkg.name}</h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>
            {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {pkg.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">Guided visits to holy sites</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">Experienced religious guides</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">All-inclusive package</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button asChild className="w-full" onClick={onButtonClick}>
            <Link to={`/packages/${pkg.id}`}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
