
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

interface FlightCardProps {
  flight: {
    id: string;
    airline: string;
    airline_logo: string;
    departure_city: string;
    departure_airport: string;
    departure_time: string;
    arrival_city: string;
    arrival_airport: string;
    arrival_time: string;
    duration: string;
    price: number;
    stops: number;
    is_internal: boolean;
  };
  departureDate?: Date;
  passengers: number;
  onViewDetails: (flight: any) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ 
  flight, 
  departureDate, 
  passengers,
  onViewDetails 
}) => {
  return (
    <Card variant="interactive" className="group">
      {flight.is_internal && (
        <Badge className="absolute top-4 right-4 z-10 bg-saudi-green text-white" variant="secondary">
          Internal
        </Badge>
      )}
      
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Airline Info */}
          <div className="flex gap-4 items-center min-w-0">
            <div className="w-12 h-12 bg-muted rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent group-hover:ring-saudi-green/20 transition-all duration-300">
              <img 
                src={flight.airline_logo} 
                alt={flight.airline} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-lg text-foreground truncate">{flight.airline}</h3>
              <div className="text-sm text-muted-foreground">
                Flight #{flight.id.replace('flight-', '')}
              </div>
            </div>
          </div>
          
          {/* Flight Route */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Departure */}
            <div className="text-center space-y-1">
              <div className="font-bold text-2xl text-foreground">{flight.departure_time}</div>
              <div className="text-sm font-medium text-muted-foreground">{flight.departure_airport}</div>
              <div className="text-xs text-muted-foreground">{flight.departure_city}</div>
            </div>
            
            {/* Flight Info */}
            <div className="text-center flex flex-col items-center space-y-2">
              <div className="text-xs font-medium text-muted-foreground">{flight.duration}</div>
              <div className="w-full flex items-center">
                <div className="h-[2px] bg-border flex-grow"></div>
                <div className="mx-3 p-1.5 bg-saudi-green/10 rounded-full">
                  <Plane className="h-4 w-4 text-saudi-green" />
                </div>
                <div className="h-[2px] bg-border flex-grow"></div>
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                {flight.stops === 0 ? 'Non-stop' : 
                 flight.stops === 1 ? '1 stop' : 
                 `${flight.stops} stops`}
              </div>
            </div>
            
            {/* Arrival */}
            <div className="text-center space-y-1">
              <div className="font-bold text-2xl text-foreground">{flight.arrival_time}</div>
              <div className="text-sm font-medium text-muted-foreground">{flight.arrival_airport}</div>
              <div className="text-xs text-muted-foreground">{flight.arrival_city}</div>
            </div>
          </div>
          
          {/* Price and Action */}
          <div className="flex flex-col items-end justify-between space-y-4 lg:space-y-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">${flight.price}</div>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
            <Button 
              onClick={() => onViewDetails(flight)}
              variant="saudi"
              size="lg"
              className="w-full lg:w-auto min-w-[120px]"
            >
              {flight.is_internal ? 'Book Now' : 'View Details'}
            </Button>
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Departure: {departureDate ? format(departureDate, 'dd MMM yyyy') : 'Not selected'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{passengers} {passengers === 1 ? 'passenger' : 'passengers'}</span>
            </div>
          </div>
          
          {!flight.is_internal && (
            <Badge variant="outline" className="text-xs">
              External Provider
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
