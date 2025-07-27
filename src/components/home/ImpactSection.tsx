
"use client";

import { useI18n } from '@/hooks/useI18n';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export function ImpactSection() {
  const { t } = useI18n();

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

  return (
    <section id="nuestro-impacto" className="bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          {t('impactSection.title')}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          {t('impactSection.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 border border-border rounded-lg p-4 sm:p-6 max-w-md mx-auto shadow-md">
          <span className="text-sm font-medium text-foreground">{t('impactSection.shareLabel')}</span>
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <Button 
                key={social.name}
                asChild 
                variant="outline" 
                size="icon"
                className="border-primary hover:bg-primary/10"
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
