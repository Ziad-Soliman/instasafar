
import { useState, useCallback, useMemo } from 'react';

export interface FilterState {
  priceRange: [number, number];
  selectedAmenities: string[];
  selectedRating: number;
  sortBy: string;
  viewMode: 'grid' | 'list';
  showMap: boolean;
}

export interface UseBookingFiltersProps {
  maxPrice: number;
  filterType: 'hotel' | 'flight' | 'package' | 'transport';
}

export function useBookingFilters({ maxPrice, filterType }: UseBookingFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, maxPrice],
    selectedAmenities: [],
    selectedRating: 0,
    sortBy: 'price_low',
    viewMode: 'grid',
    showMap: false
  });

  const [comparisonItems, setComparisonItems] = useState<any[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Filter actions
  const updatePriceRange = useCallback((range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  }, []);

  const toggleAmenity = useCallback((amenity: string) => {
    setFilters(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity]
    }));
  }, []);

  const updateRating = useCallback((rating: number) => {
    setFilters(prev => ({ ...prev, selectedRating: rating }));
  }, []);

  const updateSortBy = useCallback((sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const updateViewMode = useCallback((viewMode: 'grid' | 'list') => {
    setFilters(prev => ({ ...prev, viewMode }));
  }, []);

  const toggleMap = useCallback(() => {
    setFilters(prev => ({ ...prev, showMap: !prev.showMap }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      priceRange: [0, maxPrice],
      selectedAmenities: [],
      selectedRating: 0,
      sortBy: 'price_low',
      viewMode: 'grid',
      showMap: false
    });
  }, [maxPrice]);

  // Comparison actions
  const addToComparison = useCallback((item: any) => {
    if (comparisonItems.length >= 3) return false;
    if (comparisonItems.some(i => i.id === item.id)) return false;
    
    setComparisonItems(prev => [...prev, item]);
    setShowComparison(true);
    return true;
  }, [comparisonItems]);

  const removeFromComparison = useCallback((itemId: string) => {
    setComparisonItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonItems([]);
    setShowComparison(false);
  }, []);

  const toggleComparison = useCallback(() => {
    setShowComparison(prev => !prev);
  }, []);

  // Apply filters to data
  const applyFilters = useCallback((data: any[]) => {
    return data.filter(item => {
      // Price filter
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.selectedRating > 0 && (item.rating || 0) < filters.selectedRating) {
        return false;
      }

      // Amenities filter (for hotels)
      if (filterType === 'hotel' && filters.selectedAmenities.length > 0) {
        const itemAmenities = item.amenities || [];
        if (!filters.selectedAmenities.every(amenity => itemAmenities.includes(amenity))) {
          return false;
        }
      }

      return true;
    });
  }, [filters, filterType]);

  // Sort filtered data
  const sortData = useCallback((data: any[]) => {
    const sorted = [...data];
    
    switch (filters.sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'distance':
        return sorted.sort((a, b) => {
          const aDistance = parseFloat(a.distance_to_haram || '0');
          const bDistance = parseFloat(b.distance_to_haram || '0');
          return aDistance - bDistance;
        });
      case 'popular':
        return sorted.sort((a, b) => (b.review_count || 0) - (a.review_count || 0));
      default:
        return sorted;
    }
  }, [filters.sortBy]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++;
    if (filters.selectedAmenities.length > 0) count++;
    if (filters.selectedRating > 0) count++;
    return count;
  }, [filters, maxPrice]);

  return {
    filters,
    updatePriceRange,
    toggleAmenity,
    updateRating,
    updateSortBy,
    updateViewMode,
    toggleMap,
    clearFilters,
    activeFiltersCount,
    comparisonItems,
    showComparison,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleComparison,
    applyFilters,
    sortData
  };
}
