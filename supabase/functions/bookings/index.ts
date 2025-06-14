
// booking: CRUD and views per role
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
  const path = url.pathname.replace(/^\/?bookings\/?/, "");
  try {
    // GET /bookings?user_id=... for customer, provider_id=..., admin=1
    if (req.method === "GET" && (path === "" || path === "/")) {
      const userId = url.searchParams.get("user_id");
      const providerId = url.searchParams.get("provider_id");
      const admin = url.searchParams.get("admin");
      let query = supabase.from("bookings").select("*");
      if (userId) query = query.eq("user_id", userId);
      else if (providerId) query = query.or(`hotel_id.in.(select id from hotels where provider_id.eq.${providerId}),package_id.in.(select id from packages where provider_id.eq.${providerId})`);
      else if (!admin) return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: corsHeaders });
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // POST /bookings
    if (req.method === "POST" && (path === "" || path === "/")) {
      const body = await req.json();
      const { data, error } = await supabase.from("bookings").insert([body]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 201 });
    }
    // PATCH /bookings/:id
    if (req.method === "PATCH" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const bookingId = path;
      const updates = await req.json();
      const { data, error } = await supabase.from("bookings").update(updates).eq("id", bookingId).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // DELETE /bookings/:id
    if (req.method === "DELETE" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const bookingId = path;
      const { error } = await supabase.from("bookings").delete().eq("id", bookingId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
  } catch (err) {
    console.error("[EDGE] Bookings API error:", err);
    return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500, headers: corsHeaders });
  }
});
