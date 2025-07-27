
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useI18n } from '@/hooks/useI18n';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/our-mission', labelKey: 'nav.ourMission' },
  { href: '/solutions', labelKey: 'nav.solutions' },
  { href: '/projects', labelKey: 'nav.projects' },
  { href: '/blog', labelKey: 'nav.blog' },
  { href: '/contact', labelKey: 'nav.contact' },
];

export function Navbar() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dynamicColorClass = isScrolled || isMenuOpen ? 'text-primary' : 'text-primary-foreground';
  const dynamicIconBtnBgClass = isScrolled || isMenuOpen 
    ? 'text-primary hover:bg-accent focus-visible:bg-accent' 
    : 'text-primary-foreground hover:text-primary-foreground hover:bg-white/10 focus-visible:text-primary-foreground focus-visible:bg-white/10';


  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background shadow-md' : 'bg-transparent',
        isMenuOpen && 'bg-background shadow-md' 
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className={cn("flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity", dynamicColorClass)}>
            <Droplet size={32} />
            <span>{t('appName')}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors px-2 lg:px-3 py-2 rounded-md hover:opacity-80', // Keep hover opacity or adjust
                  dynamicColorClass // Apply the unified dynamic color
                )}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <LanguageSwitcher 
              className={cn(
                'text-sm font-medium transition-colors', // Base styling for LS
                 dynamicColorClass // Apply unified dynamic color
              )} 
            />
          </nav>

          <div className="md:hidden flex items-center">
            <LanguageSwitcher 
                className={cn(
                  'text-sm font-medium transition-colors mr-2',
                   dynamicColorClass // Apply unified dynamic color
                )} 
              />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={cn(
                'hover:bg-accent focus-visible:bg-accent', // Base styling for icon button
                dynamicIconBtnBgClass // Dynamic classes for text and background hover based on scroll/menu state
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background absolute w-full shadow-lg pb-4 border-t border-border">
          <nav className="flex flex-col items-center space-y-2 px-4 pt-2">
            {navLinks.map((link) => (
               <Button key={link.href} asChild variant="ghost" className="w-full">
                <Link
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors py-2 w-full text-center text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
