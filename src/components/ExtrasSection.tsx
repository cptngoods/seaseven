import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChefHat,
  Camera,
  Martini,
  Disc3,
  Music4,
  Wine,
  Flower2,
  Sparkles,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { EXTRAS } from '../constants';
import { cn } from '../lib/utils';

const ICONS: Record<string, LucideIcon> = {
  ChefHat,
  Camera,
  Martini,
  Disc3,
  Music4,
  Wine,
  Flower2,
  Sparkles,
};

export const ExtrasSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="extras"
      className="py-24 px-6 bg-ocean text-linen relative overflow-hidden grain-overlay"
    >
      <div className="absolute top-[-15%] right-[-10%] w-[45%] h-[45%] bg-rose/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-seafoam/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Compact inline header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold mb-4 block font-display"
            >
              Add-ons
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-[0.95]"
            >
              Elevate{' '}
              <span className="text-rose font-serif italic lowercase tracking-normal">
                your charter.
              </span>
            </motion.h2>
          </div>
          <p className="text-linen/50 max-w-sm font-serif italic text-base leading-relaxed md:text-right">
            Hand-picked from the Tri-City's finest, briefed and managed by our crew.
          </p>
        </div>

        {/* Compact horizontal cards */}
        <div
          onMouseLeave={() => setHoveredId(null)}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {EXTRAS.map((extra) => {
            const Icon = ICONS[extra.icon] ?? Sparkles;
            const isHovered = hoveredId === extra.id;
            const isDimmed = hoveredId !== null && !isHovered;
            return (
              <div
                key={extra.id}
                onMouseEnter={() => setHoveredId(extra.id)}
                className={cn(
                  'group relative rounded-2xl bg-linen/[0.04] backdrop-blur-sm border min-h-[112px] will-change-transform transition-all duration-400 ease-out overflow-hidden',
                  isHovered && 'border-rose/60 bg-linen/10 z-10 scale-[1.03] -translate-y-1 opacity-100',
                  isDimmed && 'border-linen/[0.04] opacity-30 blur-[1.5px] scale-[0.98]',
                  !isHovered && !isDimmed && 'border-linen/10 opacity-100'
                )}
              >
                {/* Default — icon + name + price */}
                <div
                  className={cn(
                    'absolute inset-0 p-5 flex gap-4 items-center transition-opacity duration-400',
                    isHovered ? 'opacity-0' : 'opacity-100'
                  )}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-rose/10 border border-rose/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-rose" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-serif italic text-linen leading-tight truncate">
                      {extra.name}
                    </h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-linen/40 font-display">
                        From
                      </span>
                      <span className="text-rose font-sans text-sm tabular-nums">{extra.priceFrom}</span>
                    </div>
                  </div>
                </div>

                {/* Hover reveal — description + arrow */}
                <div
                  className={cn(
                    'absolute inset-0 p-5 bg-ocean/40 flex flex-col justify-between transition-opacity duration-400',
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                >
                  <div>
                    <h3 className="text-sm font-serif italic text-linen leading-tight mb-1">
                      {extra.name}
                    </h3>
                    <p className="text-linen/70 font-sans text-[11px] leading-snug line-clamp-3">
                      {extra.description}
                    </p>
                  </div>
                  <div className="flex items-baseline justify-between pt-2 border-t border-linen/10">
                    <span className="text-rose font-sans text-xs tabular-nums">From {extra.priceFrom}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Description below the grid — accordion-light style */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-linen/40 font-serif italic text-sm"
        >
          Tap any add-on in your inquiry to brief us · all extras invoiced separately.
        </motion.p>
      </div>
    </section>
  );
};
