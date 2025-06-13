
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';

interface ExternalListingCardProps {
  listing: {
    id: string;
    title: string;
    provider: string;
    provider_logo: string;
    price_range: string;
    rating?: number;
    review_count?: number;
    url: string;
    image: string;
    features: string[];
  };
  className?: string;
}

const ExternalListingCard: React.FC<ExternalListingCardProps> = ({ listing, className }) => {
  const handleExternalClick = () => {
    window.open(listing.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card variant="interactive" className={`group overflow-hidden ${className}`}>
      <Badge className="absolute top-4 right-4 z-10 bg-blue-500 text-white">
        External
      </Badge>
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={listing.image} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Provider */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-muted rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={listing.provider_logo} 
                alt={listing.provider} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <p className="text-sm font-medium">{listing.provider}</p>
              {listing.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">
                    {listing.rating} ({listing.review_count})
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Title */}
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-saudi-green transition-colors duration-200">
            {listing.title}
          </h3>
          
          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {listing.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <div className="text-lg font-bold text-foreground">
                {listing.price_range}
              </div>
              <div className="text-xs text-muted-foreground">Price range</div>
            </div>
            
            <Button 
              onClick={handleExternalClick}
              variant="saudi-outline" 
              size="sm"
              className="gap-2"
            >
              Visit Site
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalListingCard;
