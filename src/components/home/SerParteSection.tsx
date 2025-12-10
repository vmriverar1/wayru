"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 'sponsor',
    titleKey: 'serParte.slide1_title',
    descriptionKey: 'serParte.slide1_description',
    buttonKey: 'serParte.slide1_button',
    buttonAction: 'contact',
    imageSrc: '/images/serparte/slide1.jpg',
    aiHint: 'community project hands'
  },
  {
    id: 'inspire',
    titleKey: 'serParte.slide2_title',
    descriptionKey: 'serParte.slide2_description',
    buttonKey: 'serParte.slide2_button',
    buttonAction: 'contact',
    imageSrc: '/images/serparte/slide2.jpg',
    aiHint: 'people collaboration lightbulb'
  },
  {
    id: 'share',
    titleKey: 'serParte.slide3_title',
    descriptionKey: 'serParte.slide3_description',
    buttonKey: 'serParte.slide3_button',
    buttonAction: 'social',
    imageSrc: '/images/serparte/slide3.jpg',
    aiHint: 'social media sharing'
  },
];

export function SerParteSection() {
  const { t } = useI18n();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [contactDialogTitleKey, setContactDialogTitleKey] = useState('serParte.contactUs');
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroHintRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !heroRef.current || !cardsContainerRef.current) return;
    if (!heroTitleRef.current || !heroDescRef.current || !heroHintRef.current) return;

    const section = sectionRef.current;
    const hero = heroRef.current;
    const heroTitle = heroTitleRef.current;
    const heroDesc = heroDescRef.current;
    const heroHint = heroHintRef.current;
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

    const isMobileView = window.innerWidth < 768;

    // Set initial state - cards visible
    gsap.set(cardsContainer, { opacity: 0 });

    // Calculate total scroll distance - 80vw per card on mobile, 45vw on desktop
    const cardWidth = isMobileView ? window.innerWidth * 0.80 : window.innerWidth * 0.45;
    const gap = isMobileView ? 16 : 32; // Smaller gap on mobile
    const totalWidth = (cards.length * cardWidth) + ((cards.length - 1) * gap);

    // Get title boundaries after it shrinks (20% from top after animation)
    const getTitleBounds = () => {
      const viewportHeight = window.innerHeight;
      const titleTop = viewportHeight * 0.2; // 20vh from top
      const titleBottom = titleTop + (heroTitle.offsetHeight * 0.7); // Title height at 70% scale
      const titleCenterX = window.innerWidth / 2;
      return { titleTop, titleBottom, titleCenterX };
    };

    // Adjust scroll multiplier for mobile (cards are wider, need more scroll distance)
    const scrollMultiplier = isMobileView ? 3.5 : 2.5;

    // Main timeline for horizontal scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalWidth * scrollMultiplier + window.innerHeight * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Detect which card is under the title
          const progress = self.progress;
          const scrollX = -(window.innerWidth + totalWidth - window.innerWidth * 0.5) * ((progress - 0.26) / 0.74);

          if (progress >= 0.26) {
            const { titleCenterX } = getTitleBounds();
            const containerLeft = window.innerWidth; // pl-[100vw] - starts from right edge

            cards.forEach((card, index) => {
              const cardLeft = containerLeft + scrollX + (index * (cardWidth + gap));
              const cardCenter = cardLeft + (cardWidth / 2);

              // Check if card center is near title center (with tolerance)
              const tolerance = cardWidth * 0.3;
              const isUnderTitle = cardCenter >= titleCenterX - tolerance && cardCenter <= titleCenterX + tolerance;

              if (isUnderTitle) {
                if (lastActiveIndexRef.current !== index) {
                  lastActiveIndexRef.current = index;
                  setActiveCardIndex(index);
                }
              }
            });
          }
        }
      }
    });

    // Phase 1: Hero stays visible (0-0.08 of timeline)
    tl.to({}, { duration: 0.08 }, 0); // Pause/delay

    // Phase 2: Title shrinks and moves up, description/hint fade out (0.08-0.15)
    tl.to(heroTitle, {
      scale: 0.7,
      y: -window.innerHeight * 0.2,
      duration: 0.07,
    }, 0.08);

    tl.to([heroDesc, heroHint], {
      opacity: 0,
      duration: 0.07,
    }, 0.08);

    // Phase 2.5: Small gap (0.15-0.16)
    tl.to({}, { duration: 0.01 }, 0.15); // Tiny pause

    // Phase 3: Show cards container (0.16-0.26)
    tl.to(cardsContainer, {
      opacity: 1,
      duration: 0.1,
    }, 0.16);

    // Phase 4: Horizontal scroll of cards (0.26-1.0)
    tl.to(cardsContainer, {
      x: () => -(window.innerWidth + totalWidth - window.innerWidth * 0.5),
      duration: 0.74,
      ease: 'none',
    }, 0.26);


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openContactDialog = (titleKey: string) => {
    setContactDialogTitleKey(titleKey);
    setIsContactDialogOpen(true);
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", ariaLabelKey: "impactSection.shareFacebook" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", ariaLabelKey: "impactSection.shareTwitter" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", ariaLabelKey: "impactSection.shareLinkedIn" },
    { name: "Email", icon: Mail, href: "mailto:info@wayru.pe", ariaLabelKey: "impactSection.shareEmail" }
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact form submitted");
    alert(t('serParte.form.submitted'));
    setIsContactDialogOpen(false);
  };

  return (
    <div ref={sectionRef} className="relative w-full h-screen bg-primary overflow-hidden">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground z-10 pointer-events-none"
      >
        <h2 ref={heroTitleRef} className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-center px-4">
          {t('serParte.title')}
        </h2>
        <p ref={heroDescRef} className="text-base sm:text-xl md:text-2xl mb-6 md:mb-8 opacity-70 text-center max-w-3xl px-4">
          {t('serParte.introText')}
        </p>
        <div ref={heroHintRef} className="flex items-center gap-2 opacity-60 animate-bounce">
          <span className="text-xs sm:text-sm md:text-base">Scroll para descubrir</span>
          <ChevronRight size={18} className="md:w-5 md:h-5" />
        </div>
      </div>

      {/* Cards Container - Horizontal Scroll */}
      <div
        ref={cardsContainerRef}
        className="absolute top-0 left-0 h-full flex gap-4 md:gap-8 pl-[100vw] pr-[10vw] md:pr-[15vw] pt-[25vh] md:pt-[30vh]"
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="relative flex-shrink-0 w-[80vw] md:w-[45vw] h-[65vh] md:h-[60vh]"
          >
            {/* Card with image on top, content below */}
            <div className="bg-background rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col relative">
              {/* Image Section */}
              <div className="relative w-full h-1/2 flex-shrink-0 card-image">
                <Image
                  src={card.imageSrc}
                  alt={t(card.titleKey)}
                  fill
                  className="object-cover"
                  data-ai-hint={card.aiHint}
                  priority={index === 0}
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-4 md:p-8 flex flex-col">
                <h3 className="text-xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
                  {t(card.titleKey)}
                </h3>
                <p className="text-foreground text-sm md:text-lg leading-relaxed mb-4 md:mb-6 flex-grow">
                  {t(card.descriptionKey)}
                </p>
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg py-4 md:py-6 pointer-events-auto"
                  onClick={() => {
                    if (card.buttonAction === 'contact') {
                      const dialogTitle = card.id === 'sponsor' ? 'serParte.contactUs' : 'serParte.buildWithUs';
                      openContactDialog(dialogTitle);
                    } else if (card.buttonAction === 'social') {
                      setIsSocialDialogOpen(true);
                    }
                  }}
                >
                  {t(card.buttonKey)}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary">{t(contactDialogTitleKey)}</DialogTitle>
            <DialogDescription>
              {t('serParte.form.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-foreground">
                {t('serParte.form.name')}
              </Label>
              <Input id="name" required className="col-span-3 bg-input border-border text-foreground" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right text-foreground">
                {t('serParte.form.email')}
              </Label>
              <Input id="email" type="email" required className="col-span-3 bg-input border-border text-foreground" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right text-foreground">
                {t('serParte.form.message')}
              </Label>
              <Textarea id="message" required className="col-span-3 bg-input border-border text-foreground" />
            </div>
            <DialogClose asChild>
              <Button type="submit" className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">{t('serParte.form.send')}</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>

      {/* Social Share Dialog */}
      <Dialog open={isSocialDialogOpen} onOpenChange={setIsSocialDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary">{t('serParte.social.title')}</DialogTitle>
            <DialogDescription>
              {t('serParte.social.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                asChild
                variant="outline"
                className="w-full justify-start gap-3 border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon size={20} />
                  <span>{t(social.ariaLabelKey)}</span>
                </a>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
