// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React from 'react';
import { GeneratedContent } from '../types';

interface ContentLibraryProps {
  content: GeneratedContent[];
}

export const ContentLibrary: React.FC<ContentLibraryProps> = ({ content }) => {
  const approved = content.filter(c => c.status === 'approved');

  const getExpiryDays = (date: string) => {
    const created = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - created;
    const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, 30 - daysPassed);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Content Library</h2>
        <p className="text-slate-500 mt-1">All approved assets. Items expire after 30 days.</p>
      </div>

      {approved.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
          <p className="text-slate-400">Library is empty. Approve some variants to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {approved.map(item => (
            <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all">
              <div className="aspect-square relative">
                <img src={item.hero_url} className="w-full h-full object-cover" alt="Asset" />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm">
                  {getExpiryDays(item.created_at)}D LEFT
                </div>
              </div>
              <div className="p-3">
                <div className="flex gap-1 mb-2">
                  {item.color_palette?.map((color, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">V#{item.variant_number}</span>
                  <button className="text-indigo-600 text-[10px] font-bold uppercase hover:underline">Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};