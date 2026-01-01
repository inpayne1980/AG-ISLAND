
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
    return `Hi ${deal.brand} team!\n\nI saw your "${deal.title}" opportunity on AdGenius. As a creator specializing in ${deal.niche} AI-renders, I'd love to collaborate. My portfolio features verified high-fidelity assets.\n\nYou can view my full media kit and portfolio at: vendo.bio/${profile.handle}\n\nI handle my own billing directly. Let me know if you'd like to discuss a custom project!\n- ${profile.displayName}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Marketplace Briefs</h2>
          <p className="text-slate-500 mt-2 font-medium">Direct pitch opportunities. 0% commission platform fee (8.3).</p>
        </div>
        <div className="flex bg-sand p-1 rounded-2xl neu-inset border border-deepSand">
          {['All', 'Tech', 'Fashion', 'Fitness'].map(tab => (
            <button key={tab} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'All' ? 'bg-brightSand shadow-neu-sm text-turquoise' : 'text-slate-400 hover:text-turquoise'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BRAND_DEALS.map(deal => (
          <div key={deal.id} className="neu-card bg-brightSand p-8 shadow-sm hover:-translate-y-2 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 neu-inset p-2 bg-brightSand flex items-center justify-center overflow-hidden">
                <img src={deal.logo} alt={deal.brand} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="bg-turquoise/10 text-turquoise px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-turquoise/20">
                {deal.budget_range}
              </span >
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter group-hover:text-turquoise transition-colors">{deal.brand}</h3>
            <p className="text-[10px] font-black text-coral uppercase tracking-widest mb-4">{deal.title}</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-8 flex-1">{deal.description}</p>
            
            <div className="flex gap-3">
              <Button className="flex-1" variant="primary" onClick={() => setPitchingTo(deal)}>Pitch Direct</Button>
              <Button variant="neumorphic" className="flex-1" onClick={() => window.open(deal.external_url, '_blank')}>View Brief</Button>
            </div>
          </div>
        ))}
      </div>

      {pitchingTo && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="neu-card bg-sand w-full max-w-2xl p-10 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-2">Smart Pitch Draft</h3>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">Direct collaboration • No platform mediation (8.3)</p>
            
            <div className="neu-inset bg-brightSand/50 p-8 mb-8 border border-deepSand">
              <textarea 
                className="w-full h-64 bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-600 leading-relaxed resize-none uppercase"
                defaultValue={generatePitch(pitchingTo)}
              />
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 h-12" onClick={() => { alert("Pitch copied to clipboard! Opening brand email portal."); setPitchingTo(null); }}>
                Copy & Open External Mail
              </Button>
              <Button variant="ghost" className="text-slate-400" onClick={() => setPitchingTo(null)}>Dismiss</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
