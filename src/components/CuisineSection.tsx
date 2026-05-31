import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { UtensilsCrossed, Wine, Flame, Leaf } from 'lucide-react';

export const CuisineSection = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  const menuItems = [
    {
      title: t('cuisine.seafoodTitle'),
      desc: t('cuisine.seafoodDesc'),
      icon: UtensilsCrossed,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: t('cuisine.kashubianTitle'),
      desc: t('cuisine.kashubianDesc'),
      icon: Leaf,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Bigos_%281%29.jpg/1280px-Bigos_%281%29.jpg'
    },
    {
      title: t('cuisine.craftTitle'),
      desc: t('cuisine.craftDesc'),
      icon: Wine,
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="cuisine" className="py-14 lg:py-0 lg:h-screen lg:max-h-screen bg-ocean text-linen relative overflow-hidden grain-overlay border-t border-linen/10">
      <div className="max-w-7xl mx-auto px-6 lg:h-full lg:flex lg:flex-col lg:justify-center">
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.75fr)] gap-10 lg:gap-12 items-center mb-10 lg:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <span className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold block font-display seafarer-line">
                {t('cuisine.localFlavors')}
              </span>
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif font-semibold leading-[0.9] text-linen">
                {t('cuisine.title')} <br />
                <span className="text-rose font-serif italic lowercase tracking-normal">
                  {t('cuisine.subtitle')}
                </span>
              </h2>
            </div>
            <p className="text-lg xl:text-xl text-linen/68 leading-relaxed font-serif italic max-w-lg">
              {t('cuisine.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[16/10] lg:aspect-[16/9] relative rounded-sm overflow-hidden soft-shadow">
              <img
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80&w=1200"
                alt="Chef at work"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"

              />
              <div className="absolute inset-0 bg-ocean/10" />
            </div>
            {/* Cocktail Float Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 left-4 md:-left-10 bg-charcoal/95 backdrop-blur-xl p-5 border border-linen/10 shadow-2xl max-w-[280px] space-y-3"
            >
              <div className="w-10 h-10 bg-rose/10 rounded-sm flex items-center justify-center text-rose">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-display font-bold text-linen uppercase">
                  {t('cuisine.barTitle')}
                </h4>
                <p className="text-xs text-linen/60 font-serif italic mt-1.5 leading-relaxed">
                  {t('cuisine.barDescription')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-4 lg:gap-5"
        >
          {menuItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group grid grid-cols-[104px_minmax(0,1fr)] md:grid-cols-1 xl:grid-cols-[118px_minmax(0,1fr)] gap-4 theme-panel bg-linen/[0.035] p-3 lg:p-4"
            >
              <div className="relative aspect-square md:aspect-[16/9] xl:aspect-square overflow-hidden rounded-sm shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"

                />
                <div className="absolute inset-0 bg-ocean/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2 self-center min-w-0">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 p-2 bg-linen/5 rounded-sm text-ocean/40">
                    <item.icon className="w-4 h-4 text-rose" />
                  </div>
                  <h3 className="text-xl xl:text-2xl font-serif italic text-linen leading-none">{item.title}</h3>
                </div>
                <p className="text-linen/58 leading-snug text-xs xl:text-sm clamp-3">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
