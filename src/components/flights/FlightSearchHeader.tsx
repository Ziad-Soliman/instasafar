
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const FlightSearchHeader: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-4">{t("flights.title", "Flight Bookings")}</h1>
      <p className="text-muted-foreground text-lg">{t("flights.subtitle", "Find the best flights for your journey")}</p>
    </div>
  );
};

export default FlightSearchHeader;
