import { format } from 'date-fns';
import { parseWeekStartDate } from '@/lib/weekDates';
import { getSupabaseServerClient } from './supabaseServer';

export type WinterWeek = {
  id: string;
  week: number;
  dates: string;
  price_sek: number;
  status: string;
  note: string | null;
  sort_order: number;
};

export async function fetchWinterWeeks(): Promise<WinterWeek[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('winter_weeks')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

/**
 * Matches a "yyyy-MM-dd" check-in date against the week whose date range
 * starts on that day. Winter weeks always run Saturday-to-Saturday and the
 * site only lets visitors pick a week's start date, so an exact match on
 * the parsed start date is sufficient — never recompute week boundaries.
 */
export function matchWeekForDate(weeks: WinterWeek[], checkInDateISO: string | undefined): WinterWeek | undefined {
  if (!checkInDateISO) return undefined;
  return weeks.find((w) => {
    const start = parseWeekStartDate(w.dates);
    if (Number.isNaN(start.getTime())) return false;
    return format(start, 'yyyy-MM-dd') === checkInDateISO;
  });
}

export function formatWeekLine(week: WinterWeek): string {
  const note = week.note ? ` (${week.note})` : '';
  return `Vecka ${week.week}, ${week.dates}${note} – ${week.price_sek.toLocaleString('sv-SE')} kr`;
}

export function getAvailableWeeks(weeks: WinterWeek[]): WinterWeek[] {
  return weeks.filter((w) => w.status === 'Available');
}
