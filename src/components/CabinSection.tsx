import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Mountain, Flame, ThermometerSun, Wifi, Tv, Gamepad2, 
  WashingMachine, Droplets, Wind, Bed, Bath, Home, SquareStack
} from 'lucide-react';

interface CabinSectionProps {
  cabinImages: string[];
}

export const CabinSection = ({ cabinImages }: CabinSectionProps) => {
  const { t } = useLanguage();

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
    { icon: Tv, label: t.cabin.features.appleTv },
    { icon: Gamepad2, label: t.cabin.features.gaming },
    { icon: WashingMachine, label: t.cabin.features.laundry },
    { icon: Droplets, label: t.cabin.features.sauna },
    { icon: Wind, label: t.cabin.features.drying },
  ];

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

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {cabinImages.slice(0, 3).map((img, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-elevated group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={img}
                alt={`Cabin interior ${index + 1}`}
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-sky/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                <span className="text-sm text-center text-foreground/80">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
