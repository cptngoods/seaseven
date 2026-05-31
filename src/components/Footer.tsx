import React from 'react';
import { Anchor, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-ocean text-linen py-24 px-6 relative overflow-hidden border-t border-linen/10">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <span className="text-5xl md:text-6xl font-serif font-semibold">SEA SEVEN</span>
            </div>
            <p className="text-linen/60 max-w-sm leading-relaxed font-serif text-xl italic">
              Luxury Admiral 27m motor yacht charters operating from Gdynia, Poland. 
              Experience the Bay of Gdańsk like never before.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="p-4 bg-linen/5 rounded-full border border-linen/10 hover:bg-rose hover:border-rose hover:text-ocean transition-all duration-700 group"
                >
                  <Icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-[10px] mb-8 uppercase tracking-[0.5em] text-rose">Quick Links</h4>
            <ul className="space-y-4 text-linen/60 font-serif text-lg italic">
              <li><a href="#yacht" className="hover:text-rose transition-all duration-500 hover:pl-2">The Yacht</a></li>
              <li><a href="#experiences" className="hover:text-rose transition-all duration-500 hover:pl-2">Experiences</a></li>
              <li><a href="#destinations" className="hover:text-rose transition-all duration-500 hover:pl-2">Destinations</a></li>
              <li><a href="#inquiry" className="hover:text-rose transition-all duration-500 hover:pl-2">Inquiry</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-[10px] mb-8 uppercase tracking-[0.5em] text-rose">Contact</h4>
            <ul className="space-y-4 text-linen/60 font-serif text-lg italic">
              <li>Marina Gdynia, Poland</li>
              <li><a href="tel:+48555777000" className="hover:text-rose transition-colors">+48 555 777 000</a></li>
              <li><a href="mailto:hello@seaseven.pl" className="hover:text-rose transition-colors">hello@seaseven.pl</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-linen/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.4em] font-bold text-linen/20 font-display">
          <p>© 2026 M/Y SEA SEVEN. All rights reserved.</p>
          <div className="flex gap-16">
            <a href="#" className="hover:text-rose transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rose transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
