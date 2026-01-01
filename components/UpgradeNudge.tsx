// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { Button } from './Button';

interface UpgradeNudgeProps {
  onClose: () => void;
  reason: 'hero_ads' | 'social_accounts';
}

export const UpgradeNudge: React.FC<UpgradeNudgeProps> = ({ onClose, reason }) => {
  const titles = {
    hero_ads: "Expand Your Island Creative Budget",
    social_accounts: "Link More Caribbean Channels"
  };

  const descriptions = {
    hero_ads: "You've reached your monthly limit for AI Hero Ads. Tiers are managed externally. Click below to notify your account manager.",
    social_accounts: "Your current plan is capped at 3 social channels. Request a tier upgrade from AdGenius staff to unlock more slots."
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="neu-card bg-sand w-full max-w-lg p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-turquoise via-coral to-turquoise"></div>
        
        <div className="w-20 h-20 neu-inset flex items-center justify-center mx-auto mb-8 bg-sand/30">
          <svg className="w-10 h-10 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-4 leading-tight">{titles[reason]}</h2>
        <p className="text-slate-500 leading-relaxed mb-10 text-[10px] font-bold uppercase tracking-widest">{descriptions[reason]}</p>

        <div className="space-y-4">
          <Button 
            variant="primary"
            className="w-full h-14" 
            onClick={() => { alert("Upgrade request logged in the Caribbean Vault. An administrator will contact you shortly."); onClose(); }}
          >
            Request Tier Upgrade (8.5)
          </Button>
          <Button variant="neumorphic" onClick={onClose} className="w-full h-12">Return to Resort</Button>
        </div>

        <div className="mt-8 pt-8 border-t border-deepSand flex flex-col items-center gap-2">
          <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">External Billing Only</div>
          <p className="text-[8px] font-bold text-slate-300 uppercase max-w-[240px]">Self-serve payment management is disabled. All project billing is handled externally via your account representative. NO creator payouts, NO native checkout, NO self-serve billing.</p>
        </div>
      </div>
    </div>
  );
};