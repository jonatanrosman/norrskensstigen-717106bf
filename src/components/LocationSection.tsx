import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Plane, Mountain, Map, Car } from 'lucide-react';
import skiSlopeMap from '@/assets/ski-slope-map.png';
import { useState } from 'react';
import { X } from 'lucide-react';

export const LocationSection = () => {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const distances = [
    { 
      icon: Plane, 
      label: t.location.airport, 
      time: language === 'sv' ? '20 min' : language === 'de' ? '20 Min.' : '20 min',
      distance: '22 km'
    },
    { 
      icon: Mountain, 
      label: t.location.trysil, 
      time: language === 'sv' ? '45 min' : language === 'de' ? '45 Min.' : '45 min',
      distance: '55 km'
    },
  ];

  const travelTimes = [
    { 
      icon: Car, 
      label: language === 'sv' ? 'Från Stockholm' : language === 'de' ? 'Von Stockholm' : 'From Stockholm', 
      time: language === 'sv' ? 'ca 5,5 tim' : language === 'de' ? 'ca. 5,5 Std.' : 'approx. 5.5 hrs',
      distance: '450 km'
    },
    { 
      icon: Car, 
      label: language === 'sv' ? 'Från Göteborg' : language === 'de' ? 'Von Göteborg' : 'From Gothenburg', 
      time: language === 'sv' ? 'ca 6,5 tim' : language === 'de' ? 'ca. 6,5 Std.' : 'approx. 6.5 hrs',
      distance: '500 km'
    },
  ];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Norrskensstigen 12A, 780 67 Sälen, Sweden')}`;

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d976.0688078656251!2d12.90997622836504!3d61.275495018414475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4669afea634cc5e3%3A0xfe7a4fbda77182d5!2sNorrskensstigen%2012a!5e1!3m2!1ssv!2sse!4v1767128954667!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
              className="transition-all duration-700"
            />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                {t.location.title}
              </h2>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-lg text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="underline underline-offset-4">{t.location.address}</span>
                <span className="underline underline-offset-4 decoration-primary/50 group-hover:decoration-primary transition-colors">{t.location.address}</span>
              </a>
            </div>

            <div className="space-y-4">
              {distances.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-5 bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-serif text-primary font-semibold">
                      {item.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.distance}
                    </div>
                  </div>
                </div>
              ))}
              {travelTimes.map((item, index) => (
                <div 
                  key={`travel-${index}`}
                  className="flex items-center gap-4 p-5 bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-serif text-primary font-semibold">
                      {item.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.distance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ski Slope Map */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <Map className="w-6 h-6 text-primary" />
            <h3 className="font-serif text-2xl md:text-3xl text-foreground">
              {language === 'sv' ? 'Stugans läge på pistkartan' : language === 'de' ? 'Lage der Hütte auf der Pistenkarte' : 'Cabin location on the ski slope map'}
            </h3>
          </div>
          <div 
            className="relative rounded-3xl overflow-hidden shadow-elevated cursor-pointer group"
            onClick={() => setLightboxOpen(true)}
          >
            <img 
              src={skiSlopeMap} 
              alt="Ski slope map showing Norrskensstigen 12A location"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-night-sky/0 group-hover:bg-night-sky/10 transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-night-sky/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={skiSlopeMap}
            alt="Ski slope map showing Norrskensstigen 12A location"
            className="max-h-[95vh] max-w-[95vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};