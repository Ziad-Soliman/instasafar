
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, Plane, Hotel, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

export interface ExternalListing {
  id: string;
  listing_type: "hotel" | "flight" | "transport";
  name: string;
  description?: string;
  city: "Makkah" | "Madinah" | "Jeddah" | "Other" | "Both";
  provider_name: string;
  redirect_url: string;
  image_url?: string;
  price_indication?: string;
  rating_indication?: string;
}

interface ExternalListingCardProps {
  listing: ExternalListing;
  className?: string;
}

const ExternalListingCard: React.FC<ExternalListingCardProps> = ({ listing, className }) => {
  const { t, isRTL } = useLanguage();
  
  const handleClick = () => {
    // Open in new tab
    window.open(listing.redirect_url, "_blank", "noopener,noreferrer");
  };

  // Icon based on listing type
  const getIcon = () => {
    switch (listing.listing_type) {
      case "hotel":
        return <Hotel className="h-4 w-4" />;
      case "flight":
        return <Plane className="h-4 w-4" />;
      case "transport":
        return <Bus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`card-custom group h-full flex flex-col rounded-lg overflow-hidden border border-border shadow-sm ${className || ''}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="h-48 bg-muted/50 relative">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <span className="text-primary font-medium">{listing.provider_name}</span>
            </div>
          )}

          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="flex items-center gap-1 text-xs px-2 py-1 font-medium shadow-sm">
              {getIcon()}
              <span className={isRTL ? "mr-1" : ""}>{listing.listing_type === "hotel" ? t("listing.type.hotel") : 
               listing.listing_type === "flight" ? t("listing.type.flight") : 
               t("listing.type.transport")}</span>
            </Badge>
          </div>
          
          <div className="absolute top-2 right-2">
            <div className="bg-white/90 dark:bg-slate-800/90 text-xs px-2 py-1 rounded font-medium shadow-sm">
              {listing.provider_name}
            </div>
          </div>

          {listing.rating_indication && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded font-medium flex items-center shadow-sm backdrop-blur-sm">
                <Star className={`w-3 h-3 fill-primary ${isRTL ? "ml-1" : "mr-1"}`} />
                {listing.rating_indication}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-base line-clamp-1 mb-1">{listing.name}</h3>
        
        <div className="text-xs text-muted-foreground mb-2">
          {listing.city === "Both" ? `${t("location.makkah")} - ${t("location.madinah")}` : t(`location.${listing.city.toLowerCase()}`)}
        </div>

        {listing.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 rtl:font-arabic">
            {listing.description}
          </p>
        )}

        {listing.price_indication && (
          <div className="text-sm font-medium mb-3 rtl:font-arabic">
            {listing.price_indication}
          </div>
        )}

        <div className="mt-auto">
          <Button 
            onClick={handleClick}
            variant="outline" 
            className="w-full text-xs h-9 gap-1 flex items-center justify-center"
          >
            {t("listing.viewOn")} {listing.provider_name}
            <ExternalLink className="h-3 w-3 mx-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExternalListingCard;
