
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import HotelCard from '@/components/cards/HotelCard';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  name_ar?: string;
  city: string;
  city_ar?: string;
  address: string;
  address_ar?: string;
  description?: string;
  description_ar?: string;
  rating: number;
  price_per_night: number;
  distance_to_haram?: string;
  thumbnail?: string;
}

const SearchPage = () => {
  const { t, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [priceRange, setPriceRange] = useState('');

  const fetchHotels = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('hotels')
        .select('*')
        .order('rating', { ascending: false });

      if (selectedCity && selectedCity !== 'all') {
        query = query.eq('city', selectedCity);
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching hotels:', error);
        return;
      }

      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [selectedCity, searchTerm]);

  const handleSearch = () => {
    fetchHotels();
  };

  // Transform hotels to match HotelCard expected format
  const transformedHotels = hotels.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    name_ar: hotel.name_ar,
    image: hotel.thumbnail || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    location: hotel.city,
    city: hotel.city,
    city_ar: hotel.city_ar,
    distance_to_haram: hotel.distance_to_haram || '1.2 km',
    rating: Number(hotel.rating),
    review_count: 0, // Default since reviews are separate
    price_per_night: Number(hotel.price_per_night),
    amenities: [], // Default empty array since amenities are in separate table
    is_featured: false
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl")}>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t('hotels.searchPlaceholder', 'Search hotels...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t('common.city', 'City')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Makkah">Makkah</SelectItem>
                  <SelectItem value="Medina">Medina</SelectItem>
                  <SelectItem value="Riyadh">Riyadh</SelectItem>
                  <SelectItem value="Jeddah">Jeddah</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t('common.priceRange', 'Price Range')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-200">$0 - $200</SelectItem>
                  <SelectItem value="200-400">$200 - $400</SelectItem>
                  <SelectItem value="400+">$400+</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleSearch} className="md:w-auto">
                <Search className="h-4 w-4 mr-2" />
                {t('common.search', 'Search')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {t('hotels.searchResults', 'Search Results')}
          </h1>
          <p className="text-muted-foreground">
            {transformedHotels.length} {t('hotels.hotelsFound', 'hotels found')}
          </p>
        </div>

        {/* Hotels Grid */}
        {transformedHotels.length === 0 ? (
          <Card className="p-8 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t('hotels.noResults', 'No hotels found')}
            </h3>
            <p className="text-muted-foreground">
              {t('hotels.tryDifferentSearch', 'Try adjusting your search criteria')}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformedHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
