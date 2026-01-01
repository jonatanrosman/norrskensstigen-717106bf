import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  heroImage: string;
}

// Generate snowflakes with varied properties
const generateSnowflakes = () => {
  const flakes = [];
  const shapes = ['●', '❄', '✦', '◦', '•', '∗'];
  
  for (let i = 0; i < 50; i++) {
    const speed = Math.random();
    let animationClass = 'animate-snowfall';
    let duration = 8 + Math.random() * 6;
    
    if (speed < 0.33) {
      animationClass = 'animate-snowfall-slow';
      duration = 12 + Math.random() * 8;
    } else if (speed > 0.66) {
      animationClass = 'animate-snowfall-fast';
      duration = 4 + Math.random() * 3;
    }

    const size = speed < 0.33 ? 4 + Math.random() * 4 : speed > 0.66 ? 8 + Math.random() * 8 : 5 + Math.random() * 6;
    const opacity = speed < 0.33 ? 0.3 + Math.random() * 0.2 : speed > 0.66 ? 0.6 + Math.random() * 0.3 : 0.4 + Math.random() * 0.3;
    const drift = (Math.random() - 0.5) * 80;

    flakes.push({
      id: i,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration,
      size,
      opacity,
      drift,
      animationClass,
    });
  }
  return flakes;
};

export const HeroSection = ({ heroImage }: HeroSectionProps) => {
  const { t } = useLanguage();
  const snowflakes = useMemo(() => generateSnowflakes(), []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-night-sky/60 via-night-sky/40 to-night-sky/80" />
      </div>


      {/* Natural snowfall */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <span
            key={flake.id}
            className={`absolute text-primary-foreground ${flake.animationClass}`}
            style={{
              left: `${flake.left}%`,
              top: '-20px',
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              '--delay': `${flake.delay}s`,
              '--duration': `${flake.duration}s`,
              '--drift': `${flake.drift}px`,
            } as React.CSSProperties}
          >
            {flake.shape}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-4 animate-fade-up opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Stöten, Granfjällsbyn
          </p>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 animate-fade-up opacity-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {t.hero.title}
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 font-light mb-4 animate-fade-up opacity-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            {t.hero.subtitle}
          </p>
          
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 animate-fade-up opacity-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            {t.hero.description}
          </p>

          <div className="flex justify-center items-center animate-fade-up opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">{t.hero.cta}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center animate-fade-up opacity-0"
        style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
      >
        <a
          href="#cabin"
          className="flex flex-col items-center justify-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        >
          <span className="text-xs tracking-widest uppercase text-center">{t.hero.explore}</span>
          <ChevronDown className="animate-bounce" size={24} />
        </a>
      </div>
    </section>
  );
};
