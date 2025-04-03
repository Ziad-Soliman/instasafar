
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  rating: number;
  price_per_night: number;
  distance_to_haram: string;
  thumbnail: string;
  amenities?: string[];
}

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  thumbnail: string;
  city: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
}

export const useProviderListings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Fetch hotels for the current provider
  const fetchHotels = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('hotels')
        .select(`
          *,
          hotel_amenities (name)
        `);
      
      if (error) throw error;
      
      // Format the data
      const formattedHotels = data.map((hotel: any) => ({
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        address: hotel.address,
        description: hotel.description,
        rating: hotel.rating,
        price_per_night: hotel.price_per_night,
        distance_to_haram: hotel.distance_to_haram,
        thumbnail: hotel.thumbnail,
        amenities: hotel.hotel_amenities ? hotel.hotel_amenities.map((a: any) => a.name) : [],
      }));
      
      return formattedHotels;
    } catch (error: any) {
      console.error('Error fetching hotels:', error);
      toast({
        title: "Failed to fetch hotels",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new hotel
  const createHotel = async (hotel: Omit<Hotel, 'id'>, amenities: string[]) => {
    try {
      setLoading(true);
      
      // First create the hotel
      const { data, error } = await supabase
        .from('hotels')
        .insert({
          name: hotel.name,
          city: hotel.city,
          address: hotel.address,
          description: hotel.description,
          rating: hotel.rating || 0,
          price_per_night: hotel.price_per_night,
          distance_to_haram: hotel.distance_to_haram,
          thumbnail: hotel.thumbnail,
        })
        .select();
      
      if (error) throw error;
      
      if (data && data[0] && amenities.length > 0) {
        const hotelId = data[0].id;
        
        // Add amenities
        const amenitiesData = amenities.map(name => ({
          hotel_id: hotelId,
          name,
        }));
        
        const { error: amenitiesError } = await supabase
          .from('hotel_amenities')
          .insert(amenitiesData);
        
        if (amenitiesError) throw amenitiesError;
      }
      
      toast({
        title: "Hotel created",
        description: "Your hotel has been successfully created.",
      });
      
      return data ? data[0] : null;
    } catch (error: any) {
      console.error('Error creating hotel:', error);
      toast({
        title: "Failed to create hotel",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing hotel
  const updateHotel = async (id: string, hotel: Partial<Hotel>, amenities?: string[]) => {
    try {
      setLoading(true);
      
      // Update hotel
      const { error } = await supabase
        .from('hotels')
        .update({
          name: hotel.name,
          city: hotel.city,
          address: hotel.address,
          description: hotel.description,
          rating: hotel.rating,
          price_per_night: hotel.price_per_night,
          distance_to_haram: hotel.distance_to_haram,
          thumbnail: hotel.thumbnail,
        })
        .eq('id', id);
      
      if (error) throw error;
      
      // If amenities are provided, update them
      if (amenities) {
        // First delete existing amenities
        const { error: deleteError } = await supabase
          .from('hotel_amenities')
          .delete()
          .eq('hotel_id', id);
        
        if (deleteError) throw deleteError;
        
        // Add new amenities
        if (amenities.length > 0) {
          const amenitiesData = amenities.map(name => ({
            hotel_id: id,
            name,
          }));
          
          const { error: amenitiesError } = await supabase
            .from('hotel_amenities')
            .insert(amenitiesData);
          
          if (amenitiesError) throw amenitiesError;
        }
      }
      
      toast({
        title: "Hotel updated",
        description: "Your hotel has been successfully updated.",
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
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a hotel
  const deleteHotel = async (id: string) => {
    try {
      setLoading(true);
      
      // Delete hotel (amenities will cascade delete due to FK constraints)
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Hotel deleted",
        description: "Your hotel has been successfully deleted.",
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
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch packages for the current provider
  const fetchPackages = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('packages')
        .select('*');
      
      if (error) throw error;
      
      return data.map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration_days: pkg.duration_days,
        start_date: pkg.start_date,
        end_date: pkg.end_date,
        thumbnail: pkg.thumbnail,
        city: pkg.city,
        includes_hotel: pkg.includes_hotel,
        includes_flight: pkg.includes_flight,
        includes_transport: pkg.includes_transport,
      }));
    } catch (error: any) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Failed to fetch packages",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new package
  const createPackage = async (pkg: Omit<Package, 'id'>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('packages')
        .insert({
          name: pkg.name,
          description: pkg.description,
          price: pkg.price,
          duration_days: pkg.duration_days,
          start_date: pkg.start_date,
          end_date: pkg.end_date,
          thumbnail: pkg.thumbnail,
          city: pkg.city,
          includes_hotel: pkg.includes_hotel,
          includes_flight: pkg.includes_flight,
          includes_transport: pkg.includes_transport,
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Package created",
        description: "Your package has been successfully created.",
      });
      
      return data ? data[0] : null;
    } catch (error: any) {
      console.error('Error creating package:', error);
      toast({
        title: "Failed to create package",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Update an existing package
  const updatePackage = async (id: string, pkg: Partial<Package>) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('packages')
        .update({
          name: pkg.name,
          description: pkg.description,
          price: pkg.price,
          duration_days: pkg.duration_days,
          start_date: pkg.start_date,
          end_date: pkg.end_date,
          thumbnail: pkg.thumbnail,
          city: pkg.city,
          includes_hotel: pkg.includes_hotel,
          includes_flight: pkg.includes_flight,
          includes_transport: pkg.includes_transport,
        })
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Package updated",
        description: "Your package has been successfully updated.",
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
    } finally {
      setLoading(false);
    }
  };
  
  // Delete a package
  const deletePackage = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Package deleted",
        description: "Your package has been successfully deleted.",
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
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch bookings for the provider's hotels and packages
  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          hotels (*),
          packages (*)
        `);
      
      if (error) throw error;
      
      return data;
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Failed to fetch bookings",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    fetchHotels,
    createHotel,
    updateHotel,
    deleteHotel,
    fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
    fetchBookings,
  };
};
