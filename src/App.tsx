import React from 'react';
import { Navbar, WhatsAppButton } from './components/Navigation';
import { Hero } from './components/Hero';
import { YachtSection } from './components/YachtSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { DestinationsSection } from './components/DestinationsSection';
import { CrewSection } from './components/CrewSection';
import { CuisineSection } from './components/CuisineSection';
import { GallerySection } from './components/GallerySection';
import { BookingSection } from './components/BookingSection';
import { FAQSection } from './components/FAQSection';
import { SocialSection } from './components/SocialSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';
import { Anchor } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-rose/30 selection:text-ocean">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Intro Section */}
        <section className="py-40 px-6 relative overflow-hidden grain-overlay bg-linen">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden soft-shadow"
            >
              <img 
                src="https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg" 
                alt="M/Y SEA SEVEN"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ocean/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, staggerChildren: 0.2 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="text-sage uppercase tracking-[0.6em] text-[10px] font-bold block font-display">The Heritage</span>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-ocean leading-[0.9] uppercase tracking-tighter">
                  Where classic lines <br /> meet the <span className="text-rose font-serif italic lowercase tracking-normal">modern sea.</span>
                </h2>
              </div>
              
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed font-serif italic tracking-wide">
                  SEA SEVEN is a yacht of character. Originally built by the legendary 
                  Cantieri Navali Lavagna, she has been reborn to offer effortless luxury 
                  amidst the historic beauty of the Bay of Gdańsk.
                </p>
                
                <div className="flex items-center gap-8">
                  <div className="w-20 h-[1px] bg-ocean/10" />
                  <Anchor className="w-6 h-6 text-sage/40" />
                  <div className="flex-1 h-[1px] bg-ocean/10" />
                </div>

                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-ocean mb-2 font-display">The Vessel</h4>
                    <p className="text-sm text-charcoal/60 font-sans">Admiral 27m · 2021 Refit</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-ocean mb-2 font-display">The Experience</h4>
                    <p className="text-sm text-charcoal/60 font-sans">Sopot · Gdańsk · Gdynia</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <YachtSection />
        
        {/* Parallax Break */}
        <div 
          className="h-[70vh] w-full parallax-bg relative grain-overlay"
          style={{ backgroundImage: 'url("https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-3.jpg")' }}
        >
          <div className="absolute inset-0 bg-ocean/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-linen text-center"
            >
              <h3 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">Timeless Elegance.</h3>
              <p className="text-xl font-serif italic tracking-widest">Sopot · Gdańsk · Gdynia</p>
            </motion.div>
          </div>
        </div>

        <ExperiencesSection />
        
        <DestinationsSection />

        <CrewSection />
        
        <CuisineSection />

        <GallerySection />
        
        <TestimonialsSection />
        <FAQSection />
        <SocialSection />
        <BookingSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
