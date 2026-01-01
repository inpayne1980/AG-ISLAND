
import React from 'react';
import { AnalyticsMetric } from '../types';

export const AnalyticsDashboard: React.FC = () => {
  const metrics: AnalyticsMetric[] = [
    { label: 'Total Page Views', value: '42.8k', trend: 15.4, icon: '👁️' },
    { label: 'Hero Ad Clicks', value: '8,210', trend: 22.1, icon: '🖱️' },
    { label: 'Avg. Conversion', value: '18.2%', trend: -2.4, icon: '📈' },
    { label: 'Social Engagement', value: '154k', trend: 45.2, icon: '❤️' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Analytics</h2>
          <p className="text-slate-500 mt-1">Real-time performance across your landing pages and social campaigns.</p>
        </div>
        <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{m.icon}</span>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${m.trend > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {m.trend > 0 ? '↑' : '↓'} {Math.abs(m.trend)}%
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{m.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Traffic Distribution</h3>
          <div className="h-64 flex items-end gap-2 px-4">
            {[60, 40, 80, 50, 90, 70, 45, 100, 85, 65, 55, 75].map((h, i) => (
              <div key={i} className="flex-1 bg-indigo-500/10 rounded-t-lg relative group transition-all hover:bg-indigo-500/30">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-indigo-600 rounded-t-lg transition-all duration-1000 ease-out" 
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md transition-opacity">
                  {h * 420}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mt-6 px-4">
            <span>Oct 01</span>
            <span>Oct 15</span>
            <span>Oct 30</span>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <h3 className="text-lg font-bold mb-6">Platform Attribution</h3>
          <div className="space-y-6">
            {[
              { label: 'Instagram', value: 45, color: 'bg-pink-500' },
              { label: 'TikTok', value: 35, color: 'bg-emerald-400' },
              { label: 'Twitter', value: 20, color: 'bg-blue-400' },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>{p.label}</span>
                  <span>{p.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color}`} style={{ width: `${p.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-medium text-white/60 leading-relaxed italic">
              "Instagram remains your highest converting channel. Consider allocating 20% more AI render variants to this platform next month."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
