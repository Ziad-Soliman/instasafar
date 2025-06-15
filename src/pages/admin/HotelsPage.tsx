import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import HotelManagement from "@/components/admin/HotelManagement";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Hotel {
  id: string;
  name: string;
  city: string;
  distance_to_haram: string | null;
  rating: number | null;
  price_per_night: number;
  provider_id?: string;
  address: string;
  description?: string | null;
  thumbnail?: string | null;
}

const AdminHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [editFormData, setEditFormData] = useState<Hotel | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { toast } = useToast();

  const fetchHotels = async () => {
    setLoading(true);
    try {
      console.log('Fetching hotels...');
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching hotels:', error);
        throw error;
      }
      
      console.log('Fetched hotels:', data);
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hotels.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    
    try {
      console.log('Deleting hotel:', hotelId);
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hotel deleted successfully.",
      });

      await fetchHotels(); // Refresh the list
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to delete hotel.",
        variant: "destructive",
      });
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    console.log('Opening edit dialog for hotel:', hotel);
    setEditingHotel(hotel);
    setEditFormData({ ...hotel }); // Create a deep copy
  };

  const handleUpdateHotel = async () => {
    if (!editFormData || !editFormData.id) {
      console.error('No hotel data to update');
      toast({
        title: "Error",
        description: "No hotel data to update.",
        variant: "destructive",
      });
      return;
    }

    setUpdateLoading(true);
    console.log('=== HOTEL UPDATE PROCESS START ===');
    console.log('Hotel ID to update:', editFormData.id);
    console.log('Current form data:', editFormData);
    console.log('Original hotel data:', editingHotel);

    try {
      // Validate required fields
      if (!editFormData.name?.trim() || !editFormData.city?.trim() || !editFormData.address?.trim()) {
        throw new Error('Name, city, and address are required fields');
      }

      if (!editFormData.price_per_night || Number(editFormData.price_per_night) <= 0) {
        throw new Error('Price per night must be greater than 0');
      }

      // Prepare the update data
      const updateData = {
        name: editFormData.name.trim(),
        city: editFormData.city.trim(),
        address: editFormData.address.trim(),
        description: editFormData.description?.trim() || null,
        distance_to_haram: editFormData.distance_to_haram?.trim() || null,
        rating: editFormData.rating ? Number(editFormData.rating) : null,
        price_per_night: Number(editFormData.price_per_night),
        thumbnail: editFormData.thumbnail?.trim() || null,
        updated_at: new Date().toISOString()
      };

      console.log('Prepared update data:', updateData);

      // Check if hotel exists first
      const { data: existingHotel, error: checkError } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', editFormData.id)
        .single();

      if (checkError) {
        console.error('Error checking hotel existence:', checkError);
        throw new Error('Hotel not found or access denied');
      }

      console.log('Hotel exists in database:', existingHotel);

      // Perform the update
      const { data: updatedHotel, error: updateError } = await supabase
        .from('hotels')
        .update(updateData)
        .eq('id', editFormData.id)
        .select('*')
        .single();

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Update failed: ${updateError.message}`);
      }

      console.log('Hotel updated successfully:', updatedHotel);

      // Update local state immediately
      setHotels(prevHotels => {
        const updatedHotels = prevHotels.map(hotel => 
          hotel.id === editFormData.id ? updatedHotel : hotel
        );
        console.log('Updated local hotels state:', updatedHotels);
        return updatedHotels;
      });

      toast({
        title: "Success",
        description: "Hotel updated successfully!",
      });

      // Close the dialog
      setEditingHotel(null);
      setEditFormData(null);

      // Force a complete refresh from database
      console.log('Forcing database refresh...');
      await fetchHotels();
      
    } catch (error: any) {
      console.error('=== UPDATE ERROR ===');
      console.error('Error details:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update hotel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
      console.log('=== HOTEL UPDATE PROCESS END ===');
    }
  };

  const handleFormDataChange = (field: keyof Hotel, value: any) => {
    console.log(`Updating field ${field} with value:`, value);
    setEditFormData(prev => {
      if (!prev) return null;
      const updated = {
        ...prev,
        [field]: value
      };
      console.log('Updated form data:', updated);
      return updated;
    });
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Hotels</h1>
            <p className="text-muted-foreground">Manage hotel listings</p>
          </div>
          <HotelManagement onHotelAdded={fetchHotels} />
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search hotels..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Hotel Name</th>
                  <th className="text-left py-3 px-4 font-medium">City</th>
                  <th className="text-left py-3 px-4 font-medium">Distance to Haram</th>
                  <th className="text-left py-3 px-4 font-medium">Rating</th>
                  <th className="text-left py-3 px-4 font-medium">Price/Night</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredHotels.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      {searchTerm ? "No hotels found matching your search." : "No hotels found."}
                    </td>
                  </tr>
                ) : (
                  filteredHotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td className="py-3 px-4">
                        <div className="font-medium">{hotel.name}</div>
                      </td>
                      <td className="py-3 px-4">{hotel.city}</td>
                      <td className="py-3 px-4">{hotel.distance_to_haram || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span>{Number(hotel.rating ?? 0).toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">${Number(hotel.price_per_night).toFixed(0)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditHotel(hotel)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteHotel(hotel.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="py-4 px-6 bg-muted/50 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredHotels.length}</span> hotels
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>

        {/* Edit Hotel Dialog */}
        <Dialog open={!!editingHotel} onOpenChange={(open) => {
          if (!open) {
            console.log('Closing edit dialog');
            setEditingHotel(null);
            setEditFormData(null);
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Hotel: {editFormData?.name}</DialogTitle>
            </DialogHeader>
            {editFormData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Hotel Name *</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name || ''}
                      onChange={(e) => handleFormDataChange('name', e.target.value)}
                      placeholder="Enter hotel name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-city">City *</Label>
                    <Select 
                      value={editFormData.city || ''} 
                      onValueChange={(value) => handleFormDataChange('city', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Makkah">Makkah</SelectItem>
                        <SelectItem value="Medina">Medina</SelectItem>
                        <SelectItem value="Riyadh">Riyadh</SelectItem>
                        <SelectItem value="Jeddah">Jeddah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-address">Address *</Label>
                  <Input
                    id="edit-address"
                    value={editFormData.address || ''}
                    onChange={(e) => handleFormDataChange('address', e.target.value)}
                    placeholder="Enter hotel address"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editFormData.description || ''}
                    onChange={(e) => handleFormDataChange('description', e.target.value)}
                    rows={3}
                    placeholder="Enter hotel description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-distance">Distance to Haram</Label>
                    <Input
                      id="edit-distance"
                      value={editFormData.distance_to_haram || ''}
                      onChange={(e) => handleFormDataChange('distance_to_haram', e.target.value)}
                      placeholder="e.g., 0.5 km"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-rating">Rating (0-5)</Label>
                    <Input
                      id="edit-rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={editFormData.rating || 0}
                      onChange={(e) => handleFormDataChange('rating', e.target.value ? parseFloat(e.target.value) : 0)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">Price per Night (USD) *</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      min="1"
                      value={editFormData.price_per_night || 0}
                      onChange={(e) => handleFormDataChange('price_per_night', e.target.value ? parseFloat(e.target.value) : 0)}
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
                    <Input
                      id="edit-thumbnail"
                      type="url"
                      value={editFormData.thumbnail || ''}
                      onChange={(e) => handleFormDataChange('thumbnail', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      console.log('Cancel button clicked');
                      setEditingHotel(null);
                      setEditFormData(null);
                    }}
                    disabled={updateLoading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdateHotel}
                    disabled={updateLoading || !editFormData?.name || !editFormData?.city || !editFormData?.address || !editFormData?.price_per_night}
                  >
                    {updateLoading ? "Updating..." : "Update Hotel"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default AdminHotels;
