
// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { Button } from './Button';

interface PrimaryCTAProps {
  href: string;
  label?: string;
}

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({ href, label = "Shop Official Release" }) => {
  const handleShopClick = () => {
    // Analytics tracking would happen here, then immediate redirect.
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-10 left-0 right-0 px-6 z-50">
      <div className="max-w-md mx-auto">
        <Button 
          variant="primary" 
          className="w-full h-20 text-lg shadow-[0_20px_50px_rgba(64,224,208,0.4)] transition-all hover:scale-[1.02] active:scale-95 group"
          onClick={handleShopClick}
        >
          <div className="flex items-center justify-center gap-4">
            <span className="font-black">{label}</span>
            <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </Button>
        <p className="text-center text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mt-4 opacity-50">
          Secure Redirect to External Brand Site
        </p>
      </div>
    </div>
  );
};
