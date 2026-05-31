import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { CalendarDays, Users, MapPin } from 'lucide-react';

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
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center grain-overlay aurora-bg">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg"
          alt="M/Y SEA SEVEN"
          width={2000}
          height={1333}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover scale-105"

        />
        <div className="absolute inset-0 bg-ocean/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/65 via-ocean/15 to-ocean/80" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 pt-28 pb-44"
      >
        <motion.div
          variants={itemVariants}
            className="mb-7"
        >
          <span className="text-rose uppercase tracking-[0.55em] text-[11px] font-bold block opacity-90 font-display">
            {t('hero.model')}
          </span>
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-7xl md:text-9xl lg:text-[10vw] text-linen font-serif font-semibold leading-[0.78] mb-10 text-gradient"
        >
          SEA SEVEN
        </motion.h1>

        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <p className="text-linen/86 text-2xl md:text-4xl font-serif italic leading-relaxed">
            "{t('hero.motto')}"
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20"
        >
          <a 
            href="#inquiry"
            className="group relative px-14 py-5 inline-block overflow-hidden border border-linen/40 transition-all duration-500 hover:border-rose"
          >
            <div className="absolute inset-0 bg-rose translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-linen uppercase tracking-[0.32em] text-[11px] font-bold group-hover:text-ocean transition-colors duration-500 font-display">
              {t('nav.inquireNow')}
            </span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
        className="absolute left-6 right-6 bottom-10 z-20 mx-auto max-w-5xl theme-panel bg-ocean/55 backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto]">
          {[
            { icon: CalendarDays, label: 'Check-in', value: 'Choose date' },
            { icon: MapPin, label: 'Route', value: 'Tri-City Bay' },
            { icon: Users, label: 'Guests', value: 'Up to 16' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-7 py-5 border-b md:border-b-0 md:border-r border-linen/10">
              <item.icon className="w-4 h-4 text-rose" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.32em] text-linen/42 font-bold font-display">{item.label}</div>
                <div className="text-linen font-serif italic text-xl leading-none mt-1">{item.value}</div>
              </div>
            </div>
          ))}
          <a href="/inquiry.html" className="px-8 py-5 bg-rose text-ocean text-[11px] uppercase tracking-[0.28em] font-bold font-display flex items-center justify-center hover:bg-linen transition-colors">
            Check Availability
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden xl:flex flex-col items-center gap-4"
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
