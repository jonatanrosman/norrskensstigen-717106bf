import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Send, CalendarIcon, Info } from 'lucide-react';
import { format, isSaturday, nextSaturday, isAfter, isBefore, startOfDay } from 'date-fns';
import { sv, enGB, de } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// Winter season dates
const WINTER_SEASONS = [
  { start: new Date(2025, 11, 13), end: new Date(2026, 3, 19) }, // Dec 13, 2025 - Apr 19, 2026
];

const isWinterSeason = (date: Date): boolean => {
  return WINTER_SEASONS.some(
    (season) => isAfter(date, season.start) && isBefore(date, season.end) || 
                date.getTime() === season.start.getTime() ||
                date.getTime() === season.end.getTime()
  );
};

// Pricing data
const winterPricing = [
  { week: 51, dates: '13/12 - 20/12 2025', price: '8 500 kr', status: 'Bokad' },
  { week: 52, dates: '20/12 - 27/12 2025', price: '27 000 kr', status: 'Bokad' },
  { week: 1, dates: '27/12 2025 - 3/1 2026', price: '28 395 kr', status: 'Bokad' },
  { week: 2, dates: '3/1 - 10/1 2026', price: '13 595 kr', status: 'Bokad' },
  { week: 3, dates: '10/1 - 17/1 2026', price: '13 595 kr', status: 'Bokad' },
  { week: 4, dates: '17/1 - 24/1 2026', price: '12 000 kr', status: 'Ledig' },
  { week: 5, dates: '24/1 - 31/1 2026', price: '16 395 kr', status: 'Bokad' },
  { week: 6, dates: '31/1 - 7/2 2026', price: '17 000 kr', status: 'Bokad' },
  { week: 7, dates: '7/2 - 14/2 2026', price: '27 495 kr', status: 'Bokad' },
  { week: 8, dates: '14/2 - 21/2 2026', price: '27 495 kr', status: 'Bokad' },
  { week: 9, dates: '21/2 - 28/2 2026', price: '27 495 kr', status: 'Bokad' },
  { week: 10, dates: '28/2 - 7/3 2026', price: '22 000 kr', status: 'Bokad' },
  { week: 11, dates: '7/3 - 14/3 2026', price: '19 000 kr', status: 'Bokad' },
  { week: 12, dates: '14/3 - 21/3 2026', price: '19 000 kr', status: 'Bokad' },
  { week: 13, dates: '21/3 - 28/3 2026', price: '17 000 kr', status: 'Ledig' },
  { week: 14, dates: '28/3 - 4/4 2026', price: '23 000 kr', status: 'Ledig' },
  { week: 15, dates: '4/4 - 11/4 2026', price: '23 000 kr', status: 'Ledig' },
  { week: 16, dates: '11/4 - 19/4 2026', price: '13 000 kr', status: 'Ledig', note: '8 nätter' },
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

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    if (isBefore(date, today)) return true;
    if (isWinterSeason(date) && !isSaturday(date)) return true;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: t.contact.success });
    setFormData({ name: '', email: '', phone: '', message: '' });
    setCheckInDate(undefined);
    setIsSubmitting(false);
  };

  const checkInLabel = language === 'sv' ? 'Önskat ankomstdatum' : language === 'de' ? 'Gewünschtes Anreisedatum' : 'Preferred check-in date';
  const winterNotice = language === 'sv' ? 'Vintersäsong: Endast lördagar (lördag-lördag)' : language === 'de' ? 'Wintersaison: Nur Samstage (Samstag-Samstag)' : 'Winter season: Saturdays only (Saturday-Saturday)';
  const pricingTitle = language === 'sv' ? 'Priser vintersäsong 2025/2026' : language === 'de' ? 'Preise Wintersaison 2025/2026' : 'Winter Season 2025/2026 Pricing';
  const summerPricingTitle = language === 'sv' ? 'Vår, sommar & höst' : language === 'de' ? 'Frühling, Sommer & Herbst' : 'Spring, Summer & Autumn';
  const cleaningIncluded = language === 'sv' ? 'Slutstädning är inkluderat i priset.' : language === 'de' ? 'Endreinigung ist im Preis inbegriffen.' : 'Final cleaning is included in the price.';
  const weekLabel = language === 'sv' ? 'Vecka' : language === 'de' ? 'Woche' : 'Week';
  const statusBooked = language === 'sv' ? 'Bokad' : language === 'de' ? 'Gebucht' : 'Booked';
  const statusAvailable = language === 'sv' ? 'Ledig' : language === 'de' ? 'Verfügbar' : 'Available';

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pricing Section */}
            <div className="space-y-8">
              {/* Winter Pricing */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-elevated">
                <h3 className="font-serif text-2xl text-foreground mb-4">{pricingTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {cleaningIncluded}
                </p>
                <div className="max-h-[400px] overflow-y-auto pr-2">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-card">
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-medium text-muted-foreground">{weekLabel}</th>
                        <th className="text-left py-2 font-medium text-muted-foreground">Datum</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Pris</th>
                        <th className="text-right py-2 font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {winterPricing.map((row) => (
                        <tr key={row.week} className="border-b border-border/50">
                          <td className="py-2 text-foreground">{row.week}</td>
                          <td className="py-2 text-foreground text-xs">{row.dates}{row.note && <span className="text-muted-foreground ml-1">({row.note})</span>}</td>
                          <td className="py-2 text-right font-medium text-foreground">{row.price}</td>
                          <td className="py-2 text-right">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              row.status === 'Ledig' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}>
                              {row.status === 'Ledig' ? statusAvailable : statusBooked}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summer Pricing */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-serif text-xl text-foreground mb-3">{summerPricingTitle}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>{language === 'sv' ? 'Vecka' : language === 'de' ? 'Woche' : 'Week'}</span>
                    <span className="font-medium text-foreground">5 500 SEK</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{language === 'sv' ? 'Långhelg (3 nätter)' : language === 'de' ? 'Langes Wochenende (3 Nächte)' : 'Long weekend (3 nights)'}</span>
                    <span className="font-medium text-foreground">4 000 SEK</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 shadow-elevated space-y-6 h-fit">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t.contact.name} *
                </label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="h-12" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t.contact.email} *
                </label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="h-12" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  {t.contact.phone} *
                </label>
                <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="h-12" />
              </div>

              {/* Check-in Date */}
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
                    <Calendar mode="single" selected={checkInDate} onSelect={handleCheckInSelect} disabled={disabledDays} locale={dateLocale} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                {isWinter && (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <Info className="w-3 h-3" /> {winterNotice}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {t.contact.message} *
                </label>
                <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows={4} className="resize-none" />
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? '...' : t.contact.send}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
