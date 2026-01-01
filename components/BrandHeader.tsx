
import React from 'react';

interface BrandHeaderProps {
  brand: string;
  creator: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ brand, creator }) => {
  return (
    <div className="flex flex-col items-center text-center py-10 space-y-4">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">
          {brand}
        </h2>
        <div className="h-1.5 w-12 bg-turquoise rounded-full"></div>
      </div>
      
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Handcrafted with</span>
        <span className="text-turquoise font-black">AdGenius AI</span>
        <span>by</span>
        <span className="text-coral font-black">@{creator}</span>
      </div>
    </div>
  );
};
