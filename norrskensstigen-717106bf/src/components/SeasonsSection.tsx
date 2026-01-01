import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Snowflake, Sun, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Winter images - 01 as hero, 02-10 as gallery
import winter1 from '@/assets/seasons/winter-1.jpg';
import winter2 from '@/assets/seasons/winter-2.jpg';
import winter3 from '@/assets/seasons/winter-3.jpg';
import winter4 from '@/assets/seasons/winter-4.jpg';
import winter5 from '@/assets/seasons/winter-5.jpg';
import winter6 from '@/assets/seasons/winter-6.jpg';
import winter7 from '@/assets/seasons/winter-7.jpg';
import winter8 from '@/assets/seasons/winter-8.jpg';
import winter9 from '@/assets/seasons/winter-9.jpg';
import winter10 from '@/assets/seasons/winter-10.jpg';

// Summer images - 01 as hero, 02-10 as gallery
import summer1 from '@/assets/seasons/summer-1.jpg';
import summer2 from '@/assets/seasons/summer-2.jpg';
import summer3 from '@/assets/seasons/summer-3.jpg';
import summer4 from '@/assets/seasons/summer-4.jpg';
import summer5 from '@/assets/seasons/summer-5.jpg';
import summer6 from '@/assets/seasons/summer-6.jpg';
import summer7 from '@/assets/seasons/summer-7.jpg';
import summer8 from '@/assets/seasons/summer-8.jpg';
import summer9 from '@/assets/seasons/summer-9.jpg';
import summer10 from '@/assets/seasons/summer-10.jpg';

type Season = 'winter' | 'summer';

// Hero images (image 01)
const seasonHeroImages = {
  winter: winter1,
  summer: summer1,
};

// Gallery images (images 02-10)
const winterGalleryImages = [
  winter2, winter3, winter4, winter5, winter6,
  winter7, winter8, winter9, winter10
];

// Summer gallery with size hints for layout (02-04 larger, 05-10 smaller)
const summerGalleryImagesWithSize: { src: string; large: boolean }[] = [
  { src: summer2, large: true },
  { src: summer3, large: true },
  { src: summer4, large: true },
  { src: summer5, large: false },
  { src: summer6, large: false },
  { src: summer7, large: false },
  { src: summer8, large: false },
  { src: summer9, large: false },
  { src: summer10, large: false },
];

export const SeasonsSection = () => {
  const { t } = useLanguage();
  const [activeSeason, setActiveSeason] = useState<Season>('winter');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // For winter, use simple string array
  // For summer, extract just the src for lightbox compatibility
  const currentGalleryForLightbox = activeSeason === 'winter' 
    ? winterGalleryImages 
    : summerGalleryImagesWithSize.map(img => img.src);

  const seasons: { id: Season; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
    { id: 'winter', icon: Snowflake, color: 'from-blue-400 to-cyan-300' },
    { id: 'summer', icon: Sun, color: 'from-green-400 to-emerald-500' },
  ];

  const currentSeason = t.seasons[activeSeason];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentGalleryForLightbox.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === currentGalleryForLightbox.length - 1 ? 0 : prev + 1
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

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
        <div className="flex justify-center gap-4 mb-12">
          {seasons.map((season) => {
            const Icon = season.icon;
            const isActive = activeSeason === season.id;
            return (
              <button
                key={season.id}
                onClick={() => setActiveSeason(season.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elevated scale-105"
                    : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                <span>{t.seasons[season.id].name}</span>
              </button>
            );
          })}
        </div>

        {/* Season Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
          {/* Image - consistent layout for both seasons */}
          <div className="relative rounded-3xl overflow-hidden shadow-elevated group h-[300px] md:h-[400px]">
            <img
              src={seasonHeroImages[activeSeason]}
              alt={currentSeason.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-sky/40 via-transparent to-transparent" />
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

        {/* Gallery Grid - 3x3 for both seasons */}
        <div className="grid grid-cols-3 gap-4">
          {currentGalleryForLightbox.map((image, index) => (
            <div 
              key={index}
              className="cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
                <img
                  src={image}
                  alt={`${currentSeason.name} ${index + 2}`}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-night-sky/0 group-hover:bg-night-sky/20 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-night-sky/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <img
            src={currentGalleryForLightbox[currentImageIndex]}
            alt={`${currentSeason.name} ${currentImageIndex + 2}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {currentImageIndex + 1} / {currentGalleryForLightbox.length}
          </div>
        </div>
      )}
    </section>
  );
};
