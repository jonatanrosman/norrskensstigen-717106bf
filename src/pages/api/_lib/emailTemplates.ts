import type { WinterWeek } from './winterWeeks';
import { formatWeekLine } from './winterWeeks';
import { parseWeekYear as yearFromDates } from '@/lib/weekDates';

export type DraftLanguage = 'sv' | 'en' | 'de';

type AvailableParams = { name: string; week: WinterWeek };
type BookedParams = { name: string; requestedWeek: number | undefined; requestedYear: string; availableWeeks: WinterWeek[] };
type UnknownParams = {
  name: string;
  email: string;
  phone: string;
  message: string;
  checkInDateLabel: string | undefined;
};

const AVAILABLE_TEMPLATES: Record<DraftLanguage, (p: AvailableParams) => { subject: string; text: string }> = {
  sv: ({ name, week }) => ({
    subject: `Hyresavtal – vecka ${week.week}, ${yearFromDates(week.dates)}`,
    text: `Hej ${name},

Så roligt att ni är intresserade av att hyra vår stuga i Stöten. Jag bifogar här ett hyresavtal för vecka ${week.week}, ${yearFromDates(week.dates)}. Ni bekräftar bokningen genom att föra över 800 SEK enligt anvisningarna i hyresavtalet. När det är gjort får ni gärna fylla i era uppgifter i avtalet, signera (digitalt går utmärkt om ni föredrar att inte skriva ut) och skicka tillbaka till oss så signerar vi det slutgiltiga avtalet.

Tveka inte att höra av er om ni har några frågor!

Allt gott,
Jonatan`,
  }),
  en: ({ name, week }) => ({
    subject: `Rental agreement – week ${week.week}, ${yearFromDates(week.dates)}`,
    text: `Hi ${name},

So glad to hear you're interested in renting our cabin in Stöten. I've attached a rental agreement for week ${week.week}, ${yearFromDates(week.dates)}. You confirm the booking by transferring 800 SEK according to the instructions in the agreement. Once that's done, feel free to fill in your details in the agreement, sign it (a digital signature works great if you'd rather not print it out) and send it back to us so we can countersign the final agreement.

Don't hesitate to reach out if you have any questions!

All the best,
Jonatan`,
  }),
  de: ({ name, week }) => ({
    subject: `Mietvertrag – Woche ${week.week}, ${yearFromDates(week.dates)}`,
    text: `Hallo ${name},

wie schön, dass Sie Interesse an unserer Hütte in Stöten haben. Ich habe einen Mietvertrag für Woche ${week.week}, ${yearFromDates(week.dates)} beigefügt. Sie bestätigen die Buchung, indem Sie 800 SEK gemäß den Anweisungen im Mietvertrag überweisen. Sobald das erledigt ist, tragen Sie gerne Ihre Daten in den Vertrag ein, unterschreiben ihn (eine digitale Unterschrift ist völlig in Ordnung, falls Sie ihn nicht ausdrucken möchten) und senden ihn an uns zurück, damit wir den endgültigen Vertrag gegenzeichnen können.

Zögern Sie nicht, sich bei Fragen zu melden!

Alles Gute,
Jonatan`,
  }),
};

const BOOKED_TEMPLATES: Record<DraftLanguage, (p: BookedParams) => { subject: string; text: string }> = {
  sv: ({ name, requestedWeek, requestedYear, availableWeeks }) => ({
    subject: `Vecka ${requestedWeek ?? ''} är tyvärr bokad – andra lediga veckor`,
    text: `Hej ${name},

Tack för din förfrågan om vecka ${requestedWeek ?? ''}, ${requestedYear} – just den veckan är tyvärr redan bokad. Här är våra lediga veckor just nu, om någon annan skulle passa:

${availableWeeks.map((w) => `- ${formatWeekLine(w)}`).join('\n')}

Säg till om någon av dem passar er, så skickar jag över ett hyresavtal!

Allt gott,
Jonatan`,
  }),
  en: ({ name, requestedWeek, requestedYear, availableWeeks }) => ({
    subject: `Week ${requestedWeek ?? ''} is unfortunately booked – other available weeks`,
    text: `Hi ${name},

Thanks for your inquiry about week ${requestedWeek ?? ''}, ${requestedYear} – unfortunately that week is already booked. Here are our currently available weeks, in case another one would work for you:

${availableWeeks.map((w) => `- ${formatWeekLine(w)}`).join('\n')}

Let me know if any of these work for you, and I'll send over a rental agreement!

All the best,
Jonatan`,
  }),
  de: ({ name, requestedWeek, requestedYear, availableWeeks }) => ({
    subject: `Woche ${requestedWeek ?? ''} ist leider ausgebucht – andere verfügbare Wochen`,
    text: `Hallo ${name},

vielen Dank für Ihre Anfrage zu Woche ${requestedWeek ?? ''}, ${requestedYear} – diese Woche ist leider bereits ausgebucht. Hier sind unsere derzeit verfügbaren Wochen, falls eine andere passen würde:

${availableWeeks.map((w) => `- ${formatWeekLine(w)}`).join('\n')}

Sagen Sie mir gerne Bescheid, falls eine davon passt, dann schicke ich Ihnen einen Mietvertrag!

Alles Gute,
Jonatan`,
  }),
};

export function buildAvailableEmail(language: DraftLanguage, params: AvailableParams) {
  return (AVAILABLE_TEMPLATES[language] ?? AVAILABLE_TEMPLATES.sv)(params);
}

export function buildBookedEmail(language: DraftLanguage, params: BookedParams) {
  return (BOOKED_TEMPLATES[language] ?? BOOKED_TEMPLATES.sv)(params);
}

// This one is a note-to-self for Jonatan, not a customer-facing reply, so it
// always stays in Swedish regardless of the customer's chosen language.
export function buildUnknownEmail({ name, email, phone, message, checkInDateLabel }: UnknownParams) {
  return {
    subject: `Bokningsförfrågan utanför vintertabellen – kolla manuellt (${name})`,
    text: `[Automatiskt utkast: önskat datum (${checkInDateLabel ?? 'inget angivet'}) matchade ingen rad i vinterveckotabellen — troligen en förfrågan för vår/sommar/höst, eller ett datum utanför säsongen. Skriv svaret själv, ingen mall finns ännu för den här säsongen.]

Namn: ${name}
E-post: ${email}
Telefon: ${phone}
Önskat datum: ${checkInDateLabel ?? '(inget angivet)'}

Meddelande:
${message}`,
  };
}
