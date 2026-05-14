import React, { useState } from 'react';

const ManifoldDiagram: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  // Simple path for a wavy manifold surface
  const manifoldPath = "M 50 150 Q 150 50 250 150 T 450 150";
  
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl my-16 shadow-sm">
      <div className="relative w-full max-w-xl aspect-[16/9]">
        <svg viewBox="0 0 500 250" className="w-full h-full">
          {/* Grid lines (Background) */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Coordinate Axes */}
          <line x1="50" y1="200" x2="450" y2="200" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrow)" />
          <line x1="50" y1="200" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="1" markerEnd="url(#arrow)" />
          
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
            </marker>
          </defs>

          {/* The Manifold Surface */}
          <path 
            d={manifoldPath} 
            fill="none" 
            stroke="url(#gradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{ 
              transform: `translateY(${Math.sin(rotation * 0.1) * 10}px)`,
              transformOrigin: 'center'
            }}
          />
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* Data Points */}
          {[100, 200, 300, 400].map((x, i) => (
            <circle 
              key={i}
              cx={x} 
              cy={150 + Math.sin(x * 0.05) * 20} 
              r="4" 
              fill="#1e293b"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}

          {/* Labels (SVG Text) */}
          <text x="460" y="215" fontSize="10" className="font-sans font-bold fill-slate-400 uppercase tracking-widest">{"Dimension $d_1$"}</text>
          <text x="20" y="40" fontSize="10" className="font-sans font-bold fill-slate-400 uppercase tracking-widest">{"Energy $\\mathcal{E}$"}</text>
          <text x="250" y="100" fontSize="12" className="font-serif italic fill-orange-600">{"Manifold $\\mathcal{M}$"}</text>
        </svg>

        {/* Floating HTML Labels (Overlay) */}
        <div className="absolute top-1/4 left-1/4 bg-white/80 backdrop-blur-sm border border-slate-200 p-2 rounded text-[10px] font-sans shadow-sm">
          <strong>Observation:</strong> {"Local Curvature $\\kappa$ > 0"}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <button 
          onClick={() => setRotation(r => r + 1)}
          className="px-4 py-2 bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-orange-600 transition-colors"
        >
          Perturb System
        </button>
      </div>
      
      <p className="mt-4 font-sans text-[10px] text-slate-400 uppercase tracking-widest font-black">
        Figure 1: Numerical projection of the embedding manifold.
      </p>
    </div>
  );
};

export default ManifoldDiagram;
