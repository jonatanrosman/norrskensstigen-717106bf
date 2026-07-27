import { useLanguage } from '@/contexts/LanguageContext';

export const PricingSection = () => {
  const { language } = useLanguage();

  const sectionTitle = language === 'sv' ? 'Priser' : language === 'de' ? 'Preise' : 'Pricing';
  const comingSoon =
    language === 'sv'
      ? 'Priser för vintersäsongen 2026/2027 kommer snart'
      : language === 'de'
      ? 'Preise für die Wintersaison 2026/2027 folgen in Kürze'
      : 'Pricing for the 2026/2027 winter season coming soon';

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            {sectionTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {comingSoon}
          </p>
        </div>
      </div>
    </section>
  );
};