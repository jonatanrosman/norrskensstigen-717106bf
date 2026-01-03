import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Snowflake, Sun, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Winter images
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

// Summer images
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

const seasonHeroImages = {
  winter: winter1,
  summer: summer1,
};

const winterGalleryImages = [
  winter2, winter3, winter4, winter5, winter6,
  winter7, winter8, winter9, winter10
];

const summerGalleryImages = [
  summer2, summer3, summer4, summer5, summer6,
  summer7, summer8, summer9, summer10
];

const allImages = [
  winter1, winter2, winter3, winter4, winter5, winter6, winter7, winter8, winter9, winter10,
  summer1, summer2, summer3, summer4, summer5, summer6, summer7, summer8, summer9, summer10
];

export const SeasonsSection = () => {
  const { t, language } = useLanguage();
  const [activeSeason, setActiveSeason] = useState<Season>('winter');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Preload all images immediately
  useEffect(() => {
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Handle floating buttons visibility
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && tabsRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const tabsRect = tabsRef.current.getBoundingClientRect();
        const headerOffset = 80;
        
        const tabsOutOfView = tabsRect.bottom < headerOffset;
        const sectionStillVisible = sectionRect.bottom > 200;
        
        setShowFloatingButtons(tabsOutOfView && sectionStillVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentGalleryForLightbox = activeSeason === 'winter' 
    ? winterGalleryImages 
    : summerGalleryImages;

  const seasons: { id: Season; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { id: 'winter', icon: Snowflake, label: language === 'sv' ? 'Vinter' : language === 'de' ? 'Winter' : 'Winter' },
    { id: 'summer', icon: Sun, label: language === 'sv' ? 'Vår, sommar & höst' : language === 'de' ? 'Frühling, Sommer & Herbst' : 'Spring, Summer & Autumn' },
  ];

  const currentSeason = t.seasons[activeSeason];

  const handleSeasonChange = (newSeason: Season) => {
    if (newSeason === activeSeason) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSeason(newSeason);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = useCallback(() => {
    setSlideDirection('right');
    setCurrentImageIndex((prev) => prev === 0 ? currentGalleryForLightbox.length - 1 : prev - 1);
    setTimeout(() => setSlideDirection(null), 300);
  }, [currentGalleryForLightbox.length]);

  const goToNext = useCallback(() => {
    setSlideDirection('left');
    setCurrentImageIndex((prev) => prev === currentGalleryForLightbox.length - 1 ? 0 : prev + 1);
    setTimeout(() => setSlideDirection(null), 300);
  }, [currentGalleryForLightbox.length]);

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  const SeasonButtons = ({ isFloating = false }: { isFloating?: boolean }) => (
    <div className={cn(
      "flex justify-center gap-4",
      isFloating && "px-4 py-3 bg-white/70 backdrop-blur-xl rounded-full shadow-elevated border border-white/50"
    )}>
      {seasons.map((season) => {
        const Icon = season.icon;
        const isActive = activeSeason === season.id;
        return (
          <button
            key={season.id}
            onClick={() => handleSeasonChange(season.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
              isActive
                ? "bg-primary text-primary-foreground shadow-elevated scale-105"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
            <span>{season.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section ref={sectionRef} id="seasons" className="py-24 md:py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t.seasons.title}
          </h2>
        </div>

        {/* Original buttons */}
        <div ref={tabsRef} className="flex justify-center mb-12">
          <SeasonButtons />
        </div>

        {/* Floating buttons */}
        <div className={cn(
          "fixed top-20 left-0 right-0 z-30 flex justify-center transition-all duration-300",
          showFloatingButtons ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
          <SeasonButtons isFloating />
        </div>

        {/* Content with fixed heights */}
        <div className="min-h-[500px] md:min-h-[450px]">
          <div className={cn(
            "grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16 transition-opacity duration-200",
            isTransitioning ? "opacity-0" : "opacity-100"
          )}>
            <div className="relative rounded-3xl overflow-hidden shadow-elevated group h-[300px] md:h-[400px]">
              <img
                src={seasonHeroImages[activeSeason]}
                alt={currentSeason.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-sky/40 via-transparent to-transparent" />
            </div>

            <div className="space-y-6 min-h-[350px] md:min-h-[400px]">
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground min-h-[60px]">
                {currentSeason.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed min-h-[120px]">
                {currentSeason.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {currentSeason.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={cn(
          "grid grid-cols-2 md:grid-cols-3 gap-4 transition-opacity duration-200",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}>
          {currentGalleryForLightbox.map((image, index) => (
            <div key={`${activeSeason}-${index}`} className="cursor-pointer group" onClick={() => openLightbox(index)}>
              <div className="relative rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300">
                <img src={image} alt="" className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox with carousel-style slide animation */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 p-2 text-foreground/80 hover:text-foreground z-10 w-12 h-12 rounded-full bg-white/50 backdrop-blur flex items-center justify-center">
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }} 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/50 backdrop-blur text-foreground flex items-center justify-center hover:bg-white/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          {/* Swipeable carousel container */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-[90vw] h-[85vh] flex items-center justify-center">
              <img 
                key={currentImageIndex}
                src={currentGalleryForLightbox[currentImageIndex]} 
                className={cn(
                  "max-w-full max-h-full object-contain rounded-lg shadow-elevated select-none",
                  "transition-all duration-300 ease-out",
                  slideDirection === 'left' && "animate-[slideInLeft_0.3s_ease-out]",
                  slideDirection === 'right' && "animate-[slideInRight_0.3s_ease-out]"
                )}
                onClick={(e) => e.stopPropagation()} 
                alt=""
                draggable={false}
              />
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); goToNext(); }} 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/50 backdrop-blur text-foreground flex items-center justify-center hover:bg-white/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/70 text-sm bg-white/50 backdrop-blur px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {currentGalleryForLightbox.length}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};