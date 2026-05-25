import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DESTINATIONS } from '../constants';
import { MapPin } from 'lucide-react';
import { GdanskBayMap } from './GdanskBayMap';

export const DestinationsSection = () => {
  const [activeIsland, setActiveIsland] = useState<string | null>(null);

  const handleIslandClick = (id: string) => {
    setActiveIsland(id);
    const element = document.getElementById(`dest-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    },
  };

  return (
    <section id="destinations" className="py-40 bg-gradient-to-b from-linen via-sky/20 to-linen overflow-hidden grain-overlay">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sage uppercase tracking-[0.6em] text-[10px] font-bold mb-8 block font-display"
            >
              The Bay
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-bold text-ocean leading-[0.85] uppercase tracking-tighter"
            >
              Where <br />
              <span className="text-rose font-serif italic lowercase tracking-normal">We Go.</span>
            </motion.h2>
          </div>
          <p className="text-charcoal/60 max-w-sm text-right font-serif text-xl italic tracking-wide leading-relaxed">
            From the bustling historic shipyards of Gdańsk to the sandy shores of Hel, 
            discover the timeless charm of the Polish Riviera.
          </p>
        </div>
      </div>

      {/* Wide-screen Map Container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="w-full relative h-[60vh] md:h-[75vh]"
      >
        <GdanskBayMap activeIsland={activeIsland} onIslandClick={handleIslandClick} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-24 md:-mt-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {DESTINATIONS.map((dest) => (
            <motion.div
              key={dest.id}
              id={`dest-${dest.id}`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              animate={activeIsland === dest.id ? { scale: 1.02, y: -5 } : { scale: 1, y: 0 }}
              className={`group cursor-pointer p-4 rounded-[2rem] transition-all duration-500 ${
                activeIsland === dest.id 
                  ? 'bg-white shadow-2xl shadow-ocean/20 ring-1 ring-sage/30' 
                  : 'bg-white/80 backdrop-blur-md hover:bg-white shadow-lg shadow-ocean/5'
              }`}
              onClick={() => {
                setActiveIsland(dest.id);
              }}
            >
              <div className="relative aspect-video overflow-hidden rounded-[1.5rem] mb-4 soft-shadow">
                <img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"

                />
                <div className="absolute inset-0 bg-ocean/10 group-hover:bg-transparent transition-colors duration-700" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-ocean flex items-center gap-2 uppercase tracking-tight">
                  <MapPin className={`w-4 h-4 transition-colors duration-500 ${activeIsland === dest.id ? 'text-rose' : 'text-sage'}`} /> {dest.name}
                </h3>
                <p className="text-charcoal/70 leading-relaxed font-serif italic text-xs line-clamp-2">
                  {dest.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dest.highlights.slice(0, 2).map((highlight) => (
                    <span key={highlight} className="px-2 py-0.5 bg-sage/5 text-sage text-[7px] uppercase tracking-widest font-bold rounded-full border border-sage/10 font-display">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
