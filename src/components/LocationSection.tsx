import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Plane, Mountain, Map } from 'lucide-react';
import skiSlopeMap from '@/assets/ski-slope-map.png';
import { useState } from 'react';
import { X } from 'lucide-react';

export const LocationSection = () => {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const distances = [
    { icon: Plane, label: t.location.airport, distance: t.location.airportDistance },
    { icon: Mountain, label: t.location.trysil, distance: t.location.trysilDistance },
  ];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Norrskensstigen 12A, 780 67 Sälen, Sweden')}`;

  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative rounded-3xl overflow-hidden shadow-elevated h-[400px] lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1675.2!2d13.0!3d61.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjHCsDEyJzAwLjAiTiAxM8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sse!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
              className="grayscale hover:grayscale-0 transition-all duration-700"
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
                <span className="underline-offset-4 group-hover:underline">{t.location.address}</span>
              </a>
            </div>

            <div className="space-y-4">
              {distances.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                  </div>
                  <div className="text-xl font-serif text-primary font-semibold">
                    {item.distance}
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
