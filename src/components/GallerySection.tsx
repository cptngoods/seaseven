import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const GALLERY_IMAGES = [
  { url: 'https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg', category: 'exterior' },
  { url: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-1.jpg', category: 'interior' },
  { url: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-2.jpg', category: 'exterior' },
  { url: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-3.jpg', category: 'exterior' },
  { url: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-4.jpg', category: 'interior' },
  { url: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-5.jpg', category: 'interior' },
  { url: 'https://www.charterworld.com/images/yachts-1/%5BMY-SEA-SEVEN%5D-10140-6.jpg', category: 'interior' }
];

export const GallerySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const displayedImages = filteredImages.slice(0, visibleCount);
  const selectedImage = selectedImageIndex !== null ? displayedImages[selectedImageIndex] : null;

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'next') {
      setSelectedImageIndex((prev) => (prev !== null && prev < displayedImages.length - 1 ? prev + 1 : 0));
    } else {
      setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : displayedImages.length - 1));
    }
  }, [selectedImageIndex, displayedImages.length]);

  useEffect(() => {
    setVisibleCount(12); // Reset count when filter changes
  }, [filter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'Escape') setSelectedImageIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, navigate]);

  const getCount = (cat: string) => {
    if (cat === 'all') return GALLERY_IMAGES.length;
    return GALLERY_IMAGES.filter(img => img.category === cat).length;
  };

  return (
    <section id="gallery" className="py-24 md:py-28 px-6 bg-linen grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold mb-8 block font-display seafarer-line"
            >
              The Gallery
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-serif font-semibold text-ocean leading-[0.9]"
            >
              Captured <br />
              <span className="text-rose font-serif italic lowercase tracking-normal">Moments.</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-wrap gap-4 relative">
            {['all', 'exterior', 'interior', 'lifestyle'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                  className={`relative px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 font-display flex items-center gap-2 group ${
                  filter === cat 
                    ? 'text-linen' 
                    : 'text-ocean/40 hover:text-ocean'
                }`}
              >
                {filter === cat && (
                  <motion.div 
                    layoutId="active-dot"
                    className="w-1 h-1 rounded-full bg-rose relative z-10"
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span className={cn(
                  "relative z-10 text-[8px] font-mono opacity-40 transition-colors duration-500",
                  filter === cat ? "text-rose opacity-100" : "group-hover:text-ocean"
                )}>
                  ({getCount(cat)})
                </span>
                {filter === cat && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 bg-ocean shadow-xl shadow-ocean/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-[240px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {displayedImages.map((img, i) => {
              // Create a bento-like pattern based on index
              const isLarge = i % 7 === 0;
              const isWide = i % 7 === 3;
              const isTall = i % 7 === 5;

              return (
                <motion.div
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.02,
                    ease: [0.22, 1, 0.36, 1] as any,
                    layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
                  }}
                  className={cn(
                    "relative group cursor-pointer overflow-hidden soft-shadow transition-all duration-700 border border-ocean/10",
                    isLarge ? "sm:col-span-2 sm:row-span-2" : 
                    isWide ? "sm:col-span-2 sm:row-span-1" :
                    isTall ? "sm:col-span-1 sm:row-span-2" : "col-span-1 row-span-1"
                  )}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={img.url} 
                      alt={`SEA SEVEN ${img.category}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 group-hover:rotate-1"

                    />
                  </div>
                  
                  {/* Sophisticated Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-ocean/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <span className="text-rose font-display font-bold uppercase tracking-[0.4em] text-[8px] block">
                        {img.category}
                      </span>
                      <div className="flex items-center justify-between">
                        <h4 className="text-linen font-serif italic text-xl">View Detail</h4>
                        <div className="p-3 bg-linen/10 backdrop-blur-md rounded-full border border-linen/20">
                          <Maximize2 className="text-linen w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-linen/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-linen/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 flex justify-center"
          >
            <button 
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="group relative px-12 py-4 overflow-hidden border border-ocean/10 transition-all duration-500 hover:border-ocean"
            >
              <div className="absolute inset-0 bg-ocean translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-ocean uppercase tracking-[0.3em] text-[10px] font-bold group-hover:text-linen transition-colors duration-500">
                Load More Moments
              </span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ocean/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-20"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 pointer-events-none">
              <button
                className="p-4 rounded-full bg-linen/5 hover:bg-linen/10 text-linen transition-all pointer-events-auto backdrop-blur-md border border-linen/10 group"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('prev');
                }}
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                className="p-4 rounded-full bg-linen/5 hover:bg-linen/10 text-linen transition-all pointer-events-auto backdrop-blur-md border border-linen/10 group"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('next');
                }}
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="absolute top-10 right-10 flex flex-col items-end gap-4">
              <button 
                className="text-linen hover:text-rose transition-colors p-4"
                onClick={() => setSelectedImageIndex(null)}
              >
                <X className="w-10 h-10" />
              </button>
              <div className="flex flex-col items-end">
                <motion.span 
                  key={`cat-${selectedImageIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose font-display font-bold uppercase tracking-[0.4em] text-[10px]"
                >
                  {selectedImage.category}
                </motion.span>
                <span className="text-linen/40 font-mono text-[10px] mt-2">
                  {String(selectedImageIndex + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <motion.img
              key={selectedImage.url}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={selectedImage.url}
              alt={`Lagoon 620 ${selectedImage.category}`}
              className="max-w-full max-h-full shadow-2xl object-contain border border-linen/10 pointer-events-none"

            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
