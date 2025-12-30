import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CabinSection } from '@/components/CabinSection';
import { SeasonsSection } from '@/components/SeasonsSection';
import { BookingSection } from '@/components/BookingSection';
import { LocationSection } from '@/components/LocationSection';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

// Import hero image
import heroWinter from '@/assets/hero-winter.jpg';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection heroImage={heroWinter} />
          <CabinSection />
          <SeasonsSection />
          <BookingSection />
          <LocationSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
