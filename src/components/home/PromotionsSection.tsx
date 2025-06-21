
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { 
  Plane,
  Calendar,
  MapPin,
  Percent
} from 'lucide-react';

const PromotionsSection = () => {
  const { t, isRTL } = useLanguage();

  const promotions = [
    {
      id: 1,
      title: 'Things To Do On Your Trip',
      subtitle: 'Discover amazing experiences',
      buttonText: 'Experiences',
      icon: MapPin,
      gradient: 'from-blue-500 to-purple-600',
      description: 'Explore guided tours, cultural experiences, and local attractions'
    },
    {
      id: 2,
      title: 'Enjoy Summer Deals',
      subtitle: 'Up To 70% Discount!',
      buttonText: 'Learn More',
      icon: Percent,
      gradient: 'from-yellow-400 to-orange-500',
      description: 'Limited time summer packages with incredible savings'
    },
    {
      id: 3,
      title: 'Let Your Curiosity Do The Booking',
      subtitle: 'Flexible travel options',
      buttonText: 'Learn More',
      icon: Plane,
      gradient: 'from-teal-400 to-blue-500',
      description: 'Book now, decide later with our flexible booking options'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={cn("text-center mb-12", isRTL && "text-center")}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Special Offers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            These popular destinations have a lot to offer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion, index) => (
            <motion.div
              key={promotion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <AspectRatio ratio={16 / 9}>
                  <div className={cn(
                    "relative w-full h-full bg-gradient-to-br p-8 flex flex-col justify-between text-white",
                    promotion.gradient
                  )}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4">
                        <promotion.icon className="w-24 h-24" />
                      </div>
                      <div className="absolute bottom-4 left-4 opacity-50">
                        <div className="w-16 h-16 rounded-full bg-white/20" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30">
                        <div className="w-32 h-32 rounded-full bg-white/10" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        Limited Time
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                        {promotion.title}
                      </h3>
                      {promotion.subtitle && (
                        <p className="text-lg font-semibold mb-4 text-white/90">
                          {promotion.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10">
                      <p className="text-sm text-white/80 mb-4">
                        {promotion.description}
                      </p>
                      <Button
                        variant="secondary"
                        className="bg-white text-gray-900 hover:bg-white/90 font-semibold"
                      >
                        {promotion.buttonText}
                      </Button>
                    </div>
                  </div>
                </AspectRatio>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-saudi-green hover:bg-saudi-green/90">
            View All Offers
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionsSection;
