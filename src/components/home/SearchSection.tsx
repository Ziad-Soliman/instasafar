
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
import { Calendar as CalendarIcon } from 'lucide-react';

const SearchSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('packages');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [duration, setDuration] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (departureDate) params.append('date', format(departureDate, 'yyyy-MM-dd'));
    if (duration) params.append('duration', duration);
    switch (searchType) {
      case 'packages':
        navigate(`/packages?${params.toString()}`);
        break;
      case 'hotels':
        navigate(`/search?${params.toString()}`);
        break;
      case 'flights':
        navigate(`/flights?${params.toString()}`);
        break;
      case 'transport':
        navigate(`/transport?${params.toString()}`);
        break;
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
        <h2 className="text-3xl font-bold mb-4 text-center">{t('home.search.title')}</h2>
        <p className="text-muted-foreground text-lg text-center">{t('home.search.subtitle')}</p>
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
                >
                  {t(`home.search.${type}`)}
                </Button>
              ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('home.search.destination')}</label>
                <Input
                  placeholder={t('home.search.destinationPlaceholder')}
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="backdrop-blur-sm bg-background/60"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t('home.search.departureDate')}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal backdrop-blur-sm bg-background/60",
                        !departureDate && "text-muted-foreground",
                        isRTL && "text-right"
                      )}
                    >
                      <CalendarIcon className={cn("mr-2 h-4 w-4", isRTL && "ml-2 mr-0")} />
                      {departureDate ? format(departureDate, "PPP") : t('home.search.departurePlaceholder')}
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
                <label className="text-sm font-medium">{t('home.search.duration')}</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="backdrop-blur-sm bg-background/60">
                    <SelectValue placeholder={t('home.search.durationPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">{t('common.days', '3 Days')}</SelectItem>
                    <SelectItem value="7">{t('common.days', '7 Days')}</SelectItem>
                    <SelectItem value="14">{t('common.days', '14 Days')}</SelectItem>
                    <SelectItem value="21">{t('common.days', '21 Days')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium opacity-0">Search</label>
                <Button
                  onClick={handleSearch}
                  className="w-full bg-saudi-green hover:bg-saudi-green/90"
                >
                  {t('home.search.searchButton')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchSection;
