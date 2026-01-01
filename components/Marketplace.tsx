
import React, { useState } from 'react';
import { BrandDeal, CreatorProfile } from '../types';
import { BRAND_DEALS } from '../constants';
import { Button } from './Button';

interface MarketplaceProps {
  profile: CreatorProfile;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ profile }) => {
  const [pitchingTo, setPitchingTo] = useState<BrandDeal | null>(null);

  const generatePitch = (deal: BrandDeal) => {
    return `Hi ${deal.brand} team!\n\nI saw your "${deal.title}" opportunity on AdGenius. As a creator specializing in ${deal.niche} AI-renders, I'd love to collaborate. My portfolio features over 45 high-fidelity approved assets with a 12.4% engagement rate.\n\nYou can view my full media kit and portfolio at: vendo.bio/${profile.handle}\n\nLooking forward to hearing from you!\n- ${profile.displayName}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Brand Deals</h2>
          <p className="text-slate-500 mt-2">Exclusive partnership opportunities for AdGenius creators.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {['All', 'Tech', 'Fashion', 'Fitness'].map(tab => (
            <button key={tab} className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${tab === 'All' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BRAND_DEALS.map(deal => (
          <div key={deal.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl border border-slate-100 p-2 bg-white flex items-center justify-center overflow-hidden shadow-inner">
                <img src={deal.logo} alt={deal.brand} className="w-full h-full object-contain" />
              </div>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {deal.budget_range}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{deal.brand}</h3>
            <p className="text-sm font-semibold text-slate-500 mb-4">{deal.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-8 flex-1">{deal.description}</p>
            
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setPitchingTo(deal)}>Pitch AI Services</Button>
              <a href={deal.external_url} target="_blank" rel="noreferrer" className="flex-1">
                <Button variant="outline" className="w-full">View Brief</Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {pitchingTo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Smart Pitch Generator</h3>
            <p className="text-slate-400 text-sm mb-8">We've pre-filled this pitch with your latest analytics & portfolio links.</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 mb-8">
              <textarea 
                className="w-full h-64 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 leading-relaxed resize-none"
                defaultValue={generatePitch(pitchingTo)}
              />
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 h-12" onClick={() => { alert("Pitch copied to clipboard!"); setPitchingTo(null); }}>
                Copy & Open Brand Portal
              </Button>
              <Button variant="ghost" onClick={() => setPitchingTo(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
