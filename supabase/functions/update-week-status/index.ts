import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const ADMIN_CODE = Deno.env.get("ADMIN_CODE");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const jsonHeaders = { "Content-Type": "application/json", ...corsHeaders };

const UpdateSchema = z.object({
  code: z.string().min(1),
  id: z.string().uuid(),
  status: z.enum(["Available", "Booked"]),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  if (!ADMIN_CODE || !SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("update-week-status: missing required server configuration");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: jsonHeaders },
    );
  }

  const { code, id, status } = parsed.data;

  if (code !== ADMIN_CODE) {
    return new Response(JSON.stringify({ error: "Fel kod" }), {
      status: 401,
      headers: jsonHeaders,
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data, error } = await supabase
    .from("winter_weeks")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("update-week-status: update failed:", error);
    return new Response(JSON.stringify({ error: "Kunde inte uppdatera veckan" }), {
      status: 500,
      headers: jsonHeaders,
    });
  }

  if (!data) {
    return new Response(JSON.stringify({ error: "Veckan hittades inte" }), {
      status: 404,
      headers: jsonHeaders,
    });
  }

  return new Response(JSON.stringify({ success: true, week: data }), {
    status: 200,
    headers: jsonHeaders,
  });
};

serve(handler);
