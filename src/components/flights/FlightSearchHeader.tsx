
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const FlightSearchHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl font-bold mb-4">{t("flights.title", "Flight Bookings")}</h1>
      <p className="text-muted-foreground text-lg">{t("flights.subtitle", "Find the best flights for your journey")}</p>
    </motion.div>
  );
};

export default FlightSearchHeader;
