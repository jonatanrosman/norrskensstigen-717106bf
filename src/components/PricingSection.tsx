import { useLanguage } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const winterPricing = [
  { week: 51, dates: '13/12 - 20/12 2025', price: '8 500 kr', status: 'Bokad' },
  { week: 52, dates: '20/12 - 27/12 2025', price: '27 000 kr', status: 'Bokad' },
  { week: 1, dates: '27/12 2025 - 3/1 2026', price: '28 395 kr', status: 'Bokad' },
  { week: 2, dates: '3/1 - 10/1 2026', price: '13 595 kr', status: 'Bokad' },
  { week: 3, dates: '10/1 - 17/1 2026', price: '13 595 kr', status: 'Bokad' },
  { week: 4, dates: '17/1 - 24/1 2026', price: '9 900 kr', status: 'Bokad' },
  { week: 5, dates: '24/1 - 31/1 2026', price: '16 395 kr', status: 'Bokad' },
  { week: 6, dates: '31/1 - 7/2 2026', price: '17 000 kr', status: 'Bokad' },
  { week: 7, dates: '7/2 - 14/2 2026', price: '27 495 kr', status: 'Bokad' },
  { week: 8, dates: '14/2 - 21/2 2026', price: '27 495 kr', status: 'Bokad' },
  { week: 9, dates: '21/2 - 28/2 2026', price: '27 495 kr', status: 'Bokad' },
  { week: 10, dates: '28/2 - 7/3 2026', price: '22 000 kr', status: 'Bokad' },
  { week: 11, dates: '7/3 - 14/3 2026', price: '19 000 kr', status: 'Bokad' },
  { week: 12, dates: '14/3 - 21/3 2026', price: '19 000 kr', status: 'Bokad' },
  { week: 13, dates: '21/3 - 28/3 2026', price: '17 000 kr', status: 'Bokad' },
  { week: 14, dates: '28/3 - 4/4 2026', price: '23 000 kr', status: 'Ledig' },
  { week: 15, dates: '4/4 - 11/4 2026', price: '23 000 kr', status: 'Ledig' },
  { week: 16, dates: '11/4 - 19/4 2026', price: '13 000 kr', status: 'Ledig', note: '8 nätter' },
];

export const PricingSection = () => {
  const { language } = useLanguage();

  const pricingTitle = language === 'sv' ? 'Priser vintersäsong 2025/2026' : language === 'de' ? 'Preise Wintersaison 2025/2026' : 'Winter Season 2025/2026 Pricing';
  const summerPricingTitle = language === 'sv' ? 'Vår, sommar & höst' : language === 'de' ? 'Frühling, Sommer & Herbst' : 'Spring, Summer & Autumn';
  const cleaningIncluded = language === 'sv' ? 'Slutstädning är inkluderat i priset.' : language === 'de' ? 'Endreinigung ist im Preis inbegriffen.' : 'Final cleaning is included in the price.';
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
              <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                {cleaningIncluded}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
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
                        <td className="py-2 text-foreground">
                          <div className="text-sm leading-tight">
                            {row.dates}
                            {row.note && <div className="text-xs text-muted-foreground">{row.note}</div>}
                          </div>
                        </td>
                        <td className="py-2 text-right">
                          <span className="font-medium text-foreground">{row.price}</span>
                        </td>
                        <td className="py-2 text-right">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              row.status === 'Ledig' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            )}
                          >
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
        </div>
      </div>
    </section>
  );
};