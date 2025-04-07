// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oymavgefxsjouvfophjz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bWF2Z2VmeHNqb3V2Zm9waGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzA3NTMsImV4cCI6MjA1OTI0Njc1M30.Dsr4BVNsCHYV1zim6-9QvrxLs4SsOOv1Ql7Ncw67if0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// No changes needed to the client.ts file, just using this to explain
// The function get_provider_dashboard_stats needs to be created in the Supabase database
// This function will efficiently calculate dashboard stats for providers in a single query
