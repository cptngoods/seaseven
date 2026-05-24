import React from 'react';
import { motion } from 'motion/react';
import {
  ChefHat,
  Camera,
  Martini,
  Disc3,
  Music4,
  Wine,
  Flower2,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { EXTRAS } from '../constants';

const ICONS: Record<string, LucideIcon> = {
  ChefHat,
  Camera,
  Martini,
  Disc3,
  Music4,
  Wine,
  Flower2,
  Sparkles,
};

export const ExtrasSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section
      id="extras"
      className="py-40 px-6 bg-ocean text-linen relative overflow-hidden grain-overlay"
    >
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-rose/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-seafoam/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold mb-8 block font-display"
            >
              Add-ons
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.85]"
            >
              Elevate <br />
              <span className="text-rose font-serif italic lowercase tracking-normal">
                your charter.
              </span>
            </motion.h2>
          </div>
          <p className="text-linen/60 max-w-sm text-right font-serif text-xl italic tracking-wide leading-relaxed">
            Layer in chefs, bartenders, musicians and more — every extra hand-picked
            from the Tri-City's finest, briefed and managed by our crew.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {EXTRAS.map((extra) => {
            const Icon = ICONS[extra.icon] ?? Sparkles;
            return (
              <motion.div
                key={extra.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-[2rem] bg-linen/5 backdrop-blur-sm border border-linen/10 hover:border-rose/40 transition-colors duration-500 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-rose/10 border border-rose/20 flex items-center justify-center mb-6 group-hover:bg-rose group-hover:border-rose transition-colors duration-500">
                  <Icon className="w-6 h-6 text-rose group-hover:text-linen transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-serif italic text-linen mb-3">
                  {extra.name}
                </h3>
                <p className="text-linen/60 font-sans text-sm leading-relaxed mb-6 flex-1">
                  {extra.description}
                </p>

                <div className="pt-6 border-t border-linen/10 flex items-baseline justify-between">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-linen/40 font-display">
                    From
                  </span>
                  <span className="text-rose font-sans text-lg">{extra.priceFrom}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-linen/40 font-serif italic text-sm"
        >
          Prices indicative · all extras invoiced separately · request in your inquiry.
        </motion.p>
      </div>
    </section>
  );
};
