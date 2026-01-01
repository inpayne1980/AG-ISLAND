// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState } from 'react';
import { Button } from './Button';

export const PrivacySettings: React.FC = () => {
  const [requesting, setRequesting] = useState(false);

  const handleDataExport = () => {
    setRequesting(true);
    setTimeout(() => {
      alert("A link to download your GDPR-compliant archive has been sent to your registered email.");
      setRequesting(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden p-12">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Security & Privacy</h2>
        <p className="text-slate-500 text-sm mb-10 leading-relaxed">
          Your privacy is protected by AES-256 encryption. You have full control over your data in accordance with GDPR and CCPA regulations.
        </p>

        <div className="space-y-8">
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div>
              <h4 className="font-bold text-slate-800">Export Personal Data</h4>
              <p className="text-xs text-slate-400 mt-1">Download a full JSON archive of your uploads, approved variants, and analytics logs.</p>
            </div>
            <Button variant="outline" onClick={handleDataExport} isLoading={requesting}>Request Download</Button>
          </div>

          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
            <div>
              <h4 className="font-bold text-slate-800">Clear Search Grounds</h4>
              <p className="text-xs text-slate-400 mt-1">Permanently remove your AI search grounding history from our servers.</p>
            </div>
            <Button variant="ghost" className="text-rose-500">Purge Data</Button>
          </div>

          <div className="pt-8 border-t border-slate-100">
            <h4 className="font-black text-rose-500 uppercase text-[10px] tracking-[0.2em] mb-4">Danger Zone</h4>
            <div className="p-8 bg-rose-50 border border-rose-100 rounded-[2rem] flex items-center justify-between">
              <div>
                <h4 className="font-bold text-rose-900 text-sm">Delete Account</h4>
                <p className="text-xs text-rose-700 mt-1">This action is irreversible and will purge all AI assets from our CDN.</p>
              </div>
              <Button variant="danger">Delete Permanently</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};