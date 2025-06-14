
// Admin dashboard/report endpoints: overview and data manipulation
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/?admin\/?/, "");
  try {
    // GET /admin/overview
    if (req.method === "GET" && path === "overview") {
      // Aggregate key stats for admin dashboard
      const [usersRes, bookingsRes, hotelsRes, packagesRes, flightsRes] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("bookings").select("*"),
        supabase.from("hotels").select("*"),
        supabase.from("packages").select("*"),
        supabase.from("flights").select("*"),
      ]);
      if (usersRes.error) throw usersRes.error;
      if (bookingsRes.error) throw bookingsRes.error;
      if (hotelsRes.error) throw hotelsRes.error;
      if (packagesRes.error) throw packagesRes.error;
      if (flightsRes.error) throw flightsRes.error;
      return new Response(JSON.stringify({
        usersCount: usersRes.data.length,
        bookingsCount: bookingsRes.data.length,
        hotelCount: hotelsRes.data.length,
        packageCount: packagesRes.data.length,
        flightCount: flightsRes.data.length,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // You can add more endpoints: e.g. list all users, set admin role, etc.
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
  } catch (err) {
    console.error("[EDGE] Admin API error:", err);
    return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500, headers: corsHeaders });
  }
});
