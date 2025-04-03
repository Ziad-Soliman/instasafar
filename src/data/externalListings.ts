
// This file now serves as a fallback when Supabase connection isn't available
// The actual data should be fetched from Supabase external_listings table

import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type ExternalListing = {
  id: string;
  listing_type: "hotel" | "flight" | "transport";
  name: string;
  description?: string;
  city: "Makkah" | "Madinah" | "Jeddah" | "Other" | "Both";
  provider_name: string;
  redirect_url: string;
  image_url?: string;
  price_indication?: string;
  rating_indication?: string;
};

// Fallback data if Supabase fetch fails
export const externalListings: ExternalListing[] = [
  {
    id: "ext-1",
    listing_type: "hotel",
    name: "Hilton Makkah Convention Hotel",
    description: "فندق فاخر مع إطلالات خلابة على الحرم",
    city: "Makkah",
    provider_name: "Booking.com",
    redirect_url: "https://www.booking.com",
    image_url: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "٧٥٠ ر.س",
    rating_indication: "8.9"
  },
  {
    id: "ext-2",
    listing_type: "hotel",
    name: "Pullman ZamZam Makkah",
    description: "فندق عصري بالقرب من المسجد الحرام",
    city: "Makkah",
    provider_name: "Agoda",
    redirect_url: "https://www.agoda.com",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "٦٨٠ ر.س",
    rating_indication: "8.7"
  },
  {
    id: "ext-3",
    listing_type: "flight",
    name: "رحلات إلى جدة",
    description: "أفضل العروض على رحلات الطيران",
    city: "Jeddah",
    provider_name: "Skyscanner",
    redirect_url: "https://www.skyscanner.com",
    image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "٢٢٥٠ ر.س"
  },
  {
    id: "ext-4",
    listing_type: "transport",
    name: "النقل بين مكة والمدينة",
    description: "خدمة نقل موثوقة بين المدن المقدسة",
    city: "Both",
    provider_name: "GetYourGuide",
    redirect_url: "https://www.getyourguide.com",
    image_url: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "١٩٠ ر.س"
  }
];

// Function to fetch external listings from Supabase
export const fetchExternalListings = async (): Promise<ExternalListing[]> => {
  try {
    const { data, error } = await supabase
      .from('external_listings')
      .select('*');
    
    if (error) {
      console.error('Error fetching external listings:', error);
      toast({
        title: "Failed to fetch external listings",
        description: "Using fallback data instead.",
        variant: "destructive",
      });
      return externalListings;
    }
    
    // Map Supabase data to the expected format
    return data.map((item: any) => ({
      id: item.id,
      listing_type: item.listing_type as "hotel" | "flight" | "transport",
      name: item.name,
      description: item.description,
      city: item.city as "Makkah" | "Madinah" | "Jeddah" | "Other" | "Both",
      provider_name: item.provider_name,
      redirect_url: item.redirect_url,
      image_url: item.image_url,
      price_indication: item.price_indication,
      rating_indication: item.rating_indication,
    }));
  } catch (error) {
    console.error('Exception when fetching external listings:', error);
    toast({
      title: "Failed to fetch external listings",
      description: "Using fallback data instead.",
      variant: "destructive",
    });
    return externalListings;
  }
};
