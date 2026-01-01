import { LanguageProvider } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const VillkorContent = () => {
  const { t } = useLanguage();

  const sections = [
    { key: 'booking', data: t.terms.booking },
    { key: 'payment', data: t.terms.payment },
    { key: 'cancellation', data: t.terms.cancellation },
    { key: 'transfer', data: t.terms.transfer },
    { key: 'checkInOut', data: t.terms.checkInOut },
    { key: 'access', data: t.terms.access },
    { key: 'rules', data: t.terms.rules },
  ];

  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tillbaka</span>
          </Link>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-12">
            {t.terms.title}
          </h1>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map(({ key, data }) => (
              <section key={key} className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  {data.title}
                </h2>
                <ul className="space-y-3">
                  {data.items.map((item, index) => (
                    <li key={index} className="text-muted-foreground leading-relaxed flex gap-3">
                      <span className="text-primary font-medium">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

const Villkor = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <VillkorContent />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Villkor;
