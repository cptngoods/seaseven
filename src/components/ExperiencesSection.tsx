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
              viewport={{ once: true, amount: 0.05 }}
            >
              {/* Editorial header */}
              <motion.div variants={itemVariants} className="text-center mb-20 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-rose/40" />
                  <span className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold font-display">Private Events</span>
                  <div className="h-[1px] w-12 bg-rose/40" />
                </div>
                <h3 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.9] mb-6">
                  Beyond the{' '}
                  <span className="text-rose font-serif italic lowercase tracking-normal">ordinary.</span>
                </h3>
                <p className="text-linen/50 font-serif italic text-lg leading-relaxed">
                  Six bespoke charter formats — from corporate retreats to weddings under the flybridge canopy. Each one tailored end-to-end by our crew.
                </p>
              </motion.div>

              {/* Editorial grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {EXPERIENCES.filter(exp => exp.type === 'special').map((exp) => (
                  <motion.button
                    key={exp.id}
                    variants={itemVariants}
                    onClick={() => setSelectedExp(exp)}
                    className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] cursor-pointer text-left soft-shadow focus:outline-none focus:ring-2 focus:ring-rose/60 focus:ring-offset-4 focus:ring-offset-ocean"
                  >
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />

                    {/* Always-on gradient + price chip */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute top-5 right-5 z-10">
                      <span className="px-3 py-1.5 bg-linen/10 backdrop-blur-md text-linen text-[9px] uppercase tracking-[0.25em] font-bold rounded-full font-display border border-linen/20">
                        {exp.priceFrom}
                      </span>
                    </div>

                    {/* Default content — title + duration */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:-translate-y-2">
                      <h3 className="text-3xl font-serif italic text-linen mb-2 leading-tight">{exp.title}</h3>
                      {exp.duration && (
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-linen/70 font-bold font-display">
                          <Clock className="w-3 h-3" /> {exp.duration}
                        </div>
                      )}
                    </div>

                    {/* Hover reveal — full detail */}
                    <div className="absolute inset-0 bg-ocean/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-7">
                      <h3 className="text-2xl font-serif italic text-linen mb-1 leading-tight">{exp.title}</h3>
                      {exp.duration && (
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-linen/50 font-bold font-display mb-5">
                          <Clock className="w-3 h-3" /> {exp.duration}
                        </div>
                      )}
                      <p className="text-linen/70 font-sans text-[13px] leading-relaxed mb-5 line-clamp-4">
                        {exp.description}
                      </p>
                      {exp.routes && exp.routes.length > 0 && (
                        <ul className="space-y-1.5 mb-6">
                          {exp.routes.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-[11px] text-linen/60 font-sans leading-relaxed">
                              <span className="text-rose mt-1 shrink-0 text-base leading-none">·</span>
                              <span className="line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center gap-2 text-rose text-[10px] uppercase tracking-[0.3em] font-bold font-display pt-4 border-t border-linen/10">
                        Explore details <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Section CTA */}
              <motion.div variants={itemVariants} className="mt-20 text-center">
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-rose hover:bg-linen text-linen hover:text-ocean rounded-full font-display font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500"
                >
                  Plan your private event
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="mt-6 text-linen/30 font-serif italic text-sm">
                  Custom formats also available — tell us what you're imagining.
                </p>
              </motion.div>
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
