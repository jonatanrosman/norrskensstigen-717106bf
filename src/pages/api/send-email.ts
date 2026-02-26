import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Use environment variable for API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, checkInDate } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const htmlContent = `
      <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2563eb;">Ny bokningsförfrågan - Norrskensstigen 12A</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Namn:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>E-post:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${phone}</p>
            ${checkInDate ? `<p style="margin: 10px 0;"><strong>Önskat ankomstdatum:</strong> ${checkInDate}</p>` : ''}
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #2563eb;">Meddelande:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px;">Detta meddelande skickades via kontaktformuläret på norrskensstigen.se</p>
        </body>
      </html>
    `;

    const textContent = `Ny bokningsförfrågan\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}\n${checkInDate ? `Datum: ${checkInDate}\n` : ''}\nMeddelande:\n${message}`;

    const data = await resend.emails.send({
      from: 'Norrskensstigen <info@norrskensstigen.se>',
      to: ['info@norrskensstigen.se'],
      reply_to: email,
      subject: `Bokningsförfrågan från ${name}`,
      html: htmlContent,
      text: textContent,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    try {
      const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vjayjkppavzchbhavznh.supabase.co';
      await fetch(`${supabaseUrl}/functions/v1/notify-form-error`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: req.body?.name,
          email: req.body?.email,
          phone: req.body?.phone,
          message: req.body?.message,
          checkInDate: req.body?.checkInDate,
          errorReason: errorMessage,
        }),
      });
    } catch (fallbackError) {
      console.error('Fallback notification also failed:', fallbackError);
    }

    return res.status(500).json({ 
      error: 'Failed to send email',
      details: errorMessage
    });
  }
}