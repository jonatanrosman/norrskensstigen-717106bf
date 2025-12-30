import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, Snowflake } from 'lucide-react';

interface HeroSectionProps {
  heroImage: string;
}

export const HeroSection = ({ heroImage }: HeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night-sky/60 via-night-sky/40 to-night-sky/80" />
      </div>

      {/* Aurora Effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-green/20 rounded-full blur-[100px] animate-aurora" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-aurora-blue/20 rounded-full blur-[80px] animate-aurora delay-200" />
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-aurora-purple/15 rounded-full blur-[60px] animate-aurora delay-400" />
      </div>

      {/* Snow particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            className="absolute text-primary-foreground/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${8 + Math.random() * 12}px`,
            }}
            size={12 + Math.random() * 8}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary-foreground/70 text-sm tracking-[0.3em] uppercase mb-4 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Stöten, Sälenfjällen
          </p>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {t.hero.title}
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 font-light mb-4 animate-fade-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {t.hero.subtitle}
          </p>
          
          <p className="text-primary-foreground/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#booking">{t.hero.cta}</a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#cabin">{t.hero.explore}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
        <a 
          href="#cabin" 
          className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.explore}</span>
          <ChevronDown className="animate-bounce" size={24} />
        </a>
      </div>
    </section>
  );
};
