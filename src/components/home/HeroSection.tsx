
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { cn } from '@/lib/utils';
import { 
  Star, 
  Users, 
  CheckCircle,
  Clock,
  Shield,
  MapPin
} from 'lucide-react';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: CheckCircle,
      title: t('home.features.bestPrice'),
    },
    {
      icon: Clock,
      title: t('home.features.customerSupport'),
    },
    {
      icon: Shield,
      title: t('home.features.securePayments'),
    },
    {
      icon: MapPin,
      title: t('home.features.expertGuides'),
    },
  ];

  return (
    <AuroraBackground className="h-auto min-h-[50vh] pt-16 pb-12 bg-gradient-to-br from-saudi-green/5 via-background to-muted/20" showRadialGradient={true}>
      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
          isRTL && "lg:grid-flow-col-dense"
        )}>
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "space-y-8",
              isRTL ? "text-right lg:order-2" : "text-left lg:order-1"
            )}
          >
            <div className="space-y-6">
              <Badge variant="saudi" className={cn(
                "text-sm px-4 py-2",
                isRTL ? "self-end" : "self-start"
              )}>
                {t('home.hero.badge')}
              </Badge>
              
              <h1 className={cn(
                "text-4xl md:text-6xl font-bold leading-tight",
                isRTL ? "text-right" : "text-left"
              )}>
                <span className="text-foreground">{t('home.hero.title').split(' ').slice(0, 1).join(' ')} </span>
                <span className="text-saudi-green">{t('home.hero.title').split(' ').slice(1, 3).join(' ')} </span>
                <span className="text-foreground">{t('home.hero.title').split(' ').slice(3).join(' ')}</span>
              </h1>
              
              <p className={cn(
                "text-lg text-muted-foreground leading-relaxed max-w-2xl",
                isRTL ? "text-right" : "text-left"
              )}>
                {t('home.hero.subtitle')}
              </p>
              
              <div className={cn(
                "flex flex-col sm:flex-row gap-4",
                isRTL ? "sm:flex-row-reverse items-end sm:items-start" : "items-start"
              )}>
                <Button size="lg" className="bg-saudi-green hover:bg-saudi-green/90">
                  {t('home.hero.explorePackages')}
                </Button>
                <Button size="lg" variant="outline">
                  {t('home.hero.learnMore')}
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={cn(
                    "flex items-center gap-3",
                    isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
                  )}
                >
                  <feature.icon className="h-5 w-5 text-saudi-green flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image/Card */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "relative",
              isRTL ? "lg:order-1" : "lg:order-2"
            )}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt={t('home.hero.kaaba')}
                  className="w-full h-full object-cover"
                />
                
                {/* Rating overlay */}
                <div className={cn(
                  "absolute top-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg",
                  isRTL ? "left-4" : "right-4"
                )}>
                  <div className={cn(
                    "flex items-center gap-2",
                    isRTL ? "flex-row-reverse" : "flex-row"
                  )}>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{t('home.hero.rating')}</span>
                  </div>
                  <p className={cn(
                    "text-xs text-muted-foreground mt-1",
                    isRTL ? "text-right" : "text-left"
                  )}>
                    {t('home.hero.fromReviews')}
                  </p>
                </div>

                {/* Pilgrims count overlay */}
                <div className={cn(
                  "absolute bottom-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg",
                  isRTL ? "left-4" : "right-4"
                )}>
                  <div className={cn(
                    "flex items-center gap-2",
                    isRTL ? "flex-row-reverse" : "flex-row"
                  )}>
                    <Users className="h-4 w-4 text-saudi-green" />
                    <span className="font-semibold">{t('home.hero.pilgrimsServed')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HeroSection;
