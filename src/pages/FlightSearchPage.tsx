
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plane, Clock, Users, Calendar } from "lucide-react";
import { format } from "date-fns";

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

const FlightSearchPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const { data, error } = await supabase
          .from('flights')
          .select('*')
          .order('departure_time', { ascending: true });

        if (error) {
          setError(t("flights.noFlights", "No flights found"));
          toast({
            title: t("common.error", "Error"),
            description: t("flights.noFlightsMessage", "Could not load flights."),
            variant: "destructive",
          });
        } else {
          setFlights(data || []);
        }
      } catch (err: any) {
        setError(t("common.error", "An error occurred"));
        toast({
          title: t("common.error", "Error"),
          description: err?.message || t("common.tryAgain", "An error occurred."),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [t, toast]);

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
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("flights.title", "Flight Bookings")}</h1>
          <p className="text-muted-foreground text-lg">{t("flights.subtitle", "Find the best flights for your journey")}</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex gap-4 items-center">
                      <Skeleton className="w-16 h-16 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <div className="text-center">
                        <Skeleton className="h-4 w-16 mx-auto" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                {t("common.tryAgain", "Try Again")}
              </Button>
            </CardContent>
          </Card>
        ) : flights.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">{t("flights.noFlights", "No flights found")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("flights.noFlightsMessage", "Try different search criteria or dates")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {flights.map(flight => (
              <Card key={flight.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Airline Info */}
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                        <Plane className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{getDisplayName(flight.airline_name, flight.airline_name_ar)}</h3>
                        <p className="text-sm text-muted-foreground">{flight.flight_number}</p>
                        {flight.aircraft_type && (
                          <p className="text-xs text-muted-foreground">{flight.aircraft_type}</p>
                        )}
                      </div>
                    </div>

                    {/* Flight Route */}
                    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-center">
                      <div className="text-center">
                        <div className="font-semibold">{getDisplayName(flight.origin, flight.origin_ar)}</div>
                        <div className="text-sm text-muted-foreground">{t("flights.departure", "Departure")}</div>
                        <div className="text-xs font-mono">
                          {format(new Date(flight.departure_time), 'HH:mm')}
                        </div>
                      </div>
                      
                      <div className="text-center flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          {calculateDuration(flight.departure_time, flight.arrival_time)}
                        </div>
                        <div className="w-full flex items-center">
                          <div className="h-[1px] bg-border flex-grow"></div>
                          <Plane className="h-4 w-4 mx-2 text-muted-foreground" />
                          <div className="h-[1px] bg-border flex-grow"></div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold">{getDisplayName(flight.destination, flight.destination_ar)}</div>
                        <div className="text-sm text-muted-foreground">{t("flights.arrival", "Arrival")}</div>
                        <div className="text-xs font-mono">
                          {format(new Date(flight.arrival_time), 'HH:mm')}
                        </div>
                      </div>
                    </div>

                    {/* Price and Book */}
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right mb-4">
                        <div className="text-2xl font-bold">${flight.price}</div>
                        <div className="text-xs text-muted-foreground">{t("price.perPerson", "per person")}</div>
                      </div>
                      <Button className="w-full lg:w-auto">
                        {t("flights.bookFlight", "Book Flight")}
                      </Button>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2">
                          {getClassDisplay(flight.class)}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{t("flights.availableSeats", "Available Seats")}: {flight.available_seats}/{flight.total_seats}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{format(new Date(flight.departure_time), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FlightSearchPage;
