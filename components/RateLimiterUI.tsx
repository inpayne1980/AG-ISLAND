
import React from 'react';

interface RateLimiterUIProps {
  current: number;
  max: number;
  label: string;
}

export const RateLimiterUI: React.FC<RateLimiterUIProps> = ({ current, max, label }) => {
  const percentage = (current / max) * 100;
  const isCritical = percentage >= 80;

  return (
    <div className="hidden lg:flex items-center gap-2 group cursor-help relative">
      <div className="text-[9px] font-black uppercase tracking-tighter text-slate-400">{label}</div>
      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${isCritical ? 'bg-rose-500' : 'bg-emerald-500'}`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-2 rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl">
        {current} / {max} {label} Tokens Remaining
      </div>
    </div>
  );
};
