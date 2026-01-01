
import React from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  isComplete: boolean;
}

interface OnboardingChecklistProps {
  items: ChecklistItem[];
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ items }) => {
  const completedCount = items.filter(i => i.isComplete).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="p-8 neu-card bg-sand mb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Launch Checklist</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Guide to Caribbean Mastery</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-turquoise">{completedCount}/{items.length}</span>
          <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Steps Ready</div>
        </div>
      </div>

      <div className="h-2 w-full bg-deepSand rounded-full mb-8 neu-inset overflow-hidden">
        <div 
          className="h-full bg-turquoise transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(64,224,208,0.5)]" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className={`p-4 rounded-2xl flex items-center gap-4 transition-all ${item.isComplete ? 'neu-inset opacity-60' : 'neu-card bg-brightSand'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${item.isComplete ? 'border-turquoise bg-turquoise text-white' : 'border-deepSand text-slate-300'}`}>
              {item.isComplete ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <span className="text-[10px] font-black">{items.indexOf(item) + 1}</span>
              )}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-wider ${item.isComplete ? 'line-through text-slate-400' : 'text-slate-600'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
