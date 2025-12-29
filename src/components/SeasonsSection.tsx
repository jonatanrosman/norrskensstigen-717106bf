import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Snowflake, Flower2, Sun, Leaf, Check } from 'lucide-react';

interface SeasonsSectionProps {
  seasonImages: {
    winter: string;
    spring: string;
    summer: string;
    autumn: string;
  };
}

type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export const SeasonsSection = ({ seasonImages }: SeasonsSectionProps) => {
  const { t } = useLanguage();
  const [activeSeason, setActiveSeason] = useState<Season>('winter');

  const seasons: { id: Season; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { id: 'winter', icon: Snowflake, color: 'from-blue-400 to-cyan-300' },
    { id: 'spring', icon: Flower2, color: 'from-pink-400 to-rose-300' },
    { id: 'summer', icon: Sun, color: 'from-yellow-400 to-orange-300' },
    { id: 'autumn', icon: Leaf, color: 'from-orange-400 to-amber-500' },
  ];

  const currentSeason = t.seasons[activeSeason];

  return (
    <section id="seasons" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t.seasons.title}
          </h2>
        </div>

        {/* Season Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {seasons.map((season) => {
            const Icon = season.icon;
            const isActive = activeSeason === season.id;
            return (
              <button
                key={season.id}
                onClick={() => setActiveSeason(season.id)}
                className={cn(
                  "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elevated scale-105"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                <span className="hidden sm:inline">{t.seasons[season.id].name}</span>
              </button>
            );
          })}
        </div>

        {/* Season Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-elevated group">
            <img
              src={seasonImages[activeSeason]}
              alt={currentSeason.name}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-sky/40 via-transparent to-transparent" />
            
            {/* Season Badge */}
            <div className="absolute top-6 left-6">
              <div className={cn(
                "px-4 py-2 rounded-full bg-gradient-to-r text-white font-medium shadow-lg",
                seasons.find(s => s.id === activeSeason)?.color
              )}>
                {currentSeason.name}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              {currentSeason.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {currentSeason.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {currentSeason.highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
