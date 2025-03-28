
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import { Plus, Hotel, Package, Calendar, Edit, Trash, Star, MapPin, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const mockHotels = [
  {
    id: "hotel-1",
    name: "Grand Makkah Hotel",
    city: "Makkah",
    address: "King Abdul Aziz Road",
    description: "Luxury hotel with a view of Haram",
    rating: 4.7,
    price_per_night: 250,
    distance_to_haram: "500m",
    amenities: ["Free WiFi", "Breakfast", "Parking", "Prayer Room"],
    thumbnail: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?auto=format&fit=crop&w=800&q=80",
    is_internal: true
  },
  {
    id: "hotel-2",
    name: "Al Madinah Plaza",
    city: "Madinah",
    address: "Quba Road",
    description: "Comfortable accommodations near Masjid Nabawi",
    rating: 4.5,
    price_per_night: 180,
    distance_to_haram: "700m",
    amenities: ["Free WiFi", "Breakfast", "Shuttle", "Prayer Room"],
    thumbnail: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    is_internal: true
  },
  {
    id: "hotel-3",
    name: "Jabal Omar Residence",
    city: "Makkah",
    address: "Ibrahim Al Khalil St",
    description: "Modern apartments with kitchenettes",
    rating: 4.2,
    price_per_night: 220,
    distance_to_haram: "850m",
    amenities: ["Free WiFi", "Kitchen", "Laundry", "Prayer Room"],
    thumbnail: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    is_internal: true
  }
];

const mockPackages = [
  {
    id: "package-1",
    name: "Premium Umrah Package",
    description: "10-day all-inclusive Umrah experience with 5-star accommodations",
    price: 1500,
    duration_days: 10,
    start_date: "2023-12-15",
    end_date: "2023-12-25",
    thumbnail: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Makkah",
    is_internal: true
  },
  {
    id: "package-2",
    name: "Standard Umrah Package",
    description: "7-day Umrah package with 4-star accommodations",
    price: 950,
    duration_days: 7,
    start_date: "2023-11-10",
    end_date: "2023-11-17",
    thumbnail: "https://images.unsplash.com/photo-1611605645802-c21be743c321?auto=format&fit=crop&w=800&q=80",
    includes_hotel: true,
    includes_flight: false,
    includes_transport: true,
    city: "Makkah",
    is_internal: true
  }
];

const ProviderListingsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  
  const [hotels, setHotels] = useState(mockHotels);
  const [packages, setPackages] = useState(mockPackages);
  
  const [isHotelDialogOpen, setIsHotelDialogOpen] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'hotel' | 'package'} | null>(null);
  
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

  const handleCreateHotel = () => {
    const hotelId = `hotel-${Date.now()}`;
    const hotel = {
      id: hotelId,
      ...newHotel,
      is_internal: true
    };
    
    setHotels([...hotels, hotel]);
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
    
    toast({
      title: "Hotel Created",
      description: `${hotel.name} has been successfully created.`,
      variant: "default"
    });
  };
  
  const handleCreatePackage = () => {
    const packageId = `package-${Date.now()}`;
    const packageItem = {
      id: packageId,
      ...newPackage,
      is_internal: true
    };
    
    setPackages([...packages, packageItem]);
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
    
    toast({
      title: "Package Created",
      description: `${packageItem.name} has been successfully created.`,
      variant: "default"
    });
  };
  
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'hotel') {
      setHotels(hotels.filter(h => h.id !== itemToDelete.id));
    } else {
      setPackages(packages.filter(p => p.id !== itemToDelete.id));
    }
    
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
    
    toast({
      title: "Item Deleted",
      description: `The ${itemToDelete.type} has been successfully deleted.`,
      variant: "default"
    });
  };
  
  const handleDeleteItem = (id: string, type: 'hotel' | 'package') => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };
  
  const handleViewDetails = (id: string, type: 'hotel' | 'package') => {
    console.log(`View details for ${type} with ID: ${id}`);
  };
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Listings</h1>
          <p className="text-muted-foreground">
            Create and manage your hotels and packages
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setIsHotelDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hotel
          </Button>
          <Button variant="outline" onClick={() => setIsPackageDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Package
          </Button>
        </div>
      </div>
      
      {/* Hotels Section */}
      <div>
        <div className="flex items-center mb-4">
          <Hotel className="mr-2 h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Hotels</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {hotels.map(hotel => (
            <div key={hotel.id} className="relative group">
              <HotelCard 
                hotel={hotel} 
                buttonText="View Details"
                onButtonClick={() => handleViewDetails(hotel.id, 'hotel')}
              />
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="icon"
                  className="w-8 h-8"
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
      </div>
      
      {/* Packages Section */}
      <div>
        <div className="flex items-center mb-4">
          <Package className="mr-2 h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Packages</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map(pkg => (
            <div key={pkg.id} className="relative group">
              <PackageCard 
                package={pkg} 
                buttonText="View Details"
                onButtonClick={() => handleViewDetails(pkg.id, 'package')}
              />
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="icon"
                  className="w-8 h-8"
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
      </div>
      
      {/* Add Hotel Dialog */}
      <Dialog open={isHotelDialogOpen} onOpenChange={setIsHotelDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Hotel</DialogTitle>
            <DialogDescription>
              Create a new hotel listing for your guests
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="hotelName" className="text-sm font-medium">Hotel Name</label>
              <Input 
                id="hotelName" 
                value={newHotel.name}
                onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                placeholder="Grand Makkah Hotel"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelCity" className="text-sm font-medium">City</label>
              <Select 
                value={newHotel.city}
                onValueChange={(value) => setNewHotel({...newHotel, city: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Makkah">Makkah</SelectItem>
                  <SelectItem value="Madinah">Madinah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelAddress" className="text-sm font-medium">Address</label>
              <Input 
                id="hotelAddress" 
                value={newHotel.address}
                onChange={(e) => setNewHotel({...newHotel, address: e.target.value})}
                placeholder="King Abdul Aziz Road"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelDescription" className="text-sm font-medium">Description</label>
              <Textarea 
                id="hotelDescription" 
                value={newHotel.description}
                onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                placeholder="Provide a detailed description of the hotel"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="hotelPrice" className="text-sm font-medium">Price per Night ($)</label>
                <Input 
                  id="hotelPrice" 
                  type="number"
                  value={newHotel.price_per_night || ''}
                  onChange={(e) => setNewHotel({...newHotel, price_per_night: parseFloat(e.target.value) || 0})}
                  placeholder="200"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="hotelDistance" className="text-sm font-medium">Distance to Haram</label>
                <Input 
                  id="hotelDistance" 
                  value={newHotel.distance_to_haram}
                  onChange={(e) => setNewHotel({...newHotel, distance_to_haram: e.target.value})}
                  placeholder="500m"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hotelThumbnail" className="text-sm font-medium">Image URL</label>
              <Input 
                id="hotelThumbnail" 
                value={newHotel.thumbnail}
                onChange={(e) => setNewHotel({...newHotel, thumbnail: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHotelDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateHotel}>Create Hotel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Package Dialog */}
      <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Package</DialogTitle>
            <DialogDescription>
              Create a new package offering for your guests
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="packageName" className="text-sm font-medium">Package Name</label>
              <Input 
                id="packageName" 
                value={newPackage.name}
                onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                placeholder="Premium Umrah Package"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="packageDescription" className="text-sm font-medium">Description</label>
              <Textarea 
                id="packageDescription" 
                value={newPackage.description}
                onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                placeholder="Provide a detailed description of the package"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="packagePrice" className="text-sm font-medium">Price ($)</label>
                <Input 
                  id="packagePrice" 
                  type="number"
                  value={newPackage.price || ''}
                  onChange={(e) => setNewPackage({...newPackage, price: parseFloat(e.target.value) || 0})}
                  placeholder="1500"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="packageDuration" className="text-sm font-medium">Duration (days)</label>
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
                <label htmlFor="packageStartDate" className="text-sm font-medium">Start Date</label>
                <Input 
                  id="packageStartDate" 
                  type="date"
                  value={newPackage.start_date}
                  onChange={(e) => setNewPackage({...newPackage, start_date: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="packageEndDate" className="text-sm font-medium">End Date</label>
                <Input 
                  id="packageEndDate" 
                  type="date"
                  value={newPackage.end_date}
                  onChange={(e) => setNewPackage({...newPackage, end_date: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="packageCity" className="text-sm font-medium">City</label>
              <Select 
                value={newPackage.city}
                onValueChange={(value) => setNewPackage({...newPackage, city: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Makkah">Makkah</SelectItem>
                  <SelectItem value="Madinah">Madinah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="packageThumbnail" className="text-sm font-medium">Image URL</label>
              <Input 
                id="packageThumbnail" 
                value={newPackage.thumbnail}
                onChange={(e) => setNewPackage({...newPackage, thumbnail: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Inclusions</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includesHotel"
                    checked={newPackage.includes_hotel}
                    onChange={(e) => setNewPackage({...newPackage, includes_hotel: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="includesHotel" className="text-sm">Hotel</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includesFlight"
                    checked={newPackage.includes_flight}
                    onChange={(e) => setNewPackage({...newPackage, includes_flight: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="includesFlight" className="text-sm">Flight</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="includesTransport"
                    checked={newPackage.includes_transport}
                    onChange={(e) => setNewPackage({...newPackage, includes_transport: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="includesTransport" className="text-sm">Transport</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPackageDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreatePackage}>Create Package</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProviderListingsPage;
