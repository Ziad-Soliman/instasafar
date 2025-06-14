
// ... similar structure as hotels with endpoints for searching, creating, updating, and booking flights.
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
  const path = url.pathname.replace(/^\/?flights\/?/, "");
  try {
    // GET /flights?from=...&to=...
    if (req.method === "GET" && (path === "" || path === "/")) {
      const { searchParams } = url;
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      let query = supabase.from("flights").select("*");
      if (from) query = query.eq("origin", from);
      if (to) query = query.eq("destination", to);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // POST /flights
    if (req.method === "POST" && (path === "" || path === "/")) {
      const body = await req.json();
      const { data, error } = await supabase.from("flights").insert([body]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 201 });
    }
    // PATCH /flights/:id
    if (req.method === "PATCH" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const flightId = path;
      const updates = await req.json();
      const { data, error } = await supabase.from("flights").update(updates).eq("id", flightId).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // DELETE /flights/:id
    if (req.method === "DELETE" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const flightId = path;
      const { error } = await supabase.from("flights").delete().eq("id", flightId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }
    // POST /flights/:id/book
    if (req.method === "POST" && path.match(/^([a-zA-Z0-9-]+)\/book$/)) {
      const flightId = path.split("/")[0];
      const booking = await req.json();
      const { data, error } = await supabase.from("bookings").insert([{ ...booking, flight_id: flightId }]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: corsHeaders, status: 201 });
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
  } catch (err) {
    console.error("[EDGE] Flights API error:", err);
    return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500, headers: corsHeaders });
  }
});
