
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  rating: number;
  price_per_night: number;
  distance_to_haram: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  city: string;
  thumbnail: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  created_at: string;
  updated_at: string;
}

export interface HotelAmenity {
  id: string;
  hotel_id: string;
  name: string;
}

export const useProviderListings = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSupabaseAuth();
  const { toast } = useToast();

  const fetchListings = async () => {
    if (!user) {
      setHotels([]);
      setPackages([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    try {
      // Fetch hotels
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select('*')
        .eq('provider_id', user.id);
      
      if (hotelsError) throw hotelsError;
      
      // Fetch packages
      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*')
        .eq('provider_id', user.id);
      
      if (packagesError) throw packagesError;
      
      setHotels(hotelsData || []);
      setPackages(packagesData || []);
    } catch (error: any) {
      console.error('Error fetching provider listings:', error);
      toast({
        title: "Failed to load your listings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch hotel amenities for a specific hotel
  const fetchHotelAmenities = async (hotelId: string): Promise<HotelAmenity[]> => {
    try {
      const { data, error } = await supabase
        .from('hotel_amenities')
        .select('*')
        .eq('hotel_id', hotelId);
      
      if (error) throw error;
      
      return data || [];
    } catch (error: any) {
      console.error('Error fetching hotel amenities:', error);
      toast({
        title: "Failed to load amenities",
        description: error.message,
        variant: "destructive",
      });
      return [];
    }
  };

  // Create a new hotel
  const createHotel = async (hotelData: Omit<Hotel, 'id' | 'created_at' | 'updated_at'>, amenities: string[]) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a hotel.",
        variant: "destructive",
      });
      return null;
    }

    try {
      // Insert hotel
      const { data: newHotel, error: hotelError } = await supabase
        .from('hotels')
        .insert([{
          provider_id: user.id,
          ...hotelData
        }])
        .select()
        .single();
      
      if (hotelError) throw hotelError;
      
      // Insert amenities
      if (amenities.length > 0 && newHotel) {
        const amenitiesData = amenities.map(name => ({
          hotel_id: newHotel.id,
          name
        }));
        
        const { error: amenitiesError } = await supabase
          .from('hotel_amenities')
          .insert(amenitiesData);
        
        if (amenitiesError) throw amenitiesError;
      }
      
      // Refresh the list
      await fetchListings();
      
      toast({
        title: "Hotel created successfully",
      });
      
      return newHotel;
    } catch (error: any) {
      console.error('Error creating hotel:', error);
      toast({
        title: "Failed to create hotel",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Update an existing hotel
  const updateHotel = async (hotelId: string, hotelData: Partial<Hotel>, amenities?: string[]) => {
    if (!user) return false;

    try {
      // Update hotel
      const { error: hotelError } = await supabase
        .from('hotels')
        .update(hotelData)
        .eq('id', hotelId)
        .eq('provider_id', user.id);
      
      if (hotelError) throw hotelError;
      
      // Update amenities if provided
      if (amenities) {
        // Delete existing amenities
        const { error: deleteError } = await supabase
          .from('hotel_amenities')
          .delete()
          .eq('hotel_id', hotelId);
        
        if (deleteError) throw deleteError;
        
        // Insert new amenities
        if (amenities.length > 0) {
          const amenitiesData = amenities.map(name => ({
            hotel_id: hotelId,
            name
          }));
          
          const { error: amenitiesError } = await supabase
            .from('hotel_amenities')
            .insert(amenitiesData);
          
          if (amenitiesError) throw amenitiesError;
        }
      }
      
      // Refresh the list
      await fetchListings();
      
      toast({
        title: "Hotel updated successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating hotel:', error);
      toast({
        title: "Failed to update hotel",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete a hotel
  const deleteHotel = async (hotelId: string) => {
    if (!user) return false;

    try {
      // Delete hotel (amenities will be deleted via cascade)
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId)
        .eq('provider_id', user.id);
      
      if (error) throw error;
      
      // Refresh the list
      await fetchListings();
      
      toast({
        title: "Hotel deleted successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Failed to delete hotel",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Create a new package
  const createPackage = async (packageData: Omit<Package, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a package.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data: newPackage, error } = await supabase
        .from('packages')
        .insert([{
          provider_id: user.id,
          ...packageData
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Refresh the list
      await fetchListings();
      
      toast({
        title: "Package created successfully",
      });
      
      return newPackage;
    } catch (error: any) {
      console.error('Error creating package:', error);
      toast({
        title: "Failed to create package",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  // Update an existing package
  const updatePackage = async (packageId: string, packageData: Partial<Package>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('packages')
        .update(packageData)
        .eq('id', packageId)
        .eq('provider_id', user.id);
      
      if (error) throw error;
      
      // Refresh the list
      await fetchListings();
      
      toast({
        title: "Package updated successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error updating package:', error);
      toast({
        title: "Failed to update package",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Delete a package
  const deletePackage = async (packageId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', packageId)
        .eq('provider_id', user.id);
      
      if (error) throw error;
      
      // Refresh the list
      await fetchListings();
      
      toast({
        title: "Package deleted successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error deleting package:', error);
      toast({
        title: "Failed to delete package",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchListings();
    } else {
      setHotels([]);
      setPackages([]);
      setIsLoading(false);
    }
  }, [user]);

  return {
    hotels,
    packages,
    isLoading,
    fetchListings,
    fetchHotelAmenities,
    createHotel,
    updateHotel,
    deleteHotel,
    createPackage,
    updatePackage,
    deletePackage,
  };
};
