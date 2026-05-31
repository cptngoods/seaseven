import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { GdanskBayMap } from './GdanskBayMap';

export const DestinationsSection = () => {
  const [activeIsland, setActiveIsland] = useState<string | null>('sopot');
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section id="destinations" className="py-14 md:py-16 bg-ocean text-linen grain-overlay border-t border-linen/10">
      <div className="max-w-[1760px] mx-auto px-6">
        <div className="flex w-full flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block font-display seafarer-line"
            >
              The Bay
            </motion.span>
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as any }}
              className="text-5xl md:text-6xl xl:text-7xl font-serif font-semibold text-linen leading-[0.9]"
            >
              Where <span className="text-rose font-serif italic lowercase tracking-normal">we go.</span>
            </motion.h2>
          </div>
          <p className="text-linen/58 max-w-sm md:text-right font-serif text-base xl:text-lg italic leading-relaxed">
            From the bustling historic shipyards of Gdańsk to the sandy shores of Hel,
            discover the timeless charm of the Polish Riviera.
          </p>
        </div>
      </div>

      <div className="max-w-[1760px] mx-auto px-6">
        <div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as any }}
            className="relative h-[420px] md:h-[500px] xl:h-[52vh] xl:min-h-[420px] xl:max-h-[560px] border border-linen/10 bg-charcoal/40 soft-shadow"
          >
            <GdanskBayMap activeIsland={activeIsland} />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-5 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4"
          >
            {DESTINATIONS.map((dest, i) => {
              const isActive = activeIsland === dest.id;
              return (
                <motion.button
                  key={dest.id}
                  id={`dest-${dest.id}`}
                  variants={itemVariants}
                  onClick={() => setActiveIsland(dest.id)}
                  className={`group h-full min-h-[190px] 2xl:min-h-[178px] overflow-hidden border text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-rose/70 bg-rose text-ocean'
                      : 'border-linen/12 bg-linen/[0.035] text-linen hover:border-rose/35 hover:bg-linen/[0.06]'
                  }`}
                >
                  <div className="grid h-full grid-cols-[118px_minmax(0,1fr)] xl:grid-cols-[140px_minmax(0,1fr)] 2xl:grid-cols-[36%_minmax(0,1fr)]">
                    <div className="relative overflow-hidden bg-linen/5">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-ocean/10' : 'bg-ocean/32'}`} />
                    </div>
                    <div className="min-w-0 p-4 xl:p-5 flex flex-col justify-between">
                      <div>
                        <div className={`text-[8px] uppercase tracking-[0.3em] font-bold font-display mb-2 ${isActive ? 'text-ocean/55' : 'text-rose'}`}>
                          {String(i + 1).padStart(2, '0')} / Bay Route
                        </div>
                        <h3 className="text-2xl xl:text-[28px] font-serif italic leading-none mb-2 clamp-2">
                          {dest.name}
                        </h3>
                        <p className={`font-serif italic text-[13px] leading-snug clamp-2 ${isActive ? 'text-ocean/70' : 'text-linen/58'}`}>
                          {dest.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3 pt-2">
                        <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-1">
                          {dest.highlights.slice(0, 2).map((highlight) => (
                            <span key={highlight} className={`max-w-full text-[7px] uppercase tracking-[0.22em] font-bold font-display clamp-1 ${isActive ? 'text-ocean/55' : 'text-linen/34'}`}>
                              {highlight}
                            </span>
                          ))}
                        </div>
                      {isActive ? (
                          <MapPin className="w-[18px] h-[18px] shrink-0 text-ocean" />
                      ) : (
                          <ArrowUpRight className="w-[18px] h-[18px] shrink-0 text-linen/30 transition-all duration-300 group-hover:text-rose group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
