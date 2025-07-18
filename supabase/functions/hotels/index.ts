
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
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/?hotels\/?/, "");
  try {
    // GET /hotels?city=...
    if (req.method === "GET" && (path === "" || path === "/")) {
      const { searchParams } = url;
      const city = searchParams.get("city");
      let query = supabase.from("hotels").select("*");
      if (city) query = query.eq("city", city);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // POST /hotels
    if (req.method === "POST" && (path === "" || path === "/")) {
      const body = await req.json();
      const { data, error } = await supabase.from("hotels").insert([body]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 201 });
    }

    // PATCH /hotels/:id
    if (req.method === "PATCH" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const hotelId = path;
      const updates = await req.json();
      const { data, error } = await supabase.from("hotels").update(updates).eq("id", hotelId).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // DELETE /hotels/:id
    if (req.method === "DELETE" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const hotelId = path;
      const { error } = await supabase.from("hotels").delete().eq("id", hotelId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // POST /hotels/:id/book
    if (req.method === "POST" && path.match(/^([a-zA-Z0-9-]+)\/book$/)) {
      const hotelId = path.split("/")[0];
      const booking = await req.json();
      const { data, error } = await supabase.from("bookings").insert([{ ...booking, hotel_id: hotelId }]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: corsHeaders, status: 201 });
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
  } catch (err) {
    console.error("[EDGE] Hotels API error:", err);
    return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500, headers: corsHeaders });
  }
});
