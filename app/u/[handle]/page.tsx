// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { CampaignCard } from '../../../components/portfolio/campaign-card';

interface PortfolioPageProps {
  handle: string;
}

export const CreatorPortfolioPage: React.FC<PortfolioPageProps> = ({ handle }) => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // 1. Fetch Profile to get User ID
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, handle, display_name, avatar_url, bio')
          .eq('handle', handle)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // 2. Fetch Landing Pages for that User's Products
        // Assuming products are linked to user_id and landing_pages are linked to product_id
        const { data: pages, error: pagesError } = await supabase
          .from('landing_pages')
          .select(`
            id,
            slug,
            video_url,
            product:products (
              brand,
              image_url,
              user_id
            )
          `)
          .eq('product.user_id', profileData.id)
          .eq('is_active', true);

        if (pagesError) throw pagesError;
        setCampaigns(pages || []);
      } catch (err: any) {
        console.error("Failed to load portfolio:", err);
        setError("This creator has vanished from the islands.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Portfolio...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">404 Lost Hub</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-10">{error}</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="text-[10px] font-black text-turquoise uppercase tracking-widest underline decoration-2 underline-offset-8"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand pb-32">
      {/* Profile Header */}
      <div className="bg-brightSand border-b border-deepSand px-6 pt-20 pb-12 text-center relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-turquoise via-coral to-turquoise"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <img 
            src={profile.avatar_url || `https://picsum.photos/seed/${handle}/200/200`} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-xl mx-auto mb-6"
            alt={profile.display_name}
          />
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">@{profile.handle}</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">{profile.bio || 'AI UGC Creator • AdGenius Sandbox'}</p>
          
          <div className="flex justify-center gap-4">
            <div className="neu-inset px-4 py-2 bg-sand/30 rounded-xl">
              <span className="text-[10px] font-black text-slate-900 uppercase">{campaigns.length} Campaigns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Verified Vendos</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">High-fidelity brand activations</p>
          </div>
        </div>

        {campaigns.length === 0 ? (
          <div className="neu-card p-20 text-center bg-sand/20 border-2 border-dashed border-deepSand">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No active campaigns yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {campaigns.map((page) => (
              <CampaignCard 
                key={page.id}
                handle={handle}
                slug={page.slug}
                brand={page.product.brand}
                thumbnailUrl={page.product.image_url}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-32 text-center opacity-30">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">Powered by AdGenius • 0% Commission • NO creator payouts, NO native checkout, NO self-serve billing.</p>
      </div>
    </div>
  );
};