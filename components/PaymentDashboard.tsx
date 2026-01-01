// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { MOCK_PAYMENTS } from '../constants';
import { PaymentRecord } from '../types';
import { Button } from './Button';

export const PaymentDashboard: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>(MOCK_PAYMENTS);
  const total = payments.reduce((acc, p) => acc + p.amount, 0);

  const handleAddManualEntry = () => {
    const amountStr = prompt("Enter payment amount ($):");
    const source = prompt("Enter client/source name:");
    if (amountStr && source) {
      const newPayment: PaymentRecord = {
        id: Math.random().toString(36).substr(2, 9),
        amount: parseFloat(amountStr),
        source: source,
        date: new Date().toISOString().split('T')[0],
        status: 'cleared'
      };
      setPayments([newPayment, ...payments]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Earnings Ledger</h2>
          <p className="text-slate-500 mt-2 font-medium italic">Self-reported manual tracking only. AdGenius takes 0% commission.</p>
          <div className="mt-4 p-4 neu-inset bg-sand/50 border border-deepSand rounded-2xl">
            <p className="text-[10px] font-black text-coral uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Manual Entry Ledger (8.1, 8.3) • No Native Payouts
            </p>
          </div>
        </div>
        <div className="neu-card bg-turquoise p-8 text-white shadow-lg flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Manual Balance</span>
          <div className="text-4xl font-black mt-1">${total.toLocaleString()}</div>
          <p className="text-[8px] font-black uppercase mt-2 opacity-60">Revenue tracking for external deals only.</p>
        </div>
      </div>

      <div className="neu-card bg-brightSand overflow-hidden shadow-sm">
        <div className="p-8 border-b border-deepSand flex justify-between items-center">
          <h3 className="font-black text-slate-800 uppercase tracking-tighter">Transaction History</h3>
          <Button onClick={handleAddManualEntry} variant="neumorphic" className="h-10 text-[9px]">Add Manual Entry</Button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-sand/50 border-b border-deepSand text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Source</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-deepSand/30">
            {payments.map(p => (
              <tr key={p.id} className="hover:bg-sand/20 transition-colors">
                <td className="px-8 py-6">
                  <span className="text-sm font-black text-slate-700 uppercase tracking-tight">{p.source}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.date}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === 'cleared' ? 'bg-turquoise/20 text-turquoise' : 'bg-coral/20 text-coral'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-sm font-black text-slate-900">${p.amount.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-6 neu-inset bg-brightSand/50 border border-deepSand text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          ADGENIUS IS A CREATIVE TOOL, NOT A PAYMENT PROCESSOR.
        </p>
        <p className="text-[8px] font-bold text-slate-300 uppercase mt-1">
          Revenue sharing and platform payouts are strictly prohibited (Constraint 8.3).
        </p>
      </div>
    </div>
  );
};