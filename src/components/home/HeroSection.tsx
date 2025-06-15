
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Globe } from '@/components/ui/globe';
import { cn } from '@/lib/utils';
import { 
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
    <AuroraBackground className="h-auto min-h-screen pt-12 pb-0 bg-gradient-to-br from-saudi-green/5 via-background to-muted/20 relative overflow-hidden" showRadialGradient={true}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-4xl mx-auto text-center"
          >
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <Badge variant="saudi" className="text-sm px-4 py-2">
                  {t('home.hero.badge')}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-center">
                <span className="text-foreground">{t('home.hero.title').split(' ').slice(0, 1).join(' ')} </span>
                <span className="text-saudi-green">{t('home.hero.title').split(' ').slice(1, 3).join(' ')} </span>
                <span className="text-foreground">{t('home.hero.title').split(' ').slice(3).join(' ')}</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center">
                {t('home.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-saudi-green hover:bg-saudi-green/90">
                  {t('home.hero.explorePackages')}
                </Button>
                <Button size="lg" variant="outline">
                  {t('home.hero.learnMore')}
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 pt-8 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-center gap-3 text-center"
                >
                  <feature.icon className="h-5 w-5 text-saudi-green flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Globe positioned under content, taking almost full width with lower half hidden */}
        <div className="relative h-[60vh] w-full mt-16 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[1200px] h-[120vh]">
            <Globe />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HeroSection;
