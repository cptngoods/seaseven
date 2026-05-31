import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQ_DATA = {
  Yacht: [
    { question: "What model is M/Y SEA SEVEN?", answer: "SEA SEVEN is a classic 27m motor yacht built by Admiral (Cantieri Navali Lavagna), combining Italian character with a full 2021 refit." },
    { question: "How many guest cabins are there?", answer: "There are 4 en-suite cabins (Master, VIP, and two Twins) accommodating up to 8 guests overnight." },
    { question: "Is there air conditioning on board?", answer: "Yes, the yacht features full climate control throughout all cabins and the main salon." },
    { question: "What is the cruising speed?", answer: "Sea Seven cruises comfortably at 15 knots, with a maximum speed of 24 knots for quick transits across the Bay." },
    { question: "What is the crew composition?", answer: "A professional crew of 3: an STCW-certified Captain with local knowledge, a dedicated Stewardess/Chef, and a Deckhand." },
    { question: "Can the yacht enter the Motława river in Gdańsk?", answer: "Yes, her 1.9m draft and height are perfectly suited for navigating the riverine approaches to the historic heart of Gdańsk." }
  ],
  "Tri-City": [
    { question: "Where is the home port?", answer: "Our primary base is Marina Gdynia, but we frequently pick up guests at the Sopot Pier or Marina Gdańsk." },
    { question: "When is the best time for a charter?", answer: "The season runs from late May to late September. July and August offer the best swimming temperatures." },
    { question: "Is fuel included?", answer: "Fuel is typically calculated based on consumption, though some day packages include a set amount of cruising hours." },
    { question: "What is the max capacity for day events?", answer: "We can host up to 16 guests for cruising and entertaining at anchor." }
  ]
};

type Category = keyof typeof FAQ_DATA;

export const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Yacht');
  const [openIndex, setOpenIndex] = useState<number>(0);

  const categories = Object.keys(FAQ_DATA) as Category[];

  return (
    <section className="py-20 md:py-24 px-6 bg-linen grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-14">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-sage uppercase tracking-[0.6em] text-[10px] font-bold block font-display"
            >
              Good to Know
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-bold text-ocean leading-[0.85] uppercase tracking-tighter"
            >
              Your <br />
              <span className="text-rose font-serif italic lowercase tracking-normal">Questions.</span>
            </motion.h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 relative">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={cn(
                  "relative px-8 py-3 rounded-full font-display font-bold text-[9px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center gap-2 group",
                  activeCategory === cat 
                    ? "text-linen" 
                    : "text-ocean/40 hover:text-ocean"
                )}
              >
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="faq-active-dot"
                    className="w-1 h-1 rounded-full bg-rose relative z-10"
                  />
                )}
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="faq-active-bg"
                    className="absolute inset-0 bg-ocean rounded-full shadow-xl shadow-ocean/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch min-h-[360px]">
          {/* Left Column: Questions */}
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-1"
              >
                {FAQ_DATA[activeCategory].map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => setOpenIndex(i)}
                    className={cn(
                      "w-full p-5 text-left transition-all duration-300 rounded-sm flex items-center justify-between group",
                      openIndex === i ? "bg-ocean text-linen shadow-xl" : "hover:bg-ocean/5 text-ocean/60"
                    )}
                  >
                    <span className="text-lg md:text-xl font-serif italic pr-8">
                      {faq.question}
                    </span>
                    <div className={cn(
                      "p-1.5 rounded-full border transition-all duration-500 shrink-0",
                      openIndex === i ? "bg-rose border-rose text-linen" : "border-ocean/10 text-ocean/20 group-hover:border-ocean/30"
                    )}>
                      <Plus className={cn("w-3 h-3 transition-transform duration-500", openIndex === i && "rotate-45")} />
                    </div>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Answers */}
          <div className="lg:sticky lg:top-32 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${openIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
                className="bg-white/70 backdrop-blur-2xl p-8 md:p-10 rounded-sm border border-ocean/10 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[360px]"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Plus className="w-32 h-32 text-ocean" />
                </div>
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-rose font-mono text-[10px] font-bold tracking-widest">A.</span>
                    <div className="h-[1px] flex-1 bg-ocean/10" />
                  </div>
                  
                  <h4 className="text-3xl md:text-4xl font-display font-bold text-ocean uppercase tracking-tighter leading-tight">
                    {FAQ_DATA[activeCategory][openIndex].question}
                  </h4>
                  
                  <p className="text-xl text-charcoal/70 leading-relaxed font-serif italic">
                    {FAQ_DATA[activeCategory][openIndex].answer}
                  </p>
                  
                  <div className="pt-8 flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose" />
                    <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                    <div className="w-1.5 h-1.5 rounded-full bg-ocean/20" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
