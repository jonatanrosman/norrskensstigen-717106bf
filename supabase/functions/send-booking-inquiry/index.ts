import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "npm:zod@3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const jsonHeaders = { "Content-Type": "application/json", ...corsHeaders };

const BookingInquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(40),
  message: z.string().trim().min(1).max(2000),
  checkInDate: z.string().trim().max(40).optional(),
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Collects the project keys that are allowed to invoke this function. */
function allowedKeys(): Set<string> {
  const keys = new Set<string>();
  const anon = Deno.env.get("SUPABASE_ANON_KEY");
  if (anon) keys.add(anon);
  const publishable = Deno.env.get("SUPABASE_PUBLISHABLE_KEYS");
  if (publishable) {
    try {
      const parsed: unknown = JSON.parse(publishable);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        for (const value of Object.values(parsed as Record<string, unknown>)) {
          if (typeof value === "string" && value.trim()) keys.add(value.trim());
        }
      }
    } catch {
      // Ignore a malformed dictionary; the anon key check still applies.
    }
  }
  return keys;
}

/** Requires a caller token issued by this project (app clients send it automatically). */
function isAuthorized(req: Request): boolean {
  const keys = allowedKeys();
  if (keys.size === 0) return false;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  const apikey = req.headers.get("apikey")?.trim();
  return (!!bearer && keys.has(bearer)) || (!!apikey && keys.has(apikey));
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  if (!isAuthorized(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: jsonHeaders,
    });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    const parsed = BookingInquirySchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: jsonHeaders },
      );
    }

    const { name, email, phone, message, checkInDate } = parsed.data;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Norrskensstigen <info@norrskensstigen.se>",
        to: ["info@norrskensstigen.se"],
        reply_to: email,
        subject: `Bokningsförfrågan från ${escapeHtml(name)}`,
        html: `
          <h2>Ny bokningsförfrågan</h2>
          <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
          ${checkInDate ? `<p><strong>Önskat ankomstdatum:</strong> ${escapeHtml(checkInDate)}</p>` : ''}
          <p><strong>Meddelande:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data?.id ?? "(no id)");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    // Full detail stays in the server logs; the client gets a generic message.
    console.error("Error in send-booking-inquiry function:", error);
    return new Response(
      JSON.stringify({
        error:
          "Unable to process booking inquiry. Please try again or contact us directly.",
      }),
      { status: 500, headers: jsonHeaders },
    );
  }
};

serve(handler);
