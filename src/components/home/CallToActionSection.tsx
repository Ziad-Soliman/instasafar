
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
    <div>
      <CTASection
        badge={{
          text: t('home.cta.badge') || 'Get Started'
        }}
        title={t('home.cta.title')}
        description={t('home.cta.subtitle')}
        action={{
          text: t('home.cta.browsePackages'),
          href: '/packages',
          variant: "default"
        }}
        secondaryAction={{
          text: t('home.cta.startJourney'),
          href: '/auth/register',
          variant: "outline"
        }}
        withGlow={true}
      />
    </div>
  );
};

export default CallToActionSection;
