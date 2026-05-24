import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const DISMISS_KEY = 'season_banner_dismissed';

export const SeasonBanner = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) !== '1') setVisible(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !ref.current) {
      root.style.setProperty('--banner-h', '0px');
      return;
    }
    const update = () => {
      if (ref.current) root.style.setProperty('--banner-h', `${ref.current.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
      root.style.setProperty('--banner-h', '0px');
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
  };

  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 z-[60] bg-rose text-linen">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-4 text-center">
        <span className="font-display text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold">
          <span aria-hidden="true">🗓 </span>2026 Season Open · June – September
        </span>
        <span className="hidden sm:inline opacity-50">·</span>
        <span className="font-serif italic text-sm">
          Limited dates remaining →{' '}
          <a
            href="#inquiry"
            className="underline underline-offset-4 decoration-linen/40 hover:decoration-linen transition-colors font-bold not-italic font-display uppercase tracking-[0.25em] text-[11px] sm:text-xs"
          >
            Inquire Now
          </a>
        </span>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss season banner"
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 p-1.5 rounded-full hover:bg-linen/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
