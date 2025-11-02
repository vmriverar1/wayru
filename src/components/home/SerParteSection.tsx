
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

const sliderData = [
  {
    id: 'sponsor',
    titleKey: 'serParte.slide1_title',
    descriptionKey: 'serParte.slide1_description',
    buttonKey: 'serParte.slide1_button',
    buttonAction: 'contact',
    imageSrc: 'https://placehold.co/600x400.png',
    aiHint: 'community project hands'
  },
  {
    id: 'inspire',
    titleKey: 'serParte.slide2_title',
    descriptionKey: 'serParte.slide2_description',
    buttonKey: 'serParte.slide2_button',
    buttonAction: 'contact',
    imageSrc: 'https://placehold.co/600x400.png',
    aiHint: 'people collaboration lightbulb'
  },
  {
    id: 'share',
    titleKey: 'serParte.slide3_title',
    descriptionKey: 'serParte.slide3_description',
    buttonKey: 'serParte.slide3_button',
    buttonAction: 'social',
    imageSrc: 'https://placehold.co/600x400.png',
    aiHint: 'social media sharing'
  },
];

export function SerParteSection() {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isSocialDialogOpen, setIsSocialDialogOpen] = useState(false);
  const [contactDialogTitleKey, setContactDialogTitleKey] = useState('serParte.contactUs');

  const slideContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
  };

  useEffect(() => {
    if (slideContainerRef.current && slideRefs.current[activeIndex]) {
      const targetSlide = slideRefs.current[activeIndex];
      if (targetSlide) {
        gsap.to(slideContainerRef.current, {
          x: -targetSlide.offsetLeft,
          duration: 0.5,
          ease: 'power3.inOut',
        });
      }
    }
  }, [activeIndex]);
  
  const openContactDialog = (titleKey: string) => {
    setContactDialogTitleKey(titleKey);
    setIsContactDialogOpen(true);
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", ariaLabelKey: "impactSection.shareFacebook" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", ariaLabelKey: "impactSection.shareTwitter" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", ariaLabelKey: "impactSection.shareLinkedIn" },
    { name: "Email", icon: Mail, href: "mailto:info@aquavita.org", ariaLabelKey: "impactSection.shareEmail" }
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Contact form submitted");
    alert(t('serParte.form.submitted')); 
    setIsContactDialogOpen(false);
  };


  return (
    <section id="ser-parte" className="bg-primary text-primary-foreground py-16 md:py-24 lg:py-32 overflow-hidden">
      <div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Title and Navigation */}
          <div className="text-center md:text-left px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {t('serParte.title')}
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              {t('serParte.introText')}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={handlePrev}
                className="rounded-full w-12 h-12 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
                aria-label={t('serParte.prevSlide')}
              >
                <ChevronLeft size={24} />
              </Button>
              <span className="text-sm font-medium">
                {activeIndex + 1} / {sliderData.length}
              </span>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleNext}
                className="rounded-full w-12 h-12 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
                aria-label={t('serParte.nextSlide')}
              >
                <ChevronRight size={24} />
              </Button>
            </div>
          </div>

          {/* Right Column: Slider */}
          <div className="relative w-full md:h-[600px] h-[550px]"> {/* Fixed height for the slider area */}
            <div className="overflow-hidden h-full"> {/* Slider Viewport - removed rounded corners */}
              <div ref={slideContainerRef} className="flex h-full"> {/* Slider Track */}
                {sliderData.map((slide, index) => (
                  <div
                    key={slide.id}
                    ref={(el) => (slideRefs.current[index] = el)}
                    className="h-full flex-shrink-0"
                    style={{ width: '85%' }} // Each slide item takes 85% of viewport width
                  >
                    <div className="w-full h-full flex items-center"> {/* Centered container */}
                        <Card className="bg-background text-foreground h-full w-full flex flex-col shadow-xl overflow-hidden">
                           {/* Image Container */}
                          <div className="relative w-full h-48 md:h-56 flex-shrink-0">
                            <Image
                              src={slide.imageSrc}
                              alt={t(slide.titleKey)} 
                              fill
                              className="object-cover"
                              data-ai-hint={slide.aiHint}
                              priority={index === 0} // Prioritize first image
                            />
                          </div>
                          {/* Text Content Area */}
                          <div className="p-4 md:p-6 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <CardHeader className="p-0 mb-2 md:mb-4">
                                <CardTitle className="text-xl md:text-2xl text-primary leading-tight">{t(slide.titleKey)}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                <p className="text-muted-foreground mb-4 md:mb-6 text-sm leading-relaxed">
                                    {t(slide.descriptionKey)}
                                </p>
                                </CardContent>
                            </div>
                            <div className="mt-auto">
                                <Button
                                    variant="default"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-2.5 md:py-3"
                                    onClick={() => {
                                    if (slide.buttonAction === 'contact') {
                                        const dialogTitle = slide.id === 'sponsor' ? 'serParte.contactUs' : 'serParte.buildWithUs';
                                        openContactDialog(dialogTitle);
                                    } else if (slide.buttonAction === 'social') {
                                        setIsSocialDialogOpen(true);
                                    }
                                    }}
                                >
                                    {t(slide.buttonKey)}
                                </Button>
                            </div>
                          </div>
                        </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
    </section>
  );
}
