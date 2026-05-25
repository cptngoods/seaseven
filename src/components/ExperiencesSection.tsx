import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../constants';
import { ArrowRight, ArrowLeft, X, Clock } from 'lucide-react';
import { useRef } from 'react';
import { ExperienceModal } from './ExperienceModal';
import { Experience } from '../types';

export const ExperiencesSection = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: 'prev' | 'next') => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(':scope > div')?.offsetWidth ?? 320;
    el.scrollBy({ left: (cardWidth + 24) * (dir === 'next' ? 1 : -1), behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    },
  };

  return (
    <section id="experiences" className="py-28 px-6 bg-ocean text-linen grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold mb-8 block font-display"
            >
              Our Trips
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.85]"
            >
              Baltic <br />
              <span className="text-rose font-serif italic lowercase tracking-normal">Dreams.</span>
            </motion.h2>
          </div>
          <p className="text-linen/70 max-w-sm text-right font-serif text-xl italic tracking-wide leading-relaxed">
            From the historic shipyards of Gdańsk to the pristine sands of Hel, 
            every charter is a bespoke odyssey crafted for your discovery.
          </p>
        </div>

        <div className="space-y-28">
          {/* Day Charters */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-8 mb-16">
              <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-rose font-display whitespace-nowrap">Day Events</h3>
              <div className="h-[1px] flex-1 bg-linen/10" />
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {EXPERIENCES.filter(exp => exp.type === 'day').map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] soft-shadow mb-8">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"

                    />
                    <div className="absolute inset-0 bg-ocean/20 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <button 
                        onClick={() => setSelectedExp(exp)}
                        className="w-full py-4 bg-linen/10 backdrop-blur-md text-linen border border-linen/20 rounded-2xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-rose hover:border-rose transition-all duration-500"
                      >
                        Explore Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="px-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-3xl font-serif italic text-linen">{exp.title}</h3>
                      <span className="text-rose font-sans text-lg">{exp.priceFrom}</span>
                    </div>
                    <p className="text-linen/70 font-sans text-sm leading-relaxed line-clamp-2">
                      {exp.description}
                    </p>
                    {exp.duration && (
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-linen/50 font-bold font-display">
                        <Clock className="w-3 h-3" /> {exp.duration}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}            </div>
          </motion.div>

          {/* Private Events — compact horizontal slider */}
          {EXPERIENCES.filter(exp => exp.type === 'special').length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Header row with slider controls */}
              <motion.div variants={itemVariants} className="flex items-center gap-8 mb-12">
                <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-rose font-display whitespace-nowrap">Private Events</h3>
                <div className="h-[1px] flex-1 bg-linen/10" />
                <div className="hidden md:flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => scrollSlider('prev')}
                    aria-label="Previous private event"
                    className="w-11 h-11 rounded-full border border-linen/20 text-linen/80 hover:text-linen hover:border-rose hover:bg-rose/10 flex items-center justify-center transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollSlider('next')}
                    aria-label="Next private event"
                    className="w-11 h-11 rounded-full border border-linen/20 text-linen/80 hover:text-linen hover:border-rose hover:bg-rose/10 flex items-center justify-center transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Slider track */}
              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              >
                {EXPERIENCES.filter(exp => exp.type === 'special').map((exp) => (
                  <motion.button
                    key={exp.id}
                    type="button"
                    variants={itemVariants}
                    onClick={() => setSelectedExp(exp)}
                    className="group relative shrink-0 w-[280px] sm:w-[320px] snap-start text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose/60 focus:ring-offset-4 focus:ring-offset-ocean rounded-[2rem]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] soft-shadow">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-transparent" />

                      {/* Price chip */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 bg-linen/10 backdrop-blur-md text-linen text-[9px] uppercase tracking-[0.25em] font-bold rounded-full font-display border border-linen/20">
                          {exp.priceFrom}
                        </span>
                      </div>

                      {/* Title + duration overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-2xl font-serif italic text-linen mb-1 leading-tight">{exp.title}</h4>
                        {exp.duration && (
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-linen/70 font-bold font-display">
                            <Clock className="w-3 h-3" /> {exp.duration}
                          </div>
                        )}
                      </div>

                      {/* Hover arrow */}
                      <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-rose/0 group-hover:bg-rose flex items-center justify-center transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <ArrowRight className="w-4 h-4 text-linen" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="mt-6 text-center text-linen/40 font-serif italic text-xs md:hidden">
                Swipe to explore →
              </p>
            </motion.div>
          )}
        </div>
      </div>


      <ExperienceModal
        experience={selectedExp} 
        onClose={() => setSelectedExp(null)} 
      />
    </section>
  );
};
