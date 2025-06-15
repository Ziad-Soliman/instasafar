
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HotelCard from '@/components/cards/HotelCard';
import { featuredHotels } from '@/data/hotels';

const FeaturedHotelsSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  if (featuredHotels.length === 0) {
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
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-saudi-green bg-clip-text text-transparent text-center">
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
          {featuredHotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
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
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
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
