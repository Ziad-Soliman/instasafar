
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import HotelBookingModal from "@/components/hotel/HotelBookingModal";
import { useAuth } from "@/hooks/useAuth";

interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  price_per_night: number;
  rating: number | null;
  thumbnail?: string | null;
  description?: string | null;
  distance_to_haram?: string | null;
}

const SearchPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch hotels from backend when search term changes or component mounts
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);

      let query = supabase
        .from("hotels")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchTerm.trim().length > 0) {
        // Case-insensitive search by name or city
        query = query.or(
          `name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching hotels:', error);
        toast({
          title: "Error",
          description: "Failed to fetch hotels.",
          variant: "destructive",
        });
        setHotels([]);
        setLoading(false);
        return;
      }
      
      setHotels(data || []);
      setLoading(false);
    };
    
    fetchHotels();
  }, [searchTerm, toast]);

  const handleBookNow = (hotel: Hotel) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book a hotel.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center gap-2">
        <Input
          placeholder={t("search.hotel_city") || "Search hotels by name or city..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xl"
        />
      </div>
      
      <HotelBookingModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setSelectedHotel(null);
        }}
        hotel={
          selectedHotel
            ? {
                id: selectedHotel.id,
                name: selectedHotel.name,
                price_per_night: selectedHotel.price_per_night,
                thumbnail: selectedHotel.thumbnail,
              }
            : {
                id: "",
                name: "",
                price_per_night: 0,
                thumbnail: "",
              }
        }
        userId={user?.id}
      />
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-pulse text-lg">{t("search.loading") || "Loading hotels..."}</div>
        </div>
      ) : hotels.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <h3 className="text-lg font-semibold mb-2">
            {searchTerm ? "No hotels found" : "No hotels available"}
          </h3>
          <p>
            {searchTerm 
              ? `No hotels match your search for "${searchTerm}"`
              : "There are currently no hotels in our database. Please check back later or contact support."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Link to={`/hotel/${hotel.id}`} className="block group">
                  <img
                    src={hotel.thumbnail || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-44 object-cover rounded-lg mb-3 group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "/placeholder.svg";
                    }}
                  />
                  <h3 className="text-lg font-bold group-hover:text-saudi-green transition-colors line-clamp-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {hotel.address}, {hotel.city}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {hotel.distance_to_haram && (
                      <Badge variant="outline" className="text-xs">
                        {hotel.distance_to_haram} {t("distance.to") || "to"} {t("distance.haram") || "Haram"}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm">{(hotel.rating ?? 0).toFixed(1)}</span>
                    </span>
                  </div>
                  <div className="mt-3 font-bold text-lg text-primary">
                    ${hotel.price_per_night} <span className="text-sm font-normal text-muted-foreground">/ {t("price.night") || "night"}</span>
                  </div>
                </Link>
                <Button
                  className="mt-3 w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleBookNow(hotel);
                  }}
                >
                  {t("search.book_now") || "Book Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
