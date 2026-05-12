import React, { useState } from 'react';

const InteractiveCircle: React.FC = () => {
  const [size, setSize] = useState(50);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-[3rem] border border-slate-100 my-12">
      <div 
        className="bg-emerald-500 rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/20"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
      
      <div className="mt-8 flex flex-col items-center gap-4">
        <label className="font-sans text-xs uppercase tracking-widest font-bold text-slate-400">
          Adjust Parameter $\sigma = {size}$
        </label>
        <input 
          type="range" 
          min="20" 
          max="200" 
          value={size} 
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-48 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>
      
      <p className="mt-4 font-sans text-xs text-slate-400 italic">
        (Example React component embedded in MDX)
      </p>
    </div>
  );
};

export default InteractiveCircle;
