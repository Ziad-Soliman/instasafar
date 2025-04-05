
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  distance_to_haram: string;
  rating: number;
  price_per_night: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  amenities: string[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  city: "Makkah" | "Madinah" | "Both";
  thumbnail: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  created_at: string;
  updated_at: string;
}

export function useProviderListings() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchListings = async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    
    try {
      // Fetch hotels
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select(`
          id, 
          name, 
          city, 
          address, 
          description, 
          rating, 
          price_per_night, 
          distance_to_haram, 
          thumbnail,
          created_at,
          updated_at
        `)
        .eq('provider_id', user.id);
      
      if (hotelsError) {
        throw hotelsError;
      }
      
      // Fetch amenities for each hotel
      const hotelsWithAmenities = await Promise.all(
        hotelsData.map(async (hotel) => {
          const { data: amenitiesData, error: amenitiesError } = await supabase
            .from('hotel_amenities')
            .select('name')
            .eq('hotel_id', hotel.id);
            
          if (amenitiesError) {
            console.error('Error fetching amenities:', amenitiesError);
            return { ...hotel, amenities: [] };
          }
          
          return { 
            ...hotel, 
            amenities: amenitiesData.map(amenity => amenity.name) 
          };
        })
      );
      
      setHotels(hotelsWithAmenities);
      
      // Fetch packages
      const { data: packagesData, error: packagesError } = await supabase
        .from('packages')
        .select('*')
        .eq('provider_id', user.id);
      
      if (packagesError) {
        throw packagesError;
      }
      
      setPackages(packagesData);
      
    } catch (error) {
      console.error('Error fetching provider listings:', error);
      toast({
        title: "Failed to fetch listings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create a new hotel
  const createHotel = async (
    hotelData: Omit<Hotel, "id" | "created_at" | "updated_at">, 
    amenitiesArray: string[] = []
  ) => {
    if (!user?.id) return null;
    
    try {
      // Insert hotel
      const { data: newHotel, error: hotelError } = await supabase
        .from('hotels')
        .insert({
          provider_id: user.id,
          name: hotelData.name,
          city: hotelData.city,
          address: hotelData.address,
          description: hotelData.description,
          rating: hotelData.rating,
          price_per_night: hotelData.price_per_night,
          distance_to_haram: hotelData.distance_to_haram,
          thumbnail: hotelData.thumbnail
        })
        .select('id')
        .single();
      
      if (hotelError) {
        throw hotelError;
      }
      
      // Insert hotel amenities
      if (amenitiesArray.length > 0) {
        const amenitiesObjects = amenitiesArray.map(name => ({
          hotel_id: newHotel.id,
          name
        }));
        
        const { error: amenitiesError } = await supabase
          .from('hotel_amenities')
          .insert(amenitiesObjects);
        
        if (amenitiesError) {
          console.error('Error adding amenities:', amenitiesError);
        }
      }
      
      toast({
        title: "Hotel added successfully",
        description: "Your new hotel has been added to your listings.",
      });
      
      await fetchListings();
      return newHotel;
      
    } catch (error) {
      console.error('Error creating hotel:', error);
      toast({
        title: "Failed to add hotel",
        description: "Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  // Update an existing hotel
  const updateHotel = async (
    hotelId: string, 
    updateData: Partial<Omit<Hotel, "id" | "created_at" | "updated_at">>,
    newAmenities?: string[]
  ) => {
    try {
      // Update hotel data
      const { error: updateError } = await supabase
        .from('hotels')
        .update(updateData)
        .eq('id', hotelId);
      
      if (updateError) {
        throw updateError;
      }
      
      // If new amenities are provided, update them
      if (newAmenities) {
        // First, delete all existing amenities
        const { error: deleteError } = await supabase
          .from('hotel_amenities')
          .delete()
          .eq('hotel_id', hotelId);
        
        if (deleteError) {
          console.error('Error deleting amenities:', deleteError);
        }
        
        // Then, insert new amenities
        if (newAmenities.length > 0) {
          const amenitiesObjects = newAmenities.map(name => ({
            hotel_id: hotelId,
            name
          }));
          
          const { error: insertError } = await supabase
            .from('hotel_amenities')
            .insert(amenitiesObjects);
          
          if (insertError) {
            console.error('Error adding new amenities:', insertError);
          }
        }
      }
      
      toast({
        title: "Hotel updated successfully",
        description: "Your hotel information has been updated.",
      });
      
      await fetchListings();
      return true;
      
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast({
        title: "Failed to update hotel",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Delete a hotel
  const deleteHotel = async (hotelId: string) => {
    try {
      // Delete the hotel (amenities will be deleted by the foreign key cascade)
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Hotel deleted successfully",
        description: "The hotel has been removed from your listings.",
      });
      
      await fetchListings();
      return true;
      
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: "Failed to delete hotel",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Create a new package
  const createPackage = async (packageData: Omit<Package, "id" | "created_at" | "updated_at">) => {
    if (!user?.id) return null;
    
    try {
      const { data: newPackage, error } = await supabase
        .from('packages')
        .insert({
          provider_id: user.id,
          name: packageData.name,
          description: packageData.description,
          price: packageData.price,
          duration_days: packageData.duration_days,
          start_date: packageData.start_date,
          end_date: packageData.end_date,
          city: packageData.city,
          thumbnail: packageData.thumbnail,
          includes_hotel: packageData.includes_hotel,
          includes_flight: packageData.includes_flight,
          includes_transport: packageData.includes_transport
        })
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Package added successfully",
        description: "Your new package has been added to your listings.",
      });
      
      await fetchListings();
      return newPackage;
      
    } catch (error) {
      console.error('Error creating package:', error);
      toast({
        title: "Failed to add package",
        description: "Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };
  
  // Update an existing package
  const updatePackage = async (packageId: string, updateData: Partial<Omit<Package, "id" | "created_at" | "updated_at">>) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update(updateData)
        .eq('id', packageId);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Package updated successfully",
        description: "Your package information has been updated.",
      });
      
      await fetchListings();
      return true;
      
    } catch (error) {
      console.error('Error updating package:', error);
      toast({
        title: "Failed to update package",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Delete a package
  const deletePackage = async (packageId: string) => {
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', packageId);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Package deleted successfully",
        description: "The package has been removed from your listings.",
      });
      
      await fetchListings();
      return true;
      
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: "Failed to delete package",
        description: "Please try again later.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Fetch listings on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      fetchListings();
    }
  }, [user?.id]);
  
  return {
    hotels,
    packages,
    isLoading,
    fetchListings,
    createHotel,
    updateHotel,
    deleteHotel,
    createPackage,
    updatePackage,
    deletePackage
  };
}
