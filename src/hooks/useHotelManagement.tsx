
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export const useHotelManagement = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
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

  const deleteHotel = async (hotelId: string) => {
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

  const updateHotel = async (editFormData: Hotel) => {
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

      // Prepare update data
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

      const { data: updatedData, error: updateError } = await supabase
        .from('hotels')
        .update(updateData)
        .eq('id', editFormData.id)
        .select('*')
        .single();

      console.log('Update response:', { updatedData, updateError });

      if (updateError) {
        console.error('Update error:', updateError);
        throw new Error(`Update failed: ${updateError.message}`);
      }

      if (!updatedData) {
        const { data: altData, error: altError } = await supabase
          .from('hotels')
          .update(updateData)
          .eq('id', editFormData.id)
          .select('*');

        if (altError) {
          throw new Error(`Alternative update failed: ${altError.message}`);
        }

        if (!altData || altData.length === 0) {
          throw new Error('Hotel update failed - no records were updated. Please check if the hotel still exists.');
        }

        console.log('Alternative update successful:', altData[0]);
      } else {
        console.log('Hotel updated successfully:', updatedData);
      }

      toast({
        title: "Success",
        description: "Hotel updated successfully!",
      });

      await fetchHotels();
      
    } catch (error: any) {
      console.error('=== UPDATE ERROR ===', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update hotel. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    hotels,
    loading,
    fetchHotels,
    deleteHotel,
    updateHotel
  };
};
