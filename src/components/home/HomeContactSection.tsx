
"use client";

import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function HomeContactSection() {
  const { t } = useI18n();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form submission alert
    alert(t('homeContactSection.form.submittedAlert')); 
  };

  return (
    <section id="home-contact-section" className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://placehold.co/800x700.png"
              alt={t('homeContactSection.imageAlt')}
              fill
              className="object-cover"
              data-ai-hint="community people"
            />
          </div>

          {/* Right Column: Form */}
          <div className="py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {t('homeContactSection.title')}
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-primary mb-8">
              {t('homeContactSection.subtitle')}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="home-contact-name" className="text-foreground font-medium">
                  {t('homeContactSection.form.name')}
                </Label>
                <Input 
                  type="text" 
                  id="home-contact-name" 
                  required 
                  className="mt-1 bg-input border-border focus:ring-primary" 
                />
              </div>
              <div>
                <Label htmlFor="home-contact-subject" className="text-foreground font-medium">
                  {t('homeContactSection.form.subject')}
                </Label>
                <Input 
                  type="text" 
                  id="home-contact-subject" 
                  required 
                  className="mt-1 bg-input border-border focus:ring-primary" 
                />
              </div>
              <div>
                <Label htmlFor="home-contact-email" className="text-foreground font-medium">
                  {t('homeContactSection.form.email')}
                </Label>
                <Input 
                  type="email" 
                  id="home-contact-email" 
                  required 
                  className="mt-1 bg-input border-border focus:ring-primary" 
                />
              </div>
              <div>
                <Label htmlFor="home-contact-message" className="text-foreground font-medium">
                  {t('homeContactSection.form.message')}
                </Label>
                <Textarea 
                  id="home-contact-message" 
                  rows={4} 
                  required 
                  className="mt-1 bg-input border-border focus:ring-primary" 
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold py-3">
                {t('homeContactSection.form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
