// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { CreatorProfile, GeneratedContent, ThemeType } from '../types';

interface PublicProfileProps {
  profile: CreatorProfile;
  approvedContent: GeneratedContent[];
}

export const PublicProfile: React.FC<PublicProfileProps> = ({ profile, approvedContent }) => {
  const [links, setLinks] = useState(profile.links);

  const handleLinkClick = (url: string, id: string) => {
    // Tracking internally but always redirecting externally (8.2)
    setLinks(prev => prev.map(l => l.id === id ? { ...l, clicks: l.clicks + 1 } : l));
    console.log(`Analytics: Link ${id} clicked. External redirect.`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const themeClasses: Record<ThemeType, string> = {
    clean: "bg-white text-slate-900",
    bold: "bg-slate-900 text-white",
    minimal: "bg-slate-50 text-slate-700 font-serif"
  };

  const primaryBtnClass: Record<ThemeType, string> = {
    clean: "bg-turquoise text-white",
    bold: "bg-turquoise text-white",
    minimal: "bg-slate-900 text-white"
  };

  const heroAd = approvedContent[0] || null;

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-500 ${themeClasses[profile.theme]}`}>
      <div className="max-w-md mx-auto px-6 pt-12">
        
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-4 group">
            <img 
              src={profile.avatar} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition-transform" 
              alt={profile.displayName} 
              loading="eager"
            />
            <div className="absolute -bottom-1 -right-1 bg-turquoise w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
            </div>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">@{profile.handle}</h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-60 leading-relaxed max-w-[280px]">
            {profile.bio}
          </p>
        </div>

        {/* Hero Spotlight - Strictly External Redirects (8.2) */}
        {heroAd && (
          <div className="mb-10 animate-fade-in">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-3 text-center">Featured AI Creation</h3>
            <div className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10">
              <img 
                src={heroAd.hero_url} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Hero Feature"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
                <span className="text-turquoise text-[10px] font-black uppercase tracking-[0.2em] mb-2">Caribbean Vibe Drop</span>
                <h4 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-6">The Signature Collection</h4>
                <button 
                  onClick={() => window.open('https://external-store.example.com', '_blank')}
                  className="bg-turquoise text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-lg active:scale-95"
                >
                  Visit External Store
                </button>
              </div>
            </div>
          </div>
        )}

        {/* External Link Tree (8.2) */}
        <div className="space-y-5 mb-12">
          {links.map(link => (
            <button 
              key={link.id}
              onClick={() => handleLinkClick(link.url, link.id)}
              className={`block w-full py-5 px-6 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-neu-sm active:shadow-neu-pressed border border-transparent ${link.isSpotlight ? `${primaryBtnClass[profile.theme]} animate-pulse` : 'bg-white/10 backdrop-blur-md text-inherit'}`}
              aria-label={`Open ${link.title}`}
            >
              {link.title}
              {link.isSpotlight && <span className="ml-2">🔥</span>}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        {approvedContent.length > 0 && (
          <div className="mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-center opacity-30 mb-8 flex items-center gap-4">
              <span className="flex-1 h-[1px] bg-current opacity-10"></span>
              Verified Portfolio
              <span className="flex-1 h-[1px] bg-current opacity-10"></span>
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {approvedContent.map(item => (
                <div key={item.id} className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border border-white/5 bg-sand/20">
                  <img src={item.hero_url} className="w-full h-full object-cover" alt="Portfolio asset" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center opacity-20 text-[8px] font-black uppercase tracking-[0.3em] py-12">
          Platform by AdGenius AI
        </div>
      </div>

      {/* Floating External CTA (8.2) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="bg-slate-900/95 backdrop-blur-xl text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center justify-between border border-white/10">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-turquoise mb-1">Limited Release</span>
              <span className="text-xs font-black uppercase tracking-tight">Studio Preset DNA</span>
            </div>
            <button 
              onClick={() => window.open('https://external-waitlist.example.com', '_blank')}
              className="bg-brightSand text-slate-900 px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-turquoise transition-colors"
            >
              Join List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};