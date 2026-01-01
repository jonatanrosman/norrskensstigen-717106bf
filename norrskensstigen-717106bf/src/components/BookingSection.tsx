import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, isSaturday, nextSaturday, isWithinInterval, startOfDay } from 'date-fns';
import { sv, enUS, de } from 'date-fns/locale';
import { CalendarIcon, Users, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Winter season dates (these could be made configurable)
const WINTER_SEASONS = [
  { start: new Date(2025, 11, 13), end: new Date(2026, 3, 19) }, // Dec 13, 2025 - Apr 19, 2026
  { start: new Date(2026, 11, 12), end: new Date(2027, 3, 18) }, // Dec 12, 2026 - Apr 18, 2027
];

const isWinterSeason = (date: Date): boolean => {
  return WINTER_SEASONS.some(season => 
    isWithinInterval(startOfDay(date), { start: startOfDay(season.start), end: startOfDay(season.end) })
  );
};

const getNextWinterSaturday = (date: Date): Date => {
  if (isSaturday(date)) return date;
  return nextSaturday(date);
};

export const BookingSection = () => {
  const { t, language } = useLanguage();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<string>('');
  const [isWinter, setIsWinter] = useState(false);

  const locales = { sv, en: enUS, de };
  const currentLocale = locales[language];

  useEffect(() => {
    if (checkIn) {
      const winterCheck = isWinterSeason(checkIn);
      setIsWinter(winterCheck);
      
      if (winterCheck) {
        // Auto-set checkout to 7 days later (Saturday to Saturday)
        setCheckOut(addDays(checkIn, 7));
      }
    }
  }, [checkIn]);

  const handleCheckInSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (isWinterSeason(date)) {
      // Force Saturday selection for winter
      const saturday = getNextWinterSaturday(date);
      setCheckIn(saturday);
      setCheckOut(addDays(saturday, 7));
    } else {
      setCheckIn(date);
      setCheckOut(undefined);
    }
  };

  const handleBooking = () => {
    const params = new URLSearchParams({
      checkIn: checkIn?.toISOString() || '',
      checkOut: checkOut?.toISOString() || '',
      guests: guests,
    });
    
    console.log('Booking params:', params.toString());
    
    alert(language === 'sv' 
      ? 'Bokningsförfrågan skickad! Vi kontaktar dig inom 24 timmar.' 
      : language === 'de'
      ? 'Buchungsanfrage gesendet! Wir kontaktieren Sie innerhalb von 24 Stunden.'
      : 'Booking request sent! We will contact you within 24 hours.');
  };

  const disabledCheckInDays = (date: Date) => {
    if (date < new Date()) return true;
    if (isWinterSeason(date) && !isSaturday(date)) return true;
    return false;
  };

  const disabledCheckOutDays = (date: Date) => {
    if (!checkIn) return true;
    if (date <= checkIn) return true;
    if (isWinter) {
      // During winter, only allow exactly 7 days after check-in
      const expectedCheckout = addDays(checkIn, 7);
      return date.getTime() !== expectedCheckout.getTime();
    }
    return false;
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-gradient-winter relative overflow-hidden">
      {/* Aurora effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-aurora-green/30 rounded-full blur-[100px] animate-aurora" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[250px] bg-aurora-blue/25 rounded-full blur-[80px] animate-aurora delay-300" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4">
              {t.booking.title}
            </h2>
            <p className="text-lg text-primary-foreground/70">
              {t.booking.subtitle}
            </p>
          </div>

          {/* Winter Season Notice */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary-foreground/80 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-primary-foreground/80">
              {t.booking.winterNotice}
            </p>
          </div>

          {/* Booking Form */}
          <div className="bg-card/95 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-elevated">
            {/* Season Indicator */}
            {checkIn && (
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6",
                isWinter 
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              )}>
                {isWinter ? t.booking.winterSeason : t.booking.otherSeason}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Check-in */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.booking.checkIn}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-14",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP", { locale: currentLocale }) : <span>---</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={handleCheckInSelect}
                      initialFocus
                      locale={currentLocale}
                      disabled={disabledCheckInDays}
                    />
                    <div className="p-3 border-t text-xs text-muted-foreground">
                      {language === 'sv' 
                        ? 'Vintersäsong: Endast lördagar valbara' 
                        : language === 'de'
                        ? 'Wintersaison: Nur Samstage wählbar'
                        : 'Winter season: Only Saturdays selectable'}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.booking.checkOut}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-14",
                        !checkOut && "text-muted-foreground",
                        isWinter && "opacity-70 cursor-not-allowed"
                      )}
                      disabled={isWinter}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP", { locale: currentLocale }) : <span>---</span>}
                    </Button>
                  </PopoverTrigger>
                  {!isWinter && (
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                        locale={currentLocale}
                        disabled={disabledCheckOutDays}
                      />
                    </PopoverContent>
                  )}
                </Popover>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t.booking.guests}</label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="h-14">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {i + 1} {language === 'sv' ? 'gäster' : language === 'de' ? 'Gäste' : 'guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full"
              onClick={handleBooking}
              disabled={!checkIn || !checkOut || !guests}
            >
              {t.booking.checkAvailability}
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>

            {/* Sync Note */}
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
              <span>{t.booking.syncNote}</span>
            </div>
          </div>

          {/* External Booking Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="https://airbnb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-card/50 backdrop-blur-sm rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-card/70 transition-all duration-300"
            >
              <span className="font-medium">Airbnb</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
