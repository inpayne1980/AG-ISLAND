// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { SecurityAuditLog, SecurityConfig } from '../types';
import { MOCK_SECURITY_LOGS, MOCK_ALLOWLIST } from '../constants';
import { Button } from './Button';

export const SecurityDashboard: React.FC = () => {
  const [logs] = useState<SecurityAuditLog[]>(MOCK_SECURITY_LOGS);
  const [config, setConfig] = useState<SecurityConfig>({
    rlsEnabled: true,
    encryptionActive: true,
    twoFactorEnabled: true,
    allowlist: MOCK_ALLOWLIST
  });

  const toggleConfig = (key: keyof Omit<SecurityConfig, 'allowlist'>) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Vault & Compliance</h2>
          <p className="text-slate-500 mt-2">Enterprise-grade protection and audit infrastructure.</p>
        </div>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button className="px-4 py-2 bg-white shadow-sm text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Real-time Audits</button>
          <button className="px-4 py-2 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">WAF Config</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Live Security Feed</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {logs.map(log => (
                <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : log.status === 'blocked' ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{log.event}</div>
                      <div className="text-[10px] text-slate-400 font-mono">IP: {log.ip}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[10px] font-black uppercase tracking-widest ${log.status === 'success' ? 'text-emerald-600' : log.status === 'blocked' ? 'text-rose-600' : 'text-amber-600'}`}>
                      {log.status}
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold">{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-emerald-400 rounded-full"></span>
                  GDPR Automated Purge
                </h3>
                <p className="text-slate-400 text-sm mb-8 max-w-md">Your analytics events are set to auto-delete after 90 days of inactivity to maintain data privacy compliance.</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Last Purge</div>
                    <div className="text-sm font-bold">Today, 04:00 AM</div>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Records Removed</div>
                    <div className="text-sm font-bold text-emerald-400">1,242</div>
                  </div>
                </div>
             </div>
             {/* Abstract Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Security Controls</h3>
            <div className="space-y-4">
              {[
                { id: 'rlsEnabled', label: 'Supabase RLS Enforced', icon: '🛡️' },
                { id: 'encryptionActive', label: 'AES-256 GCM Active', icon: '🔑' },
                { id: 'twoFactorEnabled', label: 'Admin 2FA Required', icon: '📱' }
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-bold text-slate-600">{item.label}</span>
                  </div>
                  <button 
                    onClick={() => toggleConfig(item.id as any)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${config[item.id as keyof SecurityConfig] ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${config[item.id as keyof SecurityConfig] ? 'left-5' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Domain Allowlist</h3>
            <div className="space-y-2 mb-6">
              {config.allowlist.map(domain => (
                <div key={domain} className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{domain}</span>
                  <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full h-10 text-xs">Register Domain</Button>
          </div>
        </div>
      </div>
    </div>
  );
};