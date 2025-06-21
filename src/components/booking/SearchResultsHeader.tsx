
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid3X3, List, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResultsHeaderProps {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showMap: boolean;
  onMapToggle: () => void;
  onFiltersToggle: () => void;
  filtersCount: number;
  searchLocation?: string;
  searchType: string;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  totalResults,
  currentPage,
  totalPages,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  showMap,
  onMapToggle,
  onFiltersToggle,
  filtersCount,
  searchLocation,
  searchType
}) => {
  const sortOptions = [
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Distance' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Search Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">
                {totalResults} {searchType} results
              </h2>
              {searchLocation && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {searchLocation}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Showing page {currentPage} of {totalPages} ({totalResults} total results)
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filters */}
            <Button
              variant="outline"
              size="sm"
              onClick={onFiltersToggle}
              className="relative"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {filtersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {filtersCount}
                </Badge>
              )}
            </Button>

            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className={cn(
                  "rounded-r-none border-r",
                  viewMode === 'grid' && "bg-muted"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('list')}
                className={cn(
                  "rounded-l-none",
                  viewMode === 'list' && "bg-muted"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Map Toggle */}
            <Button
              variant={showMap ? "default" : "outline"}
              size="sm"
              onClick={onMapToggle}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultsHeader;
