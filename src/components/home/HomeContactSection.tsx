
"use client";

import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function HomeContactSection() {
  const { t } = useI18n();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form submission alert
    alert(t('homeContactSection.form.submittedAlert'));
  };

  return (
    <section
      id="home-contact-section"
      className="bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card contenedor */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white">
          {/* Imagen izquierda */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-auto min-h-[600px]">
            <Image
              src="/images/contact/contact-hero.jpg"
              alt={t('homeContactSection.imageAlt')}
              fill
              className="object-cover"
              data-ai-hint="community people water project nature"
              priority
            />
          </div>

          {/* Formulario derecha */}
          <div className="w-full md:w-1/2 bg-white p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {t('homeContactSection.title')}
              </h2>
              <p className="text-xl md:text-2xl font-semibold text-primary">
                {t('homeContactSection.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="home-contact-name" className="text-foreground font-medium text-sm">
                  {t('homeContactSection.form.name')}
                </Label>
                <Input
                  type="text"
                  id="home-contact-name"
                  required
                  className="mt-1.5 border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <Label htmlFor="home-contact-subject" className="text-foreground font-medium text-sm">
                  {t('homeContactSection.form.subject')}
                </Label>
                <Input
                  type="text"
                  id="home-contact-subject"
                  required
                  className="mt-1.5 border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder="Asunto"
                />
              </div>

              <div>
                <Label htmlFor="home-contact-email" className="text-foreground font-medium text-sm">
                  {t('homeContactSection.form.email')}
                </Label>
                <Input
                  type="email"
                  id="home-contact-email"
                  required
                  className="mt-1.5 border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="home-contact-message" className="text-foreground font-medium text-sm">
                  {t('homeContactSection.form.message')}
                </Label>
                <Textarea
                  id="home-contact-message"
                  rows={4}
                  required
                  className="mt-1.5 resize-none border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t('homeContactSection.form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
