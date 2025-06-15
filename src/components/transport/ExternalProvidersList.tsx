
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

export interface ExternalTransportProvider {
  id: string;
  name: string;
  logo: string;
  url: string;
  price_indication: string;
}

interface ExternalProvidersListProps {
  loading: boolean;
  providers: ExternalTransportProvider[];
  onProviderClick: (url: string) => void;
}

const ExternalProvidersList: React.FC<ExternalProvidersListProps> = ({
  loading,
  providers,
  onProviderClick,
}) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="w-full h-12 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-8 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map(provider => (
        <Card key={provider.id} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="h-12 mb-4 bg-muted flex items-center justify-center rounded">
              <img
                src={provider.logo || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=50"}
                alt={provider.name}
                className="h-8 max-w-full object-contain"
              />
            </div>
            
            <h3 className="font-semibold text-center">{provider.name}</h3>
            <div className="text-center text-sm mb-4">
              {provider.price_indication}
            </div>
            
            <Button 
              onClick={() => onProviderClick(provider.url)} 
              className="w-full"
              variant="outline"
            >
              {t("transport.searchOn", "Search on")} {provider.name}
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExternalProvidersList;
