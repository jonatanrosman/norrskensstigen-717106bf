import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CabinSection } from '@/components/CabinSection';
import { SeasonsSection } from '@/components/SeasonsSection';
import { BookingSection } from '@/components/BookingSection';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/Footer';

// Import images
import heroWinter from '@/assets/hero-winter.jpg';
import cabinInterior1 from '@/assets/cabin-interior-1.jpg';
import cabinInterior2 from '@/assets/cabin-interior-2.jpg';
import cabinSauna from '@/assets/cabin-sauna.jpg';
import seasonWinter from '@/assets/season-winter.jpg';
import seasonSpring from '@/assets/season-spring.jpg';
import seasonSummer from '@/assets/season-summer.jpg';
import seasonAutumn from '@/assets/season-autumn.jpg';

const Index = () => {
  const cabinImages = [cabinInterior1, cabinInterior2, cabinSauna];
  const seasonImages = {
    winter: seasonWinter,
    spring: seasonSpring,
    summer: seasonSummer,
    autumn: seasonAutumn,
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection heroImage={heroWinter} />
          <CabinSection cabinImages={cabinImages} />
          <SeasonsSection seasonImages={seasonImages} />
          <BookingSection />
          <LocationSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
