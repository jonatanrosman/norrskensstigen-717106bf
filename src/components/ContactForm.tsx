import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: t.contact.success,
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact-form" className="py-24 md:py-32 bg-gradient-frost">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-12 shadow-elevated space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                {t.contact.name} *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t.contact.email} *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                {t.contact.phone} *
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                {t.contact.message} *
              </label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : t.contact.send}
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
