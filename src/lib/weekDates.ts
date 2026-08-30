import { parse } from 'date-fns';

/**
 * Parses the start date out of a winter_weeks "dates" string, e.g.
 * "13/2 - 20/2 2027" or "26/12 2026 - 2/1 2027" (year only appears once,
 * attached to whichever side of the range it belongs to).
 */
export function parseWeekStartDate(range: string): Date {
  const [startPartRaw] = range.split('-');
  const startPart = (startPartRaw || '').trim();
  const years = (range.match(/\b\d{4}\b/g) || []).map((y) => Number(y));
  const yearFromStart = (startPart.match(/\b\d{4}\b/) || [])[0];
  const year = yearFromStart ? Number(yearFromStart) : years[0];
  const dm = startPart.replace(/\b\d{4}\b/, '').trim();
  return parse(`${dm} ${year}`, 'd/M yyyy', new Date());
}

/** First calendar year mentioned in a "dates" range string, e.g. "2027" from "13/2 - 20/2 2027". */
export function parseWeekYear(range: string): string {
  const years = range.match(/\b\d{4}\b/g) || [];
  return years[0] || '';
}
