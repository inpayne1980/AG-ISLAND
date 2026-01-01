
import React, { useState, useEffect } from 'react';
import { ApprovalQueue } from './components/ApprovalQueue';
import { PublicProfile } from './components/PublicProfile';
import { MediaKit } from './components/MediaKit';
import { ProductUpload } from './components/ProductUpload';
import { ContentLibrary } from './components/ContentLibrary';
import { SocialManager } from './components/SocialManager';
import { ReferralSystem } from './components/ReferralSystem';
import { Marketplace } from './components/Marketplace';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RateCalculator } from './components/RateCalculator';
import { ContentCalendar } from './components/ContentCalendar';
import { PaymentDashboard } from './components/PaymentDashboard';
import { UsageMeters } from './components/UsageMeters';
import { UpgradeNudge } from './components/UpgradeNudge';
import { AdminSubscriptions } from './components/AdminSubscriptions';
import { SecurityDashboard } from './components/SecurityDashboard';
import { PrivacySettings } from './components/PrivacySettings';
import { RateLimiterUI } from './components/RateLimiterUI';
import { OnboardingChecklist } from './components/OnboardingChecklist';
import { HealthMonitor } from './components/HealthMonitor';
import { Button } from './components/Button';
import { MOCK_PROFILE, INITIAL_MOCK_DATA, MOCK_SUBSCRIPTION } from './constants';
import { GeneratedContent, CreatorProfile, ThemeType, SubscriptionStatus, UsageStats, SubscriptionTier, RateLimitState } from './types';

type AppView = 'queue' | 'public' | 'media-kit' | 'upload' | 'library' | 'social' | 'referrals' | 'marketplace' | 'analytics' | 'rates' | 'calendar' | 'payments' | 'admin' | 'security' | 'privacy';

function App() {
  const [view, setView] = useState<AppView>('queue');
  const [profile, setProfile] = useState<CreatorProfile>(MOCK_PROFILE);
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionStatus>(MOCK_SUBSCRIPTION);
  const [nudge, setNudge] = useState<'hero_ads' | 'social_accounts' | null>(null);
  
  const [rateLimit, setRateLimit] = useState<RateLimitState>({
    uploads: 4,
    generations: 8,
    publishes: 15
  });

  useEffect(() => {
    const saved = localStorage.getItem('adgenius_queue');
    if (saved) {
      setContent(JSON.parse(saved));
    } else {
      setContent(INITIAL_MOCK_DATA);
    }
    const savedSub = localStorage.getItem('adgenius_sub');
    if (savedSub) setSubscription(JSON.parse(savedSub));
  }, []);

  const handleContentUpdate = (newContent: GeneratedContent[]) => {
    setContent(newContent);
    localStorage.setItem('adgenius_queue', JSON.stringify(newContent));
  };

  const usage: UsageStats = {
    heroAdsUsed: content.length,
    socialAccountsUsed: 2 
  };

  const onboardingItems = [
    { id: '1', label: 'Connect Social DNA', isComplete: true },
    { id: '2', label: 'First Product Upload', isComplete: content.length > 0 },
    { id: '3', label: 'Approve AI Variant', isComplete: content.some(c => c.status === 'approved') },
  ];

  const handleNewUpload = (newVariants: GeneratedContent[]) => {
    if (rateLimit.uploads <= 0) {
      alert("Caribbean weather delay: Rate limit exceeded. Try in 1 hour.");
      return;
    }
    if (subscription.tier === 'individual' && content.length + newVariants.length > subscription.heroAdsLimit) {
      setNudge('hero_ads');
      return;
    }
    setRateLimit(prev => ({ ...prev, uploads: prev.uploads - 1, generations: prev.generations - 3 }));
    const updated = [...newVariants, ...content];
    setContent(updated);
    localStorage.setItem('adgenius_queue', JSON.stringify(updated));
    setView('queue');
  };

  const handleUpdateTier = (tier: SubscriptionTier) => {
    const newSub: SubscriptionStatus = {
      tier,
      status: 'active',
      heroAdsLimit: tier === 'individual' ? 5 : tier === 'pro' ? 50 : 9999,
      socialAccountsLimit: tier === 'individual' ? 3 : tier === 'pro' ? 10 : 9999,
    };
    setSubscription(newSub);
    localStorage.setItem('adgenius_sub', JSON.stringify(newSub));
  };

  const approvedContent = content.filter(c => c.status === 'approved');
  const isLocked = subscription.status === 'expired';

  return (
    <div className="min-h-screen bg-sand font-sans selection:bg-turquoise/30 selection:text-turquoise">
      <nav className="sticky top-0 z-[100] px-4 py-4 no-print">
        <div className="max-w-[1600px] mx-auto">
          <div className="neu-card bg-sand/90 backdrop-blur-md px-8 py-4 flex justify-between items-center h-24 shadow-neu-flat">
            <div className="flex items-center gap-6">
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => setView('queue')}
                role="link"
                aria-label="Home"
              >
                <div className="bg-turquoise h-12 w-12 rounded-2xl flex items-center justify-center shadow-neu-sm group-hover:rotate-6 transition-transform">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter leading-none text-slate-900 uppercase">
                    AdGenius <span className="text-coral">Island</span>
                  </span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Creative Sandbox v6.1</span>
                </div>
              </div>
              
              <div className="hidden xl:flex items-center gap-1 neu-inset p-1 bg-sand/30">
                {(['upload', 'queue', 'library', 'calendar'] as AppView[]).map((v) => (
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
                <RateLimiterUI label="AI Limit" current={rateLimit.generations} max={10} />
                <RateLimiterUI label="CDN Flow" current={rateLimit.uploads} max={5} />
              </div>

              <div className="hidden 2xl:block">
                <HealthMonitor />
              </div>

              <div className="flex items-center gap-3">
                 <button 
                    onClick={() => setView('admin')} 
                    className={`p-3 rounded-2xl transition-all shadow-neu-sm active:shadow-neu-pressed ${view === 'admin' ? 'bg-turquoise text-white' : 'neu-button text-slate-400 hover:text-turquoise'}`}
                    title="Project Vault (Admin)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 </button>
                 <div 
                    onClick={() => setView('privacy')} 
                    className="neu-button p-1 rounded-full cursor-pointer hover:ring-2 hover:ring-turquoise transition-all"
                    role="button"
                    aria-label="Profile Settings"
                  >
                  <img className="h-10 w-10 rounded-full border-2 border-brightSand" src={profile.avatar} alt="Profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-32 animate-fade-in" role="main">
        {view === 'queue' && (
          <div className="mb-12">
            <OnboardingChecklist items={onboardingItems} />
          </div>
        )}

        {isLocked ? (
          <div className="max-w-xl mx-auto mt-20 p-12 neu-card bg-brightSand text-center">
             <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter text-slate-800">Passport Expired</h2>
             <p className="text-slate-500 mb-10 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Your creative stay has ended. Contact an administrator to manually override your tier and regain island access (Constraint 8.5).</p>
             <Button variant="primary" className="w-full h-14" onClick={() => alert("Notification sent to project owner.")}>Request Re-entry</Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            {view === 'upload' && <ProductUpload onComplete={handleNewUpload} />}
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

      {/* Persistent Action Dock */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] no-print">
        <div className="neu-card bg-sand/90 backdrop-blur-xl px-8 py-4 flex gap-6 items-center border border-deepSand shadow-2xl">
          <Button 
            variant={view === 'upload' ? 'secondary' : 'primary'} 
            onClick={() => setView('upload')}
            className="h-12 w-56 shadow-lg"
          >
            {view === 'upload' ? 'Cancel Creation' : 'New AI Generation'}
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
