import { useLanguage } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const formatPrice = (priceSek: number, language: 'sv' | 'en' | 'de') =>
  language === 'sv'
    ? `${priceSek.toLocaleString('sv-SE')} kr`
    : `${priceSek.toLocaleString('sv-SE')} SEK`;

export const PricingSection = () => {
  const { t, language } = useLanguage();

  const { data: winterPricing = [] } = useQuery({
    queryKey: ['winter-weeks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('winter_weeks')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const pricingTitle = language === 'sv' ? 'Priser vintersäsong 2026/2027' : language === 'de' ? 'Preise Wintersaison 2026/2027' : 'Winter Season 2026/2027 Pricing';
  const summerPricingTitle = language === 'sv' ? 'Vår, sommar & höst' : language === 'de' ? 'Frühling, Sommer & Herbst' : 'Spring, Summer & Autumn';
  const weekLabel = language === 'sv' ? 'Vecka' : language === 'de' ? 'Woche' : 'Week';
  const statusBooked = language === 'sv' ? 'Bokad' : language === 'de' ? 'Gebucht' : 'Booked';
  const statusAvailable = language === 'sv' ? 'Ledig' : language === 'de' ? 'Verfügbar' : 'Available';
  const sectionTitle = language === 'sv' ? 'Priser' : language === 'de' ? 'Preise' : 'Pricing';

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {sectionTitle}
            </h2>
          </div>

          <div className="space-y-8">
            {/* Winter Pricing */}
            <div className="bg-card rounded-3xl p-6 md:p-8 shadow-elevated">
              <h3 className="font-serif text-2xl text-foreground mb-4">{pricingTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{t.booking.cleaningNote}</span>
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-medium text-muted-foreground">{weekLabel}</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">{language === 'sv' ? 'Datum' : language === 'de' ? 'Datum' : 'Date'}</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">{language === 'sv' ? 'Pris' : language === 'de' ? 'Preis' : 'Price'}</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">{language === 'sv' ? 'Status' : language === 'de' ? 'Status' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winterPricing.map((row) => (
                      <tr key={row.week} className="border-b border-border/50">
                        <td className="py-2 text-foreground">{row.week}</td>
                        <td className="py-2 text-foreground">
                          <div className="text-sm leading-tight">
                            {row.dates}
                            {row.note && <div className="text-xs text-muted-foreground">{row.note}</div>}
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          <span className="font-medium text-foreground">{formatPrice(row.price_sek, language)}</span>
                        </td>
                        <td className="py-2 text-right">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              row.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}
                          >
                            {row.status === 'Available' ? statusAvailable : statusBooked}
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
        </div>
      </div>
    </section>
  );
};