
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProviderListings, Hotel, Package } from "@/hooks/useProviderListings";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Hotel as HotelIcon, Package as PackageIcon, Plus, Pencil, Trash2, Star, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";

const ListingsPage: React.FC = () => {
  const { t, locale, isRTL } = useLanguage();
  const { toast } = useToast();
  
  const {
    hotels,
    packages,
    isLoading,
    fetchListings,
    createHotel,
    updateHotel,
    deleteHotel,
    createPackage,
    updatePackage,
    deletePackage,
  } = useProviderListings();
  
  const [activeTab, setActiveTab] = useState("hotels");
  const [showAddHotelDialog, setShowAddHotelDialog] = useState(false);
  const [showAddPackageDialog, setShowAddPackageDialog] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'hotel' | 'package' | null>(null);
  
  // Hotel form state
  const [hotelForm, setHotelForm] = useState({
    name: "",
    city: "Makkah",
    address: "",
    description: "",
    price_per_night: 0,
    distance_to_haram: "",
    amenities: "",
    thumbnail: "",
  });
  
  // Package form state
  const [packageForm, setPackageForm] = useState({
    name: "",
    description: "",
    price: 0,
    duration_days: 1,
    start_date: "",
    end_date: "",
    city: "Makkah",
    thumbnail: "",
    includes_hotel: true,
    includes_flight: false,
    includes_transport: false,
  });
  
  // Format date based on language
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return format(date, "PPP", { locale: locale === 'ar' ? ar : enUS });
    } catch (error) {
      return dateStr;
    }
  };
  
  // Reset hotel form
  const resetHotelForm = () => {
    setHotelForm({
      name: "",
      city: "Makkah",
      address: "",
      description: "",
      price_per_night: 0,
      distance_to_haram: "",
      amenities: "",
      thumbnail: "",
    });
    setEditingHotel(null);
  };
  
  // Reset package form
  const resetPackageForm = () => {
    setPackageForm({
      name: "",
      description: "",
      price: 0,
      duration_days: 1,
      start_date: "",
      end_date: "",
      city: "Makkah",
      thumbnail: "",
      includes_hotel: true,
      includes_flight: false,
      includes_transport: false,
    });
    setEditingPackage(null);
  };
  
  // Handle edit hotel
  const handleEditHotel = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setHotelForm({
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      description: hotel.description,
      price_per_night: hotel.price_per_night,
      distance_to_haram: hotel.distance_to_haram,
      // Amenities should be fetched from hotel_amenities table in a real implementation
      amenities: "",
      thumbnail: hotel.thumbnail,
    });
    setShowAddHotelDialog(true);
  };
  
  // Handle edit package
  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration_days: pkg.duration_days,
      start_date: pkg.start_date,
      end_date: pkg.end_date,
      city: pkg.city,
      thumbnail: pkg.thumbnail,
      includes_hotel: pkg.includes_hotel,
      includes_flight: pkg.includes_flight,
      includes_transport: pkg.includes_transport,
    });
    setShowAddPackageDialog(true);
  };
  
  // Handle add/edit hotel submit
  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amenitiesArray = hotelForm.amenities
      .split(',')
      .map(item => item.trim())
      .filter(item => item);
    
    if (editingHotel) {
      // Update existing hotel
      const success = await updateHotel(editingHotel.id, {
        name: hotelForm.name,
        city: hotelForm.city,
        address: hotelForm.address,
        description: hotelForm.description,
        price_per_night: hotelForm.price_per_night,
        distance_to_haram: hotelForm.distance_to_haram,
        thumbnail: hotelForm.thumbnail,
      }, amenitiesArray);
      
      if (success) {
        setShowAddHotelDialog(false);
        resetHotelForm();
      }
    } else {
      // Create new hotel
      const newHotel = await createHotel({
        name: hotelForm.name,
        city: hotelForm.city,
        address: hotelForm.address,
        description: hotelForm.description,
        price_per_night: hotelForm.price_per_night,
        distance_to_haram: hotelForm.distance_to_haram,
        rating: 0,
        thumbnail: hotelForm.thumbnail,
        amenities: [],
      }, amenitiesArray);
      
      if (newHotel) {
        setShowAddHotelDialog(false);
        resetHotelForm();
      }
    }
  };
  
  // Handle add/edit package submit
  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPackage) {
      // Update existing package
      const success = await updatePackage(editingPackage.id, {
        name: packageForm.name,
        description: packageForm.description,
        price: packageForm.price,
        duration_days: packageForm.duration_days,
        start_date: packageForm.start_date,
        end_date: packageForm.end_date,
        city: packageForm.city,
        thumbnail: packageForm.thumbnail,
        includes_hotel: packageForm.includes_hotel,
        includes_flight: packageForm.includes_flight,
        includes_transport: packageForm.includes_transport,
      });
      
      if (success) {
        setShowAddPackageDialog(false);
        resetPackageForm();
      }
    } else {
      // Create new package
      const newPackage = await createPackage({
        name: packageForm.name,
        description: packageForm.description,
        price: packageForm.price,
        duration_days: packageForm.duration_days,
        start_date: packageForm.start_date,
        end_date: packageForm.end_date,
        city: packageForm.city as "Makkah" | "Madinah" | "Both",
        thumbnail: packageForm.thumbnail,
        includes_hotel: packageForm.includes_hotel,
        includes_flight: packageForm.includes_flight,
        includes_transport: packageForm.includes_transport,
      });
      
      if (newPackage) {
        setShowAddPackageDialog(false);
        resetPackageForm();
      }
    }
  };
  
  // Handle delete hotel/package
  const handleDelete = async () => {
    if (!deleteConfirmId || !deleteType) return;
    
    let success = false;
    
    if (deleteType === 'hotel') {
      success = await deleteHotel(deleteConfirmId);
    } else {
      success = await deletePackage(deleteConfirmId);
    }
    
    if (success) {
      setDeleteConfirmId(null);
      setDeleteType(null);
    }
  };
  
  // Refresh listings when tab changes
  useEffect(() => {
    fetchListings();
  }, [activeTab]);

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t("provider.listings.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("provider.listings.subtitle")}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button onClick={() => {
              resetHotelForm();
              setShowAddHotelDialog(true);
            }} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t("provider.listings.addHotel")}
            </Button>
            
            <Button onClick={() => {
              resetPackageForm();
              setShowAddPackageDialog(true);
            }} className="flex items-center gap-2" variant="outline">
              <Plus className="h-4 w-4" />
              {t("provider.listings.addPackage")}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="hotels" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <HotelIcon className="h-4 w-4" />
              {t("provider.listings.hotels")}
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <PackageIcon className="h-4 w-4" />
              {t("provider.listings.packages")}
            </TabsTrigger>
          </TabsList>
          
          {/* Hotels Tab */}
          <TabsContent value="hotels" className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i}>
                    <div className="aspect-video w-full">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : hotels.length === 0 ? (
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center h-64">
                  <HotelIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t("provider.listings.noHotels")}</h3>
                  <p className="text-muted-foreground text-center mb-4">{t("provider.listings.noHotelsDesc")}</p>
                  <Button onClick={() => {
                    resetHotelForm();
                    setShowAddHotelDialog(true);
                  }}>
                    {t("provider.listings.addFirstHotel")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map(hotel => (
                  <Card key={hotel.id} className="overflow-hidden">
                    <div className="aspect-video w-full relative overflow-hidden bg-muted">
                      {hotel.thumbnail ? (
                        <img 
                          src={hotel.thumbnail} 
                          alt={hotel.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <HotelIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-white/80 text-black text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {hotel.city}
                        </Badge>
                      </div>
                      
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary/80">
                          <Star className="h-3 w-3 mr-1" />
                          {hotel.rating || 'New'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{hotel.name}</h3>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {hotel.address}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {hotel.description}
                      </p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-lg font-bold">
                            {hotel.price_per_night} {t("currency.sar")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t("listing.perNight")}
                          </div>
                        </div>
                        
                        <Badge variant="outline">
                          {hotel.distance_to_haram} {t("distance.from")} {t("distance.haram")}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex-1 flex items-center justify-center gap-1"
                          onClick={() => handleEditHotel(hotel)}
                        >
                          <Pencil className="h-3 w-3" />
                          {t("provider.listings.edit")}
                        </Button>
                        
                        <Button 
                          variant="destructive"
                          size="sm"
                          className="flex-1 flex items-center justify-center gap-1"
                          onClick={() => {
                            setDeleteConfirmId(hotel.id);
                            setDeleteType('hotel');
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                          {t("provider.listings.delete")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Packages Tab */}
          <TabsContent value="packages" className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i}>
                    <div className="aspect-video w-full">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : packages.length === 0 ? (
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center h-64">
                  <PackageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t("provider.listings.noPackages")}</h3>
                  <p className="text-muted-foreground text-center mb-4">{t("provider.listings.noPackagesDesc")}</p>
                  <Button onClick={() => {
                    resetPackageForm();
                    setShowAddPackageDialog(true);
                  }}>
                    {t("provider.listings.addFirstPackage")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map(pkg => (
                  <Card key={pkg.id} className="overflow-hidden">
                    <div className="aspect-video w-full relative overflow-hidden bg-muted">
                      {pkg.thumbnail ? (
                        <img 
                          src={pkg.thumbnail} 
                          alt={pkg.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <PackageIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-white/80 text-black text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {pkg.city}
                        </Badge>
                      </div>
                      
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary/80 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {pkg.duration_days} {t("date.days")}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{pkg.name}</h3>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Badge variant="outline" className="text-xs">
                          {formatDate(pkg.start_date)}
                        </Badge>
                        <span>→</span>
                        <Badge variant="outline" className="text-xs">
                          {formatDate(pkg.end_date)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {pkg.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {pkg.includes_hotel && (
                          <Badge variant="secondary" className="text-xs">
                            <HotelIcon className="h-3 w-3 mr-1" />
                            {t("package.includes.hotel")}
                          </Badge>
                        )}
                        
                        {pkg.includes_flight && (
                          <Badge variant="secondary" className="text-xs">
                            {t("package.includes.flight")}
                          </Badge>
                        )}
                        
                        {pkg.includes_transport && (
                          <Badge variant="secondary" className="text-xs">
                            {t("package.includes.transport")}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-lg font-bold">
                            {pkg.price} {t("currency.sar")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t("listing.perPerson")}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="flex-1 flex items-center justify-center gap-1"
                          onClick={() => handleEditPackage(pkg)}
                        >
                          <Pencil className="h-3 w-3" />
                          {t("provider.listings.edit")}
                        </Button>
                        
                        <Button 
                          variant="destructive"
                          size="sm"
                          className="flex-1 flex items-center justify-center gap-1"
                          onClick={() => {
                            setDeleteConfirmId(pkg.id);
                            setDeleteType('package');
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                          {t("provider.listings.delete")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Add/Edit Hotel Dialog */}
        <Dialog open={showAddHotelDialog} onOpenChange={setShowAddHotelDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingHotel 
                  ? t("provider.listings.editHotel") 
                  : t("provider.listings.addHotel")
                }
              </DialogTitle>
              <DialogDescription>
                {t("provider.listings.hotelFormDesc")}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleHotelSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hotel-name">{t("provider.listings.hotelName")}</Label>
                    <Input
                      id="hotel-name"
                      value={hotelForm.name}
                      onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hotel-city">{t("provider.listings.city")}</Label>
                    <Select
                      value={hotelForm.city}
                      onValueChange={(value) => setHotelForm({...hotelForm, city: value})}
                    >
                      <SelectTrigger id="hotel-city">
                        <SelectValue placeholder={t("provider.listings.selectCity")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Makkah">{t("location.makkah")}</SelectItem>
                        <SelectItem value="Madinah">{t("location.madinah")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hotel-address">{t("provider.listings.address")}</Label>
                  <Input
                    id="hotel-address"
                    value={hotelForm.address}
                    onChange={(e) => setHotelForm({...hotelForm, address: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hotel-description">{t("provider.listings.description")}</Label>
                  <Textarea
                    id="hotel-description"
                    value={hotelForm.description}
                    onChange={(e) => setHotelForm({...hotelForm, description: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hotel-price">{t("provider.listings.pricePerNight")}</Label>
                    <Input
                      id="hotel-price"
                      type="number"
                      min="0"
                      value={hotelForm.price_per_night}
                      onChange={(e) => setHotelForm({...hotelForm, price_per_night: parseFloat(e.target.value)})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hotel-distance">{t("provider.listings.distanceToHaram")}</Label>
                    <Input
                      id="hotel-distance"
                      value={hotelForm.distance_to_haram}
                      onChange={(e) => setHotelForm({...hotelForm, distance_to_haram: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hotel-amenities">{t("provider.listings.amenities")}</Label>
                  <Input
                    id="hotel-amenities"
                    value={hotelForm.amenities}
                    onChange={(e) => setHotelForm({...hotelForm, amenities: e.target.value})}
                    placeholder={t("provider.listings.amenitiesPlaceholder")}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("provider.listings.amenitiesHelp")}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hotel-thumbnail">{t("provider.listings.thumbnailUrl")}</Label>
                  <Input
                    id="hotel-thumbnail"
                    value={hotelForm.thumbnail}
                    onChange={(e) => setHotelForm({...hotelForm, thumbnail: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t("action.cancel")}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {editingHotel ? t("action.update") : t("action.create")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Add/Edit Package Dialog */}
        <Dialog open={showAddPackageDialog} onOpenChange={setShowAddPackageDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingPackage 
                  ? t("provider.listings.editPackage") 
                  : t("provider.listings.addPackage")
                }
              </DialogTitle>
              <DialogDescription>
                {t("provider.listings.packageFormDesc")}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handlePackageSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="package-name">{t("provider.listings.packageName")}</Label>
                    <Input
                      id="package-name"
                      value={packageForm.name}
                      onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="package-city">{t("provider.listings.city")}</Label>
                    <Select
                      value={packageForm.city}
                      onValueChange={(value) => setPackageForm({...packageForm, city: value})}
                    >
                      <SelectTrigger id="package-city">
                        <SelectValue placeholder={t("provider.listings.selectCity")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Makkah">{t("location.makkah")}</SelectItem>
                        <SelectItem value="Madinah">{t("location.madinah")}</SelectItem>
                        <SelectItem value="Both">{t("location.both")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package-description">{t("provider.listings.description")}</Label>
                  <Textarea
                    id="package-description"
                    value={packageForm.description}
                    onChange={(e) => setPackageForm({...packageForm, description: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="package-price">{t("provider.listings.price")}</Label>
                    <Input
                      id="package-price"
                      type="number"
                      min="0"
                      value={packageForm.price}
                      onChange={(e) => setPackageForm({...packageForm, price: parseFloat(e.target.value)})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="package-duration">{t("provider.listings.durationDays")}</Label>
                    <Input
                      id="package-duration"
                      type="number"
                      min="1"
                      value={packageForm.duration_days}
                      onChange={(e) => setPackageForm({...packageForm, duration_days: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="package-start-date">{t("provider.listings.startDate")}</Label>
                    <Input
                      id="package-start-date"
                      type="date"
                      value={packageForm.start_date}
                      onChange={(e) => setPackageForm({...packageForm, start_date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="package-end-date">{t("provider.listings.endDate")}</Label>
                    <Input
                      id="package-end-date"
                      type="date"
                      value={packageForm.end_date}
                      onChange={(e) => setPackageForm({...packageForm, end_date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>{t("provider.listings.includes")}</Label>
                  
                  <div className="space-y-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="includes-hotel"
                        checked={packageForm.includes_hotel}
                        onCheckedChange={(checked) => setPackageForm({...packageForm, includes_hotel: checked})}
                      />
                      <Label htmlFor="includes-hotel" className="cursor-pointer">
                        {t("package.includes.hotel")}
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="includes-flight"
                        checked={packageForm.includes_flight}
                        onCheckedChange={(checked) => setPackageForm({...packageForm, includes_flight: checked})}
                      />
                      <Label htmlFor="includes-flight" className="cursor-pointer">
                        {t("package.includes.flight")}
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="includes-transport"
                        checked={packageForm.includes_transport}
                        onCheckedChange={(checked) => setPackageForm({...packageForm, includes_transport: checked})}
                      />
                      <Label htmlFor="includes-transport" className="cursor-pointer">
                        {t("package.includes.transport")}
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="package-thumbnail">{t("provider.listings.thumbnailUrl")}</Label>
                  <Input
                    id="package-thumbnail"
                    value={packageForm.thumbnail}
                    onChange={(e) => setPackageForm({...packageForm, thumbnail: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t("action.cancel")}
                  </Button>
                </DialogClose>
                <Button type="submit">
                  {editingPackage ? t("action.update") : t("action.create")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("provider.listings.confirmDelete")}</DialogTitle>
              <DialogDescription>
                {deleteType === 'hotel' 
                  ? t("provider.listings.confirmDeleteHotelDesc")
                  : t("provider.listings.confirmDeletePackageDesc")
                }
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
              >
                {t("action.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                {t("action.delete")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default ListingsPage;
