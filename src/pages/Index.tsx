import { Helmet } from 'react-helmet-async';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CabinSection } from '@/components/CabinSection';
import { SeasonsSection } from '@/components/SeasonsSection';
import { InventorySection } from '@/components/InventorySection';
import { LocationSection } from '@/components/LocationSection';
import { PricingSection } from '@/components/PricingSection';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

import heroWinter from '@/assets/hero-winter.jpg';

const Index = () => {
  return (
    <LanguageProvider>
      <Helmet>
        <title>Norrskensstigen | Ski-in/Ski-out stuga i Stöten</title>
        <meta name="description" content="Lyxig timmerstuga i Granfjällsbyn, Stöten. Ski-in/Ski-out, 12 bäddar, bastu och fjällutsikt — perfekt för skidåkning och fjällsemester." />
        <link rel="canonical" href="https://www.norrskensstigen.se/" />
        <meta property="og:title" content="Norrskensstigen | Ski-in/Ski-out stuga i Stöten" />
        <meta property="og:url" content="https://www.norrskensstigen.se/" />
      </Helmet>
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
            <PricingSection />
          </div>
          <div className="bg-secondary">
            <InventorySection />
          </div>
          <div className="bg-background">
            <LocationSection />
          </div>
          <div className="bg-secondary">
            <ContactForm />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;