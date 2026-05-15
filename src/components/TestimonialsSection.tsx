import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { cn } from '../lib/utils';

const TESTIMONIALS = [
  {
    quote: "The most magical week of our lives. SEA SEVEN is a masterpiece, and the crew made us feel like royalty. Every detail was curated to perfection.",
    author: "Alexandra V.",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "Cruising past the Sopot pier on this yacht is an experience I'll never forget. Pure serenity, unmatched luxury, and the best service we've ever had at sea.",
    author: "Marcus T.",
    location: "Berlin, DE",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "The attention to detail is unmatched. From the local delicacies to the hidden coves of Hel we discovered. A truly bespoke Baltic odyssey.",
    author: "Elena R.",
    location: "Madrid, ES",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-ocean relative overflow-hidden grain-overlay">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold block font-display"
          >
            Guest Stories
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold text-linen uppercase tracking-tighter"
          >
            Voices from <br />
            <span className="text-sage font-serif italic lowercase tracking-normal">the sea.</span>
          </motion.h2>
        </div>

        <div className="relative h-[350px] md:h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
              className="absolute inset-0 flex flex-col items-center text-center space-y-12"
            >
              <div className="relative">
                <Quote className="w-16 h-16 text-rose/20 absolute -top-8 -left-8 -z-10" />
                <p className="text-2xl md:text-4xl text-linen/90 font-serif italic leading-tight max-w-3xl">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose/30 p-1">
                  <img 
                    src={TESTIMONIALS[currentIndex].image} 
                    alt={TESTIMONIALS[currentIndex].author}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-linen font-display font-bold uppercase tracking-widest text-sm">
                    {TESTIMONIALS[currentIndex].author}
                  </h4>
                  <p className="text-rose text-[10px] uppercase tracking-[0.3em] font-bold font-display">
                    {TESTIMONIALS[currentIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-4 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-500",
                currentIndex === i ? "bg-rose w-8" : "bg-linen/20 hover:bg-linen/40"
              )}
            />
          ))}
        </div>
        {/* Platform Ratings */}
        <div className="mt-20 pt-12 border-t border-linen/10 flex flex-wrap justify-center items-center gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4 group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-[#00b67a] flex items-center justify-center rounded-sm">
                    <span className="text-linen text-[10px]">★</span>
                  </div>
                ))}
              </div>
              <span className="text-linen font-display font-bold text-xl tracking-tighter">Trustpilot</span>
            </div>
            <p className="text-linen/40 text-[10px] uppercase tracking-[0.4em] font-bold font-display group-hover:text-rose transition-colors">
              Excellent 4.9 / 5
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center space-y-4 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-[#34e0a1] border-2 border-[#34e0a1]" />
                ))}
              </div>
              <span className="text-linen font-display font-bold text-xl tracking-tighter">Tripadvisor</span>
            </div>
            <p className="text-linen/40 text-[10px] uppercase tracking-[0.4em] font-bold font-display group-hover:text-rose transition-colors">
              #1 Luxury Experience in Gdańsk
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
