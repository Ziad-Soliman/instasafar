
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface Flight {
  id: string;
  airline_name: string;
  airline_name_ar?: string;
  flight_number: string;
  origin: string;
  origin_ar?: string;
  destination: string;
  destination_ar?: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  class: string;
  available_seats: number;
  total_seats: number;
  aircraft_type?: string;
}

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { t, language, isRTL } = useLanguage();

  const getDisplayName = (name: string, name_ar?: string) => {
    return language === 'ar' && name_ar ? name_ar : name;
  };

  const getClassDisplay = (flightClass: string) => {
    switch (flightClass) {
      case 'economy':
        return t("flights.economy", "Economy");
      case 'business':
        return t("flights.business", "Business");
      case 'first':
        return t("flights.first", "First Class");
      default:
        return flightClass;
    }
  };

  const calculateDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);
    const diff = arr.getTime() - dep.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className={`flex flex-col lg:flex-row justify-between gap-6 ${isRTL ? 'rtl:text-right' : ''}`}>
          {/* Airline Info */}
          <div className={`flex gap-4 items-center min-w-0 lg:w-64 ${isRTL ? 'rtl:flex-row-reverse' : ''}`}>
            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
              <Plane className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-lg truncate">{getDisplayName(flight.airline_name, flight.airline_name_ar)}</h3>
              <p className="text-sm text-muted-foreground">{flight.flight_number}</p>
              {flight.aircraft_type && (
                <p className="text-xs text-muted-foreground truncate">{flight.aircraft_type}</p>
              )}
            </div>
          </div>

          {/* Flight Route */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-3 gap-4 items-center h-full">
              {/* Departure */}
              <div className={`space-y-1 ${isRTL ? 'text-left' : 'text-center'}`}>
                <div className="text-2xl font-bold">{format(new Date(flight.departure_time), 'HH:mm')}</div>
                <div className="text-sm font-medium text-muted-foreground truncate">
                  {getDisplayName(flight.origin, flight.origin_ar)}
                </div>
                <div className="text-xs text-muted-foreground">{t("flights.departure", "Departure")}</div>
              </div>
              
              {/* Flight Duration & Icon */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-xs text-muted-foreground font-medium">
                  {calculateDuration(flight.departure_time, flight.arrival_time)}
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="h-[2px] bg-border flex-1 max-w-12"></div>
                  <div className="mx-2 p-1 bg-saudi-green/10 rounded-full">
                    <Plane className="h-4 w-4 text-saudi-green" />
                  </div>
                  <div className="h-[2px] bg-border flex-1 max-w-12"></div>
                </div>
                <div className="text-xs text-muted-foreground">Non-stop</div>
              </div>
              
              {/* Arrival */}
              <div className={`space-y-1 ${isRTL ? 'text-right' : 'text-center'}`}>
                <div className="text-2xl font-bold">{format(new Date(flight.arrival_time), 'HH:mm')}</div>
                <div className="text-sm font-medium text-muted-foreground truncate">
                  {getDisplayName(flight.destination, flight.destination_ar)}
                </div>
                <div className="text-xs text-muted-foreground">{t("flights.arrival", "Arrival")}</div>
              </div>
            </div>
          </div>

          {/* Price and Book */}
          <div className={`flex flex-col items-end justify-center space-y-4 lg:w-48 ${isRTL ? 'rtl:items-start' : ''}`}>
            <div className={`${isRTL ? 'rtl:text-left' : 'text-right'}`}>
              <div className="text-2xl font-bold">${flight.price}</div>
              <div className="text-xs text-muted-foreground">{t("price.perPerson", "per person")}</div>
            </div>
            <Button className="w-full lg:w-auto px-8">
              {t("flights.bookFlight", "Book Flight")}
            </Button>
          </div>
        </div>

        {/* Flight Details */}
        <div className="mt-6 pt-4 border-t">
          <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground items-center ${isRTL ? 'rtl:flex-row-reverse' : ''}`}>
            <div className="flex items-center">
              <Badge variant="outline" className={`${isRTL ? 'ml-2' : 'mr-2'}`}>
                {getClassDisplay(flight.class)}
              </Badge>
            </div>
            <div className={`flex items-center gap-1 ${isRTL ? 'rtl:flex-row-reverse' : ''}`}>
              <Users className="w-4 h-4" />
              <span>{t("flights.availableSeats", "Available Seats")}: {flight.available_seats}/{flight.total_seats}</span>
            </div>
            <div className={`flex items-center gap-1 ${isRTL ? 'rtl:flex-row-reverse' : ''}`}>
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(flight.departure_time), 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
