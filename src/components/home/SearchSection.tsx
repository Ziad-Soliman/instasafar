
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SearchSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchType, setSearchType] = useState('packages');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  // List of supported cities
  const cities = [
    { value: 'Makkah', label: 'Makkah', labelAr: 'مكة المكرمة' },
    { value: 'Madinah', label: 'Madinah', labelAr: 'المدينة المنورة' },
    { value: 'Jeddah', label: 'Jeddah', labelAr: 'جدة' },
    { value: 'Riyadh', label: 'Riyadh', labelAr: 'الرياض' },
    { value: 'Dammam', label: 'Dammam', labelAr: 'الدمام' },
    { value: 'Taif', label: 'Taif', labelAr: 'الطائف' },
  ];

  const handleSearch = async () => {
    // Basic validation
    if (!destination && searchType !== 'packages') {
      toast({
        title: "Missing Information",
        description: "Please select a destination to search.",
        variant: "destructive",
      });
      return;
    }

    if (searchType === 'flights' && !departureDate) {
      toast({
        title: "Missing Information", 
        description: "Please select a departure date for flight search.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Build search parameters
      const params = new URLSearchParams();
      
      // Add common parameters
      if (destination) {
        params.append('city', destination);
        params.append('destination', destination);
      }
      if (departureDate) {
        params.append('date', format(departureDate, 'yyyy-MM-dd'));
        params.append('departure_date', format(departureDate, 'yyyy-MM-dd'));
      }
      if (duration) {
        params.append('duration', duration);
      }

      // Navigate based on search type with appropriate filters
      switch (searchType) {
        case 'packages':
          if (destination) params.append('location', destination);
          navigate(`/packages?${params.toString()}`);
          break;
          
        case 'hotels':
          // Use the search page for hotels with city filter
          if (destination) params.append('location', destination);
          navigate(`/search?${params.toString()}`);
          break;
          
        case 'flights':
          // Add flight-specific parameters
          if (destination) {
            params.append('to', destination);
            params.append('destination', destination);
          }
          navigate(`/flights?${params.toString()}`);
          break;
          
        case 'transport':
          // Add transport-specific parameters
          if (destination) {
            params.append('to_city', destination);
            params.append('destination_city', destination);
          }
          params.append('passengers', '1'); // Default passengers
          navigate(`/transport?${params.toString()}`);
          break;
          
        default:
          navigate('/search');
      }

      // Show success message
      toast({
        title: "Search Started",
        description: `Searching for ${searchType} in ${destination || 'all locations'}...`,
      });

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: "There was an error with your search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            {/* Search Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['packages', 'hotels', 'flights', 'transport'].map(type => (
                <Button
                  key={type}
                  variant={searchType === type ? 'default' : 'outline'}
                  onClick={() => setSearchType(type)}
                  className="flex-1 min-w-[120px] backdrop-blur-sm"
                  disabled={loading}
                >
                  {t(`home.search.${type}`, type.charAt(0).toUpperCase() + type.slice(1))}
                </Button>
              ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('home.search.destination', 'Destination')}</label>
                <Select value={destination} onValueChange={setDestination} disabled={loading}>
                  <SelectTrigger className="backdrop-blur-sm bg-background/60">
                    <SelectValue placeholder={t('home.search.destinationPlaceholder', 'Select destination')} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city.value} value={city.value}>
                        {isRTL ? city.labelAr : city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('home.search.departureDate', 'Departure Date')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal backdrop-blur-sm bg-background/60",
                        !departureDate && "text-muted-foreground",
                        isRTL && "text-right"
                      )}
                      disabled={loading}
                    >
                      <CalendarIcon className={cn("mr-2 h-4 w-4", isRTL && "ml-2 mr-0")} />
                      {departureDate ? format(departureDate, "PPP") : t('home.search.departurePlaceholder', 'Pick a date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departureDate}
                      onSelect={setDepartureDate}
                      disabled={date => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('home.search.duration', 'Duration')}</label>
                <Select value={duration} onValueChange={setDuration} disabled={loading}>
                  <SelectTrigger className="backdrop-blur-sm bg-background/60">
                    <SelectValue placeholder={t('home.search.durationPlaceholder', 'Select duration')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">{t('common.days', '3 Days')}</SelectItem>
                    <SelectItem value="7">{t('common.days', '7 Days')}</SelectItem>
                    <SelectItem value="14">{t('common.days', '14 Days')}</SelectItem>
                    <SelectItem value="21">{t('common.days', '21 Days')}</SelectItem>
                    <SelectItem value="30">{t('common.days', '30 Days')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium opacity-0">Search</label>
                <Button
                  onClick={handleSearch}
                  className="w-full bg-saudi-green hover:bg-saudi-green/90"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {t('common.searching', 'Searching...')}
                    </div>
                  ) : (
                    <>
                      <Search className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                      {t('home.search.searchButton', 'Search')}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Search type specific information */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-muted-foreground text-center">
                {searchType === 'packages' && t('home.search.packagesInfo', 'Search for complete travel packages including accommodation and activities')}
                {searchType === 'hotels' && t('home.search.hotelsInfo', 'Find the perfect accommodation for your stay')}
                {searchType === 'flights' && t('home.search.flightsInfo', 'Book flights to your desired destination')}
                {searchType === 'transport' && t('home.search.transportInfo', 'Find reliable transport options between cities')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchSection;
