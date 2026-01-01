
// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { LoginView } from './login';
import { HandleSetup } from './HandleSetup';
import UploadPage from './app/studio/upload/page';
import { DynamicLandingPage } from './app/u/[handle]/[product_slug]/page';
import { CreatorPortfolioPage } from './app/u/[handle]/page';
import OwnerDashboard from './app/owner/page';
import { ApprovalQueue } from './components/ApprovalQueue';
import { PublicProfile } from './components/PublicProfile';
import { MediaKit } from './components/MediaKit';
import { ContentLibrary } from './components/ContentLibrary';
import { SocialManager } from './components/SocialManager';
import { ReferralSystem } from './components/ReferralSystem';
import { Marketplace } from './components/Marketplace';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RateCalculator } from './components/RateCalculator';
import { ContentCalendar } from './components/ContentCalendar';
import { PaymentDashboard } from './components/PaymentDashboard';
import { AdminSubscriptions } from './components/AdminSubscriptions';
import { SecurityDashboard } from './components/SecurityDashboard';
import { PrivacySettings } from './components/PrivacySettings';
import { RateLimiterUI } from './components/RateLimiterUI';
import { OnboardingChecklist } from './components/OnboardingChecklist';
import { HealthMonitor } from './components/HealthMonitor';
import { Button } from './components/Button';
import { UpgradeNudge } from './components/UpgradeNudge';
import { MOCK_PROFILE, INITIAL_MOCK_DATA, MOCK_SUBSCRIPTION } from './constants';
import { GeneratedContent, CreatorProfile, SubscriptionStatus, SubscriptionTier, RateLimitState } from './types';

type AppView = 'queue' | 'public' | 'media-kit' | 'studio' | 'library' | 'social' | 'referrals' | 'marketplace' | 'analytics' | 'rates' | 'calendar' | 'payments' | 'admin' | 'security' | 'privacy' | 'owner';

function App() {
  const [session, setSession] = useState<any>(null);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [view, setView] = useState<AppView>('queue');
  const [profile, setProfile] = useState<CreatorProfile>(MOCK_PROFILE);
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionStatus>(MOCK_SUBSCRIPTION);
  const [nudge, setNudge] = useState<'hero_ads' | 'social_accounts' | null>(null);
  
  // Routing State Simulation
  const [routeInfo, setRouteInfo] = useState<{ handle: string, productSlug: string | null } | null>(null);
  const [isOwnerRoute, setIsOwnerRoute] = useState(false);

  useEffect(() => {
    // Basic Path Routing Simulation
    const path = window.location.pathname;
    
    // Match /u/[handle]/[slug]
    const campaignMatch = path.match(/^\/u\/([^\/]+)\/([^\/]+)/);
    // Match /u/[handle]
    const portfolioMatch = path.match(/^\/u\/([^\/]+)$/);
    // Match /owner
    const ownerMatch = path.match(/^\/owner/);

    if (campaignMatch) {
      setRouteInfo({ handle: campaignMatch[1], productSlug: campaignMatch[2] });
    } else if (portfolioMatch) {
      setRouteInfo({ handle: portfolioMatch[1], productSlug: null });
    } else if (ownerMatch) {
      setIsOwnerRoute(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkProfile(session.user.id);
    });

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkProfile(session.user.id);
      else setProfileExists(null);
    });

    return () => authListener.unsubscribe();
  }, []);

  const checkProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('handle')
      .eq('id', userId)
      .single();

    if (data) {
      setProfileExists(true);
      setProfile(prev => ({ ...prev, handle: data.handle }));
    } else {
      setProfileExists(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('adgenius_queue');
    if (saved) setContent(JSON.parse(saved));
    else setContent(INITIAL_MOCK_DATA);
    
    const savedSub = localStorage.getItem('adgenius_sub');
    if (savedSub) setSubscription(JSON.parse(savedSub));
  }, []);

  const handleContentUpdate = (newContent: GeneratedContent[]) => {
    setContent(newContent);
    localStorage.setItem('adgenius_queue', JSON.stringify(newContent));
  };

  const handleUpdateTier = (tier: SubscriptionTier) => {
    const newSub: SubscriptionStatus = {
      tier,
      status: 'active',
      heroAdsLimit: tier === 'individual' ? 5 : tier === 'pro' ? 5 : 9999, // Updated to 5 as per prompt
      socialAccountsLimit: tier === 'individual' ? 3 : tier === 'pro' ? 10 : 9999,
    };
    setSubscription(newSub);
    localStorage.setItem('adgenius_sub', JSON.stringify(newSub));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 1. Dynamic Route Rendering
  if (routeInfo) {
    if (routeInfo.productSlug) {
      return <DynamicLandingPage handle={routeInfo.handle} productSlug={routeInfo.productSlug} />;
    } else {
      return <CreatorPortfolioPage handle={routeInfo.handle} />;
    }
  }

  // 2. Owner Dashboard Route
  if (isOwnerRoute) {
    return <OwnerDashboard />;
  }

  // 3. Auth Guard
  if (!session) {
    return <LoginView />;
  }

  // 4. Profile Onboarding Guard
  if (profileExists === false) {
    return (
      <HandleSetup 
        userId={session.user.id} 
        email={session.user.email} 
        onComplete={(handle) => {
          setProfileExists(true);
          setProfile(prev => ({ ...prev, handle }));
        }} 
      />
    );
  }

  // 5. Loading state for profile check
  if (profileExists === null) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const approvedContent = content.filter(c => c.status === 'approved');
  const isLocked = subscription.status === 'expired';

  return (
    <div className="min-h-screen bg-sand font-sans selection:bg-turquoise/30 selection:text-turquoise">
      {/* Top Header Navigation */}
      <nav className="sticky top-0 z-[100] px-4 py-4 no-print">
        <div className="max-w-[1600px] mx-auto">
          <div className="neu-card bg-sand/90 backdrop-blur-md px-8 py-4 flex justify-between items-center h-24 shadow-neu-flat">
            <div className="flex items-center gap-6">
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => setView('queue')}
              >
                <div className="bg-turquoise h-12 w-12 rounded-2xl flex items-center justify-center shadow-neu-sm group-hover:rotate-6 transition-transform">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter leading-none text-slate-900 uppercase">
                    Vendo<span className="text-coral">.bio</span>
                  </span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Caribbean Hub</span>
                </div>
              </div>
              
              <div className="hidden xl:flex items-center gap-1 neu-inset p-1 bg-sand/30">
                {(['studio', 'queue', 'library', 'calendar'] as AppView[]).map((v) => (
                  <button 
                    key={v}
                    onClick={() => setView(v)}
                    className={`${view === v ? 'bg-turquoise text-white shadow-neu-sm' : 'text-slate-500 hover:text-turquoise'} px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="hidden lg:flex gap-6 items-center px-6 border-r border-deepSand">
                <HealthMonitor />
              </div>

              <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setView('admin')} 
                    className={`p-3 rounded-2xl transition-all shadow-neu-sm active:shadow-neu-pressed ${view === 'admin' ? 'bg-turquoise text-white' : 'neu-button text-slate-400 hover:text-turquoise'}`}
                    title="Subscription Vault"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </button>
                 <div className="flex flex-col items-end mr-2" onClick={handleLogout}>
                    <span className="text-[8px] font-black text-slate-400 uppercase cursor-pointer hover:text-coral transition-colors">Sign Out</span>
                  </div>
                 <div onClick={() => setView('privacy')} className="neu-button p-1 rounded-full cursor-pointer hover:ring-2 hover:ring-turquoise transition-all">
                  <img className="h-10 w-10 rounded-full border-2 border-brightSand" src={profile.avatar} alt="Profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-32 animate-fade-in">
        {isLocked ? (
          <div className="max-w-xl mx-auto mt-20 p-12 neu-card bg-brightSand text-center">
             <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-slate-800">Passport Expired</h2>
             <p className="text-slate-500 mb-10 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Your creative stay has ended. All billing is managed externally (Constraint 8.5).</p>
             <Button variant="primary" className="w-full h-14" onClick={() => alert("Notification sent to account manager.")}>Request Re-entry</Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            {view === 'studio' && <UploadPage />}
            {view === 'queue' && <ApprovalQueue onUpdate={handleContentUpdate} />}
            {view === 'library' && <ContentLibrary content={content} />}
            {view === 'calendar' && <ContentCalendar content={content} />}
            {view === 'social' && <SocialManager />}
            {view === 'analytics' && <AnalyticsDashboard />}
            {view === 'marketplace' && <Marketplace profile={profile} />}
            {view === 'rates' && <RateCalculator />}
            {view === 'payments' && <PaymentDashboard />}
            {view === 'referrals' && <ReferralSystem />}
            {view === 'admin' && <AdminSubscriptions currentSubscription={subscription} onUpdateTier={handleUpdateTier} />}
            {view === 'security' && <SecurityDashboard />}
            {view === 'privacy' && <PrivacySettings />}
            {view === 'public' && (
              <div className="py-12 flex justify-center">
                <div className="w-full max-w-md neu-card p-4 bg-slate-900 border-[12px] border-slate-900 shadow-2xl">
                  <div className="h-[800px] overflow-y-auto no-scrollbar rounded-[2rem]">
                    <PublicProfile profile={profile} approvedContent={approvedContent} />
                  </div>
                </div>
              </div>
            )}
            {view === 'media-kit' && <MediaKit profile={profile} content={content} />}
          </div>
        )}
      </main>

      {/* Persistent Mobile-Friendly Action Dock */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] no-print">
        <div className="neu-card bg-sand/90 backdrop-blur-xl px-8 py-4 flex gap-6 items-center border border-deepSand shadow-2xl">
          <Button 
            variant={view === 'studio' ? 'secondary' : 'primary'} 
            onClick={() => setView('studio')}
            className="h-12 w-56 shadow-lg"
          >
            {view === 'studio' ? 'Close Studio' : 'Launch Creator Studio'}
          </Button>
          <div className="w-[1px] h-10 bg-deepSand"></div>
          <div className="flex gap-1">
             {(['social', 'analytics', 'marketplace', 'rates', 'payments'] as AppView[]).map(v => (
               <button 
                 key={v}
                 onClick={() => setView(v)}
                 className={`p-2 rounded-xl transition-all ${view === v ? 'text-turquoise bg-sand/50 shadow-neu-sm' : 'text-slate-400 hover:text-turquoise'}`}
                 title={v.toUpperCase()}
               >
                 <div className="w-5 h-5 flex items-center justify-center font-black text-[8px] uppercase">{v.slice(0, 2)}</div>
               </button>
             ))}
          </div>
        </div>
      </div>

      {nudge && <UpgradeNudge reason={nudge} onClose={() => setNudge(null)} />}

      <style>{`
        @media print { .no-print { display: none !important; } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}

export default App;
