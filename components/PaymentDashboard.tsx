
import React, { useState } from 'react';
import { MOCK_PAYMENTS } from '../constants';
import { PaymentRecord } from '../types';
import { Button } from './Button';

export const PaymentDashboard: React.FC = () => {
  const [payments] = useState<PaymentRecord[]>(MOCK_PAYMENTS);
  const total = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Earnings Ledger</h2>
          <p className="text-slate-500 mt-2">Track your payouts from brand partnerships and portfolio sales.</p>
        </div>
        <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Earnings Oct '24</span>
          <div className="text-4xl font-black mt-1">${total.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Transactions</h3>
          <Button variant="outline" className="h-10 text-xs">Add Entry</Button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-8 py-4">Source</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-slate-700">{p.source}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-semibold text-slate-400">{p.date}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'cleared' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
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
    </div>
  );
};
