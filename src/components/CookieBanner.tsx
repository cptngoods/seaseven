import React, { useEffect, useState } from 'react';

const CONSENT_KEY = 'cookie_consent';
type Consent = 'accepted' | 'declined';

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const setConsent = (value: Consent) => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-md z-[55] bg-linen text-ocean rounded-[1.5rem] soft-shadow border border-ocean/10 p-5 sm:p-6"
    >
      <p className="text-sm leading-relaxed text-charcoal/80 font-sans">
        We use cookies to improve your experience. By continuing, you agree to our{' '}
        <a href="#" className="underline decoration-rose/40 hover:decoration-rose text-ocean font-medium">
          Privacy Policy
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => setConsent('accepted')}
          className="px-5 py-2.5 rounded-full bg-ocean text-linen text-[10px] font-display font-bold uppercase tracking-[0.25em] hover:bg-rose transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => setConsent('declined')}
          className="px-5 py-2.5 rounded-full border border-ocean/20 text-ocean text-[10px] font-display font-bold uppercase tracking-[0.25em] hover:border-ocean/60 transition-colors"
        >
          Manage Preferences
        </button>
      </div>
    </div>
  );
};
