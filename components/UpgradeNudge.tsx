
import React from 'react';
import { Button } from './Button';

interface UpgradeNudgeProps {
  onClose: () => void;
  reason: 'hero_ads' | 'social_accounts';
}

export const UpgradeNudge: React.FC<UpgradeNudgeProps> = ({ onClose, reason }) => {
  const titles = {
    hero_ads: "Unlock Unlimited Creative Variants",
    social_accounts: "Scale Your Influence Everywhere"
  };

  const descriptions = {
    hero_ads: "You've reached your monthly limit for AI Hero Ads. Upgrade to Pro for unlimited high-fidelity generations and 4K exports.",
    social_accounts: "Your current plan only supports 3 social links. Go Pro to connect unlimited platforms and unlock advanced TikTok automation."
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden relative border border-white/20">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500"></div>
        
        <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">{titles[reason]}</h2>
        <p className="text-slate-500 leading-relaxed mb-10 text-sm">{descriptions[reason]}</p>

        <div className="space-y-3">
          <Button 
            className="w-full h-14 text-lg shadow-xl shadow-indigo-100" 
            onClick={() => { alert("Redirecting to Stripe Pro checkout..."); onClose(); }}
          >
            Go Pro — $29/mo
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">Maybe later</Button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center gap-6 grayscale opacity-50">
          <div className="flex items-center gap-1 text-[8px] font-black uppercase">Stripe Secure</div>
          <div className="flex items-center gap-1 text-[8px] font-black uppercase">Cancel Anytime</div>
        </div>
      </div>
    </div>
  );
};
