
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSearchLogic } from '@/hooks/useSearchLogic';
import SearchTypeSelector from './SearchTypeSelector';
import SearchForm from './SearchForm';
import SearchInfoDisplay from './SearchInfoDisplay';

const SearchSection = () => {
  const { t, isRTL } = useLanguage();
  const {
    searchType,
    setSearchType,
    destination,
    setDestination,
    departureDate,
    setDepartureDate,
    duration,
    setDuration,
    loading,
    handleSearch,
  } = useSearchLogic();

  return (
    <div className="container mx-auto px-4 relative z-10 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={cn("text-center mb-12", isRTL && "text-center")}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{t('home.search.title', 'Find Your Perfect Journey')}</h2>
        <p className="text-muted-foreground text-lg text-center">{t('home.search.subtitle', 'Search for hotels, packages, flights, and transport options')}</p>
      </motion.div>

      {/* Full-width card with enhanced glass effect */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Enhanced Glow Effect Background */}
        <div className="fade-top-lg pointer-events-none absolute inset-0 rounded-2xl shadow-glow opacity-40" />
        
        <Card className="relative w-full rounded-2xl shadow-elevated bg-card/80 backdrop-blur-xl border border-white/20">
          <CardContent className="p-8">
            <SearchTypeSelector
              searchType={searchType}
              onSearchTypeChange={setSearchType}
              loading={loading}
            />

            <SearchForm
              destination={destination}
              onDestinationChange={setDestination}
              departureDate={departureDate}
              onDepartureDateChange={setDepartureDate}
              duration={duration}
              onDurationChange={setDuration}
              loading={loading}
              onSearch={handleSearch}
            />

            <SearchInfoDisplay searchType={searchType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchSection;
