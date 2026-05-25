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
    <section id="cuisine" className="py-40 bg-linen relative overflow-hidden grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-sage uppercase tracking-[0.6em] text-[10px] font-bold block font-display">
                {t('cuisine.localFlavors')}
              </span>
              <h2 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.85] text-ocean">
                {t('cuisine.title')} <br />
                <span className="text-rose font-serif italic lowercase tracking-normal">
                  {t('cuisine.subtitle')}
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed font-serif italic max-w-lg">
              {t('cuisine.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative rounded-[4rem] overflow-hidden soft-shadow">
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
              className="absolute -bottom-10 -left-10 md:-left-20 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-ocean/5 shadow-2xl max-w-xs space-y-4"
            >
              <div className="w-12 h-12 bg-rose/10 rounded-2xl flex items-center justify-center text-rose">
                <Wine className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-ocean uppercase tracking-tight">
                  {t('cuisine.barTitle')}
                </h4>
                <p className="text-sm text-charcoal/60 font-serif italic mt-2">
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
          className="grid md:grid-cols-3 gap-12"
        >
          {menuItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group space-y-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"

                />
                <div className="absolute inset-0 bg-ocean/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-ocean/5 rounded-xl text-ocean/40">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-2xl font-serif italic text-ocean">{item.title}</h3>
                </div>
                <p className="text-charcoal/60 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ocean/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
    </section>
  );
};
