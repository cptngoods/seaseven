import React from 'react';
import { motion } from 'motion/react';

export const CrewSection = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    },
  };

  return (
    <section className="py-24 px-6 bg-ocean text-linen relative overflow-hidden grain-overlay">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-rose/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden soft-shadow">
              <img
                src="https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-1.jpg"
                alt="Sea Seven Crew"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"

              />
              <div className="absolute inset-0 bg-ocean/20" />
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="space-y-6">
              <motion.span variants={itemVariants} className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold block font-display">The Team</motion.span>
              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold leading-[0.9] uppercase tracking-tighter">
                Meet the <br />
                <span className="text-rose font-serif italic lowercase tracking-normal">Crew.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-linen/70 leading-relaxed font-serif italic tracking-wide max-w-lg">
                "Polish hospitality met with technical Italian precision."
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="space-y-8">
              <p className="text-linen/70 leading-relaxed font-serif text-lg italic max-w-2xl">
                Your crew — captain, stewardess, and deckhand — are local experts 
                dedicated to crafting a seamless Baltic experience. From navigating 
                historic canal approaches to serving gourmet local delicacies at sunset, 
                every detail is handled with professional discretion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-linen/10">
                {[
                  { 
                    role: 'Captain', 
                    desc: 'Expert local navigation.',
                    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
                  },
                  { 
                    role: 'Stewardess', 
                    desc: 'Elite hospitality & dining.',
                    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
                  },
                  { 
                    role: 'Deckhand', 
                    desc: 'Technical operations & toys.',
                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
                  }
                ].map((member, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-linen/10 shrink-0">
                      <img
                        src={member.image}
                        alt={member.role}
                        loading="lazy"
                        className="w-full h-full object-cover"

                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-rose font-bold uppercase tracking-[0.3em] text-[9px] font-display">{member.role}</h4>
                      <p className="text-[10px] text-linen/40 font-serif italic leading-tight">{member.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
