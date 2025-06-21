
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBookingFilters } from '@/hooks/useBookingFilters';
import SearchResultsHeader from '@/components/booking/SearchResultsHeader';
import BookingFilters from '@/components/booking/BookingFilters';
import ComparisonTool from '@/components/booking/ComparisonTool';
import HotelCard from '@/components/cards/HotelCard';
import PackageCard from '@/components/cards/PackageCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SearchPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState<'hotels' | 'packages'>('hotels');
  const [showFilters, setShowFilters] = useState(false);
  
  const {
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
  } = useBookingFilters({
    maxPrice: 2000,
    filterType: searchType === 'hotels' ? 'hotel' : 'package'
  });

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from(searchType)
          .select('*')
          .limit(20);

        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load search results",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchType, toast]);

  // Apply filters and sorting
  const filteredAndSortedResults = sortData(applyFilters(searchResults));

  return (
    <div className="container mx-auto py-8 px-4">
      <SearchResultsHeader
        totalResults={filteredAndSortedResults.length}
        currentPage={1}
        totalPages={1}
        viewMode={filters.viewMode}
        onViewModeChange={updateViewMode}
        sortBy={filters.sortBy}
        onSortChange={updateSortBy}
        showMap={filters.showMap}
        onMapToggle={toggleMap}
        onFiltersToggle={() => setShowFilters(!showFilters)}
        filtersCount={activeFiltersCount}
        searchLocation="Makkah"
        searchType={searchType}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <BookingFilters
            priceRange={filters.priceRange}
            maxPrice={2000}
            onPriceChange={updatePriceRange}
            selectedAmenities={filters.selectedAmenities}
            onAmenityChange={toggleAmenity}
            selectedRating={filters.selectedRating}
            onRatingChange={updateRating}
            sortBy={filters.sortBy}
            onSortChange={updateSortBy}
            onClearFilters={clearFilters}
            filterType={searchType === 'hotels' ? 'hotel' : 'package'}
          />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-muted h-4 rounded w-3/4"></div>
                    <div className="bg-muted h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-6 ${
                filters.viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredAndSortedResults.map((item: any) => (
                <div key={item.id} className="relative">
                  {searchType === 'hotels' ? (
                    <HotelCard 
                      hotel={item}
                      className={filters.viewMode === 'list' ? 'flex-row' : ''}
                    />
                  ) : (
                    <PackageCard 
                      package={item}
                      className={filters.viewMode === 'list' ? 'flex-row' : ''}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Comparison Tool */}
      <ComparisonTool
        items={comparisonItems}
        onRemoveItem={removeFromComparison}
        onClearAll={clearComparison}
        isOpen={showComparison}
        onClose={toggleComparison}
      />
    </div>
  );
};

export default SearchPage;
