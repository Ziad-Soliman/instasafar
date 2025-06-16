
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchFormProps {
  destination: string;
  onDestinationChange: (value: string) => void;
  departureDate: Date | undefined;
  onDepartureDateChange: (date: Date | undefined) => void;
  duration: string;
  onDurationChange: (value: string) => void;
  loading: boolean;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  destination,
  onDestinationChange,
  departureDate,
  onDepartureDateChange,
  duration,
  onDurationChange,
  loading,
  onSearch,
}) => {
  const { t, isRTL } = useLanguage();

  // List of supported cities
  const cities = [
    { value: 'Makkah', label: 'Makkah', labelAr: 'مكة المكرمة' },
    { value: 'Madinah', label: 'Madinah', labelAr: 'المدينة المنورة' },
    { value: 'Jeddah', label: 'Jeddah', labelAr: 'جدة' },
    { value: 'Riyadh', label: 'Riyadh', labelAr: 'الرياض' },
    { value: 'Dammam', label: 'Dammam', labelAr: 'الدمام' },
    { value: 'Taif', label: 'Taif', labelAr: 'الطائف' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('home.search.destination', 'Destination')}</label>
        <Select value={destination} onValueChange={onDestinationChange} disabled={loading}>
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
              onSelect={onDepartureDateChange}
              disabled={date => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t('home.search.duration', 'Duration')}</label>
        <Select value={duration} onValueChange={onDurationChange} disabled={loading}>
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
          onClick={onSearch}
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
  );
};

export default SearchForm;
