
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oymavgefxsjouvfophjz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bWF2Z2VmeHNqb3V2Zm9waGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzA3NTMsImV4cCI6MjA1OTI0Njc1M30.Dsr4BVNsCHYV1zim6-9QvrxLs4SsOOv1Ql7Ncw67if0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// The get_provider_dashboard_stats function efficiently calculates dashboard stats for providers
// This function returns an array with a single object containing the provider statistics
// Usage example:
// const { data } = await supabase.rpc('get_provider_dashboard_stats', { provider_id_arg: user.id });
// Stats can be accessed as: data[0].total_bookings, data[0].pending_bookings, etc.

// Define the return type of the get_provider_dashboard_stats function for better type safety
export interface ProviderStats {
  total_bookings: number;
  pending_bookings: number;
  total_revenue: number;
  active_listings: number;
}
