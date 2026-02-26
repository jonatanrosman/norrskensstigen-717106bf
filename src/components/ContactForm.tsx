import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Send, CalendarIcon, Info } from 'lucide-react';
import { format, isSaturday, nextSaturday, isAfter, isBefore, startOfDay, parse } from 'date-fns';
import { sv, enGB, de } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const WINTER_SEASONS = [
  { start: new Date(2025, 11, 13), end: new Date(2026, 3, 19) },
];

const isWinterSeason = (date: Date): boolean => {
  return WINTER_SEASONS.some(
    (season) => isAfter(date, season.start) && isBefore(date, season.end) || 
                date.getTime() === season.start.getTime() ||
                date.getTime() === season.end.getTime()
  );
};

const winterPricing = [
  { week: 51, dates: '13/12 - 20/12 2025', status: 'Bokad' },
  { week: 52, dates: '20/12 - 27/12 2025', status: 'Bokad' },
  { week: 1, dates: '27/12 2025 - 3/1 2026', status: 'Bokad' },
  { week: 2, dates: '3/1 - 10/1 2026', status: 'Bokad' },
  { week: 3, dates: '10/1 - 17/1 2026', status: 'Bokad' },
  { week: 4, dates: '17/1 - 24/1 2026', status: 'Ledig' },
  { week: 5, dates: '24/1 - 31/1 2026', status: 'Bokad' },
  { week: 6, dates: '31/1 - 7/2 2026', status: 'Bokad' },
  { week: 7, dates: '7/2 - 14/2 2026', status: 'Bokad' },
  { week: 8, dates: '14/2 - 21/2 2026', status: 'Bokad' },
  { week: 9, dates: '21/2 - 28/2 2026', status: 'Bokad' },
  { week: 10, dates: '28/2 - 7/3 2026', status: 'Bokad' },
  { week: 11, dates: '7/3 - 14/3 2026', status: 'Bokad' },
  { week: 12, dates: '14/3 - 21/3 2026', status: 'Bokad' },
  { week: 13, dates: '21/3 - 28/3 2026', status: 'Ledig' },
  { week: 14, dates: '28/3 - 4/4 2026', status: 'Ledig' },
  { week: 15, dates: '4/4 - 11/4 2026', status: 'Ledig' },
  { week: 16, dates: '11/4 - 19/4 2026', status: 'Ledig' },
];

export const ContactForm = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const dateLocale = language === 'sv' ? sv : language === 'de' ? de : enGB;

  const isWinter = useMemo(() => {
    if (!checkInDate) return false;
    return isWinterSeason(checkInDate);
  }, [checkInDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    if (!date) {
      setCheckInDate(undefined);
      return;
    }
    
    if (isWinterSeason(date) && !isSaturday(date)) {
      setCheckInDate(nextSaturday(date));
    } else {
      setCheckInDate(date);
    }
  };

  const bookedWinterCheckInDays = useMemo(() => {
    const parseStartDate = (range: string) => {
      const [startPartRaw] = range.split('-');
      const startPart = (startPartRaw || '').trim();
      const years = (range.match(/\b\d{4}\b/g) || []).map((y) => Number(y));
      const yearFromStart = (startPart.match(/\b\d{4}\b/) || [])[0];
      const year = yearFromStart ? Number(yearFromStart) : years[0];
      const dm = startPart.replace(/\b\d{4}\b/, '').trim();
      return parse(`${dm} ${year}`, 'd/M yyyy', new Date());
    };

    return winterPricing
      .filter((row) => row.status === 'Bokad')
      .map((row) => startOfDay(parseStartDate(row.dates)))
      .filter((d) => !Number.isNaN(d.getTime()));
  }, []);

  const disabledDays = (date: Date) => {
    const day = startOfDay(date);
    const today = startOfDay(new Date());
    if (isBefore(day, today)) return true;

    if (isWinterSeason(day)) {
      if (!isSaturday(day)) return true;
      if (bookedWinterCheckInDays.some((d) => d.getTime() === day.getTime())) return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          checkInDate: checkInDate ? format(checkInDate, 'PPP', { locale: dateLocale }) : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.details || errorData.error || '';
        throw new Error(detail || 'Failed to send email');
      }

      toast({ 
        title: language === 'sv' ? 'Meddelandet skickat!' : language === 'de' ? 'Nachricht gesendet!' : 'Message sent!',
        description: language === 'sv' ? 'Vi återkommer till dig inom 24 timmar.' : language === 'de' ? 'Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.' : 'We will get back to you within 24 hours.'
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      setCheckInDate(undefined);
    } catch (error) {
      console.error('Error sending email:', error);
      const errorDetail = error instanceof Error ? error.message : '';
      const fallbackMsg = language === 'sv' 
        ? 'Vänligen försök igen eller kontakta oss direkt på info@norrskensstigen.se' 
        : language === 'de' 
        ? 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter info@norrskensstigen.se' 
        : 'Please try again or contact us directly at info@norrskensstigen.se';
      
      toast({ 
        title: language === 'sv' ? 'Något gick fel' : language === 'de' ? 'Etwas ist schief gelaufen' : 'Something went wrong',
        description: errorDetail 
          ? `${errorDetail}. ${fallbackMsg}` 
          : fallbackMsg,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const checkInLabel = language === 'sv' ? 'Önskat ankomstdatum' : language === 'de' ? 'Gewünschtes Anreisedatum' : 'Preferred check-in date';
  const winterNotice = language === 'sv' ? 'Vintersäsong: Endast lördagar (lördag-lördag)' : language === 'de' ? 'Wintersaison: Nur Samstage (Samstag-Samstag)' : 'Winter season: Saturdays only (Saturday-Saturday)';

  return (
    <section id="contact" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-background rounded-3xl p-8 md:p-10 shadow-elevated space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">{t.contact.name} *</label>
              <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="h-12" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">{t.contact.email} *</label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="h-12" />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">{t.contact.phone} *</label>
              <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="h-12" placeholder="+46 705 85 58 55" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{checkInLabel}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full h-12 justify-start text-left font-normal", !checkInDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, 'PPP', { locale: dateLocale }) : <span>{language === 'sv' ? 'Välj datum' : language === 'de' ? 'Datum wählen' : 'Pick a date'}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkInDate} onSelect={handleCheckInSelect} disabled={disabledDays} locale={dateLocale} initialFocus showWeekNumber className="pointer-events-auto" />
                </PopoverContent>
              </Popover>
              {isWinter && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <Info className="w-3 h-3" /> {winterNotice}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">{t.contact.message} *</label>
              <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={4} className="resize-none" />
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (language === 'sv' ? 'Skickar...' : language === 'de' ? 'Wird gesendet...' : 'Sending...') : t.contact.send}
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};