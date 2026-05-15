import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any }
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center grain-overlay aurora-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg"
          alt="M/Y SEA SEVEN"
          className="absolute inset-0 w-full h-full object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ocean/40 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/20 via-transparent to-ocean/40" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="text-linen uppercase tracking-[0.6em] text-[10px] font-bold block opacity-80">
            {t('hero.model')}
          </span>
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[8vw] text-linen font-display font-bold leading-[0.85] uppercase tracking-tighter mb-12 text-gradient"
        >
          SEA SEVEN
        </motion.h1>

        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <p className="text-linen/90 text-xl md:text-2xl font-serif italic tracking-widest leading-relaxed">
            "{t('hero.motto')}"
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <a 
            href="#inquiry"
            className="group relative px-16 py-6 inline-block overflow-hidden rounded-full border border-linen/30 transition-all duration-500 hover:border-linen"
          >
            <div className="absolute inset-0 bg-linen translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-linen uppercase tracking-[0.3em] text-[10px] font-bold group-hover:text-ocean transition-colors duration-500">
              {t('nav.inquireNow')}
            </span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-linen/40 uppercase tracking-[0.4em] text-[8px] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-linen/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};
