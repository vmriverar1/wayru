
"use client";

import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ImpactSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook size={20} className="text-primary" />,
      href: "https://facebook.com", // Replace with actual share link or profile
      ariaLabel: t('impactSection.shareFacebook')
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} className="text-primary" />,
      href: "https://twitter.com", // Replace with actual share link or profile
      ariaLabel: t('impactSection.shareTwitter')
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} className="text-primary" />,
      href: "https://linkedin.com", // Replace with actual share link or profile
      ariaLabel: t('impactSection.shareLinkedIn')
    },
    {
      name: "Email",
      icon: <Mail size={20} className="text-primary" />,
      href: "mailto:?subject=Check%20out%20AquaVita&body=Learn%20more%20about%20AquaVita%20here:%20[Your%20Website%20URL]", // Replace with actual mailto link
      ariaLabel: t('impactSection.shareEmail')
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Timeline con pin para mantener la sección en pantalla
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%", // Duración del scroll para esta sección
        pin: true,
        scrub: 1,
        // markers: true, // Descomentar para debug
      }
    });

    // Fase 1: Elementos aparecen (0% - 40% del scroll)
    tl.fromTo(
      sectionRef.current.querySelector(".title-anim"),
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      0
    );

    tl.fromTo(
      sectionRef.current.querySelector(".description-anim"),
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      0.1
    );

    tl.fromTo(
      sectionRef.current.querySelector(".social-container-anim"),
      { opacity: 0, scale: 0.8, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.5)" },
      0.2
    );

    tl.fromTo(
      sectionRef.current.querySelectorAll(".social-button-anim"),
      { opacity: 0, scale: 0, rotate: -180 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.2, stagger: 0.05, ease: "back.out(2)" },
      0.3
    );

    // Fase 2: Contenido permanece visible (40% - 70% del scroll)
    tl.to({}, { duration: 0.3 }); // Pausa para que el usuario vea el contenido

    // Fase 3: Slide up reveal - todo se desliza hacia arriba (70% - 100% del scroll)
    tl.to(
      sectionRef.current.querySelector(".content-wrapper"),
      { y: -window.innerHeight, opacity: 0, duration: 0.4, ease: "power2.in" },
      "slideUp"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="nuestro-impacto" className="bg-background text-foreground min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="content-wrapper container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="title-anim text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
          {t('impactSection.title')}
        </h2>
        <p className="description-anim text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto">
          {t('impactSection.description')}
        </p>

        <div className="social-container-anim flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 border-2 border-primary rounded-xl p-6 sm:p-8 max-w-lg mx-auto shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
          <span className="text-base font-semibold text-foreground">{t('impactSection.shareLabel')}</span>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                asChild
                variant="outline"
                size="icon"
                className="social-button-anim border-2 border-primary hover:bg-primary hover:scale-110 hover:-rotate-6 transition-all duration-300 h-12 w-12"
                aria-label={social.ariaLabel}
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
