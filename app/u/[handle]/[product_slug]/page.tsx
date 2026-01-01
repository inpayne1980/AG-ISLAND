
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import { HeroVideo } from '../../../../components/HeroVideo';
import { BrandHeader } from '../../../../components/BrandHeader';
import { PrimaryCTA } from '../../../../components/PrimaryCTA';

interface LandingPageProps {
  handle: string;
  productSlug: string;
}

export const DynamicLandingPage: React.FC<LandingPageProps> = ({ handle, productSlug }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data: page, error: fetchError } = await supabase
          .from('landing_pages')
          .select(`
            *,
            product:products (
              brand,
              product_url,
              image_url
            )
          `)
          .eq('slug', productSlug)
          .single();

        if (fetchError) throw fetchError;
        setData(page);
      } catch (err: any) {
        console.error("Failed to load Vendo:", err);
        setError("This Vendo has set sail. (404)");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-10 text-center">
        <div className="w-16 h-16 border-4 border-turquoise border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Syncing Branded DNA</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 animate-pulse">Summoning High-Fidelity Assets...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">404 Lost at Sea</h2>
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
    <div className="min-h-screen bg-sand pb-40 relative overflow-x-hidden">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] aspect-square bg-turquoise/30 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[100%] aspect-square bg-coral/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-md mx-auto px-6 pt-12 relative z-10">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl">
              <svg className="w-4 h-4 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Vendo.bio</span>
          </div>
          <button className="neu-button p-2.5 rounded-full text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {/* High-Fidelity Hero with LCP Optimization (fetchpriority="high") */}
        <div className="relative">
          <HeroVideo 
            videoUrl={data.video_url} 
            posterUrl={data.product.image_url} 
          />
          {/* LCP Optimization Hint for the browser */}
          {data.video_url ? (
             <link rel="preload" as="video" href={data.video_url} />
          ) : (
             <img 
               src={data.product.image_url} 
               alt="Preload LCP" 
               className="hidden" 
               // @ts-ignore
               fetchpriority="high"
             />
          )}
        </div>

        {/* Brand Presence */}
        <BrandHeader brand={data.product.brand} creator={handle} />

        {/* Showcase Grid (Simulated additional AI shots) */}
        <div className="grid grid-cols-2 gap-4 mt-8 mb-16">
          <div className="aspect-square neu-inset bg-brightSand/40 rounded-3xl overflow-hidden p-1 flex items-center justify-center">
             <div className="text-center">
                <span className="text-[8px] font-black text-turquoise uppercase tracking-widest block mb-1">Authentic</span>
                <p className="text-[7px] font-bold text-slate-400 uppercase">Batch #82</p>
             </div>
          </div>
          <div className="aspect-square neu-inset bg-brightSand/40 rounded-3xl overflow-hidden p-1 flex items-center justify-center">
             <div className="text-center">
                <span className="text-[8px] font-black text-coral uppercase tracking-widest block mb-1">Direct</span>
                <p className="text-[7px] font-bold text-slate-400 uppercase">Verified Link</p>
             </div>
          </div>
        </div>

        {/* Small Footer Text */}
        <p className="text-[8px] text-center text-slate-400 leading-relaxed uppercase tracking-widest px-10 opacity-60">
          This landing page was generated automatically. All product photography is AI-enhanced UGC based on original assets.
        </p>
      </div>

      {/* Primary Conversion Point */}
      <PrimaryCTA href={data.product.product_url} />
    </div>
  );
};
