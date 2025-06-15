
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CTASection } from '@/components/ui/cta-with-rectangle';

const CallToActionSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handlePrimaryAction = () => {
    navigate('/packages');
  };

  const handleSecondaryAction = () => {
    navigate('/auth/register');
  };

  return (
    <div className="bg-saudi-green text-white">
      <CTASection
        badge={{
          text: t('home.cta.badge') || 'Get Started'
        }}
        title={t('home.cta.title')}
        description={t('home.cta.subtitle')}
        action={{
          text: t('home.cta.browsePackages'),
          href: '#',
          variant: "default"
        }}
        secondaryAction={{
          text: t('home.cta.startJourney'),
          href: '#',
          variant: "outline"
        }}
        withGlow={true}
        className="bg-transparent"
      />
    </div>
  );
};

export default CallToActionSection;
