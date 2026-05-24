import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../constants';
import { ArrowRight, X, Clock } from 'lucide-react';
import { ExperienceModal } from './ExperienceModal';
import { Experience } from '../types';

export const ExperiencesSection = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

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
    <section id="experiences" className="py-40 px-6 bg-ocean text-linen grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
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
          <p className="text-linen/60 max-w-sm text-right font-serif text-xl italic tracking-wide leading-relaxed">
            From the historic shipyards of Gdańsk to the pristine sands of Hel, 
            every charter is a bespoke odyssey crafted for your discovery.
          </p>
        </div>

        <div className="space-y-40">
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
                      referrerPolicy="no-referrer"
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
                    <p className="text-linen/50 font-sans text-sm leading-relaxed line-clamp-2">
                      {exp.description}
                    </p>
                    {exp.duration && (
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-linen/30 font-bold font-display">
                        <Clock className="w-3 h-3" /> {exp.duration}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}            </div>
          </motion.div>

          {/* Private Events */}
          {EXPERIENCES.filter(exp => exp.type === 'special').length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="flex items-center gap-8 mb-16">
                <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-rose font-display whitespace-nowrap">Private Events</h3>
                <div className="h-[1px] flex-1 bg-linen/10" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {EXPERIENCES.filter(exp => exp.type === 'special').map((exp) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    className="group relative"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] soft-shadow mb-8">
                      <img
                        src={exp.image}
                        alt={exp.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
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
                      <p className="text-linen/50 font-sans text-sm leading-relaxed line-clamp-2">
                        {exp.description}
                      </p>
                      {exp.duration && (
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-linen/30 font-bold font-display">
                          <Clock className="w-3 h-3" /> {exp.duration}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
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
