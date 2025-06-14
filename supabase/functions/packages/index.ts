
// ... similar structure as hotels/flights for packages endpoints.
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
  const path = url.pathname.replace(/^\/?packages\/?/, "");
  try {
    // GET /packages?type=...
    if (req.method === "GET" && (path === "" || path === "/")) {
      const { searchParams } = url;
      const type = searchParams.get("type");
      let query = supabase.from("packages").select("*");
      if (type) query = query.eq("type", type);
      const { data, error } = await query;
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // POST /packages (create)
    if (req.method === "POST" && (path === "" || path === "/")) {
      const body = await req.json();
      const { data, error } = await supabase.from("packages").insert([body]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 201 });
    }
    // PATCH /packages/:id
    if (req.method === "PATCH" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const packageId = path;
      const updates = await req.json();
      const { data, error } = await supabase.from("packages").update(updates).eq("id", packageId).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    // DELETE /packages/:id
    if (req.method === "DELETE" && path.match(/^([a-zA-Z0-9-]+)$/)) {
      const packageId = path;
      const { error } = await supabase.from("packages").delete().eq("id", packageId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }
    // POST /packages/:id/book
    if (req.method === "POST" && path.match(/^([a-zA-Z0-9-]+)\/book$/)) {
      const packageId = path.split("/")[0];
      const booking = await req.json();
      const { data, error } = await supabase.from("bookings").insert([{ ...booking, package_id: packageId }]).select();
      if (error) throw error;
      return new Response(JSON.stringify(data?.[0]), { headers: corsHeaders, status: 201 });
    }
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
  } catch (err) {
    console.error("[EDGE] Packages API error:", err);
    return new Response(JSON.stringify({ error: err.message ?? String(err) }), { status: 500, headers: corsHeaders });
  }
});
