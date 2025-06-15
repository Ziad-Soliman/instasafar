
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FeatureSteps } from '@/components/ui/feature-section';

const JourneySection = () => {
  const { t } = useLanguage();

  const journeySteps = [
    { 
      step: 'Step 1', 
      title: t('home.journey.step1.title', 'Choose Your Package'),
      content: t('home.journey.step1.content', 'Browse our carefully curated Hajj and Umrah packages designed for your spiritual journey.'), 
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    { 
      step: 'Step 2',
      title: t('home.journey.step2.title', 'Book & Prepare'),
      content: t('home.journey.step2.content', 'Complete your booking with secure payments and receive comprehensive preparation guides for your pilgrimage.'),
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    { 
      step: 'Step 3',
      title: t('home.journey.step3.title', 'Begin Your Journey'),
      content: t('home.journey.step3.content', 'Travel with peace of mind knowing our expert guides and 24/7 support are there every step of the way.'),
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
  ];

  return (
    <section className="py-16 bg-muted/20">
      <FeatureSteps 
        features={journeySteps}
        title={t('home.journey.title', 'Your Spiritual Journey Starts Here')}
        autoPlayInterval={4000}
        imageHeight="h-[400px]"
        className="px-0"
      />
    </section>
  );
};

export default JourneySection;
