
import React from 'react';

export const HealthMonitor: React.FC = () => {
  return (
    <div className="flex items-center gap-4 p-4 neu-card bg-sand/50">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-turquoise rounded-full animate-pulse shadow-[0_0_8px_#40E0D0]"></div>
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Systems Nominal</span>
        </div>
        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Edge Latency: 12ms</div>
      </div>
      
      <div className="flex gap-1 h-4">
        {[40, 60, 30, 80, 50, 90, 45].map((h, i) => (
          <div key={i} className="w-1 bg-deepSand rounded-full overflow-hidden relative">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-coral rounded-full transition-all duration-500" 
              style={{ height: `${h}%` }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
