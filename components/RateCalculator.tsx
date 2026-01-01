// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { Button } from './Button';

export const RateCalculator: React.FC = () => {
  const [followers, setFollowers] = useState(50000);
  const [niche, setNiche] = useState('Fashion');
  const [complexity, setComplexity] = useState('High');

  const calculateRate = () => {
    const base = followers * 0.02; // $0.02 per follower base
    const nicheMult = niche === 'Tech' ? 1.5 : niche === 'Fitness' ? 1.2 : 1;
    const compMult = complexity === 'High' ? 1.4 : 1;
    return Math.round(base * nicheMult * compMult);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-10 border-b border-slate-100 text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Rate Calculator</h2>
          <p className="text-slate-400 text-sm mt-1">Smart pricing suggestions based on AI market data.</p>
        </div>
        
        <div className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex justify-between">
              Follower Count <span>{followers.toLocaleString()}</span>
            </label>
            <input 
              type="range" min="1000" max="1000000" step="1000" 
              value={followers} onChange={(e) => setFollowers(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content Niche</label>
              <select 
                value={niche} onChange={(e) => setNiche(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500"
              >
                <option>Fashion</option>
                <option>Tech</option>
                <option>Fitness</option>
                <option>Lifestyle</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Complexity</label>
              <select 
                value={complexity} onChange={(e) => setComplexity(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500"
              >
                <option>Standard</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="pt-8 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Suggested Rate / Post</div>
            <div className="text-7xl font-black text-indigo-600 tracking-tighter mb-4">${calculateRate()}</div>
            <div className="flex justify-center items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
              <span className="flex h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
              92% Confidence Score
            </div>
          </div>

          <Button className="w-full h-14 text-lg mt-4 shadow-xl shadow-indigo-200">
            Generate Quote Template
          </Button>
        </div>
      </div>
    </div>
  );
};