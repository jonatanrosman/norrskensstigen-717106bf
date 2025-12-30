import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Mountain, Flame, ThermometerSun, Wifi, Tv, Gamepad2, 
  WashingMachine, Droplets, Wind, Bed, Bath, Home, SquareStack,
  X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Import gallery images
import livingRoom from '@/assets/living-room.jpg';
import livingRoom2 from '@/assets/living-room-2.jpg';
import fireplace from '@/assets/fireplace.jpg';
import kitchen from '@/assets/kitchen.jpg';
import diningEvening from '@/assets/dining-evening.jpg';
import kitchenView from '@/assets/kitchen-view.jpg';
import bedroom1 from '@/assets/bedroom-1.jpg';
import bedroom2 from '@/assets/bedroom-2.jpg';
import bunkRoom from '@/assets/bunk-room.jpg';
import bathroom1 from '@/assets/bathroom-1.jpg';
import bathroom2 from '@/assets/bathroom-2.jpg';
import sauna from '@/assets/sauna.jpg';
import panoramaWindow from '@/assets/panorama-window.jpg';
import upperLoft from '@/assets/upper-loft.jpg';
import viewChampagne from '@/assets/view-champagne.jpg';

const galleryImages = [
  { src: livingRoom, alt: 'Vardagsrum' },
  { src: livingRoom2, alt: 'Vardagsrum 2' },
  { src: fireplace, alt: 'Braskamin' },
  { src: panoramaWindow, alt: 'Panoramafönster' },
  { src: viewChampagne, alt: 'Utsikt' },
  { src: kitchen, alt: 'Kök' },
  { src: diningEvening, alt: 'Matplats kväll' },
  { src: kitchenView, alt: 'Köksutsikt' },
  { src: bedroom1, alt: 'Sovrum 1' },
  { src: bedroom2, alt: 'Sovrum 2' },
  { src: bunkRoom, alt: 'Våningssängrum' },
  { src: upperLoft, alt: 'Övre allrum' },
  { src: bathroom1, alt: 'Badrum 1' },
  { src: bathroom2, alt: 'Badrum 2' },
  { src: sauna, alt: 'Bastu' },
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

  return (
    <section id="cabin" className="py-24 md:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {t.cabin.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.cabin.subtitle}
          </p>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-16">
          {galleryImages.slice(0, 8).map((img, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-xl shadow-soft group cursor-pointer ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  index === 0 ? 'aspect-square' : 'aspect-[4/3]'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-sky/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mb-16">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setSelectedImage(0)}
          >
            {t.cabin.gallery} ({galleryImages.length})
          </Button>
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
                <span className="text-sm text-center text-foreground/80">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-night-sky border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-night-sky/80 text-primary-foreground flex items-center justify-center hover:bg-night-sky transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-night-sky/80 text-primary-foreground flex items-center justify-center hover:bg-night-sky transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-night-sky/80 text-primary-foreground flex items-center justify-center hover:bg-night-sky transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {selectedImage !== null && (
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full max-h-[80vh] object-contain"
              />
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-sm">
              {selectedImage !== null && `${selectedImage + 1} / ${galleryImages.length}`}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
