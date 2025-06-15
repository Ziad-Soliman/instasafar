
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuroraBackground } from '@/components/ui/aurora-background';
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
    <AuroraBackground className="h-auto min-h-[35vh] pt-12 pb-8 relative overflow-hidden" showRadialGradient={true}>
      {/* Glass morphism background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-saudi-green/5 to-background/20 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-saudi-green/10"></div>
      
      {/* Floating glass orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-saudi-green/20 rounded-full blur-2xl animate-bounce-gentle"></div>
      <div className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 max-w-4xl mx-auto text-center"
          >
            {/* Glass container for content */}
            <div className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <Badge variant="saudi" className="text-sm px-4 py-2 bg-saudi-green/20 backdrop-blur-sm border border-saudi-green/30">
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
                  <Button size="lg" className="bg-saudi-green/90 hover:bg-saudi-green backdrop-blur-sm border border-saudi-green/20 shadow-lg">
                    {t('home.hero.explorePackages')}
                  </Button>
                  <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20">
                    {t('home.hero.learnMore')}
                  </Button>
                </div>
              </div>

              {/* Features Grid with glass effect */}
              <div className="grid grid-cols-2 gap-4 pt-8 max-w-2xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-center gap-3 text-center p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <feature.icon className="h-5 w-5 text-saudi-green flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HeroSection;
