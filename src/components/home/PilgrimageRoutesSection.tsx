
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { WorldMap } from '@/components/ui/world-map';

const PilgrimageRoutesSection = () => {
  const { t, isRTL } = useLanguage();

  const pilgrimageRoutes = [
    {
      start: { lat: 40.7128, lng: -74.0060 }, // New York
      end: { lat: 21.4225, lng: 39.8262 }, // Makkah
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 24.4686, lng: 39.6142 }, // Medina
    },
    {
      start: { lat: 28.6139, lng: 77.2090 }, // New Delhi
      end: { lat: 21.4225, lng: 39.8262 }, // Makkah
    },
    {
      start: { lat: 35.6762, lng: 139.6503 }, // Tokyo
      end: { lat: 24.4686, lng: 39.6142 }, // Medina
    },
    {
      start: { lat: -1.2921, lng: 36.8219 }, // Nairobi
      end: { lat: 21.4225, lng: 39.8262 }, // Makkah
    },
    {
      start: { lat: -33.9249, lng: 18.4241 }, // Cape Town
      end: { lat: 24.4686, lng: 39.6142 }, // Medina
    },
    {
      start: { lat: 1.3521, lng: 103.8198 }, // Singapore
      end: { lat: 21.4225, lng: 39.8262 }, // Makkah
    },
    {
      start: { lat: -33.8688, lng: 151.2093 }, // Sydney
      end: { lat: 24.4686, lng: 39.6142 }, // Medina
    },
  ];

  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">{t('home.routes.badge', 'Global Routes')}</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            {t('home.routes.title', 'Pilgrims Journey to the Holy Cities')}
          </h2>
          <p className={cn("text-center mt-5 opacity-75", isRTL && "text-right")}>
            {t('home.routes.subtitle', 'Connecting hearts from around the world to the sacred destinations of Makkah and Medina')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <WorldMap 
            dots={pilgrimageRoutes}
            lineColor="#22c55e"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 rounded-lg bg-background border">
            <h3 className="text-xl font-semibold mb-2">
              {t('home.routes.makkah.title', 'Makkah Al-Mukarramah')}
            </h3>
            <p className="text-muted-foreground">
              {t('home.routes.makkah.description', 'The holiest city in Islam, home to the sacred Kaaba and the Grand Mosque')}
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-background border">
            <h3 className="text-xl font-semibold mb-2">
              {t('home.routes.medina.title', 'Medina Al-Munawwarah')}
            </h3>
            <p className="text-muted-foreground">
              {t('home.routes.medina.description', 'The radiant city where Prophet Muhammad (PBUH) is buried, second holiest city in Islam')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PilgrimageRoutesSection;
