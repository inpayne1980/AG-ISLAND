// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { SubscriptionTier, SubscriptionStatus } from '../types';
import { Button } from './Button';

interface AdminSubscriptionsProps {
  onUpdateTier: (tier: SubscriptionTier) => void;
  currentSubscription: SubscriptionStatus;
}

export const AdminSubscriptions: React.FC<AdminSubscriptionsProps> = ({ onUpdateTier, currentSubscription }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Subscription Vault</h2>
        <p className="text-slate-500 mt-2 font-medium italic">Owner-only simulation for external Stripe subscription activation. (Constraint 8.5)</p>
      </div>

      <div className="neu-card bg-brightSand shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-sand/50 border-b border-deepSand text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Tier Status</th>
              <th className="px-8 py-4">Health</th>
              <th className="px-8 py-4">Reference ID</th>
              <th className="px-8 py-4 text-right">Owner Override</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-deepSand/30">
            <tr>
              <td className="px-8 py-6">
                <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{currentSubscription.tier}</span>
              </td>
              <td className="px-8 py-6">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${currentSubscription.status === 'active' ? 'bg-turquoise/20 text-turquoise' : 'bg-coral/20 text-coral'}`}>
                  {currentSubscription.status}
                </span>
              </td>
              <td className="px-8 py-6 text-[10px] text-slate-400 font-mono">
                ext_strp_99x caribbean
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="neumorphic" className="text-[8px] h-8 px-3" onClick={() => onUpdateTier('individual')}>Reset</Button>
                  <Button variant="primary" className="text-[8px] h-8 px-3" onClick={() => onUpdateTier('pro')}>Pro</Button>
                  <Button variant="secondary" className="text-[8px] h-8 px-3" onClick={() => onUpdateTier('enterprise')}>Ent.</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-8 neu-inset bg-sand/30 border border-deepSand">
        <h4 className="font-black text-slate-800 uppercase text-xs mb-2">Billing Guardrail Policy</h4>
        <p className="text-[10px] text-slate-500 leading-relaxed mb-6 font-medium">
          Self-serve billing is strictly disabled (8.5). This panel represents the backend CRM used by AdGenius support staff to manually reconcile Stripe project IDs with creator accounts. No native checkout forms are accessible to standard users. NO creator payouts, NO native checkout, NO self-serve billing.
        </p>
        <Button variant="neumorphic" className="bg-brightSand border border-deepSand">Manual Re-Sync with Stripe</Button>
      </div>
    </div>
  );
};