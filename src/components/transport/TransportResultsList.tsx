
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import TransportCard, { Transport } from "./TransportCard";

interface TransportResultsListProps {
  loading: boolean;
  error: string | null;
  transports: Transport[];
  onSearch: () => void;
  onViewDetails: (transport: Transport) => void;
}

const TransportResultsList: React.FC<TransportResultsListProps> = ({
  loading,
  error,
  transports,
  onSearch,
  onViewDetails,
}) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex gap-4 mb-4 sm:mb-0">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
              <Skeleton className="h-8 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={onSearch} className="mt-4">{t("common.tryAgain", "Retry")}</Button>
        </CardContent>
      </Card>
    );
  }

  if (transports.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">{t("transport.noTransport", "No transport options found matching your criteria.")}</p>
          <Button onClick={onSearch} className="mt-4">{t("common.reset", "Reset Filters")}</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {transports.map(transport => (
        <TransportCard
          key={transport.id}
          transport={transport}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default TransportResultsList;
