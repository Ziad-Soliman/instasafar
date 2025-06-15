
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CallToActionSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-saudi-green text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            {t('home.cta.subtitle')}
          </p>
          <div className={cn("flex flex-col sm:flex-row gap-4 justify-center", isRTL && "sm:flex-row-reverse")}>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/packages')}
              className="bg-white text-saudi-green hover:bg-white/90"
            >
              {t('home.cta.browsePackages')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/auth/register')}
              className="border-white text-white hover:bg-white/10"
            >
              {t('home.cta.startJourney')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
