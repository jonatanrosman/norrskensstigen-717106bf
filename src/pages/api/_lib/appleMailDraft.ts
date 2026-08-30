import { ImapFlow } from 'imapflow';
// @ts-expect-error -- no published types for this internal mail-composer path
import MailComposer from 'nodemailer/lib/mail-composer';

type CreateDraftParams = {
  to: string;
  subject: string;
  text: string;
  attachmentPdf?: { filename: string; content: Buffer };
};

/**
 * Appends a draft to the "Drafts" folder of the info@norrskensstigen.se
 * iCloud Mail account via IMAP, so it shows up in Apple Mail for Jonatan
 * to review and send himself. Never sends anything.
 */
export async function createAppleMailDraft({ to, subject, text, attachmentPdf }: CreateDraftParams): Promise<void> {
  const user = process.env.ICLOUD_IMAP_USER;
  const pass = process.env.ICLOUD_IMAP_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('Missing ICLOUD_IMAP_USER / ICLOUD_IMAP_APP_PASSWORD');
  }

  const mail = new MailComposer({
    from: 'info@norrskensstigen.se',
    to,
    subject,
    text,
    attachments: attachmentPdf ? [attachmentPdf] : [],
  });
  const raw: Buffer = await new Promise((resolve, reject) => {
    mail.compile().build((err: Error | null, message: Buffer) => {
      if (err) reject(err);
      else resolve(message);
    });
  });

  const client = new ImapFlow({
    host: 'imap.mail.me.com',
    port: 993,
    secure: true,
    auth: { user, pass },
    logger: false,
  });

  await client.connect();
  try {
    await client.mailboxOpen('Drafts');
    await client.append('Drafts', raw, ['\\Draft']);
  } finally {
    await client.logout();
  }
}
