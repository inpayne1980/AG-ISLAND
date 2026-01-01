// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { SocialAccount, SocialPost } from '../types';
import { SOCIAL_ACCOUNTS } from '../constants';
import { Button } from './Button';

export const SocialManager: React.FC = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>(SOCIAL_ACCOUNTS);
  const [posts] = useState<SocialPost[]>([
    { 
      id: 'p1', 
      content_id: '2', 
      platform: 'instagram', 
      status: 'published', 
      scheduled_at: new Date(Date.now() - 86400000).toISOString(),
      engagement: { likes: 1240, comments: 45, shares: 12 }
    }
  ]);

  const toggleAccount = (id: string) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === id ? { ...acc, isConnected: !acc.isConnected } : acc
    ));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Social Integration</h2>
        <p className="text-slate-500 mt-1">Connect your accounts to publish AI variants directly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {accounts.map(acc => (
          <div key={acc.id} className={`p-6 rounded-3xl border-2 transition-all ${acc.isConnected ? 'bg-white border-indigo-100 shadow-xl' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${acc.platform === 'instagram' ? 'bg-pink-100 text-pink-600' : acc.platform === 'tiktok' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-blue-600'}`}>
                {/* Simple Icons */}
                <div className="w-6 h-6 font-bold flex items-center justify-center">{acc.platform[0].toUpperCase()}</div>
              </div>
              <div className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${acc.isConnected ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                {acc.isConnected ? 'Healthy' : 'Disconnected'}
              </div>
            </div>
            <h3 className="font-bold text-slate-900">{acc.username || 'Unlinked'}</h3>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Platform: {acc.platform}</p>
            
            <Button 
              className="w-full mt-6" 
              variant={acc.isConnected ? 'outline' : 'primary'}
              onClick={() => toggleAccount(acc.id)}
            >
              {acc.isConnected ? 'Reconnect' : 'Connect Account'}
            </Button>
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
          Recent Engagement
        </h3>
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Post</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Reach</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${post.content_id}/100/100`} className="w-full h-full object-cover" alt="Post" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">Variant #{post.content_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold capitalize text-slate-500">{post.platform}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-indigo-600">{post.engagement?.likes}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Likes</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-emerald-600">{post.engagement?.comments}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Comments</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Published</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};