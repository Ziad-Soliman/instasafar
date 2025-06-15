
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bus, Car, Users } from "lucide-react";

export interface Transport {
  id: string;
  name?: string;
  name_ar?: string;
  provider_logo?: string;
  type: string;
  from_city: string;
  from_city_ar?: string;
  to_city: string;
  to_city_ar?: string;
  departure_time: string;
  duration_hours: number;
  price: number;
  capacity: number;
  available_seats: number;
  is_internal?: boolean;
  features?: string[];
}

interface TransportCardProps {
  transport: Transport;
  onViewDetails: (transport: Transport) => void;
}

const TransportCard: React.FC<TransportCardProps> = ({ transport, onViewDetails }) => {
  const { t, language } = useLanguage();

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "bus":
      case "intercity":
        return <Bus className="h-4 w-4" />;
      case "car":
      case "private_car":
        return <Car className="h-4 w-4" />;
      default:
        return <Bus className="h-4 w-4" />;
    }
  };

  const getDisplayName = (name: string, name_ar?: string) => {
    return language === 'ar' && name_ar ? name_ar : name;
  };

  const getDisplayCity = (city: string, city_ar?: string) => {
    return language === 'ar' && city_ar ? city_ar : city;
  };

  return (
    <Card className="relative overflow-hidden">
      {transport.is_internal && (
        <Badge className="absolute top-2 right-2 z-10 bg-primary" variant="secondary">
          {t("transport.internal", "Internal")}
        </Badge>
      )}
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0">
              {transport.provider_logo ? (
                <img
                  src={transport.provider_logo}
                  alt={getDisplayName(transport.name || "", transport.name_ar)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">{t("common.noLogo", "No Logo")}</div>
              )}
            </div>
            <div>
              <h3 className="font-medium">{getDisplayName(transport.name || "", transport.name_ar)}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                {getTransportIcon(transport.type)}
                <span className="ml-1 capitalize">{transport.type.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-center">
            <div className="text-center">
              <div className="font-semibold">{getDisplayCity(transport.from_city, transport.from_city_ar)}</div>
              <div className="text-sm text-muted-foreground">{t("transport.from", "From")}</div>
              <div className="text-xs">{transport.departure_time}</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-xs text-muted-foreground">{transport.duration_hours}h</div>
              <div className="w-full flex items-center">
                <div className="h-[1px] bg-border flex-grow"></div>
                {getTransportIcon(transport.type)}
                <div className="h-[1px] bg-border flex-grow"></div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{getDisplayCity(transport.to_city, transport.to_city_ar)}</div>
              <div className="text-sm text-muted-foreground">{t("transport.to", "To")}</div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <div className="text-xl font-bold">${transport.price}</div>
            <div className="text-xs text-muted-foreground mb-2">{t("price.perPerson", "per person")}</div>
            <Button onClick={() => onViewDetails(transport)}>
              {t("packages.viewDetails", "View Details")}
            </Button>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {(transport.features || []).map((feature, index) => (
              <Badge key={index} variant="outline">
                {feature}
              </Badge>
            ))}
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center">
            <Users className="w-3 h-3 mr-1" />
            <span>{t("transport.capacity", "Capacity")}: {transport.capacity} {t("common.passengers", "passengers")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportCard;
