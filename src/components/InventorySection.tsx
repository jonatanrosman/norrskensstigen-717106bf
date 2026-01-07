import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ChefHat, 
  Shirt, 
  Baby, 
  TreePine, 
  ShieldCheck,
  Tv,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type InventoryCategory = {
  icon: React.ComponentType<{ className?: string }>;
  title: { sv: string; en: string; de: string };
  items: { sv: string; en: string; de: string }[];
};

const inventoryData: InventoryCategory[] = [
  {
    icon: ChefHat,
    title: { sv: 'Kök', en: 'Kitchen', de: 'Küche' },
    items: [
      { sv: 'Diskmaskin', en: 'Dishwasher', de: 'Geschirrspüler' },
      { sv: 'Microvågsugn', en: 'Microwave', de: 'Mikrowelle' },
      { sv: 'Induktionshäll', en: 'Induction cooktop', de: 'Induktionskochfeld' },
      { sv: 'Kastruller (5L x2, 3L, 1L)', en: 'Pots (5L x2, 3L, 1L)', de: 'Töpfe (5L x2, 3L, 1L)' },
      { sv: 'Stekpannor (28cm x2)', en: 'Frying pans (28cm x2)', de: 'Bratpfannen (28cm x2)' },
      { sv: 'Kaffebryggare', en: 'Coffee maker', de: 'Kaffeemaschine' },
      { sv: 'Vattenkokare', en: 'Electric kettle', de: 'Wasserkocher' },
      { sv: 'Dubbel brödrost', en: 'Double toaster', de: 'Doppeltoaster' },
      { sv: 'Stavmixer', en: 'Immersion blender', de: 'Stabmixer' },
      { sv: 'Elvisp', en: 'Electric mixer', de: 'Elektrischer Mixer' },
      { sv: 'Dubbelt våffeljärn', en: 'Double waffle iron', de: 'Doppelwaffeleisen' },
      { sv: 'Glas till de flesta olika drycker', en: 'Glasses for most beverages', de: 'Gläser für die meisten Getränke' },
      { sv: 'Champagnekylare', en: 'Champagne cooler', de: 'Champagnerkühler' },
      { sv: 'Porslin, muggar, bunkar m.m.', en: 'Porcelain, mugs, bowls, etc.', de: 'Porzellan, Tassen, Schüsseln usw.' },
    ],
  },
  {
    icon: Shirt,
    title: { sv: 'Klädvård / Tvätt', en: 'Laundry', de: 'Wäschepflege' },
    items: [
      { sv: 'Tvättmaskin', en: 'Washing machine', de: 'Waschmaschine' },
      { sv: 'Torkställning', en: 'Drying rack', de: 'Wäscheständer' },
      { sv: 'Torkskåp', en: 'Drying cabinet', de: 'Trockenschrank' },
      { sv: 'Pjäxtork', en: 'Boot dryer', de: 'Schuhtrockner' },
    ],
  },
  {
    icon: Baby,
    title: { sv: 'Barnprodukter', en: 'For Children', de: 'Für Kinder' },
    items: [
      { sv: 'Barnstol (finns i garderob uppe)', en: 'High chair (in upstairs closet)', de: 'Hochstuhl (im Schrank oben)' },
      { sv: 'Barnsäng med täcke + kudde (finns i garderob uppe)', en: 'Crib with blanket + pillow (in upstairs closet)', de: 'Kinderbett mit Decke + Kissen (im Schrank oben)' },
      { sv: 'Barnpall till badrum', en: 'Step stool for bathroom', de: 'Tritthocker fürs Bad' },
    ],
  },
  {
    icon: Tv,
    title: { sv: 'Inomhus', en: 'Indoors', de: 'Innenbereich' },
    items: [
      { sv: 'Braskamin', en: 'Fireplace', de: 'Kamin' },
      { sv: 'Bastu', en: 'Sauna', de: 'Sauna' },
      { sv: 'Brädspel, barnböcker m.m.', en: 'Board games, children books, etc.', de: 'Brettspiele, Kinderbücher usw.' },
      { sv: 'TV x2', en: 'TV x2', de: 'TV x2' },
      { sv: 'Google TV Streamer x2', en: 'Google TV Streamer x2', de: 'Google TV Streamer x2' },
      { sv: 'TV-spel WiiU med spel', en: 'WiiU game console with games', de: 'WiiU Spielekonsole mit Spielen' },
      { sv: 'Bluetooth-högtalare', en: 'Bluetooth speaker', de: 'Bluetooth-Lautsprecher' },
      { sv: 'WiFi', en: 'WiFi', de: 'WLAN' },
    ],
  },
  {
    icon: TreePine,
    title: { sv: 'Att använda utomhus', en: 'Outdoor Equipment', de: 'Für draußen' },
    items: [
      { sv: 'Laddbox till elbil', en: 'EV charging station', de: 'E-Auto Ladestation' },
      { sv: 'Termos', en: 'Thermos', de: 'Thermoskanne' },
      { sv: 'Utflyktsmugg', en: 'Plastic mugs', de: 'Reisebecher' },
      { sv: 'Champagneglas i plast', en: 'Plastic champagne glasses', de: 'Plastik-Champagnergläser' },
      { sv: 'Dubbla bänkbord på altanen', en: 'Double picnic tables on terrace', de: 'Doppelte Picknicktische auf der Terrasse' },
      { sv: 'Bänk på balkongen', en: 'Bench on balcony', de: 'Bank auf dem Balkon' },
      { sv: 'Bålpanna med grillgaller', en: 'Fire pit with grill grate', de: 'Feuerschale mit Grillrost' },
      { sv: 'En liten kolgrill', en: 'Small charcoal grill', de: 'Kleiner Holzkohlegrill' },
      { sv: 'Pulka', en: 'Sled', de: 'Schlitten' },
      { sv: 'Lås till skidförrådet', en: 'Lock for ski storage', de: 'Schloss für Skiaufbewahrung' },
    ],
  },
  {
    icon: ShieldCheck,
    title: { sv: 'Säkerhet', en: 'Security', de: 'Sicherheit' },
    items: [
      { sv: 'Yale Doorman 6-siffrigt kodlås på ytterdörren', en: 'Yale Doorman 6-digit code lock on front door', de: 'Yale Doorman 6-stelliges Codeschloss an der Eingangstür' },
      { sv: 'Brandvarnare', en: 'Smoke detectors', de: 'Rauchmelder' },
      { sv: 'Brandsläckare', en: 'Fire extinguisher', de: 'Feuerlöscher' },
    ],
  },
];

const VISIBLE_ITEMS_COUNT = 3;

export const InventorySection = () => {
  const { language } = useLanguage();
  const [allExpanded, setAllExpanded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleAllCategories = () => {
    setAllExpanded(!allExpanded);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Use non-breaking space between Norrskensstigen and 12A
  const title = language === 'sv' 
    ? 'Finns på Norrskensstigen\u00A012A' 
    : language === 'de' 
      ? 'Vorhanden auf Norrskensstigen\u00A012A' 
      : 'Available at Norrskensstigen\u00A012A';

  const subtitle = language === 'sv'
    ? 'Ett urval av det som oftast efterfrågas. Undrar ni om något specifikt finns, maila info@norrskensstigen.se'
    : language === 'de'
      ? 'Eine Auswahl der am häufigsten nachgefragten Artikel. Bei spezifischen Fragen kontaktieren Sie info@norrskensstigen.se'
      : 'A selection of frequently requested items. For specific questions, email info@norrskensstigen.se';

  const showMoreLabel = language === 'sv' ? 'Visa mer' : language === 'de' ? 'Mehr anzeigen' : 'Show more';
  const showLessLabel = language === 'sv' ? 'Visa mindre' : language === 'de' ? 'Weniger anzeigen' : 'Show less';

  return (
    <section id="inventory" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel - starts with same margin as container on mobile */}
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {inventoryData.map((category, idx) => {
              const Icon = category.icon;
              const hasMoreItems = category.items.length > VISIBLE_ITEMS_COUNT;
              const visibleItems = allExpanded ? category.items : category.items.slice(0, VISIBLE_ITEMS_COUNT);
              
              return (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[300px] md:w-[320px] snap-start bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground">
                      {category.title[language]}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {visibleItems.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="text-primary">•</span>
                        <span>{item[language]}</span>
                      </li>
                    ))}
                  </ul>
                  {hasMoreItems && (
                    <button
                      onClick={toggleAllCategories}
                      className="mt-3 text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      {allExpanded ? (
                        <>
                          {showLessLabel}
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          {showMoreLabel} ({category.items.length - VISIBLE_ITEMS_COUNT})
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};