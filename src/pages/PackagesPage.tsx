
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, MapPin, Calendar, Users, Clock, Plane, Car, Hotel } from "lucide-react";
import { format } from "date-fns";

interface Package {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  city: string;
  city_ar?: string;
  price: number;
  duration_days: number;
  start_date?: string;
  end_date?: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  thumbnail?: string;
}

const PackagesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(t("packages.noPackages", "No packages found"));
          toast({
            title: t("common.error", "Error"),
            description: t("packages.noPackagesMessage", "Could not load packages."),
            variant: "destructive",
          });
        } else {
          setPackages(data || []);
          setFilteredPackages(data || []);
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

    fetchPackages();
  }, [t, toast]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPackages(packages);
    } else {
      const filtered = packages.filter(pkg => {
        const name = language === 'ar' && pkg.name_ar ? pkg.name_ar : pkg.name;
        const city = language === 'ar' && pkg.city_ar ? pkg.city_ar : pkg.city;
        const description = language === 'ar' && pkg.description_ar ? pkg.description_ar : pkg.description;
        
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (description && description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredPackages(filtered);
    }
  }, [searchTerm, packages, language]);

  const getDisplayName = (name: string, name_ar?: string) => {
    return language === 'ar' && name_ar ? name_ar : name;
  };

  const getDisplayDescription = (description?: string, description_ar?: string) => {
    return language === 'ar' && description_ar ? description_ar : description;
  };

  const getIncludedServices = (pkg: Package) => {
    const services = [];
    if (pkg.includes_hotel) services.push({ icon: Hotel, label: t("packages.hotel", "Hotel") });
    if (pkg.includes_flight) services.push({ icon: Plane, label: t("packages.flight", "Flight") });
    if (pkg.includes_transport) services.push({ icon: Car, label: t("packages.transport", "Transport") });
    return services;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t("packages.title", "Hajj & Umrah Packages")}</h1>
          <p className="text-muted-foreground text-lg">{t("packages.subtitle", "Discover our comprehensive packages for your spiritual journey")}</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("packages.searchPlaceholder", "Search packages...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-8 w-24" />
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
        ) : filteredPackages.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">{t("packages.noPackages", "No packages found")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("packages.noPackagesMessage", "Try adjusting your search criteria")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={pkg.thumbnail || "/placeholder.svg"}
                        alt={getDisplayName(pkg.name, pkg.name_ar)}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 right-2" variant="secondary">
                        {pkg.duration_days} {t("common.days", "days")}
                      </Badge>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {getDisplayName(pkg.name, pkg.name_ar)}
                      </h3>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{getDisplayName(pkg.city, pkg.city_ar)}</span>
                      </div>
                      
                      {getDisplayDescription(pkg.description, pkg.description_ar) && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {getDisplayDescription(pkg.description, pkg.description_ar)}
                        </p>
                      )}
                      
                      {/* Included Services */}
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">{t("packages.includes", "Includes")}:</p>
                        <div className="flex flex-wrap gap-2">
                          {getIncludedServices(pkg).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <service.icon className="w-3 h-3 mr-1" />
                              {service.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Dates */}
                      {pkg.start_date && pkg.end_date && (
                        <div className="flex items-center text-xs text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {format(new Date(pkg.start_date), 'MMM dd')} - {format(new Date(pkg.end_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold">${pkg.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">
                            {t("price.perPerson", "per person")}
                          </span>
                        </div>
                        <Button>
                          {t("packages.bookNow", "Book Package")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PackagesPage;
