import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Star, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBilingualText } from '@/utils/bilingual-helpers';
import WishlistButton from '@/components/booking/WishlistButton';

interface PackageCardProps {
  package: {
    id: string;
    title?: string;
    name?: string;
    name_ar?: string;
    image?: string;
    thumbnail?: string;
    duration_days?: number;
    duration?: string;
    price: number;
    location?: string;
    city?: string;
    city_ar?: string;
    rating?: number;
    review_count?: number;
    includes?: string[];
    type?: 'hajj' | 'umrah' | 'custom';
    is_featured?: boolean;
  };
  className?: string;
  onAddToComparison?: (pkg: any) => void;
  showComparisonButton?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  package: pkg, 
  className,
  onAddToComparison,
  showComparisonButton = true
}) => {
  const { t } = useLanguage();
  const { getText } = useBilingualText();
  
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

  const getPackageTypeName = (type: string) => {
    switch (type) {
      case 'hajj':
        return t("packages.hajjPackage", "Hajj Package");
      case 'umrah':
        return t("packages.umrahPackage", "Umrah Package");
      case 'custom':
        return t("packages.cityTour", "City Tour");
      default:
        return type;
    }
  };

  // Use name if available, fallback to title
  const packageName = getText(pkg.name || pkg.title || '', pkg.name_ar);
  const packageLocation = getText(pkg.location || pkg.city || '', pkg.city_ar);
  const packageImage = pkg.image || pkg.thumbnail || '/placeholder.svg';
  const duration = pkg.duration || (pkg.duration_days ? `${pkg.duration_days} days` : '');

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToComparison?.(pkg);
  };

  return (
    <Card variant="interactive" className={`group overflow-hidden relative ${className || ''}`}>
      {/* Wishlist and Comparison buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <WishlistButton itemId={pkg.id} itemType="package" size="sm" />
        {showComparisonButton && onAddToComparison && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-white/20"
            onClick={handleAddToComparison}
            title="Add to comparison"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {pkg.is_featured && (
        <Badge className="absolute top-4 left-4 z-10 bg-saudi-green text-white" variant="saudi">
          {t("packages.featured", "Featured")}
        </Badge>
      )}
      
      {pkg.type && (
        <Badge 
          className={`absolute top-4 ${pkg.is_featured ? 'left-28' : 'left-4'} z-10 capitalize ${getPackageTypeColor(pkg.type)}`}
        >
          {getPackageTypeName(pkg.type)}
        </Badge>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={packageImage} 
          alt={packageName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 text-white">
          {duration && (
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{duration}</span>
            </div>
          )}
          {pkg.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{pkg.rating} ({pkg.review_count || 0})</span>
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-saudi-green transition-colors duration-200">
              {packageName}
            </h3>
            
            {packageLocation && (
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {packageLocation}
              </div>
            )}
          </div>
          
          {/* Includes */}
          {includes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">
                {t("packages.packageIncludes", "Package Includes")}:
              </h4>
              <div className="flex flex-wrap gap-1">
                {includes.slice(0, 3).map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
                {includes.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{includes.length - 3} {t("search.showMore", "more")}
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {t("common.currency", "SAR")} {pkg.price}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("common.perPerson", "per person")}
              </div>
            </div>
            
            <Button asChild variant="saudi" size="sm">
              <Link to={`/packages/${pkg.id}`}>
                {t("common.view", "View")} {t("packages.title", "Package")}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
