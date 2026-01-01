// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { SubscriptionStatus, UsageStats } from '../types';

interface UsageMetersProps {
  subscription: SubscriptionStatus;
  usage: UsageStats;
}

export const UsageMeters: React.FC<UsageMetersProps> = ({ subscription, usage }) => {
  const heroPercentage = (usage.heroAdsUsed / subscription.heroAdsLimit) * 100;
  const socialPercentage = (usage.socialAccountsUsed / subscription.socialAccountsLimit) * 100;

  const getBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-rose-500';
    if (percentage >= 80) return 'bg-amber-500';
    return 'bg-indigo-600';
  };

  return (
    <div className="space-y-4 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plan: {subscription.tier}</span>
        {subscription.status === 'grace_period' && (
          <span className="text-[8px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-black uppercase animate-pulse">Grace Period</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-600">
          <span>Hero Ads Used</span>
          <span>{usage.heroAdsUsed} / {subscription.heroAdsLimit === 9999 ? '∞' : subscription.heroAdsLimit}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getBarColor(heroPercentage)}`}
            style={{ width: `${Math.min(100, heroPercentage)}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-600">
          <span>Social Slots</span>
          <span>{usage.socialAccountsUsed} / {subscription.socialAccountsLimit === 9999 ? '∞' : subscription.socialAccountsLimit}</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${getBarColor(socialPercentage)}`}
            style={{ width: `${Math.min(100, socialPercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
};