import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/norrskensstigen.se', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/norrskensstigen', label: 'Facebook' },
  ];

  return (
    <footer id="contact" className="bg-night-sky text-primary-foreground py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl mb-3">Norrskensstigen</h3>
            <p className="text-primary-foreground/70 mb-6 max-w-md">
              {t.footer.tagline}
            </p>
            <LanguageSelector />
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">{t.footer.contact}</h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@norrskensstigen.se" 
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@norrskensstigen.se</span>
              </a>
              <a 
                href="tel:+46701234567" 
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+46 70 123 45 67</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-medium mb-4 text-primary-foreground/90">{t.footer.followUs}</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Norrskensstigen. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/villkor" className="text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
