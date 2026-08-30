import { parseWeekYear } from '@/lib/weekDates';
import { fetchWinterWeeks, matchWeekForDate, getAvailableWeeks } from './winterWeeks';
import { buildAvailableEmail, buildBookedEmail, buildUnknownEmail, type DraftLanguage } from './emailTemplates';
import { fillContract } from './contractTemplate';
import { createAppleMailDraft } from './appleMailDraft';

type CreateBookingDraftParams = {
  name: string;
  email: string;
  phone: string;
  message: string;
  checkInDate?: string;
  checkInDateISO?: string;
  language?: string;
};

// These are notes-to-self for Jonatan (who reads Swedish), prepended to the
// draft body regardless of which language the customer-facing text below
// them is written in — he removes them before sending either way.
const RUT_NOTE_SV =
  'OBS: kontrollera om kunden kan nyttja RUT-avdrag — annars tillkommer 1 108 kr, justera hyresbeloppet i avtalet innan det skickas.\n\n';
const CONTRACT_FAILED_NOTE_SV =
  'OBS: kunde inte generera hyresavtal automatiskt (se serverloggar) — bifoga manuellt innan du skickar.\n\n';

function toDraftLanguage(language: string | undefined): DraftLanguage {
  return language === 'en' || language === 'de' ? language : 'sv';
}

/**
 * Best-effort: never throws. Any failure is logged and swallowed so it can
 * never block the notification email in send-email.ts.
 */
export async function createBookingDraft(params: CreateBookingDraftParams): Promise<void> {
  try {
    const language = toDraftLanguage(params.language);
    const weeks = await fetchWinterWeeks();
    const matched = matchWeekForDate(weeks, params.checkInDateISO);

    if (!matched) {
      const { subject, text } = buildUnknownEmail({
        name: params.name,
        email: params.email,
        phone: params.phone,
        message: params.message,
        checkInDateLabel: params.checkInDate,
      });
      await createAppleMailDraft({ to: params.email, subject, text });
      return;
    }

    if (matched.status === 'Booked') {
      const { subject, text } = buildBookedEmail(language, {
        name: params.name,
        requestedWeek: matched.week,
        requestedYear: parseWeekYear(matched.dates),
        availableWeeks: getAvailableWeeks(weeks),
      });
      await createAppleMailDraft({ to: params.email, subject, text });
      return;
    }

    // Available: try to generate + attach the contract, but a failure here
    // must not stop the draft from being created (see CONTRACT_FAILED_NOTE_SV).
    const year = parseWeekYear(matched.dates);
    let attachmentPdf: { filename: string; content: Buffer } | undefined;
    let leadNote = '';
    try {
      const { pdfBuffer } = await fillContract({
        namn: params.name,
        telefon: params.phone,
        epost: params.email,
        avtalstid: `Vecka ${matched.week}, ${matched.dates}`,
        hyresbelopp: matched.price_sek.toLocaleString('sv-SE'),
        vecka: String(matched.week),
        ar: year,
      });
      attachmentPdf = { filename: `Hyresavtal Norrskensstigen v${matched.week} ${year}.pdf`, content: pdfBuffer };
    } catch (contractError) {
      console.error('createBookingDraft: contract generation failed:', contractError);
      leadNote += CONTRACT_FAILED_NOTE_SV;
    }
    leadNote += RUT_NOTE_SV;

    const { subject, text } = buildAvailableEmail(language, { name: params.name, week: matched });
    await createAppleMailDraft({ to: params.email, subject, text: `${leadNote}${text}`, attachmentPdf });
  } catch (error) {
    console.error('createBookingDraft: failed, notification email was still sent:', error);
  }
}
