
import React, { useState } from 'react';
import { CreatorProfile, GeneratedContent, ThemeType } from '../types';

interface PublicProfileProps {
  profile: CreatorProfile;
  approvedContent: GeneratedContent[];
}

export const PublicProfile: React.FC<PublicProfileProps> = ({ profile, approvedContent }) => {
  const [links, setLinks] = useState(profile.links);

  const handleLinkClick = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, clicks: l.clicks + 1 } : l));
    console.log(`Analytics: Link ${id} clicked.`);
  };

  const themeClasses: Record<ThemeType, string> = {
    clean: "bg-white text-slate-900",
    bold: "bg-slate-900 text-white",
    minimal: "bg-slate-50 text-slate-700 font-serif"
  };

  const primaryBtnClass: Record<ThemeType, string> = {
    clean: "bg-indigo-600 text-white",
    bold: "bg-white text-slate-900",
    minimal: "bg-slate-900 text-white"
  };

  const heroAd = approvedContent[0] || null;

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-500 ${themeClasses[profile.theme]}`}>
      {/* Mobile-first centered container */}
      <div className="max-w-md mx-auto px-6 pt-12">
        
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-4 group">
            <img 
              src={profile.avatar} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-xl group-hover:scale-105 transition-transform" 
              alt={profile.displayName} 
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">@{profile.handle}</h1>
          <p className="mt-2 text-sm opacity-80 leading-relaxed max-w-[280px]">
            {profile.bio}
          </p>
        </div>

        {/* Hero Window Ad System (9:16 Aspect) */}
        {heroAd && (
          <div className="mb-10 animate-fade-in">
            <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3 text-center">Featured Spotlight</h3>
            <div className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
              <img 
                src={heroAd.hero_url} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="Hero Feature" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <span className="text-white/60 text-xs font-medium mb-1">AI Enhanced Original</span>
                <h4 className="text-white text-xl font-bold">The Signature Collection</h4>
                <button className="mt-4 bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg">
                  Shop Now — 20% Off
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Link Aggregation */}
        <div className="space-y-4 mb-12">
          {links.map(link => (
            <a 
              key={link.id}
              href={link.url}
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.id); }}
              className={`block w-full py-4 px-6 rounded-2xl text-center font-semibold transition-all shadow-md active:scale-95 border ${link.isSpotlight ? `${primaryBtnClass[profile.theme]} border-transparent animate-pulse` : 'bg-white/5 border-slate-200 backdrop-blur-md'}`}
            >
              {link.title}
              {link.isSpotlight && <span className="ml-2">🔥</span>}
            </a>
          ))}
        </div>

        {/* Portfolio Showcase */}
        {approvedContent.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-current opacity-30"></span>
              Portfolio
              <span className="w-8 h-[1px] bg-current opacity-30"></span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {approvedContent.map(item => (
                <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/5">
                  <img src={item.hero_url} className="w-full h-full object-cover" alt="Portfolio item" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center opacity-50 text-[10px] uppercase tracking-widest py-8">
          Powered by AdGenius AI
        </div>
      </div>

      {/* Spotlight CTA Banner (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">New Drop</span>
              <span className="text-sm font-bold">Limited Studio Presets</span>
            </div>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
