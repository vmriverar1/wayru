
"use client";

import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: <Facebook size={20} /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin size={20} /> },
    { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram size={20} /> },
  ];

  const legalLinks = [
    { href: '/privacy-policy', labelKey: 'footer.privacyPolicy' },
    { href: '/legal-notice', labelKey: 'footer.legalNotice' },
    { href: '/complaints-book', labelKey: 'footer.complaintsBook' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-center md:text-left">
            {t('footer.copy', { year: currentYear.toString() })} {t('appName')}
          </p>
          
          <nav className="flex flex-wrap justify-center md:justify-start items-center space-x-4 text-xs">
            {legalLinks.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {socialLinks.map(social => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`footer.social.${social.name.toLowerCase()}` as any)}
                className="text-primary hover:opacity-75 transition-opacity"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
