
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FlightEmptyStateProps {
  error?: string | null;
  onRetry?: () => void;
}

const FlightEmptyState: React.FC<FlightEmptyStateProps> = ({ error, onRetry }) => {
  const { t } = useLanguage();

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">{error}</p>
          {onRetry && (
            <Button onClick={onRetry} className="mt-4">
              {t("common.tryAgain", "Try Again")}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground">{t("flights.noFlights", "No flights found")}</p>
        <p className="text-sm text-muted-foreground mt-2">{t("flights.noFlightsMessage", "Try different search criteria or dates")}</p>
      </CardContent>
    </Card>
  );
};

export default FlightEmptyState;
