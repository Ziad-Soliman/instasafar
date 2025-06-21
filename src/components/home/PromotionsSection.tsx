
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { 
  MapPin,
  Calendar,
  Users,
  Star,
  Percent
} from 'lucide-react';

const PromotionsSection = () => {
  const { t, isRTL } = useLanguage();

  const promotions = [
    {
      id: 1,
      title: 'Hajj Packages 2024',
      subtitle: 'Complete Sacred Journey',
      buttonText: 'View Packages',
      icon: MapPin,
      gradient: 'from-saudi-green-600 to-saudi-green-800',
      description: 'All-inclusive Hajj packages with VIP accommodation near Haram',
      discount: '15% OFF'
    },
    {
      id: 2,
      title: 'Umrah Special Offers',
      subtitle: 'Sacred Pilgrimage Deals',
      buttonText: 'Book Now',
      icon: Star,
      gradient: 'from-saudi-green-500 to-saudi-green-700',
      description: 'Premium Umrah packages with luxury hotels and guided tours',
      discount: 'Up to 25% OFF'
    },
    {
      id: 3,
      title: 'Ramadan Umrah',
      subtitle: 'Blessed Month Journey',
      buttonText: 'Learn More',
      icon: Calendar,
      gradient: 'from-saudi-green-700 to-saudi-green-900',
      description: 'Experience the spiritual atmosphere of Ramadan in the Holy Cities',
      discount: '20% OFF'
    },
    {
      id: 4,
      title: 'Group Pilgrimage',
      subtitle: 'Travel with Community',
      buttonText: 'Join Groups',
      icon: Users,
      gradient: 'from-saudi-green-400 to-saudi-green-600',
      description: 'Join fellow pilgrims for a shared spiritual experience',
      discount: 'Group Rates'
    },
    {
      id: 5,
      title: 'Ziyarat Tours',
      subtitle: 'Historical Islamic Sites',
      buttonText: 'Explore',
      icon: MapPin,
      gradient: 'from-saudi-green-600 to-saudi-green-800',
      description: 'Visit significant Islamic historical sites and learn their stories',
      discount: 'Special Price'
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
            Sacred Journey Offers
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover exclusive deals for your spiritual pilgrimage to the Holy Cities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {promotions.map((promotion, index) => (
                <CarouselItem key={promotion.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-1"
                  >
                    <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-saudi-green/20">
                      <AspectRatio ratio={16 / 9}>
                        <div className={cn(
                          "relative w-full h-full bg-gradient-to-br p-6 flex flex-col justify-between text-white",
                          promotion.gradient
                        )}>
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-4">
                              <promotion.icon className="w-20 h-20" />
                            </div>
                            <div className="absolute bottom-4 left-4 opacity-50">
                              <div className="w-12 h-12 rounded-full bg-white/20" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                              <div className="w-24 h-24 rounded-full bg-white/10" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/30 text-xs">
                              <Percent className="w-3 h-3 mr-1" />
                              {promotion.discount}
                            </Badge>
                            <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                              {promotion.title}
                            </h3>
                            {promotion.subtitle && (
                              <p className="text-base font-semibold mb-3 text-white/90">
                                {promotion.subtitle}
                              </p>
                            )}
                          </div>

                          <div className="relative z-10">
                            <p className="text-sm text-white/80 mb-4 leading-relaxed">
                              {promotion.description}
                            </p>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-white text-saudi-green-700 hover:bg-white/90 font-semibold border-0"
                            >
                              {promotion.buttonText}
                            </Button>
                          </div>
                        </div>
                      </AspectRatio>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-saudi-green hover:bg-saudi-green/90 text-white border-saudi-green" />
            <CarouselNext className="bg-saudi-green hover:bg-saudi-green/90 text-white border-saudi-green" />
          </Carousel>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="saudi" className="bg-saudi-green hover:bg-saudi-green/90">
            View All Sacred Journey Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionsSection;
