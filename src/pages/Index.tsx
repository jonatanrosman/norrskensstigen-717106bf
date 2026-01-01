import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CabinSection } from '@/components/CabinSection';
import { SeasonsSection } from '@/components/SeasonsSection';
import { InventorySection } from '@/components/InventorySection';
import { LocationSection } from '@/components/LocationSection';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

// Import hero image
import heroWinter from '@/assets/hero-winter.jpg';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection heroImage={heroWinter} />
          <div className="bg-background">
            <CabinSection />
          </div>
          <div className="bg-secondary">
            <SeasonsSection />
          </div>
          <div className="bg-background">
            <InventorySection />
          </div>
          <div className="bg-secondary">
            <LocationSection />
          </div>
          <div className="bg-background">
            <ContactForm />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;