
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import FlightSearchHeader from "@/components/flights/FlightSearchHeader";
import FlightLoadingSkeleton from "@/components/flights/FlightLoadingSkeleton";
import FlightEmptyState from "@/components/flights/FlightEmptyState";
import FlightList from "@/components/flights/FlightList";

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
  const { t } = useLanguage();
  const { toast } = useToast();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      
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

  useEffect(() => {
    fetchFlights();
  }, [t, toast]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <FlightSearchHeader />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {loading ? (
          <FlightLoadingSkeleton />
        ) : error ? (
          <FlightEmptyState error={error} onRetry={handleRetry} />
        ) : flights.length === 0 ? (
          <FlightEmptyState />
        ) : (
          <FlightList flights={flights} />
        )}
      </motion.div>
    </div>
  );
};

export default FlightSearchPage;
