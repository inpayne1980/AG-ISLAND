// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { GeneratedContent } from '../types';

interface ContentCalendarProps {
  content: GeneratedContent[];
}

export const ContentCalendar: React.FC<ContentCalendarProps> = ({ content }) => {
  const scheduled = content.filter(c => c.scheduled_at);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 4); // Simulated month view

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Campaign Calendar</h2>
          <p className="text-slate-500 mt-1">Timeline of your AI hero drops and social publishing.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest">Month</button>
          <button className="px-4 py-2 text-slate-400 text-xs font-bold uppercase tracking-widest">Week</button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
          {days.map(d => (
            <div key={d} className="p-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-r border-slate-100">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-slate-100">
          {dates.map((d, i) => {
            const dateStr = `2024-10-${d < 10 ? '0' + d : d}`;
            const items = scheduled.filter(c => c.scheduled_at?.startsWith(dateStr));

            return (
              <div key={i} className={`min-h-[140px] p-2 border-r border-b border-slate-50 transition-colors hover:bg-slate-50/50 ${d < 1 || d > 31 ? 'bg-slate-50/30' : ''}`}>
                <div className="text-[10px] font-black text-slate-300 mb-2">{d > 0 && d <= 31 ? d : ''}</div>
                <div className="space-y-1">
                  {items.map(item => (
                    <div key={item.id} className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-sm flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-6 h-6 rounded-md overflow-hidden bg-white/20">
                        <img src={item.hero_url} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest truncate">V#{item.variant_number}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};