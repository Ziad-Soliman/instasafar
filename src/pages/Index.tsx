
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { AuroraBackground } from '@/components/ui/aurora-background';
import HeroSection from '@/components/home/HeroSection';
import SearchSection from '@/components/home/SearchSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedPackagesSection from '@/components/home/FeaturedPackagesSection';
import FeaturedHotelsSection from '@/components/home/FeaturedHotelsSection';
import JourneySection from '@/components/home/JourneySection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PilgrimageRoutesSection from '@/components/home/PilgrimageRoutesSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const Index = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      {/* Unified Aurora Background for Hero and Search */}
      <AuroraBackground className="h-auto min-h-[70vh] bg-gradient-to-br from-saudi-green/5 via-background to-muted/20" showRadialGradient={true}>
        <HeroSection />
        <SearchSection />
      </AuroraBackground>
      
      <StatsSection />
      <FeaturedPackagesSection />
      <FeaturedHotelsSection />
      <JourneySection />
      <ServicesSection />
      <TestimonialsSection />
      <PilgrimageRoutesSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;
