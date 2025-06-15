
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HotelCard from '@/components/cards/HotelCard';
import { supabase } from '@/integrations/supabase/client';

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

const FeaturedHotelsSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .limit(3)
          .order('rating', { ascending: false });

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

    fetchFeaturedHotels();

    // Set up real-time subscription for hotel changes
    const channel = supabase
      .channel('hotels-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'hotels' },
        () => {
          console.log('Hotel data changed, refreshing...');
          fetchFeaturedHotels();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
    is_featured: true
  }));

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-saudi-green/5 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (transformedHotels.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-saudi-green/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-saudi-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-saudi-green/50 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={cn("text-center mb-16", isRTL && "text-center")}
        >
          <div className="inline-flex items-center justify-center gap-2 bg-saudi-green/10 text-saudi-green px-4 py-2 rounded-full text-sm font-medium mb-6 mx-auto">
            <span className="w-2 h-2 bg-saudi-green rounded-full animate-pulse"></span>
            {t('hotels.featuredHotels')}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-saudi-green bg-clip-text text-transparent text-center py-[19px]">
            {t('hotels.featuredHotels')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center">
            {t('hotels.searchHotels', 'Find the perfect accommodation for your spiritual journey')}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-saudi-green to-transparent rounded-full"></div>
          </div>
        </motion.div>

        {/* Hotels Grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {transformedHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-saudi-green/20 to-saudi-green/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Card with enhanced styling */}
                <div className="relative bg-card border border-border/50 rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 group-hover:border-saudi-green/30 backdrop-blur-sm">
                  <HotelCard hotel={hotel} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            onClick={() => navigate('/search')}
            size="lg"
            className="group bg-gradient-to-r from-saudi-green to-saudi-green-light hover:from-saudi-green-light hover:to-saudi-green text-white px-8 py-4 rounded-full font-semibold text-lg shadow-saudi hover:shadow-saudi-lg transform hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
          >
            <span className="flex items-center gap-3">
              {t('hotels.searchHotels')}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </span>
          </Button>
          
          {/* Additional info */}
          <p className="text-sm text-muted-foreground mt-4 font-medium text-center">
            {t('common.viewAll', 'View all available accommodations')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedHotelsSection;
