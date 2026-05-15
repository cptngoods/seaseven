import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CreditCard, Users, Anchor, CheckCircle2 } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export const ExperienceModal = ({ experience, onClose }: ExperienceModalProps) => {
  if (!experience) return null;

  const inclusions = ['Professional Crew (3)', 'Fuel (set hours)', 'Welcome Polish Snacks', 'Gourmet Appetizers', 'Snorkeling Gear', 'SUP Boards', 'Towels', 'Final Cleaning'];

  return (
    <AnimatePresence>
      {experience && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ocean/95 backdrop-blur-2xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="relative w-full h-full bg-linen overflow-y-auto custom-scrollbar shadow-2xl flex flex-col"
          >
            {/* Header / Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full flex-shrink-0">
              <img 
                src={experience.image} 
                alt={experience.title}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ocean/40 via-transparent to-linen" />
              
              <button 
                onClick={onClose}
                className="absolute top-10 right-10 z-50 p-4 bg-linen/10 backdrop-blur-xl hover:bg-rose/20 rounded-full transition-all group border border-linen/20"
              >
                <X className="w-8 h-8 text-linen group-hover:text-rose" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-20">
                <div className="max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <span className="px-6 py-2 bg-rose text-linen text-[10px] uppercase tracking-[0.4em] font-bold rounded-full font-display inline-block">
                      Day Event
                    </span>
                    <h2 className="text-6xl md:text-9xl font-display font-bold text-ocean uppercase tracking-tighter leading-[0.85]">
                      {experience.title}
                    </h2>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-linen pb-32">
              <div className="max-w-7xl mx-auto px-10 md:px-20">
                <div className="grid lg:grid-cols-12 gap-20 py-20">
                  {/* Left Column: Overview */}
                  <div className="lg:col-span-7 space-y-20">
                    <div className="space-y-8">
                      <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-rose font-display">The Experience</h3>
                      <p className="text-3xl md:text-4xl text-charcoal/80 font-serif italic leading-tight">
                        {experience.description}
                      </p>
                    </div>

                    {experience.routes && (
                      <div className="space-y-16">
                        <div className="flex items-center gap-8">
                          <h4 className="text-xs uppercase tracking-[0.5em] font-bold text-ocean font-display whitespace-nowrap">
                            Suggested Route
                          </h4>
                          <div className="h-[1px] flex-1 bg-ocean/10" />
                        </div>
                        <div className="space-y-12">
                          {experience.routes.map((route, i) => {
                            const step = experience.itinerary?.[i];
                            
                            return (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group grid md:grid-cols-12 gap-10 items-start"
                              >
                                <div className="md:col-span-1">
                                  <span className="text-rose font-display font-bold text-xs opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                </div>
                                
                                <div className="md:col-span-11 space-y-6">
                                  <div className="space-y-4">
                                    {step?.tags && (
                                      <div className="flex flex-wrap gap-2">
                                        {step.tags.map((tag, j) => (
                                          <span key={j} className="px-3 py-1 bg-rose/5 text-rose text-[8px] uppercase tracking-[0.2em] font-bold rounded-full border border-rose/10">
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                    <h5 className="text-2xl md:text-3xl text-ocean font-display font-bold uppercase tracking-tight">
                                      {step?.location || route.split(' - ')[1] || route}
                                    </h5>
                                    <p className="text-xl text-charcoal/70 font-serif italic">
                                      {route.includes(' - ') ? route.split(' - ')[0] : ''} {step?.highlight}
                                    </p>
                                  </div>

                                  {step?.image && (
                                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden soft-shadow group-hover:scale-[1.02] transition-transform duration-700">
                                      <img 
                                        src={step.image} 
                                        alt={step.location}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                  )}

                                  {step?.extendedDescription && (
                                    <p className="text-lg text-charcoal/60 leading-relaxed font-serif italic max-w-2xl">
                                      {step.extendedDescription}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Possible Extras Section */}
                    <div className="space-y-12 pt-20 border-t border-ocean/5">
                      <div className="flex items-center gap-8">
                        <h4 className="text-xs uppercase tracking-[0.5em] font-bold text-rose font-display whitespace-nowrap">
                          Possible Extras
                        </h4>
                        <div className="h-[1px] flex-1 bg-ocean/10" />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                        {[
                          { title: 'Fine Dining Upgrade', desc: 'Upgrade to a bespoke menu featuring the finest Kashubian and Baltic seafood, prepared by an elite regional chef.' },
                          { title: 'Luxury Transfers', desc: 'Door-to-door service with premium sedans or helicopter transfers from Lech Wałęsa Airport.' },
                          { title: 'On-board Wellness', desc: 'Private yoga instructors, massage therapists, or beauty treatments available on deck while anchored near Hel.' },
                          { title: 'Historic Tours', desc: 'Private guided walks through the Old Town of Gdańsk or the historic shipyard area.' },
                          { title: 'Event Planning', desc: 'Full coordination for birthdays, weddings, or corporate retreats including decor and entertainment.' },
                          { title: 'Photography & Film', desc: 'Professional drone pilots and photographers to capture your journey in cinematic quality.' }
                        ].map((extra, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="space-y-3 group"
                          >
                            <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-ocean font-display group-hover:text-rose transition-colors">
                              {extra.title}
                            </h5>
                            <p className="text-base text-charcoal/60 font-serif italic leading-relaxed">
                              {extra.desc}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Details & Inclusions */}
                  <div className="lg:col-span-5 space-y-12">
                    <div className="bg-white/50 backdrop-blur-md p-12 rounded-[3rem] border border-ocean/5 soft-shadow space-y-12 sticky top-10">
                      <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest text-ocean/40 font-bold font-display">Duration</p>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-sage" />
                            <p className="text-xl text-ocean font-sans font-medium">{experience.duration || 'Flexible'}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest text-ocean/40 font-bold font-display">Pricing</p>
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-rose" />
                            <p className="text-xl text-ocean font-sans font-medium">{experience.priceFrom}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest text-ocean/40 font-bold font-display">Capacity</p>
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-sky" />
                            <p className="text-xl text-ocean font-sans font-medium">16 Guests</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase tracking-widest text-ocean/40 font-bold font-display">Vessel</p>
                          <div className="flex items-center gap-3">
                            <Anchor className="w-5 h-5 text-gold" />
                            <p className="text-xl text-ocean font-sans font-medium">Admiral 27m</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-ocean font-display">What's Included</h4>
                        <div className="grid gap-4">
                          {inclusions.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                              <div className="p-2 bg-sage/10 rounded-full group-hover:bg-sage/20 transition-colors">
                                <CheckCircle2 className="w-4 h-4 text-sage" />
                              </div>
                              <span className="text-base text-charcoal/70 font-serif italic">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 space-y-4">
                        <button 
                          onClick={() => {
                            onClose();
                            const element = document.getElementById('inquiry');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="w-full py-6 bg-ocean text-linen rounded-2xl font-display font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose transition-all duration-700 shadow-2xl hover:shadow-rose/20"
                        >
                          Inquire Now
                        </button>

                        {experience.type === 'day' && (
                          <a 
                            href={experience.tripAdvisorUrl || "https://www.tripadvisor.com"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-4 border border-[#00af87]/30 text-[#00af87] rounded-2xl font-display font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-[#00af87] hover:text-white transition-all duration-500 group"
                          >
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-3.5 5c-1.379 0-2.5 1.121-2.5 2.5S7.121 12 8.5 12s2.5-1.121 2.5-2.5S9.879 7 8.5 7zm7 0c-1.379 0-2.5 1.121-2.5 2.5s1.121 2.5 2.5 2.5 2.5-1.121 2.5-2.5S16.879 7 15.5 7zM8.5 9c.276 0 .5.224.5.5S8.776 10 8.5 10s-.5-.224-.5-.5.224-.5.5-.5zm7 0c.276 0 .5.224.5.5s-.224.5-.5.5-.5-.224-.5-.5.224-.5.5-.5zM12 14c-2.671 0-4.84 1.709-5.42 4h10.84c-.58-2.291-2.749-4-5.42-4z"/>
                            </svg>
                            Review on TripAdvisor
                          </a>
                        )}

                        <p className="text-center mt-2 text-[9px] uppercase tracking-[0.3em] text-ocean/30 font-bold font-display">
                          * Bespoke itineraries available upon request
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
