
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/Button';

export default function OwnerDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setAdminUser(user);
      
      if (user?.email === 'admin@vendo.bio') {
        fetchUsers();
      } else {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    // Fetch profiles joined with their subscription status
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        handle,
        email,
        subscriptions (
          tier,
          status,
          monthly_limit
        )
      `);

    if (!error) setUsers(data);
    setLoading(false);
  }

  const handleActivatePro = async (userId: string) => {
    setProcessingId(userId);
    try {
      const response = await fetch('/api/billing/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          adminEmail: adminUser?.email
        })
      });

      const result = await response.json();
      if (result.success) {
        alert(`Success: ${result.message}`);
        fetchUsers();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      alert("Billing system offline. Check Vercel logs.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-10">
        <div className="w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accessing Owner Vault...</p>
      </div>
    );
  }

  if (adminUser?.email !== 'admin@vendo.bio') {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-10 text-center">
        <div className="bg-rose-500 p-6 rounded-3xl mb-8 shadow-lg">
           <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Restricted Island</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
          This oasis is reserved for the Vendo.bio founder. Only allowlisted emails can manage project-wide billing.
        </p>
        <button onClick={() => window.location.href = '/'} className="mt-10 text-[10px] font-black text-turquoise underline uppercase tracking-widest">Return to Hub</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Owner Dashboard</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Manage Subscriptions &bull; External Stripe Controls</p>
          </div>
          <div className="flex gap-4">
            <div className="neu-card bg-brightSand px-6 py-3 flex items-center gap-3">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-slate-900 uppercase">Billing Node: Global</span>
            </div>
          </div>
        </div>

        <div className="neu-card bg-brightSand overflow-hidden shadow-neu-sm border border-deepSand">
          <table className="w-full text-left">
            <thead className="bg-sand/30 border-b border-deepSand text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-6">Creator Handle</th>
                <th className="px-8 py-6">Identity</th>
                <th className="px-8 py-6">Current Tier</th>
                <th className="px-8 py-6">Usage Limit</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-deepSand/20">
              {users.map(u => {
                const sub = u.subscriptions?.[0] || { tier: 'individual', monthly_limit: 1 };
                const isPro = sub.tier === 'pro';

                return (
                  <tr key={u.id} className="hover:bg-sand/10 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-slate-900 uppercase tracking-tight">@{u.handle}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-400 lowercase">{u.email}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isPro ? 'bg-turquoise/20 text-turquoise border border-turquoise/20' : 'bg-slate-200 text-slate-500'}`}>
                        {sub.tier}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-slate-900">{sub.monthly_limit} / mo</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {!isPro ? (
                        <Button 
                          variant="primary" 
                          className="h-10 text-[9px] px-4 shadow-md hover:shadow-turquoise/30"
                          onClick={() => handleActivatePro(u.id)}
                          isLoading={processingId === u.id}
                        >
                          Activate Pro ($29)
                        </Button>
                      ) : (
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-end gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          Stripe Active
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No creators have landed yet.</p>
            </div>
          )}
        </div>

        <div className="mt-12 p-8 neu-inset bg-sand/30 border border-deepSand">
          <div className="flex items-start gap-4">
             <div className="p-3 bg-slate-900 text-turquoise rounded-2xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
                <h4 className="font-black text-slate-800 uppercase text-xs mb-2">Billing Guardrail Policy</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-widest max-w-2xl">
                  Self-serve billing is strictly disabled (8.5). All Stripe interactions are owner-initiated. Pro tier enforces a strict 5 product limit per month as per Vendo.bio v1 policy.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
