// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { Button } from '../Button';

interface CampaignCardProps {
  handle: string;
  slug: string;
  brand: string;
  thumbnailUrl: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ handle, slug, brand, thumbnailUrl }) => {
  const campaignUrl = `/u/${handle}/${slug}`;

  return (
    <div className="neu-card bg-brightSand p-4 group transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 relative shadow-inner bg-sand/50">
        <img 
          src={thumbnailUrl} 
          alt={`${brand} Campaign`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-[8px] font-black text-white uppercase tracking-widest">Live Vendo</span>
        </div>
      </div>
      
      <div className="flex-1 px-2">
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-1 truncate">{brand}</h3>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">AI-Generated Campaign</p>
      </div>

      <Button 
        variant="primary" 
        className="w-full h-12 shadow-md group-hover:shadow-turquoise/20"
        onClick={() => window.location.href = campaignUrl}
      >
        <span className="flex items-center gap-2">
          View Campaign
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </Button>
    </div>
  );
};