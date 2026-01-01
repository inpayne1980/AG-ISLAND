// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import { Button } from './components/Button';

interface HandleSetupProps {
  userId: string;
  email: string;
  onComplete: (handle: string) => void;
}

export const HandleSetup: React.FC<HandleSetupProps> = ({ userId, email, onComplete }) => {
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate regex
    const handleRegex = /^[a-z0-9_-]{3,30}$/;
    if (!handleRegex.test(handle)) {
      setError('Handle must be 3-30 chars, lowercase, numbers, _ or - only.');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .insert({ id: userId, handle, email });

    if (error) {
      if (error.code === '23505') {
        setError('That handle is already taken. Try another oasis.');
      } else {
        setError(error.message);
      }
    } else {
      onComplete(handle);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand p-6">
      <div className="neu-card bg-sand w-full max-w-md p-10 shadow-2xl text-center">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">Claim Your Handle</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10 leading-relaxed">
          Welcome to the island. Choose your unique creator name.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Vendo.bio/...</label>
            <input
              type="text"
              placeholder="your-handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase())}
              required
              className="w-full h-14 neu-inset bg-transparent px-6 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-turquoise/20 transition-all"
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            isLoading={loading}
            variant="primary" 
            className="w-full h-14 shadow-lg"
          >
            Start Creating
          </Button>
        </form>
      </div>
    </div>
  );
};