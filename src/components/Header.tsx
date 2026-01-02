import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on a page with a light background (like Villkor)
  const isLightBgPage = location.pathname === '/villkor';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks = [
    { href: '#cabin', label: t.nav.cabin },
    { href: '#seasons', label: t.nav.seasons },
    { href: '#inventory', label: language === 'sv' ? 'Inventarier' : language === 'de' ? 'Ausstattung' : 'Equipment' },
    { href: '#location', label: language === 'sv' ? 'Hitta hit' : language === 'de' ? 'Anfahrt' : 'Location' },
    { href: '#pricing', label: language === 'sv' ? 'Priser' : language === 'de' ? 'Preise' : 'Pricing' },
    { href: '#contact', label: t.nav.contact },
  ];

  // Determine text colors based on page and scroll state
  const shouldUseDarkText = isLightBgPage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Norrskensstigen logo" 
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScrollTo(e, link.href)}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:opacity-100 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full",
                isScrolled
                  ? "text-foreground/80 hover:text-foreground"
                  : shouldUseDarkText
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector variant="minimal" className={cn(
            isScrolled 
              ? "" 
              : shouldUseDarkText 
                ? "[&_button]:text-foreground/80 [&_button:hover]:text-foreground [&_button:hover]:bg-muted"
                : "[&_button]:text-primary-foreground/80 [&_button:hover]:text-primary-foreground [&_button:hover]:bg-primary-foreground/10"
          )} />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled 
                ? "text-foreground hover:bg-muted" 
                : shouldUseDarkText
                  ? "text-foreground hover:bg-muted"
                  : "text-primary-foreground hover:bg-primary-foreground/10"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-card backdrop-blur-lg shadow-elevated transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScrollTo(e, link.href)}
              className="text-foreground py-3 px-4 rounded-lg hover:bg-muted transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
