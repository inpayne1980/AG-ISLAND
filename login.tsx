
import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import { Button } from './components/Button';

export const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand p-6">
      <div className="neu-card bg-sand w-full max-w-md p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-turquoise h-16 w-16 rounded-3xl flex items-center justify-center shadow-neu-sm mb-6">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Vendor Vault</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Magic Link Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Creator Email</label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-14 neu-inset bg-transparent px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all"
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 text-center animate-pulse">
              {error}
            </div>
          )}

          {message && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-500 text-center">
              {message}
            </div>
          )}

          <Button 
            type="submit" 
            isLoading={loading}
            variant="primary" 
            className="w-full h-14 shadow-lg"
          >
            Send Magic Link
          </Button>
        </form>

        <p className="mt-10 text-center text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
          No passwords. No stress. <br/> Just your Caribbean sandbox.
        </p>
      </div>
    </div>
  );
};
