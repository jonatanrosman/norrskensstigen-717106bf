import { useLanguage } from '@/contexts/LanguageContext';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const winterPricing = [
  { week: 50, dates: '5/12 - 12/12 2026', priceKr: '5 000 kr', priceSek: '5 000 SEK', status: 'Ledig', note: 'Grand opening' },
  { week: 51, dates: '12/12 - 19/12 2026', priceKr: '9 000 kr', priceSek: '9 000 SEK', status: 'Ledig' },
  { week: 52, dates: '19/12 - 26/12 2026', priceKr: '27 500 kr', priceSek: '27 500 SEK', status: 'Ledig', note: 'Julveckan' },
  { week: 53, dates: '26/12 2026 - 2/1 2027', priceKr: '29 000 kr', priceSek: '29 000 SEK', status: 'Ledig', note: 'Nyårsveckan' },
  { week: 1, dates: '2/1 - 9/1 2027', priceKr: '13 795 kr', priceSek: '13 795 SEK', status: 'Bokad' },
  { week: 2, dates: '9/1 - 16/1 2027', priceKr: '10 095 kr', priceSek: '10 095 SEK', status: 'Bokad' },
  { week: 3, dates: '16/1 - 23/1 2027', priceKr: '11 000 kr', priceSek: '11 000 SEK', status: 'Ledig' },
  { week: 4, dates: '23/1 - 30/1 2027', priceKr: '15 500 kr', priceSek: '15 500 SEK', status: 'Ledig' },
  { week: 5, dates: '30/1 - 6/2 2027', priceKr: '17 500 kr', priceSek: '17 500 SEK', status: 'Bokad' },
  { week: 6, dates: '6/2 - 13/2 2027', priceKr: '19 500 kr', priceSek: '19 500 SEK', status: 'Bokad' },
  { week: 7, dates: '13/2 - 20/2 2027', priceKr: '28 000 kr', priceSek: '28 000 SEK', status: 'Ledig', note: 'Sportlov' },
  { week: 8, dates: '20/2 - 27/2 2027', priceKr: '28 000 kr', priceSek: '28 000 SEK', status: 'Ledig', note: 'Sportlov' },
  { week: 9, dates: '27/2 - 6/3 2027', priceKr: '28 000 kr', priceSek: '28 000 SEK', status: 'Ledig', note: 'Sportlov' },
  { week: 10, dates: '6/3 - 13/3 2027', priceKr: '21 000 kr', priceSek: '21 000 SEK', status: 'Ledig', note: 'Sportlov' },
  { week: 11, dates: '13/3 - 20/3 2027', priceKr: '19 500 kr', priceSek: '19 500 SEK', status: 'Bokad' },
  { week: 12, dates: '20/3 - 27/3 2027', priceKr: '23 500 kr', priceSek: '23 500 SEK', status: 'Ledig', note: 'Påsk' },
  { week: 13, dates: '27/3 - 3/4 2027', priceKr: '23 500 kr', priceSek: '23 500 SEK', status: 'Ledig', note: 'Påsk' },
  { week: 14, dates: '3/4 - 11/4 2027', priceKr: '14 000 kr', priceSek: '14 000 SEK', status: 'Ledig' },
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
                          <span className="font-medium text-foreground">{language === 'sv' ? row.priceKr : row.priceSek}</span>
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