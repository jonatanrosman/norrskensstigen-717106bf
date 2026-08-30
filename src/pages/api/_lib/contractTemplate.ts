import { google } from 'googleapis';

type FillContractParams = {
  namn: string;
  telefon: string;
  epost: string;
  avtalstid: string;
  hyresbelopp: string;
  vecka: string;
  ar: string;
};

/**
 * Duplicates the "Hyresavtal Norrskensstigen" master template into the same
 * Drive folder Jonatan already archives contracts in, fills in the merge
 * tags, and exports the result as a PDF buffer.
 *
 * Requires the master template to already contain {{NAMN}}, {{TELEFON}},
 * {{EPOST}}, {{AVTALSTID}}, {{HYRESBELOPP}} tags — see the setup steps in
 * the automation instructions. Throws if any required env var is missing
 * or the Drive/Docs API calls fail; callers should treat that as
 * non-fatal (still send the draft, just without a contract attached).
 */
export async function fillContract({ namn, telefon, epost, avtalstid, hyresbelopp, vecka, ar }: FillContractParams): Promise<{ docId: string; pdfBuffer: Buffer }> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const templateDocId = process.env.HYRESAVTAL_TEMPLATE_DOC_ID;
  const folderId = process.env.HYRESAVTAL_DRIVE_FOLDER_ID;
  if (!email || !privateKey || !templateDocId || !folderId) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY / HYRESAVTAL_TEMPLATE_DOC_ID / HYRESAVTAL_DRIVE_FOLDER_ID');
  }

  const auth = new google.auth.JWT(
    email,
    undefined,
    privateKey.replace(/\\n/g, '\n'),
    // drive.file (not the full "drive" scope): the folder is already
    // explicitly shared with this service account, and this limits the
    // blast radius if the key ever leaks.
    ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/documents'],
  );
  const drive = google.drive({ version: 'v3', auth });
  const docs = google.docs({ version: 'v1', auth });

  const copy = await drive.files.copy({
    fileId: templateDocId,
    requestBody: {
      name: `Hyresavtal Norrskensstigen v${vecka} ${ar}`,
      parents: [folderId],
    },
  });
  const docId = copy.data.id;
  if (!docId) throw new Error('Drive did not return an id for the duplicated contract');

  const replacements: Record<string, string> = {
    '{{NAMN}}': namn,
    '{{TELEFON}}': telefon,
    '{{EPOST}}': epost,
    '{{AVTALSTID}}': avtalstid,
    '{{HYRESBELOPP}}': hyresbelopp,
  };
  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: {
      requests: Object.entries(replacements).map(([tag, value]) => ({
        replaceAllText: { containsText: { text: tag, matchCase: true }, replaceText: value },
      })),
    },
  });

  const pdf = await drive.files.export(
    { fileId: docId, mimeType: 'application/pdf' },
    { responseType: 'arraybuffer' },
  );
  return { docId, pdfBuffer: Buffer.from(pdf.data as ArrayBuffer) };
}
