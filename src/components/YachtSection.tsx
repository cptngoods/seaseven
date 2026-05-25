import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';
import { ArrowRight, Tv, Utensils, Bed, Ruler, MoveHorizontal, ArrowDownToLine, Zap, Fuel, Droplets, Wind, Anchor, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { VESSEL, TECHNICAL_SPECS } from '../constants';

const Player = ReactPlayer as any;

const SafeVideo = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    const playVideo = async () => {
      if (!video) return;
      
      try {
        // Only attempt to play if the video is connected and we are still mounted
        if (isMounted && video.isConnected) {
          // We don't call load() here as it can interrupt a pending play()
          const playPromise = video.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        }
      } catch (err) {
        // Silently catch all errors. For a muted background video, 
        // any playback failure is non-critical and shouldn't clutter the console.
      }
    };

    playVideo();

    return () => {
      isMounted = false;
      if (video) {
        try {
          video.pause();
          // Clear source to stop any pending downloads/requests
          video.removeAttribute('src');
          video.load();
        } catch (err) {
          // Ignore cleanup errors
        }
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      autoPlay
      className={className}
      // Prevent browser default error logging for this element
      onError={() => {}}
    />
  );
};

export const YachtSection = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [activeToyIndex, setActiveToyIndex] = useState(0);

  const WATER_TOYS = [
    {
      title: 'Seabobs',
      description: 'Experience the thrill of underwater flight with our high-performance Seabobs. Glide through the sapphire waters of the Baltic with effortless speed.',
      image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1920',
      video: 'https://www.youtube.com/watch?v=hxI9wixZmpM'
    },
    {
      title: 'Dinghy',
      description: 'Our Williams tender is ready to whisk you away to the Hel Peninsula, Sopot pier, or secret fishing spots across the Bay.',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=1920',
      video: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27db96a7697ef6a41501da997a39852737c920e&profile_id=164&oauth2_token_id=57447761'
    },
    {
      title: 'SUPs',
      description: 'Explore the Puck Bay at your own pace. Our stand-up paddleboards are perfect for morning yoga on the water or quiet sunset paddles near Orłowo.',
      image: 'https://images.unsplash.com/photo-1517176642928-5803d4288290?auto=format&fit=crop&q=80&w=1920',
      video: 'https://player.vimeo.com/external/373834331.sd.mp4?s=de9706fa30c379a647a922074c8448c6e57303e1&profile_id=164&oauth2_token_id=57447761'
    },
    {
      title: 'Kayaks',
      description: 'Stable and versatile, our kayaks allow you to navigate the shallow waters of the Rewa sandbar and reach the most intimate seaside spots.',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1920',
      video: 'https://player.vimeo.com/external/481483861.sd.mp4?s=b67b07855d0f6667633636069256402755a8f0f2&profile_id=164&oauth2_token_id=57447761'
    },
    {
      title: 'e-Foil',
      description: 'Fly above the Baltic waves with our electric hydrofoil. A silent, exhilarating experience that feels like surfing on a cloud.',
      image: 'https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?auto=format&fit=crop&q=80&w=1920',
      video: 'https://www.youtube.com/watch?v=cuvJeTT4ksI'
    },
    {
      title: 'Jetski',
      description: 'High-speed adrenaline on the waves. Our premium jetskis are perfect for exploring the Gdynia coastline or enjoying a fast-paced afternoon.',
      image: 'https://images.unsplash.com/photo-1552066334-9a6045b65762?auto=format&fit=crop&q=80&w=1920',
      video: 'https://www.youtube.com/watch?v=WxXspvSghHk'
    }
  ];

  const TECHNICAL_SPEC_LIST = [
    { label: 'LOA', value: VESSEL.loa, icon: Ruler },
    { label: 'Beam', value: VESSEL.beam, icon: MoveHorizontal },
    { label: 'Draft', value: VESSEL.draft, icon: ArrowDownToLine },
    { label: 'Engines', value: TECHNICAL_SPECS.engines, icon: Zap },
    { label: 'Fuel', value: TECHNICAL_SPECS.fuelCapacity, icon: Fuel },
    { label: 'Water', value: TECHNICAL_SPECS.waterCapacity, icon: Droplets },
    { label: 'Built', value: TECHNICAL_SPECS.built, icon: Wind },
    { label: 'Displacement', value: TECHNICAL_SPECS.displacement || '75 t', icon: Anchor },
    { label: 'Guests', value: `Up to ${VESSEL.guests}`, icon: ShieldCheck }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="yacht" className="py-32 px-6 bg-linen grain-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-stretch mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <span className="text-sage uppercase tracking-[0.6em] text-[10px] font-bold block font-display">The Vessel</span>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-ocean leading-[0.85] uppercase tracking-tighter">
                Life on <br />
                <span className="text-rose font-serif italic lowercase tracking-normal">The Water.</span>
              </h2>
            </div>
            
            <p className="text-xl text-charcoal/70 leading-relaxed font-serif italic">
              A masterpiece of Italian naval architecture, SEA SEVEN is an Admiral 27m motor yacht 
              that seamlessly blends late-70s character with the uncompromising luxury of her 
              2021 refit. Her classic lines and powerful presence make her the most distinguished 
              vessel in the Bay of Gdańsk.
            </p>

            {/* Dynamic Feature List - Redesigned for Compactness */}
            <div className="space-y-5 pt-4 max-w-sm">
              <div className="flex items-center justify-between border-b border-ocean/10 pb-3">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sage">Experience Highlights</span>
                <span className="text-[10px] font-mono text-ocean/40 uppercase tracking-widest">Admiral 27m</span>
              </div>
              
              <div className="grid grid-cols-1 gap-0.5">
                {VESSEL.detailedFeatures?.map((feature, i) => (
                  <motion.div
                    key={i}
                    onMouseEnter={() => setActiveFeatureIndex(i)}
                    className={cn(
                      "group cursor-pointer relative py-2.5 px-4 rounded-lg transition-all duration-500 flex items-center justify-between overflow-hidden",
                      activeFeatureIndex === i ? "bg-ocean text-linen shadow-lg shadow-ocean/10" : "hover:bg-ocean/5 text-ocean/60"
                    )}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <span className={cn(
                        "text-[9px] font-mono font-bold transition-colors duration-500",
                        activeFeatureIndex === i ? "text-rose" : "text-ocean/30"
                      )}>
                        0{i + 1}
                      </span>
                      <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.25em]">
                        {feature.title}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-2 relative z-10">
                      {activeFeatureIndex === i ? (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full bg-rose shadow-[0_0_12px_rgba(0,91,150,0.8)]"
                        />
                      ) : (
                        <div className="w-1 h-1 rounded-full bg-ocean/10 group-hover:bg-ocean/30" />
                      )}
                    </div>

                    {activeFeatureIndex === i && (
                      <motion.div 
                        layoutId="active-highlight-vessel"
                        className="absolute inset-0 bg-ocean z-0"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-20 bg-sage/5 rounded-full blur-[120px] -z-10" />
            <div className="relative h-full min-h-[500px] rounded-[4rem] overflow-hidden soft-shadow bg-ocean/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeatureIndex}
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
                  className="absolute inset-0"
                >
                  <img
                    src={VESSEL.detailedFeatures?.[activeFeatureIndex]?.image || "https://duoyacht.com/images/gallery/zewnatrz/galeria-zewnatrz%20(5).jpg"}
                    alt={VESSEL.detailedFeatures?.[activeFeatureIndex]?.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"

                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 via-transparent to-transparent" />
                  
                  {/* Feature Description Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute bottom-12 left-12 right-12 space-y-6"
                  >
                    <p className="text-linen/90 font-serif italic text-xl max-w-md leading-relaxed">
                      {VESSEL.detailedFeatures?.[activeFeatureIndex]?.description}
                    </p>
                    
                    {VESSEL.detailedFeatures?.[activeFeatureIndex]?.items && (
                      <ul className="grid grid-cols-1 gap-2">
                        {VESSEL.detailedFeatures[activeFeatureIndex].items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + (i * 0.1) }}
                            className="text-linen/70 text-sm font-display uppercase tracking-widest flex items-center gap-3"
                          >
                            <span className="w-1 h-1 bg-rose rounded-full" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Technical Specs - Editorial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-40"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-8 mb-20">
            <div className="h-[1px] flex-1 bg-ocean/10" />
            <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-ocean/40 font-display">Technical Specifications</h3>
            <div className="h-[1px] flex-1 bg-ocean/10" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-x-12 gap-y-8 p-10 rounded-[3rem] bg-white/40 backdrop-blur-sm border border-ocean/5 overflow-hidden">
            {TECHNICAL_SPEC_LIST.map((spec, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="flex flex-col gap-2 min-w-fit"
              >
                <div className="flex items-center gap-2 opacity-40">
                   <spec.icon className="w-3.5 h-3.5 text-ocean" />
                   <span className="text-[8px] uppercase tracking-[0.4em] font-bold font-display text-ocean whitespace-nowrap">
                     {spec.label}
                   </span>
                </div>
                <h4 className="text-base md:text-lg font-serif italic text-ocean whitespace-nowrap">
                  {spec.value}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Water Toys - Interactive Highlights List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold block font-display mb-8">Playtime</span>
          <h3 className="text-6xl md:text-8xl font-display font-bold text-ocean leading-[0.85] uppercase tracking-tighter">
            Water Toys <br />
            <span className="text-rose font-serif italic lowercase tracking-normal">& Soul.</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative py-24 px-8 md:px-20 bg-ocean rounded-[4rem] text-linen"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 rounded-[4rem] pointer-events-none overflow-hidden" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-16 items-center">
            {/* Compact Menu Section */}
            <div className="lg:col-span-4 space-y-2 flex flex-col justify-center">
              {WATER_TOYS.map((toy, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveToyIndex(i)}
                  className="group cursor-pointer relative py-3 flex items-center justify-between border-b border-linen/10 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "text-[9px] font-mono transition-colors duration-500",
                      activeToyIndex === i ? "text-rose" : "text-linen/20"
                    )}>
                      0{i + 1}
                    </span>
                    <h4 className={cn(
                      "text-lg md:text-xl font-display font-bold uppercase tracking-tight transition-all duration-500",
                      activeToyIndex === i ? "text-linen translate-x-2" : "text-linen/30 group-hover:text-linen/60"
                    )}>
                      {toy.title}
                    </h4>
                  </div>
                  <ArrowRight className={cn(
                    "w-4 h-4 transition-all duration-500",
                    activeToyIndex === i ? "text-rose opacity-100 translate-x-0" : "text-linen/0 opacity-0 -translate-x-4"
                  )} />
                  
                  {activeToyIndex === i && (
                    <motion.div 
                      layoutId="active-toy-highlight"
                      className="absolute left-0 w-0.5 h-full bg-rose rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Wide Horizontal Media Section */}
            <div className="lg:col-span-8 relative z-20">
              <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-linen/5 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeToyIndex}
                    initial={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}
                    className="absolute inset-0"
                  >
                    <img
                      src={WATER_TOYS[activeToyIndex].image}
                      alt={WATER_TOYS[activeToyIndex].title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"

                    />
                    
                    {/* Video Preview */}
                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      {WATER_TOYS[activeToyIndex].video.includes('youtube.com') ? (
                        <Player
                          url={WATER_TOYS[activeToyIndex].video}
                          playing={true}
                          loop={true}
                          muted={true}
                          width="100%"
                          height="100%"
                          style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' } as any}
                          config={{
                            youtube: {
                              playerVars: { showinfo: 0, controls: 0, rel: 0, iv_load_policy: 3, modestbranding: 1 }
                            }
                          } as any}
                          onError={(e) => {
                            console.warn('ReactPlayer error:', e);
                          }}
                        />
                      ) : (
                        <SafeVideo
                          key={`video-${activeToyIndex}`}
                          src={WATER_TOYS[activeToyIndex].video}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/20 to-transparent pointer-events-none" />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute bottom-8 left-10 right-10 pointer-events-none flex justify-between items-end"
                    >
                      <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-6 h-[1px] bg-rose" />
                          <h5 className="text-rose font-display font-bold uppercase tracking-[0.4em] text-[8px]">Equipment {activeToyIndex + 1}</h5>
                        </div>
                        <p className="text-linen/90 font-serif italic text-xl md:text-2xl leading-tight">
                          {WATER_TOYS[activeToyIndex].description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
