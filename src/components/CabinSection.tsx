import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Mountain, Flame, ThermometerSun, Wifi, Tv, Gamepad2, 
  WashingMachine, Droplets, Wind, Bed, Bath, Home, SquareStack,
  X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import gallery images (18 total)
import interior1 from '@/assets/interior/interior-1.jpg';
import interior2 from '@/assets/interior/interior-2.jpg';
import interior3 from '@/assets/interior/interior-3.jpg';
import interior4 from '@/assets/interior/interior-4.jpg';
import interior5 from '@/assets/interior/interior-5.jpg';
import interior6 from '@/assets/interior/interior-6.jpg';
import interior7 from '@/assets/interior/interior-7.jpg';
import interior8 from '@/assets/interior/interior-8.jpg';
import interior9 from '@/assets/interior/interior-9.jpg';
import interior10 from '@/assets/interior/interior-10.jpg';
import interior11 from '@/assets/interior/interior-11.jpg';
import interior12 from '@/assets/interior/interior-12.jpg';
import interior13 from '@/assets/interior/interior-13.jpg';
import interior14 from '@/assets/interior/interior-14.jpg';
import interior15 from '@/assets/interior/interior-15.jpg';
import interior16 from '@/assets/interior/interior-16.jpg';
import interior17 from '@/assets/interior/interior-17.jpg';
import interior18 from '@/assets/interior/interior-18.jpg';

const galleryImages = [
  { src: interior1, alt: 'Vardagsrum med högt i tak' },
  { src: interior2, alt: 'Braskamin' },
  { src: interior3, alt: 'Bastu' },
  { src: interior4, alt: 'Kök och vardagsrum' },
  { src: interior5, alt: 'Matplats och kök' },
  { src: interior6, alt: 'Matplats med trappa' },
  { src: interior7, alt: 'Trappa och fönster' },
  { src: interior8, alt: 'Övre våning med utsikt' },
  { src: interior9, alt: 'Allrum med balkong' },
  { src: interior10, alt: 'Sovrum' },
  { src: interior11, alt: 'Sovrum med våningssängar' },
  { src: interior12, alt: 'Badrum' },
  { src: interior13, alt: 'Hall och entré' },
  { src: interior14, alt: 'Tvättstuga med bastu' },
  { src: interior15, alt: 'Dusch' },
  { src: interior16, alt: 'Planritning' },
  { src: interior17, alt: 'Entréplan 3D' },
  { src: interior18, alt: 'Ovanvåning 3D' },
];

export const CabinSection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const stats = [
    { icon: Bed, value: '10+2', label: t.cabin.beds },
    { icon: Home, value: '4', label: t.cabin.bedrooms },
    { icon: Bath, value: '2', label: t.cabin.bathrooms },
    { icon: SquareStack, value: '85', label: t.cabin.sqm },
  ];

  const features = [
    { icon: Mountain, label: t.cabin.features.skiInOut },
    { icon: Mountain, label: t.cabin.features.mountainView },
    { icon: Flame, label: t.cabin.features.fireplace },
    { icon: ThermometerSun, label: t.cabin.features.floorHeating },
    { icon: Wifi, label: t.cabin.features.wifi },
    { icon: Tv, label: t.cabin.features.googleStreamer },
    { icon: Gamepad2, label: t.cabin.features.gaming },
    { icon: WashingMachine, label: t.cabin.features.laundry },
    { icon: Droplets, label: t.cabin.features.sauna },
    { icon: Wind, label: t.cabin.features.drying },
  ];

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Pinterest-style column distribution
  const getColumnImages = () => {
    const columns: typeof galleryImages[] = [[], [], []];
    galleryImages.forEach((img, i) => {
      columns[i % 3].push({ ...img, originalIndex: i } as typeof galleryImages[0] & { originalIndex: number });
    });
    return columns;
  };

  const columns = getColumnImages();

  return (
    <section id="cabin" className="py-24 md:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            {t.cabin.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t.cabin.intro}
          </p>
        </div>

        {/* Pinterest-style Masonry Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-16">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 md:gap-4">
              {column.map((img: typeof galleryImages[0] & { originalIndex?: number }, imgIndex) => {
                const originalIndex = (img as { originalIndex?: number }).originalIndex ?? colIndex + imgIndex * 3;
                // Vary heights for masonry effect
                const heightClass = imgIndex % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]';
                if (colIndex === 1 && imgIndex === 0) {
                  // Make first image in middle column taller
                }
                return (
                  <div 
                    key={originalIndex}
                    onClick={() => setSelectedImage(originalIndex)}
                    className="relative overflow-hidden rounded-xl shadow-soft group cursor-pointer"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${heightClass}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night-sky/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-6 text-center shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-serif text-3xl md:text-4xl text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm text-center text-foreground/80 whitespace-nowrap">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-night-sky/95 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/10 text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Image */}
          <img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-sm bg-night-sky/50 px-4 py-2 rounded-full">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};
