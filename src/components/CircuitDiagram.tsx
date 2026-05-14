import React, { useEffect } from 'react';

const CircuitDiagram: React.FC = () => {
  // Define node positions
  const nodes = [
    { id: 'x1', x: 50, y: 50, label: "x_1" },
    { id: 'x2', x: 50, y: 150, label: "x_2" },
    { id: 'h1', x: 250, y: 100, label: "h_1" },
    { id: 'y', x: 450, y: 100, label: "y" },
  ];

  // Define edges
  const edges = [
    { from: 'x1', to: 'h1', weight: "w_{11}" },
    { from: 'x2', to: 'h1', weight: "w_{21}" },
    { from: 'h1', to: 'y', weight: "v_1" },
  ];

  // Trigger MathJax re-render after component mounts
  useEffect(() => {
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-slate-100 rounded-lg my-16">
      <div className="relative w-full max-w-xl aspect-[16/7]">
        <svg viewBox="0 0 500 200" className="w-full h-full">
          {/* Arrowhead definition */}
          <defs>
            <marker id="tikz-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>

          {/* Draw Edges (Lines only) */}
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from)!;
            const toNode = nodes.find(n => n.id === edge.to)!;
            
            return (
              <line 
                key={i}
                x1={fromNode.x} y1={fromNode.y} 
                x2={toNode.x} y2={toNode.y} 
                stroke="#cbd5e1" 
                strokeWidth="1.5"
                markerEnd="url(#tikz-arrow)"
              />
            );
          })}

          {/* Draw Nodes (Circles only) */}
          {nodes.map((node) => (
            <circle 
              key={node.id}
              cx={node.x} cy={node.y} r="18" 
              fill="white" 
              stroke="#1e293b" 
              strokeWidth="2" 
            />
          ))}
        </svg>

        {/* HTML Overlay for Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Node Labels */}
          {nodes.map((node) => (
            <div 
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-serif italic"
              style={{ left: `${(node.x / 500) * 100}%`, top: `${(node.y / 200) * 100}%` }}
            >
              {`$${node.label}$`}
            </div>
          ))}

          {/* Edge Labels */}
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from)!;
            const toNode = nodes.find(n => n.id === edge.to)!;
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <div 
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-xs font-serif italic text-slate-500"
                style={{ left: `${(midX / 500) * 100}%`, top: `${((midY - 15) / 200) * 100}%` }}
              >
                {`$${edge.weight}$`}
              </div>
            );
          })}
        </div>
      </div>
      
      <p className="mt-8 font-sans text-[10px] text-slate-400 uppercase tracking-widest font-black">
        Figure 2: Computational graph of a minimalist transformer circuit.
      </p>
    </div>
  );
};

export default CircuitDiagram;
