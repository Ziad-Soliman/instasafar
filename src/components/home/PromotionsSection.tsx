
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useBilingualText } from '@/utils/bilingual-helpers';
import { 
  MapPin,
  Calendar,
  Users,
  Star,
  Percent
} from 'lucide-react';

const PromotionsSection = () => {
  const { t, isRTL } = useLanguage();
  const { getText } = useBilingualText();

  const promotions = [
    {
      id: 1,
      title: getText('Hajj Packages 2024', 'باقات الحج 2024'),
      subtitle: getText('Complete Sacred Journey', 'رحلة مقدسة شاملة'),
      buttonText: getText('View Packages', 'عرض الباقات'),
      icon: MapPin,
      description: getText('All-inclusive Hajj packages with VIP accommodation near Haram', 'باقات حج شاملة مع إقامة مميزة قرب الحرم'),
      discount: getText('15% OFF', 'خصم 15%')
    },
    {
      id: 2,
      title: getText('Umrah Special Offers', 'عروض العمرة الخاصة'),
      subtitle: getText('Sacred Pilgrimage Deals', 'عروض الحج المقدس'),
      buttonText: getText('Book Now', 'احجز الآن'),
      icon: Star,
      description: getText('Premium Umrah packages with luxury hotels and guided tours', 'باقات عمرة مميزة مع فنادق فاخرة وجولات مرشدة'),
      discount: getText('Up to 25% OFF', 'خصم يصل إلى 25%')
    },
    {
      id: 3,
      title: getText('Ramadan Umrah', 'عمرة رمضان'),
      subtitle: getText('Blessed Month Journey', 'رحلة الشهر المبارك'),
      buttonText: getText('Learn More', 'اعرف المزيد'),
      icon: Calendar,
      description: getText('Experience the spiritual atmosphere of Ramadan in the Holy Cities', 'اختبر الأجواء الروحانية لرمضان في المدن المقدسة'),
      discount: getText('20% OFF', 'خصم 20%')
    },
    {
      id: 4,
      title: getText('Group Pilgrimage', 'حج جماعي'),
      subtitle: getText('Travel with Community', 'سافر مع المجتمع'),
      buttonText: getText('Join Groups', 'انضم للمجموعات'),
      icon: Users,
      description: getText('Join fellow pilgrims for a shared spiritual experience', 'انضم إلى الحجاج الآخرين لتجربة روحانية مشتركة'),
      discount: getText('Group Rates', 'أسعار المجموعات')
    },
    {
      id: 5,
      title: getText('Ziyarat Tours', 'جولات الزيارات'),
      subtitle: getText('Historical Islamic Sites', 'المواقع الإسلامية التاريخية'),
      buttonText: getText('Explore', 'استكشف'),
      icon: MapPin,
      description: getText('Visit significant Islamic historical sites and learn their stories', 'زر المواقع الإسلامية التاريخية المهمة وتعلم قصصها'),
      discount: getText('Special Price', 'سعر خاص')
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
            {getText('Sacred Journey Offers', 'عروض الرحلات المقدسة')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {getText('Discover exclusive deals for your spiritual pilgrimage to the Holy Cities', 'اكتشف العروض الحصرية لحجك أو عمرتك إلى المدن المقدسة')}
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
            <CarouselContent className="-ml-2 md:-ml-4">
              {promotions.map((promotion, index) => (
                <CarouselItem key={promotion.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-saudi-green/20 h-full">
                      <AspectRatio ratio={16 / 9}>
                        <div className="relative w-full h-full bg-gradient-to-br from-saudi-green to-saudi-green-700 p-4 sm:p-6 flex flex-col justify-between text-white">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                              <promotion.icon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                            </div>
                            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 opacity-50">
                              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/10" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 flex-1">
                            <Badge variant="secondary" className="mb-2 sm:mb-3 bg-white/20 text-white border-white/30 text-xs inline-flex items-center">
                              <Percent className="w-3 h-3 mr-1" />
                              {promotion.discount}
                            </Badge>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 leading-tight line-clamp-2">
                              {promotion.title}
                            </h3>
                            {promotion.subtitle && (
                              <p className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-white/90 line-clamp-1">
                                {promotion.subtitle}
                              </p>
                            )}
                          </div>

                          <div className="relative z-10 mt-auto">
                            <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                              {promotion.description}
                            </p>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-white text-saudi-green hover:bg-white/90 font-semibold border-0 text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto min-h-[32px] w-full sm:w-auto"
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
            <div className="hidden sm:block">
              <CarouselPrevious className="bg-saudi-green hover:bg-saudi-green/90 text-white border-saudi-green -left-6 lg:-left-12" />
              <CarouselNext className="bg-saudi-green hover:bg-saudi-green/90 text-white border-saudi-green -right-6 lg:-right-12" />
            </div>
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
            {getText('View All Sacred Journey Packages', 'عرض جميع باقات الرحلات المقدسة')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionsSection;
