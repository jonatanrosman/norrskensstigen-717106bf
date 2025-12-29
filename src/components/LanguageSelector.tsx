import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSelectorProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export const LanguageSelector = ({ variant = 'default', className }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "px-2 py-1 text-sm rounded transition-all duration-200",
              language === lang.code
                ? "bg-primary/20 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-soft", className)}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-300",
            language === lang.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label={lang.label}
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};
