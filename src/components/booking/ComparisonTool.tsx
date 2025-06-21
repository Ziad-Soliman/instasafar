
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Star, MapPin, Clock, Users, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonItem {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  location?: string;
  type: 'hotel' | 'flight' | 'package' | 'transport';
  features: string[];
}

interface ComparisonToolProps {
  items: ComparisonItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({
  items,
  onRemoveItem,
  onClearAll,
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();

  if (!isOpen || items.length === 0) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <MapPin className="h-4 w-4" />;
      case 'flight': return <Plane className="h-4 w-4" />;
      case 'package': return <Star className="h-4 w-4" />;
      case 'transport': return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 max-h-96 overflow-y-auto">
      <Card className="rounded-none border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              Compare Items ({items.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onClearAll}>
                Clear All
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="relative border rounded-lg p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                <div className="space-y-3">
                  <div className="aspect-video w-full bg-muted rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(item.type)}
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    {item.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </p>
                    )}
                  </div>
                  
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{item.rating}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {item.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-saudi-green">
                      SAR {item.price}
                    </div>
                    <Button size="sm" variant="saudi" className="w-full mt-2">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonTool;
