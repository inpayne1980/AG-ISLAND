// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';

interface HeroVideoProps {
  videoUrl?: string;
  posterUrl?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ videoUrl, posterUrl }) => {
  return (
    <div className="relative w-full aspect-[9/16] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
      {videoUrl ? (
        <video 
          src={videoUrl} 
          poster={posterUrl}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
          // @ts-ignore
          fetchPriority="high"
        />
      ) : (
        <img 
          src={posterUrl} 
          className="w-full h-full object-cover opacity-80"
          alt="Product Hero"
          // @ts-ignore
          fetchPriority="high"
        />
      )}
      
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute top-6 right-6">
        <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
          <div className="w-2 h-2 bg-turquoise rounded-full animate-pulse shadow-[0_0_8px_#40E0D0]"></div>
          <span className="text-[8px] font-black text-white uppercase tracking-widest">AI UGC Render</span>
        </div>
      </div>
    </div>
  );
};