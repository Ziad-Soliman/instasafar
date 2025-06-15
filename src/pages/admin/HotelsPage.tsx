
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
  created_at?: string;
  updated_at?: string;
  name_ar?: string | null;
  description_ar?: string | null;
  city_ar?: string | null;
  address_ar?: string | null;
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
    console.log('=== FETCHING HOTELS FROM DATABASE ===');
    
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('updated_at', { ascending: false });

      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Hotels fetched successfully:', data);
      setHotels(data || []);
      
    } catch (error: any) {
      console.error('=== FETCH ERROR ===', error);
      toast({
        title: "Error",
        description: `Failed to fetch hotels: ${error.message || 'Unknown error'}`,
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
      console.log('Deleting hotel ID:', hotelId);
      
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      console.log('Hotel deleted successfully');
      toast({
        title: "Success",
        description: "Hotel deleted successfully.",
      });

      await fetchHotels();
    } catch (error: any) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Error",
        description: `Failed to delete hotel: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    console.log('Opening edit dialog for hotel:', hotel);
    setEditingHotel(hotel);
    setEditFormData({ ...hotel });
  };

  const handleUpdateHotel = async () => {
    if (!editFormData || !editFormData.id) {
      toast({
        title: "Error",
        description: "No hotel data to update.",
        variant: "destructive",
      });
      return;
    }

    setUpdateLoading(true);
    console.log('=== STARTING HOTEL UPDATE ===');
    console.log('Hotel ID:', editFormData.id);
    console.log('Form data:', editFormData);

    try {
      // Validate required fields
      if (!editFormData.name?.trim() || !editFormData.city?.trim() || !editFormData.address?.trim()) {
        throw new Error('Name, city, and address are required fields');
      }

      if (!editFormData.price_per_night || Number(editFormData.price_per_night) <= 0) {
        throw new Error('Price per night must be greater than 0');
      }

      // Prepare update data - only include fields that can be updated
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

      console.log('Update data being sent:', updateData);

      // First, check if the hotel exists
      const { data: existingHotel, error: checkError } = await supabase
        .from('hotels')
        .select('id, name')
        .eq('id', editFormData.id)
        .single();

      if (checkError || !existingHotel) {
        console.error('Hotel not found:', checkError);
        throw new Error('Hotel not found in database');
      }

      console.log('Hotel exists:', existingHotel);

      // Perform the update
      const { data: updatedData, error: updateError } = await supabase
        .from('hotels')
        .update(updateData)
        .eq('id', editFormData.id)
        .select('*');

      console.log('Update response:', { updatedData, updateError });

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Update failed: ${updateError.message}`);
      }

      if (!updatedData || updatedData.length === 0) {
        throw new Error('Update operation completed but no data was returned');
      }

      console.log('Hotel updated successfully:', updatedData[0]);

      toast({
        title: "Success",
        description: "Hotel updated successfully!",
      });

      // Close the dialog
      setEditingHotel(null);
      setEditFormData(null);

      // Refresh the hotels list
      await fetchHotels();
      
    } catch (error: any) {
      console.error('=== UPDATE ERROR ===', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update hotel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleFormDataChange = (field: keyof Hotel, value: any) => {
    setEditFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value
      };
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
            <p className="text-sm text-muted-foreground">
              Total hotels: {hotels.length}
            </p>
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
                <Button variant="outline" onClick={fetchHotels}>Refresh</Button>
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
                        <div className="text-xs text-muted-foreground">ID: {hotel.id}</div>
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
              Showing <span className="font-medium">{filteredHotels.length}</span> of <span className="font-medium">{hotels.length}</span> hotels
            </div>
          </div>
        </div>

        {/* Edit Hotel Dialog */}
        <Dialog open={!!editingHotel} onOpenChange={(open) => {
          if (!open) {
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
