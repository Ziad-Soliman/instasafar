
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PackageCardProps {
  package: {
    id: string;
    title: string;
    image: string;
    duration: string;
    price: number;
    location: string;
    rating: number;
    review_count: number;
    includes: string[];
    type: 'hajj' | 'umrah' | 'custom';
    is_featured?: boolean;
  };
  className?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, className }) => {
  console.log('PackageCard props:', pkg);
  
  // Ensure includes is always an array
  const includes = Array.isArray(pkg.includes) ? pkg.includes : [];
  
  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'hajj':
        return 'bg-saudi-green text-white';
      case 'umrah':
        return 'bg-blue-500 text-white';
      case 'custom':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card variant="interactive" className={`group overflow-hidden ${className || ''}`}>
      {pkg.is_featured && (
        <Badge className="absolute top-4 left-4 z-10 bg-saudi-green text-white" variant="saudi">
          Featured
        </Badge>
      )}
      
      <Badge 
        className={`absolute top-4 right-4 z-10 capitalize ${getPackageTypeColor(pkg.type)}`}
      >
        {pkg.type}
      </Badge>
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-1 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{pkg.rating} ({pkg.review_count})</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-saudi-green transition-colors duration-200">
              {pkg.title}
            </h3>
            
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {pkg.location}
            </div>
          </div>
          
          {/* Includes */}
          <div>
            <h4 className="text-sm font-medium mb-2">Package Includes:</h4>
            <div className="flex flex-wrap gap-1">
              {includes.slice(0, 3).map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
              {includes.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{includes.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-foreground">
                ${pkg.price}
              </div>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
            
            <Button asChild variant="saudi" size="sm">
              <Link to={`/packages/${pkg.id}`}>
                View Package
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
