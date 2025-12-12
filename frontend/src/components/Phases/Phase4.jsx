import { motion } from 'framer-motion';

function Phase4({ playerRole }) {
    // Graph nodes
    const nodes = [
        { id: 'A', x: 150, y: 100, label: 'NODE A' },
        { id: 'B', x: 350, y: 100, label: 'NODE B' },
        { id: 'C', x: 150, y: 250, label: 'NODE C' },
        { id: 'D', x: 350, y: 250, label: 'NODE D' },
        { id: 'E', x: 250, y: 350, label: 'NODE E' },
    ];

    // Original edges
    const edges = [
        { from: 'A', to: 'B', weight: 1, x1: 150, y1: 100, x2: 350, y2: 100, broken: true },
        { from: 'A', to: 'C', weight: 7, x1: 150, y1: 100, x2: 150, y2: 250, modified: 3 },
        { from: 'B', to: 'C', weight: 5, x1: 350, y1: 100, x2: 150, y2: 250 },
        { from: 'B', to: 'D', weight: 4, x1: 350, y1: 100, x2: 350, y2: 250 },
        { from: 'B', to: 'E', weight: 3, x1: 350, y1: 100, x2: 250, y2: 350 },
        { from: 'D', to: 'E', weight: 6, x1: 350, y1: 250, x2: 250, y2: 350 },
        { from: 'C', to: 'E', weight: 2, x1: 150, y1: 250, x2: 250, y2: 350 },
    ];

    return (
        <div className="min-h-full">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-gate mb-8 text-center tracking-wider"
                style={{ fontFamily: 'VT323, monospace' }}
            >
                THE HIVE WEB
            </motion.h2>

            {playerRole === 'A' ? (
                // Player A: The Eyes - Sees the Graph Visualization
                <div className="space-y-8">
                    <div className="text-[#00ffaa] text-2xl font-mono text-center mb-6">
                        🕸️ NEURAL CONNECTION MAP
                    </div>

                    {/* Graph Visualization */}
                    <div className="bg-black/60 border-4 border-green-500 p-8 rounded-lg max-w-4xl mx-auto">
                        <svg viewBox="0 0 500 450" className="w-full h-full">
                            {/* Draw edges first */}
                            {edges.map((edge, index) => (
                                <g key={`edge-${index}`}>
                                    <motion.line
                                        x1={edge.x1}
                                        y1={edge.y1}
                                        x2={edge.x2}
                                        y2={edge.y2}
                                        stroke={edge.broken ? '#ff0000' : edge.modified ? '#ffaa00' : '#00ff00'}
                                        strokeWidth={edge.broken ? '4' : '3'}
                                        strokeDasharray={edge.broken ? '10,5' : '0'}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                    />

                                    {/* Weight label */}
                                    <motion.text
                                        x={(edge.x1 + edge.x2) / 2}
                                        y={(edge.y1 + edge.y2) / 2 - 10}
                                        fill={edge.broken ? '#ff0000' : edge.modified ? '#ffaa00' : '#00ff00'}
                                        fontSize="24"
                                        fontFamily="VT323, monospace"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.5 }}
                                    >
                                        {edge.broken ? '∞' : edge.modified || edge.weight}
                                    </motion.text>

                                    {/* Status indicator */}
                                    {(edge.broken || edge.modified) && (
                                        <motion.text
                                            x={(edge.x1 + edge.x2) / 2}
                                            y={(edge.y1 + edge.y2) / 2 + 20}
                                            fill={edge.broken ? '#ff0000' : '#ffaa00'}
                                            fontSize="14"
                                            fontFamily="monospace"
                                            textAnchor="middle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {edge.broken ? 'BROKEN' : 'MODIFIED'}
                                        </motion.text>
                                    )}
                                </g>
                            ))}

                            {/* Draw nodes */}
                            {nodes.map((node, index) => (
                                <g key={`node-${node.id}`}>
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="35"
                                        fill="#6A0DAD"
                                        stroke="#00ffaa"
                                        strokeWidth="4"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.15, type: 'spring' }}
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y + 7}
                                        fill="#ffffff"
                                        fontSize="30"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        fontFamily="VT323, monospace"
                                    >
                                        {node.id}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto font-mono text-sm">
                        <div className="bg-green-500/20 border-2 border-green-500 p-3 rounded text-center">
                            <div className="text-green-500 font-bold mb-1">NORMAL</div>
                            <div className="text-gray-400">Original weight</div>
                        </div>
                        <div className="bg-yellow-500/20 border-2 border-yellow-500 p-3 rounded text-center">
                            <div className="text-yellow-500 font-bold mb-1">MODIFIED</div>
                            <div className="text-gray-400">Weight changed</div>
                        </div>
                        <div className="bg-red-500/20 border-2 border-red-500 p-3 rounded text-center">
                            <div className="text-red-500 font-bold mb-1">BROKEN</div>
                            <div className="text-gray-400">Infinite weight</div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono">
                        ⚠️ DESCRIBE THE GRAPH STRUCTURE TO YOUR PARTNER
                    </div>
                </div>
            ) : (
                // Player B: The Brain - Gets Intel Report + MST Question
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="text-[#ff0055] text-2xl font-mono text-center mb-6">
                        🧠 NETWORK ANALYSIS
                    </div>

                    {/* Intel Report */}
                    <div className="bg-black/60 border-4 border-red-500 p-6 rounded-lg">
                        <div className="text-2xl text-red-500 font-bold mb-4 text-center font-mono">
                            🩸 INTEL UPDATE
                        </div>
                        <div className="space-y-4">
                            <div className="bg-red-600/20 border-2 border-red-600 p-4 rounded">
                                <div className="text-red-500 font-mono text-lg font-bold">
                                    ⚠️ CONNECTION A-B IS BROKEN
                                </div>
                                <div className="text-gray-400 text-sm mt-2">
                                    Weight: 1 → ∞ (Unusable)
                                </div>
                            </div>
                            <div className="bg-yellow-500/20 border-2 border-yellow-500 p-4 rounded">
                                <div className="text-yellow-500 font-mono text-lg font-bold">
                                    🔧 CONNECTION A-C REINFORCED
                                </div>
                                <div className="text-gray-400 text-sm mt-2">
                                    Weight: 7 → 3 (Reduced)
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Original Edges Table */}
                    <div className="bg-black/60 border-4 border-[#00ffaa] p-6 rounded-lg">
                        <div className="text-xl text-[#00ffaa] font-bold mb-4 font-mono">
                            📊 ORIGINAL CONNECTION WEIGHTS
                        </div>
                        <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                            <div className="bg-black p-2 rounded">A-B: <span className="text-red-500 line-through">1</span> → <span className="text-red-600">∞</span></div>
                            <div className="bg-black p-2 rounded">A-C: <span className="text-yellow-500 line-through">7</span> → <span className="text-green-500">3</span></div>
                            <div className="bg-black p-2 rounded">B-C: <span className="text-green-500">5</span></div>
                            <div className="bg-black p-2 rounded">B-D: <span className="text-green-500">4</span></div>
                            <div className="bg-black p-2 rounded">B-E: <span className="text-green-500">3</span></div>
                            <div className="bg-black p-2 rounded">D-E: <span className="text-green-500">6</span></div>
                            <div className="bg-black p-2 rounded">C-E: <span className="text-green-500">2</span></div>
                        </div>
                    </div>

                    {/* MST Algorithm */}
                    <div className="bg-black/60 border-4 border-[#ff0055] p-8 rounded-lg">
                        <div className="text-2xl text-[#ff0055] font-bold mb-4 text-center font-mono">
                            MINIMUM SPANNING TREE
                        </div>
                        <div className="text-white font-mono space-y-3 text-sm">
                            <div className="bg-[#ff0055]/10 p-3 rounded">
                                <strong>GOAL:</strong> Connect all 5 nodes with minimum total weight
                            </div>
                            <div className="bg-[#ff0055]/10 p-3 rounded">
                                <strong>RULES:</strong> No cycles, must use exactly 4 edges
                            </div>
                            <div className="bg-[#ff0055]/10 p-3 rounded">
                                <strong>ALGORITHM:</strong> Kruskal's or Prim's
                                <div className="text-xs text-gray-400 mt-1">
                                    Sort edges by weight, pick smallest without cycles
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="bg-black/60 border-4 border-green-500 p-8 rounded-lg">
                        <div className="text-2xl text-green-500 font-bold mb-6 text-center font-mono">
                            📝 THE QUESTION
                        </div>
                        <div className="text-white font-mono text-xl text-center space-y-4">
                            <div>After applying the intel updates:</div>
                            <div className="text-[#00ffaa] text-3xl font-bold">
                                CALCULATE TOTAL WEIGHT OF THE<br />
                                NEW MINIMUM SPANNING TREE
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-gray-400 font-mono text-lg mt-6">
                        📝 SUBMIT FORMAT: Integer
                    </div>
                </div>
            )}
        </div>
    );
}

export default Phase4;
