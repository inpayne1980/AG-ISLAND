
import React, { useState } from 'react';
import { RewardTier } from '../types';
import { REWARD_TIERS } from '../constants';
import { Button } from './Button';

export const ReferralSystem: React.FC = () => {
  const [conversions] = useState(2);
  const [code] = useState("ALEX-AI-2024");
  const [tiers] = useState<RewardTier[]>(REWARD_TIERS.map(t => ({
    ...t,
    unlocked: conversions >= t.referralsNeeded
  })));

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    alert("Referral code copied!");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-indigo-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl mb-12">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black tracking-tighter mb-4">Invite Creators, <br/>Unlock Superpowers.</h2>
            <p className="text-indigo-100 text-sm max-w-sm mb-8 opacity-80">Share your unique code. When your friends approve their first AI variant, you both get premium rewards.</p>
            
            <div className="flex items-center gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20">
              <span className="flex-1 px-4 font-black tracking-widest text-xl">{code}</span>
              <Button onClick={copyCode} variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">Copy Code</Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 text-center min-w-[200px]">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Conversions</span>
            <div className="text-6xl font-black mt-2 leading-none">{conversions}</div>
            <div className="mt-4 flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i <= conversions ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-violet-400 rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-emerald-400 rounded-full blur-[80px] opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <div key={i} className={`p-8 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all ${tier.unlocked ? 'bg-white border-emerald-100 shadow-xl' : 'bg-slate-50 border-slate-100 opacity-70'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${tier.unlocked ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-black text-slate-900 leading-tight mb-2">{tier.reward}</h4>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Requires {tier.referralsNeeded} Referrals</span>
            
            <div className={`mt-6 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${tier.unlocked ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
              {tier.unlocked ? 'Unlocked & Active' : `${tier.referralsNeeded - conversions} more to go`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
