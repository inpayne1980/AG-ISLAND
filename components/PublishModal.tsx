
import React, { useState } from 'react';
import { GeneratedContent, PlatformType } from '../types';
import { Button } from './Button';

interface PublishModalProps {
  content: GeneratedContent;
  onClose: () => void;
  onPublish: (details: any) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ content, onClose, onPublish }) => {
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [caption, setCaption] = useState("Just launched: The Signature Collection. AI-enhanced perfection. #AdGenius #AI #Design");
  const [scheduledAt, setScheduledAt] = useState(new Date().toISOString().slice(0, 16));

  const charLimit = platform === 'twitter' ? 280 : 2200;
  const utmString = `?utm_source=vendo&utm_medium=social&utm_campaign=adgenius_v${content.variant_number}&platform=${platform}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[800px]">
        {/* Preview Side */}
        <div className="flex-1 bg-slate-900 p-8 flex flex-col items-center justify-center">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Auto-Optimized Preview</div>
          <div className={`relative bg-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${platform === 'tiktok' ? 'aspect-[9/16] h-[500px]' : platform === 'twitter' ? 'aspect-[16/9] w-full' : 'aspect-square w-[400px]'}`}>
            <img src={content.hero_url} className="w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="mt-6 flex gap-2">
            {(['instagram', 'tiktok', 'twitter'] as PlatformType[]).map(p => (
              <button 
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${platform === p ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Side */}
        <div className="flex-1 p-10 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Campaign Dispatch</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Post Caption</label>
              <textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
              />
              <div className="flex justify-between">
                <span className={`text-[10px] font-bold ${caption.length > charLimit ? 'text-rose-500' : 'text-slate-400'}`}>
                  {caption.length} / {charLimit} characters
                </span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">UTM Tracking Enabled</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule Launch</label>
              <input 
                type="datetime-local" 
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Attribution DNA</div>
              <code className="text-[10px] font-mono text-indigo-700 break-all leading-relaxed">
                {utmString}
              </code>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">Cancel</Button>
            <Button 
              onClick={() => onPublish({ platform, caption, scheduledAt, utmString })} 
              className="flex-[2] h-14 text-lg"
              disabled={caption.length > charLimit}
            >
              Dispatch to Queue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
