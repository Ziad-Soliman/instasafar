
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bus, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TransportSearchForm from "@/components/transport/TransportSearchForm";
import TransportResultsList from "@/components/transport/TransportResultsList";
import ExternalProvidersList, { ExternalTransportProvider } from "@/components/transport/ExternalProvidersList";
import { Transport } from "@/components/transport/TransportCard";

const TransportSearchPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for search form
  const [fromCity, setFromCity] = useState("Makkah");
  const [toCity, setToCity] = useState("Madinah");
  const [travelDate, setTravelDate] = useState<Date | undefined>(new Date());
  const [passengers, setPassengers] = useState(1);
  const [transportType, setTransportType] = useState<string>("all");

  // State for results
  const [loading, setLoading] = useState(false);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [externalProviders, setExternalProviders] = useState<ExternalTransportProvider[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch transport options from Supabase
  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from("transport_options").select("*");
      
      if (transportType && transportType !== "all") {
        query = query.eq("type", transportType);
      }

      const { data, error } = await query;

      if (error) {
        setTransports([]);
        setError(t("transport.noTransport", "No transport options found"));
        toast({
          title: t("common.error", "Error"),
          description: t("transport.noTransportMessage", "Could not load transport options."),
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Transform the data to match component expectations
      const transportData: Transport[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        name_ar: item.name_ar,
        provider_logo: item.thumbnail,
        type: item.type,
        from_city: item.from_city,
        from_city_ar: item.from_city_ar,
        to_city: item.to_city,
        to_city_ar: item.to_city_ar,
        departure_time: item.departure_time || "08:00",
        duration_hours: item.duration_hours || 2,
        price: Number(item.price),
        capacity: item.capacity || 50,
        available_seats: item.available_seats || 30,
        features: []
      }));

      setTransports(transportData);

      // External providers - still mocked for now
      setExternalProviders([
        {
          id: "provider-1",
          name: "GetYourGuide",
          logo: "/placeholder.svg",
          url: "https://getyourguide.com",
          price_indication: t("transport.from", "From") + " $50"
        },
        {
          id: "provider-2",
          name: "Uber",
          logo: "/placeholder.svg",
          url: "https://uber.com",
          price_indication: t("transport.from", "From") + " $120"
        },
        {
          id: "provider-3",
          name: "Viator",
          logo: "/placeholder.svg",
          url: "https://viator.com",
          price_indication: t("transport.from", "From") + " $65"
        }
      ]);

      setLoading(false);
    } catch (err: any) {
      setError(t("common.error", "Unknown error fetching data"));
      setLoading(false);
      toast({
        title: t("common.error", "Error"),
        description: err?.message || t("common.tryAgain", "An error occurred."),
        variant: "destructive",
      });
    }
  }, [toast, transportType, t]);

  // Run search on mount and whenever filter changes
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Handle view details/book now
  const handleViewDetails = (transport: Transport) => {
    navigate(`/transport/${transport.id}`);
  };

  // Handle external provider click
  const handleExternalProviderClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">{t("transport.title", "Transportation Services")}</h1>
        
        <TransportSearchForm
          fromCity={fromCity}
          setFromCity={setFromCity}
          toCity={toCity}
          setToCity={setToCity}
          travelDate={travelDate}
          setTravelDate={setTravelDate}
          passengers={passengers}
          setPassengers={setPassengers}
          transportType={transportType}
          setTransportType={setTransportType}
          onSearch={handleSearch}
        />
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <Tabs defaultValue="transport">
              <TabsList className="mb-6">
                <TabsTrigger value="transport">
                  <Bus className="h-4 w-4 mr-2" />
                  {t("transport.options", "Transport Options")}
                </TabsTrigger>
                <TabsTrigger value="external">
                  <Search className="h-4 w-4 mr-2" />
                  {t("transport.externalProviders", "External Providers")}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transport" className="mt-0">
                <TransportResultsList
                  loading={loading}
                  error={error}
                  transports={transports}
                  onSearch={handleSearch}
                  onViewDetails={handleViewDetails}
                />
              </TabsContent>
              
              <TabsContent value="external" className="mt-0">
                <ExternalProvidersList
                  loading={loading}
                  providers={externalProviders}
                  onProviderClick={handleExternalProviderClick}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransportSearchPage;
