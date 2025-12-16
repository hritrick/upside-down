import React from 'react';

const Phase4 = ({ role }) => {
    // 1. Fixed Node Positions (Percentage)
    const nodes = {
        A: { x: 20, y: 20 },
        B: { x: 80, y: 20 },
        C: { x: 20, y: 80 },
        D: { x: 80, y: 80 },
        E: { x: 50, y: 50 } // Center
    };

    // 2. The Mesh Edges (Fully Connected EXCEPT A-E)
    // 9 Edges Total
    const edges = [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'A', to: 'C', weight: 2 },
        { from: 'A', to: 'D', weight: 7 },
        { from: 'B', to: 'C', weight: 1 },
        { from: 'B', to: 'D', weight: 5 },
        { from: 'B', to: 'E', weight: 3 },
        { from: 'C', to: 'D', weight: 8 },
        { from: 'C', to: 'E', weight: 6 },
        { from: 'D', to: 'E', weight: 9 }
    ];

    // --- PLAYER A VIEW: VISUAL MAP (NO WEIGHTS) ---
    if (role === 'A') {
        return (
            <div className="w-full max-w-2xl aspect-square bg-black border-2 border-green-800 relative shadow-[0_0_20px_rgba(0,255,0,0.1)]">
                {/* SVG LAYER FOR LINES */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {edges.map((edge, i) => {
                        const n1 = nodes[edge.from];
                        const n2 = nodes[edge.to];
                        return (
                            <line
                                key={i}
                                x1={`${n1.x}%`} y1={`${n1.y}%`}
                                x2={`${n2.x}%`} y2={`${n2.y}%`}
                                stroke="#22c55e"
                                strokeWidth="2"
                                className="opacity-80"
                            />
                        );
                    })}
                </svg>

                {/* NODES LAYER */}
                {Object.entries(nodes).map(([id, pos]) => (
                    <div
                        key={id}
                        className="absolute w-12 h-12 bg-black border-2 border-green-500 rounded-full flex items-center justify-center text-green-400 font-bold text-xl z-10 shadow-[0_0_10px_rgba(0,255,0,0.5)] cursor-default transition-transform hover:scale-110"
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {id}
                    </div>
                ))}

                <div className="absolute bottom-4 w-full text-center">
                    <div className="bg-red-900/30 text-red-500 inline-block px-4 py-1 border border-red-800 text-xs tracking-wider animate-pulse">
                        DATA CORRUPTION: WEIGHTS HIDDEN
                    </div>
                </div>
            </div>
        );
    }

    // --- PLAYER B VIEW: COMMANDER INTERFACE (INTEL) ---
    if (role === 'B') {
        return (
            <div className="w-full max-w-5xl h-[500px] flex flex-col bg-black border-2 border-green-800 shadow-[0_0_50px_rgba(0,255,0,0.1)] relative overflow-hidden font-mono">
                {/* HEADER */}
                <div className="flex-none p-4 border-b-2 border-green-900 bg-green-900/10 flex justify-between items-center">
                    <h3 className="text-2xl text-green-400 font-bold tracking-[0.2em] animate-pulse">
                        MASTER ARCHITECTURE RECORD
                    </h3>
                    <div className="text-xs text-green-600">SECURE CHANNEL // ENCRYPTED</div>
                </div>

                {/* MAIN CONTENT GRID */}
                <div className="flex-grow grid grid-cols-2 gap-0 overflow-hidden">

                    {/* LEFT PANEL: BASE WEIGHTS (COMPACT GRID) */}
                    <div className="border-r-2 border-green-900 p-4 overflow-y-auto custom-scrollbar bg-black">
                        <div className="text-green-500 text-sm font-bold mb-3 border-b border-green-800 pb-1">
                            EDGE WEIGHT DATABASE
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {edges.map((e, i) => (
                                <div key={i} className="flex justify-between items-center text-sm py-1 border-b border-gray-900 hover:bg-green-900/20 px-2 transition-colors">
                                    <span className="text-gray-400">{e.from}-{e.to}</span>
                                    <span className="text-green-400 font-bold">{e.weight}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT PANEL: INTEL FEED */}
                    <div className="p-4 bg-gray-900/10 flex flex-col relative">
                        <div className="text-red-500 text-sm font-bold mb-3 border-b border-red-900/30 pb-1">
                            LIVE INTELLIGENCE
                        </div>

                        <div className="space-y-3 flex-grow">
                            <div className="p-3 bg-red-950/40 border border-red-600/50 text-red-200 text-sm animate-pulse">
                                <strong>⚠️ CRITICAL ALERT:</strong><br />
                                Connection <span className="text-white font-bold">A-B</span> Severed (∞)
                            </div>
                            <div className="p-3 bg-blue-950/40 border border-blue-600/50 text-blue-200 text-sm">
                                <strong>ℹ️ SYSTEM UPDATE:</strong><br />
                                Connection <span className="text-white font-bold">A-C</span> Reinforced (Weight = 1)
                            </div>
                        </div>

                        <div className="absolute top-2 right-2 opacity-10 text-6xl rotate-12 pointer-events-none">
                            📡
                        </div>
                    </div>
                </div>

                {/* FOOTER: MISSION OBJECTIVE */}
                <div className="flex-none bg-green-900 text-black p-3 text-center font-bold tracking-wider border-t-2 border-green-500">
                    MISSION: CALCULATE MINIMUM SPANNING TREE (MST) FROM THE GIVEN WEIGHTS
                </div>
            </div>
        );
    }

    return <div>Searching for Signal...</div>;
};

export default Phase4;
