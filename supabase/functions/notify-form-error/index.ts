import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, checkInDate, errorReason } =
      await req.json();

    // Store the failed submission in the database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase
      .from("failed_contact_submissions")
      .insert({
        name,
        email,
        phone,
        message,
        check_in_date: checkInDate || null,
        error_reason: errorReason || "Unknown error",
      });

    if (dbError) {
      console.error("Failed to store submission:", dbError);
    }

    // Try sending a fallback notification email via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Norrskensstigen <info@norrskensstigen.se>",
            to: ["info@norrskensstigen.se"],
            subject: `⚠️ Kontaktformulär FEL - förfrågan från ${name}`,
            html: `
              <h2>⚠️ Kontaktformuläret kunde inte skicka e-post</h2>
              <p><strong>Felorsak:</strong> ${errorReason}</p>
              <hr>
              <h3>Kundens uppgifter (spara dessa!):</h3>
              <p><strong>Namn:</strong> ${name}</p>
              <p><strong>E-post:</strong> ${email}</p>
              <p><strong>Telefon:</strong> ${phone}</p>
              ${checkInDate ? `<p><strong>Önskat datum:</strong> ${checkInDate}</p>` : ""}
              <p><strong>Meddelande:</strong></p>
              <p>${message}</p>
              <hr>
              <p><em>Uppgifterna har även sparats i databasen (failed_contact_submissions).</em></p>
            `,
          }),
        });
        const emailData = await emailRes.text();
        console.log("Fallback email result:", emailRes.status, emailData);
      } catch (emailErr) {
        console.error("Fallback email also failed:", emailErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-form-error error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
