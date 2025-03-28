
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HotelCard } from "@/components/cards/HotelCard";
import { PackageCard } from "@/components/cards/PackageCard";
import { Plus, Hotel, Package, Calendar, Edit, Trash, Star, MapPin, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/toast";

// Mock data for provider listings
const mockHotels = [
  {
    id: "hotel-1",
    name: "Al Safwah Royale Orchid Hotel",
    city: "Makkah",
    address: "Ajyad Street, Near Haram",
    description: "Luxurious 5-star hotel with direct views of the Holy Masjid Al Haram, offering elegant rooms and suites with modern amenities and exceptional service.",
    rating: 4.7,
    price_per_night: 350,
    distance_to_haram: "250 meters",
    amenities: ["Free WiFi", "24/7 Room Service", "Prayer Room", "Restaurant", "Concierge"],
    thumbnail: "/placeholder.svg",
    is_internal: true
  },
  {
    id: "hotel-2",
    name: "Elaf Ajyad Hotel",
    city: "Makkah",
    address: "Ajyad Street, Al Haram",
    description: "Modern hotel conveniently located within walking distance to the Haram, featuring comfortable accommodations and essential amenities for pilgrims.",
    rating: 4.2,
    price_per_night: 220,
    distance_to_haram: "450 meters",
    amenities: ["Free WiFi", "Restaurant", "Laundry Service", "Airport Shuttle"],
    thumbnail: "/placeholder.svg",
    is_internal: true
  }
];

const mockPackages = [
  {
    id: "package-1",
    name: "Premium Umrah Package - 7 Days",
    description: "All-inclusive 7-day Umrah package with 5-star accommodations in Makkah and Madinah, private transportation, guided tours, and all necessary arrangements.",
    price: 1500,
    duration_days: 7,
    start_date: "2023-11-15",
    end_date: "2023-11-22",
    thumbnail: "/placeholder.svg",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Makkah & Madinah",
    is_internal: true
  },
  {
    id: "package-2",
    name: "Standard Umrah Package - 10 Days",
    description: "Comprehensive 10-day Umrah package with comfortable accommodations, shared transportation, guided ziyarat tours, and assistance with Umrah procedures.",
    price: 1200,
    duration_days: 10,
    start_date: "2023-12-10",
    end_date: "2023-12-20",
    thumbnail: "/placeholder.svg",
    includes_hotel: true,
    includes_flight: false,
    includes_transport: true,
    city: "Makkah & Madinah",
    is_internal: true
  }
];

const amenitiesList = [
  "Free WiFi", "24/7 Room Service", "Prayer Room", "Restaurant", "Spa", 
  "Fitness Center", "Concierge", "Airport Shuttle", "Laundry Service",
  "Business Center", "Meeting Rooms", "Wheelchair Accessible", "Family Rooms"
];

const ProviderListingsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  
  // State for listings
  const [hotels, setHotels] = useState(mockHotels);
  const [packages, setPackages] = useState(mockPackages);
  
  // State for dialogs
  const [isHotelDialogOpen, setIsHotelDialogOpen] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'hotel' | 'package'} | null>(null);
  
  // State for forms
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "Makkah",
    address: "",
    description: "",
    price_per_night: 0,
    distance_to_haram: "",
    amenities: [] as string[],
    rating: 0
  });
  
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    price: 0,
    duration_days: 0,
    start_date: "",
    end_date: "",
    city: "Makkah",
    includes_hotel: false,
    includes_flight: false,
    includes_transport: false
  });

  // Handle hotel creation
  const handleCreateHotel = () => {
    const hotelId = `hotel-${Date.now()}`;
    const hotel = {
      id: hotelId,
      ...newHotel,
      thumbnail: "/placeholder.svg",
      is_internal: true
    };
    
    setHotels([...hotels, hotel]);
    setIsHotelDialogOpen(false);
    setNewHotel({
      name: "",
      city: "Makkah",
      address: "",
      description: "",
      price_per_night: 0,
      distance_to_haram: "",
      amenities: [],
      rating: 0
    });
    
    toast({
      title: "Hotel Created",
      description: "Your hotel listing has been created successfully.",
      variant: "default",
    });
  };
  
  // Handle package creation
  const handleCreatePackage = () => {
    const packageId = `package-${Date.now()}`;
    const packageItem = {
      id: packageId,
      ...newPackage,
      thumbnail: "/placeholder.svg",
      is_internal: true
    };
    
    setPackages([...packages, packageItem]);
    setIsPackageDialogOpen(false);
    setNewPackage({
      name: "",
      description: "",
      price: 0,
      duration_days: 0,
      start_date: "",
      end_date: "",
      city: "Makkah",
      includes_hotel: false,
      includes_flight: false,
      includes_transport: false
    });
    
    toast({
      title: "Package Created",
      description: "Your package listing has been created successfully.",
      variant: "default",
    });
  };
  
  // Handle deletion confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'hotel') {
      setHotels(hotels.filter(hotel => hotel.id !== itemToDelete.id));
    } else {
      setPackages(packages.filter(pkg => pkg.id !== itemToDelete.id));
    }
    
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
    
    toast({
      title: "Item Deleted",
      description: `The ${itemToDelete.type} has been deleted successfully.`,
      variant: "default",
    });
  };
  
  // Handle deletion request
  const handleDeleteItem = (id: string, type: 'hotel' | 'package') => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };
  
  // Handle view details
  const handleViewDetails = (id: string, type: 'hotel' | 'package') => {
    // In a real app, this would navigate to a detail page
    console.log(`View details for ${type} with ID: ${id}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <div className="flex space-x-2">
          <Dialog open={isHotelDialogOpen} onOpenChange={setIsHotelDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Hotel className="mr-2 h-4 w-4" />
                Add Hotel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Hotel Listing</DialogTitle>
                <DialogDescription>
                  Add details about your hotel to create a new listing.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="hotel-name">Hotel Name</Label>
                  <Input 
                    id="hotel-name" 
                    placeholder="Enter hotel name"
                    value={newHotel.name}
                    onChange={(e) => setNewHotel({...newHotel, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hotel-city">City</Label>
                    <Select 
                      value={newHotel.city} 
                      onValueChange={(value) => setNewHotel({...newHotel, city: value})}
                    >
                      <SelectTrigger id="hotel-city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Makkah">Makkah</SelectItem>
                        <SelectItem value="Madinah">Madinah</SelectItem>
                        <SelectItem value="Jeddah">Jeddah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="hotel-distance">Distance to Haram</Label>
                    <Input 
                      id="hotel-distance" 
                      placeholder="e.g. 300 meters"
                      value={newHotel.distance_to_haram}
                      onChange={(e) => setNewHotel({...newHotel, distance_to_haram: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="hotel-address">Address</Label>
                  <Input 
                    id="hotel-address" 
                    placeholder="Full hotel address"
                    value={newHotel.address}
                    onChange={(e) => setNewHotel({...newHotel, address: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="hotel-description">Description</Label>
                  <Textarea 
                    id="hotel-description" 
                    placeholder="Describe your hotel"
                    rows={3}
                    value={newHotel.description}
                    onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hotel-price">Price per Night (USD)</Label>
                    <Input 
                      id="hotel-price" 
                      type="number"
                      placeholder="0"
                      value={newHotel.price_per_night || ""}
                      onChange={(e) => setNewHotel({...newHotel, price_per_night: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="hotel-rating">Rating (0-5)</Label>
                    <Input 
                      id="hotel-rating" 
                      type="number" 
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="0.0"
                      value={newHotel.rating || ""}
                      onChange={(e) => setNewHotel({...newHotel, rating: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenitiesList.map((amenity) => (
                      <div 
                        key={amenity} 
                        className={`flex items-center space-x-2 rounded-md border p-2 cursor-pointer ${
                          newHotel.amenities.includes(amenity) ? 'bg-primary/10 border-primary' : ''
                        }`}
                        onClick={() => {
                          if (newHotel.amenities.includes(amenity)) {
                            setNewHotel({
                              ...newHotel, 
                              amenities: newHotel.amenities.filter(a => a !== amenity)
                            });
                          } else {
                            setNewHotel({
                              ...newHotel,
                              amenities: [...newHotel.amenities, amenity]
                            });
                          }
                        }}
                      >
                        <div className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                          newHotel.amenities.includes(amenity) ? 'bg-primary border-primary' : 'border-gray-300'
                        }`}>
                          {newHotel.amenities.includes(amenity) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsHotelDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateHotel}>Create Hotel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Package className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Package</DialogTitle>
                <DialogDescription>
                  Add details about your package to create a new listing.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="package-name">Package Name</Label>
                  <Input 
                    id="package-name" 
                    placeholder="Enter package name"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="package-description">Description</Label>
                  <Textarea 
                    id="package-description" 
                    placeholder="Describe your package"
                    rows={3}
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="package-price">Price per Person (USD)</Label>
                    <Input 
                      id="package-price" 
                      type="number"
                      placeholder="0"
                      value={newPackage.price || ""}
                      onChange={(e) => setNewPackage({...newPackage, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="package-duration">Duration (Days)</Label>
                    <Input 
                      id="package-duration" 
                      type="number"
                      placeholder="0"
                      value={newPackage.duration_days || ""}
                      onChange={(e) => setNewPackage({...newPackage, duration_days: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="package-start-date">Start Date</Label>
                    <Input 
                      id="package-start-date" 
                      type="date"
                      value={newPackage.start_date}
                      onChange={(e) => setNewPackage({...newPackage, start_date: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="package-end-date">End Date</Label>
                    <Input 
                      id="package-end-date" 
                      type="date"
                      value={newPackage.end_date}
                      onChange={(e) => setNewPackage({...newPackage, end_date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="package-city">Primary Location</Label>
                  <Select 
                    value={newPackage.city} 
                    onValueChange={(value) => setNewPackage({...newPackage, city: value})}
                  >
                    <SelectTrigger id="package-city">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Makkah">Makkah</SelectItem>
                      <SelectItem value="Madinah">Madinah</SelectItem>
                      <SelectItem value="Makkah & Madinah">Makkah & Madinah</SelectItem>
                      <SelectItem value="Jeddah">Jeddah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Includes</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className={`flex items-center space-x-2 rounded-md border p-2 cursor-pointer ${
                        newPackage.includes_hotel ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onClick={() => setNewPackage({...newPackage, includes_hotel: !newPackage.includes_hotel})}
                    >
                      <div className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                        newPackage.includes_hotel ? 'bg-primary border-primary' : 'border-gray-300'
                      }`}>
                        {newPackage.includes_hotel && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm">Hotel</span>
                    </div>
                    
                    <div 
                      className={`flex items-center space-x-2 rounded-md border p-2 cursor-pointer ${
                        newPackage.includes_flight ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onClick={() => setNewPackage({...newPackage, includes_flight: !newPackage.includes_flight})}
                    >
                      <div className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                        newPackage.includes_flight ? 'bg-primary border-primary' : 'border-gray-300'
                      }`}>
                        {newPackage.includes_flight && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm">Flight</span>
                    </div>
                    
                    <div 
                      className={`flex items-center space-x-2 rounded-md border p-2 cursor-pointer ${
                        newPackage.includes_transport ? 'bg-primary/10 border-primary' : ''
                      }`}
                      onClick={() => setNewPackage({...newPackage, includes_transport: !newPackage.includes_transport})}
                    >
                      <div className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                        newPackage.includes_transport ? 'bg-primary border-primary' : 'border-gray-300'
                      }`}>
                        {newPackage.includes_transport && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm">Transport</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPackageDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePackage}>Create Package</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="hotels">
            <Hotel className="mr-2 h-4 w-4" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="packages">
            <Package className="mr-2 h-4 w-4" />
            Packages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels">
          {hotels.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Hotel className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Hotels Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  You haven't added any hotel listings yet. Create your first hotel listing to get started.
                </p>
                <Button onClick={() => setIsHotelDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Hotel
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden">
                  <HotelCard hotel={hotel} buttonText="Manage Listing" onButtonClick={() => handleViewDetails(hotel.id, 'hotel')} />
                  <CardFooter className="flex justify-between py-3 bg-muted/30">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(hotel.id, 'hotel')}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(hotel.id, 'hotel')}>
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="packages">
          {packages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Packages Yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  You haven't added any package listings yet. Create your first package to get started.
                </p>
                <Button onClick={() => setIsPackageDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Package
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden">
                  <PackageCard package={pkg} buttonText="Manage Package" onButtonClick={() => handleViewDetails(pkg.id, 'package')} />
                  <CardFooter className="flex justify-between py-3 bg-muted/30">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(pkg.id, 'package')}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(pkg.id, 'package')}>
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProviderListingsPage;
