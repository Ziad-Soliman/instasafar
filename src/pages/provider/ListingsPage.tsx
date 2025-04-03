
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import { Plus, Hotel, Package, Calendar, Edit, Trash, Star, MapPin, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useProviderListings } from "@/hooks/useProviderListings";

const ProviderListingsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { 
    loading: apiLoading, 
    fetchHotels, 
    createHotel, 
    updateHotel, 
    deleteHotel,
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage
  } = useProviderListings();
  
  const [hotels, setHotels] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isHotelDialogOpen, setIsHotelDialogOpen] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'hotel' | 'package'} | null>(null);
  const [editingItem, setEditingItem] = useState<{id: string, type: 'hotel' | 'package'} | null>(null);
  
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "Makkah",
    address: "",
    description: "",
    rating: 4.0,
    price_per_night: 0,
    distance_to_haram: "",
    amenities: ["Free WiFi", "Breakfast"],
    thumbnail: ""
  });
  
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    price: 0,
    duration_days: 7,
    start_date: "",
    end_date: "",
    thumbnail: "",
    city: "Makkah",
    includes_hotel: true,
    includes_flight: false,
    includes_transport: false
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      const hotelsData = await fetchHotels();
      const packagesData = await fetchPackages();
      
      setHotels(hotelsData);
      setPackages(packagesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Failed to load data",
        description: "There was an error loading your listings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateHotel = async () => {
    try {
      const result = await createHotel(newHotel, newHotel.amenities);
      
      if (result) {
        // Refresh the hotels list
        const updatedHotels = await fetchHotels();
        setHotels(updatedHotels);
        setIsHotelDialogOpen(false);
        
        // Reset form
        setNewHotel({
          name: "",
          city: "Makkah",
          address: "",
          description: "",
          rating: 4.0,
          price_per_night: 0,
          distance_to_haram: "",
          amenities: ["Free WiFi", "Breakfast"],
          thumbnail: ""
        });
      }
    } catch (error) {
      console.error('Error creating hotel:', error);
    }
  };
  
  const handleUpdateHotel = async () => {
    if (!editingItem || editingItem.type !== 'hotel') return;
    
    try {
      const result = await updateHotel(
        editingItem.id,
        newHotel,
        newHotel.amenities
      );
      
      if (result) {
        // Refresh the hotels list
        const updatedHotels = await fetchHotels();
        setHotels(updatedHotels);
        setIsHotelDialogOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };
  
  const handleCreatePackage = async () => {
    try {
      const result = await createPackage(newPackage);
      
      if (result) {
        // Refresh the packages list
        const updatedPackages = await fetchPackages();
        setPackages(updatedPackages);
        setIsPackageDialogOpen(false);
        
        // Reset form
        setNewPackage({
          name: "",
          description: "",
          price: 0,
          duration_days: 7,
          start_date: "",
          end_date: "",
          thumbnail: "",
          city: "Makkah",
          includes_hotel: true,
          includes_flight: false,
          includes_transport: false
        });
      }
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };
  
  const handleUpdatePackage = async () => {
    if (!editingItem || editingItem.type !== 'package') return;
    
    try {
      const result = await updatePackage(editingItem.id, newPackage);
      
      if (result) {
        // Refresh the packages list
        const updatedPackages = await fetchPackages();
        setPackages(updatedPackages);
        setIsPackageDialogOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    
    try {
      let result;
      
      if (itemToDelete.type === 'hotel') {
        result = await deleteHotel(itemToDelete.id);
        if (result) {
          const updatedHotels = await fetchHotels();
          setHotels(updatedHotels);
        }
      } else {
        result = await deletePackage(itemToDelete.id);
        if (result) {
          const updatedPackages = await fetchPackages();
          setPackages(updatedPackages);
        }
      }
      
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  const handleEditHotel = (hotel: any) => {
    setEditingItem({ id: hotel.id, type: 'hotel' });
    setNewHotel({
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      description: hotel.description,
      rating: hotel.rating,
      price_per_night: hotel.price_per_night,
      distance_to_haram: hotel.distance_to_haram,
      amenities: hotel.amenities || [],
      thumbnail: hotel.thumbnail
    });
    setIsHotelDialogOpen(true);
  };
  
  const handleEditPackage = (pkg: any) => {
    setEditingItem({ id: pkg.id, type: 'package' });
    setNewPackage({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration_days: pkg.duration_days,
      start_date: pkg.start_date || '',
      end_date: pkg.end_date || '',
      thumbnail: pkg.thumbnail || '',
      city: pkg.city || 'Makkah',
      includes_hotel: pkg.includes_hotel || false,
      includes_flight: pkg.includes_flight || false,
      includes_transport: pkg.includes_transport || false
    });
    setIsPackageDialogOpen(true);
  };
  
  const handleDeleteItem = (id: string, type: 'hotel' | 'package') => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };
  
  const handleHotelDialogClose = () => {
    setIsHotelDialogOpen(false);
    setEditingItem(null);
    // Reset form
    setNewHotel({
      name: "",
      city: "Makkah",
      address: "",
      description: "",
      rating: 4.0,
      price_per_night: 0,
      distance_to_haram: "",
      amenities: ["Free WiFi", "Breakfast"],
      thumbnail: ""
    });
  };
  
  const handlePackageDialogClose = () => {
    setIsPackageDialogOpen(false);
    setEditingItem(null);
    // Reset form
    setNewPackage({
      name: "",
      description: "",
      price: 0,
      duration_days: 7,
      start_date: "",
      end_date: "",
      thumbnail: "",
      city: "Makkah",
      includes_hotel: true,
      includes_flight: false,
      includes_transport: false
    });
  };
  
  const handleViewDetails = (id: string, type: 'hotel' | 'package') => {
    console.log(`View details for ${type} with ID: ${id}`);
  };
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("provider.listings.title")}</h1>
          <p className="text-muted-foreground">
            {t("provider.listings.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setIsHotelDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("provider.listings.addHotel")}
          </Button>
          <Button variant="outline" onClick={() => setIsPackageDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("provider.listings.addPackage")}
          </Button>
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">{t("loading")}</span>
        </div>
      )}
      
      {/* Hotels Section */}
      {!isLoading && (
        <div>
          <div className="flex items-center mb-4">
            <Hotel className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{t("provider.listings.hotels")}</h2>
          </div>
          
          {hotels.length === 0 ? (
            <div className="bg-muted rounded-lg p-8 text-center">
              <Hotel className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">{t("provider.listings.noHotels")}</h3>
              <p className="text-muted-foreground mb-4">{t("provider.listings.noHotelsDesc")}</p>
              <Button onClick={() => setIsHotelDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {t("provider.listings.addHotel")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <div key={hotel.id} className="relative group">
                  <HotelCard 
                    hotel={hotel} 
                    buttonText={t("provider.listings.viewDetails")}
                    onButtonClick={() => handleViewDetails(hotel.id, 'hotel')}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => handleEditHotel(hotel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => handleDeleteItem(hotel.id, 'hotel')}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Packages Section */}
      {!isLoading && (
        <div>
          <div className="flex items-center mb-4">
            <Package className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">{t("provider.listings.packages")}</h2>
          </div>
          
          {packages.length === 0 ? (
            <div className="bg-muted rounded-lg p-8 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">{t("provider.listings.noPackages")}</h3>
              <p className="text-muted-foreground mb-4">{t("provider.listings.noPackagesDesc")}</p>
              <Button variant="outline" onClick={() => setIsPackageDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                {t("provider.listings.addPackage")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className="relative group">
                  <PackageCard 
                    package={pkg} 
                    buttonText={t("provider.listings.viewDetails")}
                    onButtonClick={() => handleViewDetails(pkg.id, 'package')}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => handleEditPackage(pkg)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => handleDeleteItem(pkg.id, 'package')}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Add Hotel Dialog */}
      <Dialog open={isHotelDialogOpen} onOpenChange={handleHotelDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? t("provider.listings.editHotel") : t("provider.listings.addHotel")}
            </DialogTitle>
            <DialogDescription>
              {editingItem 
                ? t("provider.listings.editHotelDesc") 
                : t("provider.listings.addHotelDesc")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="hotelName" className="text-sm font-medium">{t("provider.listings.hotelName")}</label>
              <Input 
                id="hotelName" 
                value={newHotel.name}
                onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                placeholder={t("provider.listings.hotelNamePlaceholder")}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelCity" className="text-sm font-medium">{t("provider.listings.city")}</label>
              <Select 
                value={newHotel.city}
                onValueChange={(value) => setNewHotel({...newHotel, city: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("provider.listings.selectCity")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Makkah">{t("location.makkah")}</SelectItem>
                  <SelectItem value="Madinah">{t("location.madinah")}</SelectItem>
                  <SelectItem value="Jeddah">{t("location.jeddah")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelAddress" className="text-sm font-medium">{t("provider.listings.address")}</label>
              <Input 
                id="hotelAddress" 
                value={newHotel.address}
                onChange={(e) => setNewHotel({...newHotel, address: e.target.value})}
                placeholder={t("provider.listings.addressPlaceholder")}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelDescription" className="text-sm font-medium">{t("provider.listings.description")}</label>
              <Textarea 
                id="hotelDescription" 
                value={newHotel.description}
                onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                placeholder={t("provider.listings.descriptionPlaceholder")}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="hotelPrice" className="text-sm font-medium">{t("provider.listings.pricePerNight")}</label>
                <Input 
                  id="hotelPrice" 
                  type="number"
                  value={newHotel.price_per_night || ''}
                  onChange={(e) => setNewHotel({...newHotel, price_per_night: parseFloat(e.target.value) || 0})}
                  placeholder="200"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="hotelDistance" className="text-sm font-medium">{t("provider.listings.distanceToHaram")}</label>
                <Input 
                  id="hotelDistance" 
                  value={newHotel.distance_to_haram}
                  onChange={(e) => setNewHotel({...newHotel, distance_to_haram: e.target.value})}
                  placeholder="500m"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelThumbnail" className="text-sm font-medium">{t("provider.listings.imageUrl")}</label>
              <Input 
                id="hotelThumbnail" 
                value={newHotel.thumbnail}
                onChange={(e) => setNewHotel({...newHotel, thumbnail: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelAmenities" className="text-sm font-medium">{t("provider.listings.amenities")}</label>
              <Input 
                id="hotelAmenities" 
                value={newHotel.amenities.join(', ')}
                onChange={(e) => setNewHotel({...newHotel, amenities: e.target.value.split(',').map(a => a.trim()).filter(a => a)})}
                placeholder={t("provider.listings.amenitiesPlaceholder")}
              />
              <div className="text-xs text-muted-foreground">
                {t("provider.listings.amenitiesHelp")}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleHotelDialogClose}>
              {t("cancel")}
            </Button>
            <Button 
              onClick={editingItem ? handleUpdateHotel : handleCreateHotel}
              disabled={apiLoading}
            >
              {apiLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingItem ? t("provider.listings.updateHotel") : t("provider.listings.createHotel")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Package Dialog */}
      <Dialog open={isPackageDialogOpen} onOpenChange={handlePackageDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? t("provider.listings.editPackage") : t("provider.listings.addPackage")}
            </DialogTitle>
            <DialogDescription>
              {editingItem 
                ? t("provider.listings.editPackageDesc") 
                : t("provider.listings.addPackageDesc")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="packageName" className="text-sm font-medium">{t("provider.listings.packageName")}</label>
              <Input 
                id="packageName" 
                value={newPackage.name}
                onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                placeholder={t("provider.listings.packageNamePlaceholder")}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="packageDescription" className="text-sm font-medium">{t("provider.listings.description")}</label>
              <Textarea 
                id="packageDescription" 
                value={newPackage.description}
                onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                placeholder={t("provider.listings.packageDescriptionPlaceholder")}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="packagePrice" className="text-sm font-medium">{t("provider.listings.price")}</label>
                <Input 
                  id="packagePrice" 
                  type="number"
                  value={newPackage.price || ''}
                  onChange={(e) => setNewPackage({...newPackage, price: parseFloat(e.target.value) || 0})}
                  placeholder="1500"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="packageDuration" className="text-sm font-medium">{t("provider.listings.duration")}</label>
                <Input 
                  id="packageDuration" 
                  type="number"
                  value={newPackage.duration_days || ''}
                  onChange={(e) => setNewPackage({...newPackage, duration_days: parseInt(e.target.value) || 0})}
                  placeholder="10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="packageStartDate" className="text-sm font-medium">{t("provider.listings.startDate")}</label>
                <Input 
                  id="packageStartDate" 
                  type="date"
                  value={newPackage.start_date}
                  onChange={(e) => setNewPackage({...newPackage, start_date: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="packageEndDate" className="text-sm font-medium">{t("provider.listings.endDate")}</label>
                <Input 
                  id="packageEndDate" 
                  type="date"
                  value={newPackage.end_date}
                  onChange={(e) => setNewPackage({...newPackage, end_date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="packageCity" className="text-sm font-medium">{t("provider.listings.city")}</label>
              <Select 
                value={newPackage.city}
                onValueChange={(value) => setNewPackage({...newPackage, city: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("provider.listings.selectCity")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Makkah">{t("location.makkah")}</SelectItem>
                  <SelectItem value="Madinah">{t("location.madinah")}</SelectItem>
                  <SelectItem value="Jeddah">{t("location.jeddah")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="packageThumbnail" className="text-sm font-medium">{t("provider.listings.imageUrl")}</label>
              <Input 
                id="packageThumbnail" 
                value={newPackage.thumbnail}
                onChange={(e) => setNewPackage({...newPackage, thumbnail: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">{t("provider.listings.inclusions")}</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includesHotel"
                    checked={newPackage.includes_hotel}
                    onChange={(e) => setNewPackage({...newPackage, includes_hotel: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="includesHotel" className="text-sm">{t("provider.listings.includesHotel")}</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includesFlight"
                    checked={newPackage.includes_flight}
                    onChange={(e) => setNewPackage({...newPackage, includes_flight: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="includesFlight" className="text-sm">{t("provider.listings.includesFlight")}</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includesTransport"
                    checked={newPackage.includes_transport}
                    onChange={(e) => setNewPackage({...newPackage, includes_transport: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="includesTransport" className="text-sm">{t("provider.listings.includesTransport")}</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handlePackageDialogClose}>
              {t("cancel")}
            </Button>
            <Button 
              onClick={editingItem ? handleUpdatePackage : handleCreatePackage}
              disabled={apiLoading}
            >
              {apiLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingItem ? t("provider.listings.updatePackage") : t("provider.listings.createPackage")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("provider.listings.deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("provider.listings.deleteConfirmDesc")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm} 
              className="bg-destructive text-destructive-foreground"
              disabled={apiLoading}
            >
              {apiLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProviderListingsPage;
