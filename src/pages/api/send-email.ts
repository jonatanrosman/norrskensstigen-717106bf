import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend('re_63XA3uqH_M3C7qaF3qPnEZGwP59MKLu6a');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, checkInDate } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Build email content
    const htmlContent = `
      <html>
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
          
          <p style="color: #6b7280; font-size: 14px;">
            Detta meddelande skickades via kontaktformuläret på norrskensstigen.se
          </p>
        </body>
      </html>
    `;

    const textContent = `
Ny bokningsförfrågan - Norrskensstigen 12A

Namn: ${name}
E-post: ${email}
Telefon: ${phone}
${checkInDate ? `Önskat ankomstdatum: ${checkInDate}\n` : ''}

Meddelande:
${message}

---
Detta meddelande skickades via kontaktformuläret på norrskensstigen.se
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Norrskensstigen <onboarding@resend.dev>', // Resend's test email
      to: ['info@norrskensstigen.se'],
      replyTo: email,
      subject: `Bokningsförfrågan från ${name}`,
      html: htmlContent,
      text: textContent,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}