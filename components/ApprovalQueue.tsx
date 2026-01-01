// Vendo.bio constraint: money flows AROUND us, never THROUGH us
// External links ONLY — no Stripe Checkout on landing pages.

import React, { useState, useEffect } from 'react';
import { GeneratedContent, PresetType, ActionHistory, PlatformType } from '../types';
import { PRESETS, INITIAL_MOCK_DATA } from '../constants';
import { regenerateVariant } from '../services/geminiService';
import { Button } from './Button';
import { PublishModal } from './PublishModal';

interface ApprovalQueueProps {
  onUpdate?: (content: GeneratedContent[]) => void;
}

export const ApprovalQueue: React.FC<ApprovalQueueProps> = ({ onUpdate }) => {
  const [content, setContent] = useState<GeneratedContent[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ActionHistory[]>([]);
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [publishingItem, setPublishingItem] = useState<GeneratedContent | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  useEffect(() => {
    const saved = localStorage.getItem('adgenius_queue');
    if (saved) setContent(JSON.parse(saved));
    else setContent(INITIAL_MOCK_DATA);
  }, []);

  useEffect(() => {
    if (content.length > 0) {
      localStorage.setItem('adgenius_queue', JSON.stringify(content));
      onUpdate?.(content);
    }
  }, [content]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleApprove = (id: string) => {
    setContent(prev => prev.map(item => item.id === id ? { ...item, status: 'approved' as const } : item));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleRegenerate = async (id: string, presetValue: PresetType) => {
    if (!presetValue) return;
    const preset = PRESETS.find(p => p.value === presetValue);
    const item = content.find(c => c.id === id);
    if (!preset || !item) return;

    setRegeneratingId(id);
    try {
      const newHeroUrl = await regenerateVariant(item.original_url, preset.prompt);
      if (newHeroUrl) {
        setContent(prev => prev.map(c => c.id === id ? { ...c, hero_url: newHeroUrl } : c));
      }
    } catch (err) {
      setError("AI generation failed in the Caribbean sun.");
    } finally {
      setRegeneratingId(null);
    }
  };

  const pendingItems = content.filter(i => i.status === 'pending_approval');
  const approvedItems = content.filter(i => i.status === 'approved');
  const displayItems = activeTab === 'pending' ? pendingItems : approvedItems;

  return (
    <div className="space-y-12">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Campaign Sandbox</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Filter and refine your high-fidelity variants</p>
        </div>

        <div className="flex gap-4 p-1 neu-inset">
          <button 
            onClick={() => setActiveTab('pending')} 
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-turquoise text-white shadow-neu-sm' : 'text-slate-400'}`}
          >
            Pending Approval ({pendingItems.length})
          </button>
          <button 
            onClick={() => setActiveTab('approved')} 
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'approved' ? 'bg-turquoise text-white shadow-neu-sm' : 'text-slate-400'}`}
          >
            Verified Vault ({approvedItems.length})
          </button>
        </div>
      </header>

      {displayItems.length === 0 ? (
        <div className="neu-card p-20 text-center bg-sand/30 border-2 border-dashed border-deepSand">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No assets in this channel. Try a new upload.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayItems.map((item) => (
            <div key={item.id} className="neu-card bg-brightSand p-6 group transition-all duration-500 hover:-translate-y-2">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  {activeTab === 'pending' && (
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)} 
                      onChange={() => toggleSelection(item.id)} 
                      className="w-5 h-5 neu-inset rounded-full appearance-none checked:bg-turquoise transition-all cursor-pointer"
                    />
                  )}
                  <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest">Variant #{item.variant_number}</span>
                </div>
                <div className="flex gap-1">
                  {item.color_palette?.map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              <div className="aspect-square neu-inset overflow-hidden relative mb-6">
                {regeneratingId === item.id && (
                  <div className="absolute inset-0 bg-sand/80 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="w-10 h-10 border-4 border-turquoise border-t-transparent rounded-full animate-spin mb-3 shadow-[0_0_15px_#40E0D0]"></div>
                    <span className="text-[9px] font-black text-turquoise uppercase tracking-[0.2em]">Refining Render...</span>
                  </div>
                )}
                <img 
                  src={item.hero_url} 
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${regeneratingId === item.id ? 'opacity-20' : 'opacity-100'}`} 
                  alt="Variant Preview"
                />
              </div>

              <div className="flex gap-3">
                {activeTab === 'pending' ? (
                  <>
                    <Button onClick={() => handleApprove(item.id)} variant="primary" className="flex-[2]">Verify</Button>
                    <div className="relative flex-1">
                      <select 
                        onChange={(e) => handleRegenerate(item.id, e.target.value as PresetType)}
                        value=""
                        className="w-full h-full neu-inset appearance-none bg-transparent text-[8px] font-black uppercase tracking-widest px-4 pr-8 focus:outline-none"
                      >
                        <option value="" disabled>DNA Refine</option>
                        {PRESETS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        ▼
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setPublishingItem(item)} variant="secondary" className="flex-[2]">Launch</Button>
                    <Button onClick={() => setContent(prev => prev.map(c => c.id === item.id ? { ...c, status: 'pending_approval' } : c))} variant="neumorphic" className="flex-1">Revoke</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {publishingItem && (
        <PublishModal 
          content={publishingItem} 
          onClose={() => setPublishingItem(null)} 
          onPublish={(details) => {
            alert(`Variant dispatched to ${details.platform}!`);
            setPublishingItem(null);
          }}
        />
      )}
    </div>
  );
};