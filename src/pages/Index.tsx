
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import SearchSection from '@/components/home/SearchSection';
import FeaturedPackagesSection from '@/components/home/FeaturedPackagesSection';
import FeaturedHotelsSection from '@/components/home/FeaturedHotelsSection';
import JourneySection from '@/components/home/JourneySection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const Index = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      <HeroSection />
      <StatsSection />
      <SearchSection />
      <FeaturedPackagesSection />
      <FeaturedHotelsSection />
      <JourneySection />
      <ServicesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;
