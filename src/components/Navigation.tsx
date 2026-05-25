import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage, Language } from '../contexts/LanguageContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.yacht'), href: '#yacht' },
    { name: t('nav.dayTrips'), href: '#experiences' },
    { name: t('nav.destinations'), href: '#destinations' },
    { name: t('nav.cuisine'), href: '#cuisine' },
    { name: t('nav.gallery'), href: '#gallery' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'pl', label: 'PL' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <nav
      style={{ top: 'var(--banner-h, 0px)' }}
      className={cn(
      "fixed left-0 right-0 z-50 transition-all duration-700 px-8 py-4",
      isScrolled ? "glass-nav py-2" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" aria-label="SEA · 7" className="flex items-center gap-3 group">
          <span className={cn(
            "text-xl md:text-2xl font-display font-light tracking-[0.45em] uppercase transition-colors duration-500",
            isScrolled ? "text-ocean" : "text-linen"
          )}>
            SEA<span className="mx-2 opacity-70">·</span>7
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] font-bold hover:text-rose transition-colors duration-300 font-display",
                isScrolled ? "text-ocean/70" : "text-linen/80"
              )}
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-4 px-4 border-l border-r border-linen/10 h-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "text-[10px] font-bold tracking-widest transition-all duration-300 hover:text-rose",
                  language === lang.code 
                    ? "text-rose scale-110" 
                    : isScrolled ? "text-ocean/40" : "text-linen/40"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <a 
            href="#inquiry"
            className={cn(
              "px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 font-display flex items-center justify-center",
              isScrolled 
                ? "btn-gradient-animate text-linen" 
                : "bg-linen/10 backdrop-blur-md text-linen border border-linen/30 btn-gradient-animate hover:border-transparent"
            )}
          >
            {t('nav.inquire')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-3 pr-4 border-r border-linen/20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "text-[10px] font-bold tracking-widest",
                  language === lang.code 
                    ? "text-rose" 
                    : isScrolled ? "text-ocean/40" : "text-linen/40"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-ocean" : "text-linen"} />
            ) : (
              <Menu className={isScrolled ? "text-ocean" : "text-linen"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-linen p-8 flex flex-col gap-6 shadow-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-ocean text-lg uppercase tracking-widest font-medium border-b border-ocean/10 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#inquiry"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gradient-animate text-linen py-4 rounded-full text-sm uppercase tracking-widest font-semibold text-center"
            >
              {t('nav.inquireNow')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/yournumber"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-8 right-8 z-50 bg-sage text-linen p-5 rounded-full shadow-2xl flex items-center justify-center soft-shadow border border-linen/20 hover:bg-rose transition-colors duration-500"
  >
    <MessageCircle className="w-6 h-6" />
  </motion.a>
);
