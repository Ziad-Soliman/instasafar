
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ExternalLink } from 'lucide-react';

export interface ExternalListing {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  location: string;
  provider: string;
  providerLogo?: string;
  type: 'hotel' | 'package' | 'flight' | 'activity';
  url: string;
  features?: string[];
  isPromoted?: boolean;
}

// Database-compatible interface for admin pages and data fetching
export interface ExternalListingData {
  id: string;
  listing_type: 'hotel' | 'package' | 'flight' | 'activity';
  name: string;
  description?: string;
  image_url?: string;
  price_indication?: string;
  rating_indication?: string;
  city?: string;
  provider_name: string;
  redirect_url: string;
  created_at?: string;
  updated_at?: string;
}

interface ExternalListingCardProps {
  listing: ExternalListing;
  onSelect?: (listing: ExternalListing) => void;
}

const ExternalListingCard: React.FC<ExternalListingCardProps> = ({ 
  listing, 
  onSelect 
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(listing);
    } else {
      window.open(listing.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {listing.isPromoted && (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
              Promoted
            </Badge>
          )}
          <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            <ExternalLink className="h-4 w-4 text-gray-600" />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {listing.type}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{listing.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({listing.reviewCount})
              </span>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-saudi-green transition-colors">
            {listing.title}
          </h3>

          <div className="flex items-center gap-1 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{listing.location}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {listing.description}
          </p>

          {listing.features && listing.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {listing.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{listing.features.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {listing.providerLogo && (
                <img
                  src={listing.providerLogo}
                  alt={listing.provider}
                  className="h-6 w-6 rounded"
                />
              )}
              <span className="text-xs text-muted-foreground">
                via {listing.provider}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-saudi-green">
                {listing.currency}{listing.price}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleClick}
            className="w-full mt-3 bg-saudi-green hover:bg-saudi-green/90"
          >
            View on {listing.provider}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalListingCard;
