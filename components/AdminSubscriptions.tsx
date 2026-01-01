
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
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Subscription Admin</h2>
        <p className="text-slate-500 mt-2">Owner-only view for simulating Stripe subscription activations.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Current Plan</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4">Stripe ID</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr>
              <td className="px-8 py-6">
                <span className="text-sm font-bold text-slate-900 uppercase">{currentSubscription.tier}</span>
              </td>
              <td className="px-8 py-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${currentSubscription.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {currentSubscription.status}
                </span>
              </td>
              <td className="px-8 py-6 text-xs text-slate-400 font-mono">
                sub_sim_123456789
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="text-xs h-8" onClick={() => onUpdateTier('individual')}>Reset to Free</Button>
                  <Button variant="primary" className="text-xs h-8" onClick={() => onUpdateTier('pro')}>Force Pro</Button>
                  <Button variant="secondary" className="text-xs h-8" onClick={() => onUpdateTier('enterprise')}>Force Enterprise</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100">
        <h4 className="font-bold text-indigo-900 mb-2">Simulated Grace Period Test</h4>
        <p className="text-sm text-indigo-700/70 mb-6">Test the 14-day lock logic by simulating an expired payment status.</p>
        <Button variant="outline" className="bg-white">Simulate Payment Failure</Button>
      </div>
    </div>
  );
};
