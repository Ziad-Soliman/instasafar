
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Wifi, Car, Coffee, Utensils, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FilterProps {
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (value: [number, number]) => void;
  selectedAmenities: string[];
  onAmenityChange: (amenity: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  filterType: 'hotel' | 'flight' | 'package' | 'transport';
}

const BookingFilters: React.FC<FilterProps> = ({
  priceRange,
  maxPrice,
  onPriceChange,
  selectedAmenities,
  onAmenityChange,
  selectedRating,
  onRatingChange,
  sortBy,
  onSortChange,
  onClearFilters,
  filterType
}) => {
  const { t } = useLanguage();

  const amenities = [
    { id: 'wifi', name: 'WiFi', icon: Wifi },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'breakfast', name: 'Breakfast', icon: Coffee },
    { id: 'restaurant', name: 'Restaurant', icon: Utensils }
  ];

  const sortOptions = {
    hotel: [
      { value: 'price_low', label: 'Price: Low to High' },
      { value: 'price_high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Rating' },
      { value: 'distance', label: 'Distance to Haram' }
    ],
    flight: [
      { value: 'price_low', label: 'Price: Low to High' },
      { value: 'price_high', label: 'Price: High to Low' },
      { value: 'duration', label: 'Duration' },
      { value: 'departure', label: 'Departure Time' }
    ],
    package: [
      { value: 'price_low', label: 'Price: Low to High' },
      { value: 'price_high', label: 'Price: High to Low' },
      { value: 'duration', label: 'Duration' },
      { value: 'rating', label: 'Rating' }
    ],
    transport: [
      { value: 'price_low', label: 'Price: Low to High' },
      { value: 'price_high', label: 'Price: High to Low' },
      { value: 'departure', label: 'Departure Time' },
      { value: 'duration', label: 'Duration' }
    ]
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Sort By</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions[filterType].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: SAR {priceRange[0]} - SAR {priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            max={maxPrice}
            min={0}
            step={50}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Rating Filter */}
        {(filterType === 'hotel' || filterType === 'package') && (
          <>
            <div>
              <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
              <div className="flex gap-2 flex-wrap">
                {[0, 3, 4, 4.5].map((rating) => (
                  <Button
                    key={rating}
                    variant={selectedRating === rating ? "saudi" : "outline"}
                    size="sm"
                    onClick={() => onRatingChange(rating)}
                    className="flex items-center gap-1"
                  >
                    <Star className="h-3 w-3" />
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Amenities Filter */}
        {filterType === 'hotel' && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Amenities</Label>
            <div className="space-y-3">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={() => onAmenityChange(amenity.id)}
                  />
                  <Label
                    htmlFor={amenity.id}
                    className="text-sm font-normal flex items-center gap-2 cursor-pointer"
                  >
                    <amenity.icon className="h-4 w-4" />
                    {amenity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applied Filters */}
        {(selectedAmenities.length > 0 || selectedRating > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
          <>
            <Separator />
            <div>
              <Label className="text-sm font-medium mb-3 block">Applied Filters</Label>
              <div className="flex flex-wrap gap-2">
                {selectedAmenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => onAmenityChange(amenity)}
                  >
                    {amenity} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                {selectedRating > 0 && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => onRatingChange(0)}
                  >
                    {selectedRating}+ Rating <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => onPriceChange([0, maxPrice])}
                  >
                    SAR {priceRange[0]}-{priceRange[1]} <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingFilters;
